const referralURL = "https://vo3g4390.up.railway.app/api";
const token = localStorage.getItem('token');
document.getElementById('refLink').value = `${referralURL}/register?ref=${localStorage.getItem('userId')}`;

async function fetchReferral() {
  const res = await fetch(`${referralURL}/api/user/referrals`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  document.getElementById('level1').textContent = data.level1 || 0;
  document.getElementById('level2').textContent = data.level2 || 0;
  document.getElementById('level3').textContent = data.level3 || 0;
}
fetchReferral();

