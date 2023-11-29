const autoTradeInterval = 60 * 1000;

setInterval(autoTrade, autoTradeInterval);

function autoTrade() {
    const autoTraderDetailsRequest = new XMLHttpRequest();

    autoTraderDetailsRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const autoTraderDetails = JSON.parse(this.responseText);

            for (const currentAutoTraderDetail of autoTraderDetails) {
                const autoTradingRequest = new XMLHttpRequest();

                autoTradingRequest.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                    }
                };

                autoTradingRequest.open("POST", "auto-trading.php", true);
                autoTradingRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                autoTradingRequest.send("client-id=" + currentAutoTraderDetail.userID + "&amount-per-minute=" + currentAutoTraderDetail.amountPerMinute);
            }
        }
    };

    autoTraderDetailsRequest.open("POST", "auto-trader-details.php", true);
    autoTraderDetailsRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    autoTraderDetailsRequest.send();
}