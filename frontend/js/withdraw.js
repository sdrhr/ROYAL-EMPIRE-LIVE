const withdrawURL = "https://royal-empire-12.onrender.com";

document.getElementById('confirmWithdraw').addEventListener('click', async () => {
  const method = document.querySelector('input[name="withdrawMethod"]:checked').value;
  const amount = parseFloat(document.getElementById('withdrawAmount').value);
  const token = localStorage.getItem('token');
  if (!amount) return alert('Enter amount to withdraw');

  const res = await fetch(`${withdrawURL}/api/user/withdraw`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ method, amount })
  });
  const data = await res.json();
  if(data.success) alert('Withdraw request submitted successfully');
  else alert(data.message);
});
