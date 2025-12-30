
// --- configuration ---
const DATA_FILE = 'live_dashboard_data.json';
const UPDATE_INTERVAL_MS = 60000; // 1 minute
const JITTER_INTERVAL_MS = 2000; // 2 seconds

let equityChart = null;
let monthlyChart = null;
let exitTypeChart = null;
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

    // Quick Stats
    document.getElementById('strategy-version').textContent = data.strategy_version || 'V3';
    document.getElementById('active-count').textContent = data.active_positions.length;
    document.getElementById('today-pnl').textContent = formatCurrency(data.today_pnl || 0);
    document.getElementById('live-since').textContent = data.live_start_date || '--';

    // Chart
    updateChart(data.equity_curve);

    // Positions - Full table
    renderPositionsFull(data.active_positions);

    // Trades - Full table
    renderTradesFull(data.recent_trades);

    // Performance metrics
    updatePerformanceMetrics(data.recent_trades);
}

function updateChart(equityData) {
    const ctx = document.getElementById('equityChart').getContext('2d');

    const labels = equityData.map(d => d.date);
    const dataPoints = equityData.map(d => d.equity);

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
                    borderWidth: 4,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    pointRadius: 0,
                    tension: 0,
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
                        titleColor: '#3B82F6',
                        bodyColor: '#fff',
                        titleFont: { family: 'Space Mono' },
                        bodyFont: { family: 'Space Mono' },
                        cornerRadius: 0,
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

function renderPositionsFull(positions) {
    const tbody = document.querySelector('#positions-table-full tbody');
    tbody.innerHTML = '';

    positions.forEach(pos => {
        const tr = document.createElement('tr');
        tr.className = 'pos-row';

        // Calculate days held
        const entryDate = new Date(pos.entry_date);
        const today = new Date();
        const daysHeld = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));

        const sizeFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(pos.size);
        const pnlFormatted = formatCurrency(pos.pnl);

        tr.innerHTML = `
            <td style="font-weight:900">${pos.symbol}</td>
            <td>${pos.entry_date}</td>
            <td>${sizeFormatted}</td>
            <td>$${pos.entry_price}</td>
            <td class="live-price" data-base="${pos.current_price}">$${pos.current_price}</td>
            <td style="color:${pos.pnl >= 0 ? 'green' : 'red'}">${pnlFormatted}</td>
            <td style="color:${pos.pnl >= 0 ? 'green' : 'red'}">${pos.pnl_pct.toFixed(2)}%</td>
            <td>${daysHeld}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderTradesFull(trades) {
    const tbody = document.querySelector('#trades-table-full tbody');
    tbody.innerHTML = '';

    trades.forEach(trade => {
        const tr = document.createElement('tr');
        const profitClass = trade.profit >= 0 ? '#00cc00' : 'red';

        tr.innerHTML = `
            <td>${trade.date}</td>
            <td style="font-weight:900">${trade.symbol}</td>
            <td>${trade.type}</td>
            <td style="color:${profitClass}">${formatCurrency(trade.profit)}</td>
            <td style="color:${profitClass}">${trade.return_pct}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updatePerformanceMetrics(trades) {
    // Calculate metrics
    const wins = trades.filter(t => t.profit > 0);
    const losses = trades.filter(t => t.profit < 0);

    const winRate = trades.length > 0 ? ((wins.length / trades.length) * 100).toFixed(1) : 0;
    const avgWin = wins.length > 0 ? wins.reduce((sum, t) => sum + t.profit, 0) / wins.length : 0;
    const avgLoss = losses.length > 0 ? losses.reduce((sum, t) => sum + t.profit, 0) / losses.length : 0;

    const totalWins = wins.reduce((sum, t) => sum + t.profit, 0);
    const totalLosses = Math.abs(losses.reduce((sum, t) => sum + t.profit, 0));
    const profitFactor = totalLosses > 0 ? (totalWins / totalLosses).toFixed(2) : '--';

    const bestTrade = trades.length > 0 ? Math.max(...trades.map(t => t.profit)) : 0;

    // Update DOM
    document.getElementById('win-rate').textContent = `${winRate}%`;
    document.getElementById('avg-win').textContent = formatCurrency(avgWin);
    document.getElementById('avg-loss').textContent = formatCurrency(avgLoss);
    document.getElementById('total-trades').textContent = trades.length;
    document.getElementById('profit-factor').textContent = profitFactor;
    document.getElementById('best-trade').textContent = formatCurrency(bestTrade);

    // Update charts
    updateMonthlyChart(trades);
    updateExitTypeChart(trades);
}

function updateMonthlyChart(trades) {
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;

    // Group by month
    const monthlyData = {};
    trades.forEach(trade => {
        const month = trade.date.substring(0, 7); // YYYY-MM
        if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }
        monthlyData[month] += trade.profit;
    });

    const labels = Object.keys(monthlyData).sort();
    const data = labels.map(l => monthlyData[l]);

    if (monthlyChart) {
        monthlyChart.destroy();
    }

    monthlyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly P&L',
                data: data,
                backgroundColor: data.map(v => v >= 0 ? '#3B82F6' : '#ff3366'),
                borderColor: '#000',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#000',
                    titleColor: '#3B82F6',
                    bodyColor: '#fff',
                    titleFont: { family: 'Space Mono' },
                    bodyFont: { family: 'Space Mono' },
                    cornerRadius: 0
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Space Mono' }, color: '#000' }
                },
                y: {
                    grid: { color: '#ddd' },
                    ticks: { font: { family: 'Space Mono' }, color: '#000' }
                }
            }
        }
    });
}

function updateExitTypeChart(trades) {
    const ctx = document.getElementById('exitTypeChart');
    if (!ctx) return;

    // Group by exit type
    const exitTypes = {};
    trades.forEach(trade => {
        const type = trade.type;
        if (!exitTypes[type]) {
            exitTypes[type] = 0;
        }
        exitTypes[type]++;
    });

    const labels = Object.keys(exitTypes);
    const data = Object.values(exitTypes);

    const colors = ['#3B82F6', '#00ccff', '#ccff00', '#ff3366', '#9333ea', '#f59e0b'];

    if (exitTypeChart) {
        exitTypeChart.destroy();
    }

    exitTypeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderColor: '#000',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: 'Space Mono', size: 10 },
                        color: '#000',
                        padding: 10
                    }
                },
                tooltip: {
                    backgroundColor: '#000',
                    titleColor: '#3B82F6',
                    bodyColor: '#fff',
                    titleFont: { family: 'Space Mono' },
                    bodyFont: { family: 'Space Mono' },
                    cornerRadius: 0
                }
            }
        }
    });
}

function updateTicker(data) {
    const tickerContainer = document.getElementById('ticker-content');
    let html = '';

    const symbols = [...CORE_SYMBOLS];
    if (data && data.active_positions) {
        data.active_positions.forEach(p => {
            if (!symbols.includes(p.symbol)) symbols.push(p.symbol);
        });
    }

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
            const change = (Math.random() - 0.5) * 0.001;
            const newPrice = basePrice * (1 + change);
            cell.textContent = '$' + newPrice.toFixed(2);

            cell.style.color = change > 0 ? '#00cc00' : 'red';
            setTimeout(() => { cell.style.color = '#000'; }, 300);
        }
    });

    const equityEl = document.getElementById('current-equity');
    if (currentData && equityEl) {
        const baseEq = currentData.current_equity;
        const jitterEq = baseEq * (1 + (Math.random() - 0.5) * 0.0001);
        equityEl.textContent = formatCurrency(jitterEq);
    }
}

// Tab Navigation
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
}

// Initial load
fetchData();
setupTabs();

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
