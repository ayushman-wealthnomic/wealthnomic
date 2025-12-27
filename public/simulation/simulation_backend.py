import sys
import os
import json
import pandas as pd
import numpy as np
from datetime import datetime
import subprocess

# Add current directory to path to import backtest_atr_v1
sys.path.append(os.getcwd())

import backtest_atr_v1 as strategy

def update_data():
    """Runs the data download script to get latest data."""
    print("🔄 Updating Market Data...")
    try:
        # Check if download_test_data.py exists
        if os.path.exists("download_test_data.py"):
            subprocess.check_call([sys.executable, "download_test_data.py"])
            print("✅ Data Update Complete.")
        else:
            print("⚠️ download_test_data.py not found. Skipping download.")
    except Exception as e:
        print(f"❌ Data Update Failed: {e}")

def run_simulation(start_date_str):
    """Runs the backtest simulation from start_date to today."""
    
    print(f"🚀 Starting Simulation from {start_date_str}")
    
    # Monkey Patch Strategy Dates
    strategy.START_DATE = start_date_str
    # Set END_DATE to tomorrow to ensure we cover today fully
    from datetime import timedelta
    strategy.END_DATE = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
    
    # Load Data
    stock_groups, all_data = strategy.load_and_prep_data()
    
    if not all_data:
        print("❌ No data loaded. Exiting.")
        return

    # Initialize Portfolio
    sim = strategy.Portfolio(stock_groups, all_data)
    
    daily_snapshots = []
    
    print(f"📅 Simulating {len(sim.dates)} trading days...")
    
    total_days = len(sim.dates)
    
    for i, current_date in enumerate(sim.dates):
        # Run the day logic
        sim.run_day(current_date, day_idx=i)
        
        # 1. Capture Daily Activity (Trades made TODAY)
        todays_activity = []
        for trade_log in sim.history:
            if trade_log['date'] == current_date:
                todays_activity.append(trade_log)
        
        # 2. Capture Active Positions Snapshot
        current_positions = []
        market_value_total = 0
        
        for trade in sim.active_trades:
            if trade.symbol in sim.all_data and current_date in sim.all_data[trade.symbol].index:
                # Update last price if possible
                trade.last_price = sim.all_data[trade.symbol].loc[current_date]['close']
            
            # Calculate current PnL for this position
            current_val = trade.shares * trade.last_price
            cost_basis = trade.shares * trade.entry_price
            pnl_amt = current_val - cost_basis
            pnl_pct = (pnl_amt / cost_basis) * 100 if cost_basis != 0 else 0
            
            market_value_total += current_val
            
            current_positions.append({
                "symbol": trade.symbol,
                "group": trade.group,
                "entry_date": trade.entry_date,
                "entry_price": trade.entry_price,
                "current_price": trade.last_price,
                "shares": trade.shares,
                "pnl_amount": pnl_amt,
                "pnl_pct": pnl_pct,
                "days_held": trade.days_held,
                "trailing_stop": trade.trailing_stop,
                "target_price": trade.profit_target_price
            })
            
        # 3. Capture Account Metrics
        # Re-using logic from end of file to calculate precise equity if needed
        # But sim.equity_curve is appended at the end of run_backtest usually.
        # Does run_day append to equity_curve? No, run_backtest does.
        # We need to manually append or calculate equity here.
        
        total_debt_daily = sum(2 * t.tranche_size for t in sim.active_trades if not t.is_delivery)
        daily_equity = sim.cash + market_value_total - total_debt_daily
        
        # 4. Construct Daily Log Entry
        snapshot = {
            "date": current_date.strftime("%Y-%m-%d"),
            "equity": daily_equity,
            "cash": sim.cash,
            "day_profit": daily_equity - (daily_snapshots[-1]['equity'] if daily_snapshots else sim.capital),
            "total_pnl": daily_equity - strategy.INITIAL_CAPITAL,
            "activity": todays_activity,
            "positions": current_positions,
            "positions_count": len(sim.active_trades)
        }
        
        daily_snapshots.append(snapshot)
        
        # Print progress
        if i % 10 == 0:
            print(f"   Processed {i+1}/{total_days} days... (Equity: {daily_equity:.0f})")

    # Final Metrics
    metrics = sim.calculate_metrics()
    
    # Construct Final Output JSON
    output_data = {
        "metadata": {
            "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "start_date": start_date_str,
            "end_date": strategy.END_DATE,
            "initial_capital": strategy.INITIAL_CAPITAL,
        },
        "summary": metrics,
        "daily_logs": daily_snapshots,
        "final_positions": daily_snapshots[-1]['positions'] if daily_snapshots else []
    }
    
    # Save to JSON
    output_file = "simulation_data.json"
    
    # Custom encoder for sanitizing data (numpy outcomes etc)
    class NpEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, np.integer):
                return int(obj)
            if isinstance(obj, np.floating):
                return float(obj)
            if isinstance(obj, np.ndarray):
                return obj.tolist()
            if isinstance(obj, pd.Timestamp) or isinstance(obj, datetime):
                return obj.strftime("%Y-%m-%d")
            return super(NpEncoder, self).default(obj)

    with open(output_file, 'w') as f:
        json.dump(output_data, f, cls=NpEncoder, indent=4)
        
    print(f"\n✅ Simulation Complete!")
    print(f"📊 Results saved to {output_file}")
    
    return output_file

if __name__ == "__main__":
    # check for arguments
    import argparse
    parser = argparse.ArgumentParser(description='Run Daily Trading Simulation')
    parser.add_argument('--start', type=str, default='2024-01-01', help='Start date YYYY-MM-DD')
    parser.add_argument('--download', action='store_true', help='Force download data before run')
    
    args = parser.parse_args()
    
    if args.download:
        update_data()
        
    run_simulation(args.start)
