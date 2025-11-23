// Dashboard JS place

const backendURL = "https://royal-empire-12.onrender.com";
const token = localStorage.getItem('token'); // JWT after login
const socket = io(backendURL);

// Dashboard elements
const totalBalanceEl = document.getElementById('totalBalance');
const totalInvestmentEl = document.getElementById('totalInvestment');
const totalEarningsEl = document.getElementById('totalEarnings');
const todayEarningsEl = document.getElementById('todayEarnings');
const packagesContainer = document.getElementById('packages');

// Example 10 packages
const packageList = [
  { name: "Royal 1", amount: 50 },
  { name: "Royal 2", amount: 100 },
  { name: "Royal 3", amount: 150 },
  { name: "Royal 4", amount: 200 },
  { name: "Royal 5", amount: 300 },
  { name: "Royal 6", amount: 400 },
  { name: "Royal 7", amount: 500 },
  { name: "Royal 8", amount: 600 },
  { name: "Royal 9", amount: 750 },
  { name: "Royal 10", amount: 1000 }
];

// Render packages
function renderPackages() {
  packagesContainer.innerHTML = '';
  packageList.forEach(pkg => {
    const div = document.createElement('div');
    div.className = 'package';
    div.innerHTML = `
      <p>${pkg.name} - $${pkg.amount}</p>
      <button onclick="buyPackage(${pkg.amount})">Buy</button>
    `;
    packagesContainer.appendChild(div);
  });
}

// Buy package
async function buyPackage(amount) {
  if(!confirm(`Are you sure to buy $${amount} package?`)) return;
  try {
    const res = await fetch(`${backendURL}/api/user/buy-package`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ amount })
    });
    const data = await res.json();
    if(data.success) alert(`Package purchased! You will earn 2x profit over 45 days.`);
    else alert(data.message);
    fetchDashboard();
  } catch(err) {
    console.error(err);
    alert('Error purchasing package');
  }
}

// Fetch dashboard data
async function fetchDashboard() {
  try {
    const res = await fetch(`${backendURL}/api/user/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    totalBalanceEl.textContent = data.totalBalance.toFixed(2);
    totalInvestmentEl.textContent = data.totalInvestment.toFixed(2);
    totalEarningsEl.textContent = data.totalEarnings.toFixed(2);
    todayEarningsEl.textContent = data.todayEarnings.toFixed(2);
  } catch(err) { console.error(err); }
}

// Real-time updates via Socket.io
socket.emit('subscribeBalance', localStorage.getItem('userId'));
socket.on('balanceUpdate', data => {
  totalBalanceEl.textContent = data.totalBalance.toFixed(2);
  totalEarningsEl.textContent = data.totalEarnings.toFixed(2);
  todayEarningsEl.textContent = data.todayEarnings.toFixed(2);
});

// Initialize
renderPackages();
fetchDashboard();
