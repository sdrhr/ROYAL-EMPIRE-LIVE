const supportURL = "https://royal-empire-12.onrender.com";
const chatWindow = document.getElementById('chatWindow');
const token = localStorage.getItem('token');

document.getElementById('sendMessage').addEventListener('click', async () => {
  const msgInput = document.getElementById('userMessage');
  const msg = msgInput.value.trim();
  if(!msg) return;
  appendMessage('You', msg);
  msgInput.value = '';

  // Call AI backend
  const res = await fetch(`${supportURL}/api/support/chat`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ message: msg })
  });
  const data = await res.json();
  appendMessage('AI', data.reply);
});

function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.className = 'chat-message';
  div.innerHTML = `<b>${sender}:</b> ${message}`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
