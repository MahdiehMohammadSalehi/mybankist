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
////////////////////////////////////////////////////// Functions /////////////////////////////////////////////////////////

// display movements//
const displayMovments = (movements) => {
  containerMovements.innerHTML = ``;
  movements.forEach(function (mov, i) {
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
const displayBalance = function (movements) {
  balanceAmount.textContent =
    movements.reduce((acc, cur) => acc + cur, 0) + ` €`;
};

//Display Summary//
const displaySummary = function (movements) {
  summaryin.textContent =
    movements.filter((mov) => mov > 0).reduce((acc, cur) => acc + cur, 0) +
    ` €`;
  summaryout.textContent =
    Math.abs(
      movements.filter((mov) => mov < 0).reduce((acc, cur) => acc + cur, 0)
    ) + ` €`;
  summaryinterest.textContent = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * 1.2) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, cur) => acc + cur, 0);
};

// create usernames//
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

//Check user and pin
const checkUserPIN = function () {
  const curUser = accounts.find(
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
    displayMovments(curUser.movements);
    //display balance
    displayBalance(curUser.movements);
    //display summary
    displaySummary(curUser.movements);
  }
};

/////////////////////////////////////////////////// Calling Functions //////////////////////////////////////////////////

createUsernames(accounts);

loginBtn.addEventListener("click", checkUserPIN);
loginPIN.addEventListener("keydown", function (e) {
  e.key === "Enter" && checkUserPIN();
});
