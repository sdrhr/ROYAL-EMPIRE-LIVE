const transactionurl = "https://vo3g4390.up.railway.app/";

async function loadBalance() {
    try {
        const res = await fetch(`${transactionurl}/user/dashboard`);
        const data = await res.json();
        document.getElementById("balance").innerText = data.balance + " PKR";
    } catch (e) {
        document.getElementById("balance").innerText = "Error loading balance";
    }
}

async function loadHistory() {
    try {
        const res = await fetch(`${transactionurl}/transaction/history`);
        const data = await res.json();

        let html = "";

        data.forEach(item => {
            const date = new Date(item.createdAt);

            html += `
                <div class="history-item">
                    <p><strong>Type:</strong> ${item.type}</p>
                    <p><strong>Amount:</strong> ${item.amount} PKR</p>
                    <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${date.toLocaleTimeString()}</p>
                </div>
            `;
        });

        document.getElementById("history").innerHTML = html;

    } catch (e) {
        document.getElementById("history").innerHTML = "Error loading history";
    }
}

async function makeTransaction() {
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    try {
        const res = await fetch(`${transactionurl}/transaction/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, amount })
        });

        const data = await res.json();

        alert(data.message);

        loadBalance();
        loadHistory();

    } catch (e) {
        alert("Transaction failed");
    }
}

loadBalance();
loadHistory();
