"""
Download Test Data (2023-2025) using yfinance
For out-of-sample testing of the V1 strategy
"""

import os
import pandas as pd
import yfinance as yf
from datetime import datetime
import time

# Configuration
OUTPUT_DIR = "N_Test"
START_DATE = "2023-01-01"  # Test data starts from 2023
from datetime import timedelta
END_DATE = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")     # Download till tomorrow to ensure today is captured
INTERVAL = "1d"             # Daily data

# Create output directory
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load stock lists
print("=" * 80)
print("DOWNLOADING TEST DATA (2023-01-01 to 2025-12-31)")
print("=" * 80)

# N200 (Nifty 200) stocks
try:
    n100_df = pd.read_csv("ind_nifty200list.csv")
    N200_list = n100_df["Symbol"].to_list()
    print(f"\n✅ Loaded {len(N200_list)} stocks from Nifty 200 list")
except Exception as e:
    print(f"❌ Error loading Nifty 200 list: {e}")
    N200_list = []

# ETF list
eq_etf_list = [
    "HEALTHY", "BFSI", "CONSUMBEES", "PVTBANIETF", "OILIETF", "MODEFENCE",
    'MOMENTUM50', 'ALPHA', 'ITBEES', "MOCAPITAL", "MSCIINDIA", "MAKEINDIA",
    "ALPHAETF", "GROWWRLTY", "MOINFRA", "GROWWRAIL", 'INFRABEES', 'LOWVOLIETF',
    "AXISHCETF", 'MON200', 'CPSEETF', 'NIFTYBEES', 'BANKBEES', 'JUNIORBEES',
    'HNGSNGBEES', 'SHARIABEES', "MOTOUR", "FINIETF", "HDFCSML250", "MOREALTY",
    "AUTOBEES", "PHARMABEES", "PSUBNKBEES", "FMCGIETF", "DIVOPPBEES", "MAFANG",
    "MIDSMALL", "GROWWNET", "GROWWPOWER", "METALIETF", "ALPL30IETF", "GROWWEV",
    "TNIDETF", "CONSUMIETF", "MOPSE"
]

# Gold/Silver ETFs
Goldsilver = ["GOLDBEES", "SILVERBEES"]

# Combine all symbols
all_symbols = N200_list + eq_etf_list + Goldsilver
print(f"\n📊 Total symbols to download: {len(all_symbols)}")
print(f"   - N200 stocks: {len(N200_list)}")
print(f"   - ETFs: {len(eq_etf_list)}")
print(f"   - Gold/Silver: {len(Goldsilver)}")

# Download function
def download_symbol(symbol, retries=3):
    """Download data for a single symbol with retry logic"""
    
    # Add .NS suffix for NSE stocks (Indian market)
    yf_symbol = f"{symbol}.NS"
    
    for attempt in range(retries):
        try:
            print(f"Downloading {symbol}... ", end='', flush=True)
            
            # Download data
            df = yf.download(
                yf_symbol,
                start=START_DATE,
                end=END_DATE,
                interval=INTERVAL,
                progress=False,
                auto_adjust=False  # Keep adjusted close separate
            )
            
            if df.empty:
                print(f"❌ No data")
                return False
            
            # Fix: yfinance sometimes returns MultiIndex columns
            # Convert to single level if needed
            if isinstance(df.columns, pd.MultiIndex):
                df.columns = df.columns.get_level_values(0)
            
            # Reset index to make Date a column
            df.reset_index(inplace=True)
            
            # Rename columns to lowercase for consistency
            df.columns = [str(col).lower() for col in df.columns]
            
            # Rename 'date' column to 'datetime' for consistency with existing code
            if 'date' in df.columns:
                df.rename(columns={'date': 'datetime'}, inplace=True)
            
            # Keep only necessary columns
            required_cols = ['datetime', 'open', 'high', 'low', 'close', 'volume']
            df = df[[col for col in required_cols if col in df.columns]]
            
            # Save to CSV
            output_path = os.path.join(OUTPUT_DIR, f"{symbol}.csv")
            df.to_csv(output_path, index=False)
            
            print(f"✅ {len(df)} rows saved")
            return True
            
        except Exception as e:
            if attempt < retries - 1:
                print(f"⚠️  Retry {attempt + 1}/{retries}... ", end='', flush=True)
                time.sleep(2)  # Wait before retry
            else:
                print(f"❌ Failed: {str(e)[:50]}")
                return False
    
    return False

# Download all symbols
print(f"\n{'='*80}")
print("Starting downloads...")
print(f"{'='*80}\n")

success_count = 0
fail_count = 0
failed_symbols = []

for i, symbol in enumerate(all_symbols, 1):
    print(f"[{i}/{len(all_symbols)}] ", end='')
    
    if download_symbol(symbol):
        success_count += 1
    else:
        fail_count += 1
        failed_symbols.append(symbol)
    
    # Rate limiting - be nice to yfinance
    if i % 10 == 0:
        time.sleep(1)

# Summary
print(f"\n{'='*80}")
print("DOWNLOAD SUMMARY")
print(f"{'='*80}")
print(f"✅ Successful: {success_count}/{len(all_symbols)}")
print(f"❌ Failed: {fail_count}/{len(all_symbols)}")

if failed_symbols:
    print(f"\n⚠️  Failed symbols ({len(failed_symbols)}):")
    for i, symbol in enumerate(failed_symbols[:20], 1):  # Show first 20
        print(f"   {i}. {symbol}")
    if len(failed_symbols) > 20:
        print(f"   ... and {len(failed_symbols) - 20} more")
    
    # Save failed symbols to a file for retry
    with open('failed_downloads_test.txt', 'w') as f:
        for symbol in failed_symbols:
            f.write(f"{symbol}\n")
    print(f"\n💾 Failed symbols saved to: failed_downloads_test.txt")

print(f"\n✅ Test data saved to: {OUTPUT_DIR}/")
print(f"📅 Date range: {START_DATE} to {END_DATE}")
print(f"\n{'='*80}")
