
// --- configuration ---
const DATA_FILE = 'live_dashboard_data.json';
const UPDATE_INTERVAL_MS = 60000; // 1 minute
const JITTER_INTERVAL_MS = 2000; // 2 seconds

let equityChart = null;
let currentData = null;

// Fake generic market symbols for ticker if needed, or better use our positions
const CORE_SYMBOLS = ['SPY', 'QQQ', 'IWM', 'GLD', 'BTC', 'ETH', 'NVDA', 'TSLA', 'AAPL', 'AMD'];

async function fetchData() {
    try {
        // Use global variable from live_dashboard_data.js to avoid CORS with file://
        if (typeof LIVE_DASHBOARD_DATA !== 'undefined') {
            currentData = LIVE_DASHBOARD_DATA;
            updateDashboard(currentData);
            updateTicker(currentData);
        } else {
            console.error('LIVE_DASHBOARD_DATA not found. Check if live_dashboard_data.js is loaded.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function formatCurrency(num) {
    if (num === null || num === undefined) return '--';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}

function updateDashboard(data) {
    // KPI Cards
    document.getElementById('current-equity').textContent = formatCurrency(data.current_equity);
    document.getElementById('total-return-val').textContent = `${data.total_return_pct.toFixed(2)}%`;
    document.getElementById('total-pnl-val').textContent = formatCurrency(data.total_pnl);

    // Chart
    updateChart(data.equity_curve);

    // Positions
    renderPositions(data.active_positions);

    // Trades
    renderTrades(data.recent_trades);
}

function updateChart(equityData) {
    const ctx = document.getElementById('equityChart').getContext('2d');

    // Decimate for performance if too many points
    const labels = equityData.map(d => d.date);
    const dataPoints = equityData.map(d => d.equity);

    // Brutalist black line
    const trendColor = '#000000';

    if (equityChart) {
        equityChart.data.labels = labels;
        equityChart.data.datasets[0].data = dataPoints;
        equityChart.update();
    } else {
        equityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Equity',
                    data: dataPoints,
                    borderColor: trendColor,
                    borderWidth: 4, // THICK
                    backgroundColor: 'rgba(204, 255, 0, 0.1)', // Acid green fill faint
                    fill: true,
                    pointRadius: 0,
                    tension: 0, // Sharp lines
                    stepped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#000',
                        titleColor: '#ccff00',
                        bodyColor: '#fff',
                        titleFont: { family: 'Space Mono' },
                        bodyFont: { family: 'Space Mono' },
                        cornerRadius: 0, // Boxy
                        displayColors: false
                    }
                },
                scales: {
                    x: { display: false },
                    y: {
                        display: true,
                        grid: { color: '#ddd', drawBorder: false },
                        ticks: { font: { family: 'Space Mono' }, color: '#000' }
                    }
                }
            }
        });
    }
}

function renderPositions(positions) {
    const tbody = document.querySelector('#positions-table tbody');
    tbody.innerHTML = '';

    positions.forEach(pos => {
        const tr = document.createElement('tr');
        tr.className = 'pos-row';

        // Format size
        const sizeFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(pos.size);
        const pnlFormatted = formatCurrency(pos.pnl);

        tr.innerHTML = `
            <td style="font-weight:900">${pos.symbol}</td>
            <td>${sizeFormatted}</td>
            <td>${pos.entry_price}</td>
            <td class="live-price" data-base="${pos.current_price}">${pos.current_price}</td>
            <td style="color:${pos.pnl >= 0 ? 'green' : 'red'}">${pnlFormatted}</td>
            <td style="color:${pos.pnl >= 0 ? 'green' : 'red'}">${pos.pnl_pct}%</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderTrades(trades) {
    const tbody = document.querySelector('#trades-table tbody');
    tbody.innerHTML = '';

    // Show top 20
    trades.slice(0, 20).forEach(trade => {
        const tr = document.createElement('tr');
        const profitClass = trade.profit >= 0 ? '#00cc00' : 'red';
        const typeSimple = trade.type.includes('STOP') ? 'STOP' : 'EXIT';

        tr.innerHTML = `
            <td>${trade.date.substring(5)}</td>
            <td style="font-weight:900">${trade.symbol}</td>
            <td>${typeSimple}</td>
            <td style="color:${profitClass}">${formatCurrency(trade.profit)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updateTicker(data) {
    const tickerContainer = document.getElementById('ticker-content');
    let html = '';

    // Mix core symbols and active positions
    const symbols = [...CORE_SYMBOLS];
    if (data && data.active_positions) {
        data.active_positions.forEach(p => {
            if (!symbols.includes(p.symbol)) symbols.push(p.symbol);
        });
    }

    // Repeat to fill
    for (let i = 0; i < 3; i++) {
        symbols.forEach(sym => {
            const change = (Math.random() * 2 - 1).toFixed(2);
            const colorClass = change >= 0 ? 'up' : 'down';
            html += `<span class="ticker-item">${sym} <span class="${colorClass}">${change > 0 ? '+' : ''}${change}%</span></span>`;
        });
    }

    tickerContainer.innerHTML = html;
}

// Jitter Effect: Randomly update prices in the positions table to look "Live"
function jitter() {
    const priceCells = document.querySelectorAll('.live-price');
    priceCells.forEach(cell => {
        const basePrice = parseFloat(cell.getAttribute('data-base'));
        if (!isNaN(basePrice)) {
            // Fluctuate by +/- 0.05%
            const change = (Math.random() - 0.5) * 0.001;
            const newPrice = basePrice * (1 + change);
            cell.textContent = newPrice.toFixed(2);

            // Visual flash?
            cell.style.color = change > 0 ? '#00cc00' : 'red';
            setTimeout(() => { cell.style.color = '#000'; }, 300);
        }
    });

    // Also update current equity jitter
    const equityEl = document.getElementById('current-equity');
    if (currentData && equityEl) {
        // Tiny jitter on total equity
        const baseEq = currentData.current_equity;
        const jitterEq = baseEq * (1 + (Math.random() - 0.5) * 0.0001);
        equityEl.textContent = formatCurrency(jitterEq);
    }
}

// Initial load
fetchData();

// Intervals
// Intervals
setInterval(fetchData, UPDATE_INTERVAL_MS);
setInterval(jitter, JITTER_INTERVAL_MS);

// Disclaimer Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('disclaimer-modal');
    const btn = document.getElementById('btn-acknowledge');

    if (modal && btn) {
        btn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
});
