const depositURL = "https://vo3g4390.up.railway.app/api";
const rateUSDToPKR = 280;

document.getElementById('depositAmount').addEventListener('input', e => {
  const val = parseFloat(e.target.value) || 0;
  document.getElementById('convertedPKR').innerText = (val * rateUSDToPKR).toFixed(2);
});

document.getElementById('confirmDeposit').addEventListener('click', async () => {
  const method = document.querySelector('input[name="method"]:checked').value;
  const amount = parseFloat(document.getElementById('depositAmount').value);
  const proof = document.getElementById('paymentProof').files[0];
  const token = localStorage.getItem('token');
  if (!amount || !proof) return alert('Enter amount and upload proof');

  const formData = new FormData();
  formData.append('method', method);
  formData.append('amount', amount);
  formData.append('proof', proof);

  const res = await fetch(`${depositURL}/api/user/deposit`, {
    method:'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  const data = await res.json();
  if(data.success) alert('Deposit request submitted successfully');
  else alert(data.message);
});

