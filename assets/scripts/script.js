"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////////// Define Dom ///////////////////////////////////////////////////////

const containerMovements = document.querySelector(".movements");
const balanceAmount = document.querySelector(".balance__amount");
const summaryin = document.querySelector(".summary__value--in");
const summaryout = document.querySelector(".summary__value--out");
const summaryinterest = document.querySelector(".summary__value--interest");
const loginUser = document.querySelector(".nav__login--user");
const loginPIN = document.querySelector(".nav__login--pin");
const loginBtn = document.querySelector(".nav__login--btn");
const statusInfo = document.querySelector(".nav__status--info");
const app = document.querySelector(".app");
const transferBtn = document.querySelector(".transfer__btn");
const transferTo = document.querySelector(".transfer__to");
const transferAmount = document.querySelector(".transfer__amount");
const loanAmount = document.querySelector(".loan__amount");
const loanBtn = document.querySelector(".loan__btn");
const closeUser = document.querySelector(".close__user");
const closePIN = document.querySelector(".close__PIN");
const closeBtn = document.querySelector(".close__btn");

////////////////////////////////////////////////////// Functions /////////////////////////////////////////////////////////

// display movements//
const displayMovments = (acc) => {
    containerMovements.innerHTML = ``;
    acc.movements.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const html = `
        <div class="movements__row">
           <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__amount">${mov}€</div>
        </div>
        `;
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

//Display Balance//
const displayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
    balanceAmount.textContent = acc.balance + ` €`;
};

//Display Summary//
const displaySummary = function (acc) {
    summaryin.textContent =
        acc.movements.filter((mov) => mov > 0).reduce((acc, cur) => acc + cur, 0) +
        ` €`;
    summaryout.textContent =
        Math.abs(
            acc.movements.filter((mov) => mov < 0).reduce((acc, cur) => acc + cur, 0)
        ) + ` €`;
    summaryinterest.textContent = acc.movements
        .filter((mov) => mov > 0)
        .map((mov) => (mov * 1.2) / 100)
        .filter((int) => int >= 1)
        .reduce((acc, cur) => acc + cur, 0);
};

// create usernames
const createUsernames = function (users) {
    users.forEach(
        (user) =>
        (user.username = user.owner
            .toLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join(""))
    );
};

//updateUI
const updateUI = function (acc) {
    //display movments
    displayMovments(acc);
    //display balance
    displayBalance(acc);
    //display summary
    displaySummary(acc);
};

//global current user variable
let curUser;

//Check username and pin
const checkUserPIN = function () {
    curUser = accounts.find(
        (acc) =>
            acc.username === loginUser.value && acc.pin === Number(loginPIN.value)
    );
    if (curUser) {
        //display UI and statusInfo
        statusInfo.textContent = `Welcome back, ${curUser.owner.split(" ")[0]}`;
        app.style.opacity = 100;
        //clear input fields
        loginUser.value = loginPIN.value = "";
        loginPIN.blur();
        //display movments
        updateUI(curUser);
    }
};

/////////////////////////////////////////////////// Calling Functions //////////////////////////////////////////////////

createUsernames(accounts);

//login
loginBtn.addEventListener("click", checkUserPIN);
loginPIN.addEventListener("keydown", (e) => {
    e.key === "Enter" && checkUserPIN();
});

//transfer
transferBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(transferAmount.value);
    const reciverAcc = accounts.find((acc) => acc.username === transferTo.value);
    if (
        amount > 0 &&
        amount <= curUser.balance &&
        reciverAcc?.username != curUser.username &&
        reciverAcc
    ) {
        curUser.movements.push(-amount);
        reciverAcc.movements.push(transferAmount.value);
        updateUI(curUser);
    }
    transferAmount.value = transferTo.value = "";
});

//loan
loanBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(loanAmount.value);

    if (amount > 0 && amount <= curUser.balance && accounts.movements.some(mov => mov >= 0.1 * amount)) {
        curUser.movements.push(amount);
        updateUI(curUser);
    }
    loanAmount.value = '';
});

//close
closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (curUser.username === closeUser.value && curUser.pin == Number(closePIN.value)) {
        const idx = accounts.findIndex(acc => acc.username === user.username);
        accounts.splice(idx, 1);
        app.style.opacity = 0;
    }
    closeUser.value = closePIN.value = '';
})