const clientProfitUpdateInterval = 60 * 1000;

setInterval(updateClientProfit, clientProfitUpdateInterval);

function updateClientProfit() {
    const clientProfitRequest = new XMLHttpRequest();

    clientProfitRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const profitReturn = document.getElementById("profit-return");
            profitReturn.innerHTML = this.responseText;
        }
    };

    let clientID = document.getElementById("client-id").innerHTML;

    clientProfitRequest.open("POST", "client-profit-updater.php", true);
    clientProfitRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    clientProfitRequest.send("client-id=" + clientID);
}