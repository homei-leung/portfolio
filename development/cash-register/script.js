let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

//Access cash, purchase-btn, change-due, change-drawer, total
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const changeDrawer = document.getElementById("change-drawer");
const total = document.getElementById("total");

//Check the register for below conditions.
const checkRegister = () =>{
    
    //If cash received is less than the price, alert user customer does not have enough money.
    if (Number(cash.value) < price) {
        alert("Customer does not have enough money to purchase the item");
        cash.value = "";
        return;
    }
    //If cash received is equal tot he price, no change is due.
    if (Number(cash.value) === price) {
        changeDue.innerHTML =
            `<p>No change due - customer paid with exact cash</p>`;
        cash.value = "";
        return;
    }
    //Calculate the change due, split into the corresponding denominations.
    let returnChange = Number(cash.value) - price;
    let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    let returnResult = {
        status: "OPEN",
        change: []
    }
    let highToLowCid = [...cid].reverse();
    //Calculate the totalCid
    let totalCid = parseFloat(cid.map(total => total[1]).reduce((previous, current) => previous + current).toFixed(2));
    //If change due is greater than the cid, there are insufficient funds.
    if (totalCid < returnChange) {
        return (changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`);
    }
    //If change due equals the cid, update the status to "closed"
    if (totalCid === returnChange) {
        returnResult.status = "CLOSED";
    }

    for (let i=0; i <= highToLowCid.length; i++) {
        if (returnChange > denominations[i] && returnChange > 0) {
            let count =0;
            let availDenom = highToLowCid[i][1];
            while (availDenom > 0 && returnChange >= denominations[i]) {
                availDenom -= denominations[i];
                returnChange = parseFloat((returnChange -= denominations[i]).toFixed(2));
                count++;
            }
            if (count > 0) {
                returnResult.change.push([highToLowCid[i][0], count * denominations[i]]);
            }
        }
    }

    if (returnChange > 0) {
        return (changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`);
    }

    resultsDisplay(returnResult.status, returnResult.change);
    updateRegister(returnResult.change);
}

//Update the display of the change due.
const resultsDisplay = (status, change) => {
    changeDue.innerHTML = `<p> Status: ${status}</p>`;
    change.map(
        money => (changeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
    );
    return;
}

//Only run the cash register if there is a value ented in cash received.
const checkInput = () => {
    if (!cash.value) {
        return;
    }
    checkRegister();
}

//Update the cid based on the change in values.
const updateRegister = (change) => {
    const currencyNames = {
        PENNY: "Pennies",
        NICKEL: "Nickels",
        DIME: "Dimes",
        QUARTER: "Quarters",
        ONE: "Ones",
        FIVE: "Fives",
        TEN: "Tens",
        TWENTY: "Twenties",
        'ONE HUNDRED': "Hundreds"
    };

    if (change) {
        change.forEach(changeArr => {
            const arr = cid.find((cidArr) => cidArr[0] === changeArr[0]);
            arr[1] = parseFloat((arr[1] - changeArr[1]).toFixed(2));
        });
    }

    cash.value = "";
    total.textContent = `Total: $${price}`;
    changeDrawer.innerHTML = `<p>Change in drawer:</p>
        ${cid
            .map(money => `<p>${currencyNames[money[0]]}: $${money[1]}</p>`)
            .join("")
        }`;
}

//check results when user clicks purchase button or presses enter key
purchaseBtn.addEventListener("click", checkInput);

cash.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkInput();
    }
});

updateRegister();