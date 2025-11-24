const profileURL = "https://vo3g4390.up.railway.app/api";
const token = localStorage.getItem('token');

async function fetchProfile() {
  const res = await fetch(`${profileURL}/api/user/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  document.getElementById('username').textContent = data.username;
  document.getElementById('email').textContent = data.email;
  document.getElementById('balance').textContent = data.balance.toFixed(2);
}
fetchProfile();

