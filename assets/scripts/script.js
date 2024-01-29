"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

//const accounts = [account1, account2, account3, account4];
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2024-01-22T23:36:17.929Z",
    "2024-01-25T01:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

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
const sortbtn = document.querySelector(".summary__sortbtn");
const currentDate = document.querySelector(".balance__date");
const timerLabel = document.querySelector(".timer__span");

////////////////////////////////////////////////////// Functions /////////////////////////////////////////////////////////

const calcDate = (accDate, locale) => {
  const date = new Date() - accDate;
  const days = Math.round(date / (1000 * 3600 * 24));

  if (days === 0) return "Today";
  else if (days === 1) return "Yesterday";
  else if (days <= 7) return `${days} days ago`;
  // else {
  //     const day = `${accDate.getDate()}`.padStart(2, 0);
  //     const month = `${accDate.getMonth() + 1}`.padStart(2, 0);
  //     const year = accDate.getFullYear();
  //     displayDate = `${day}/${month}/${year}`;
  // }
  return new Intl.DateTimeFormat(locale).format(accDate);
};

//format Currency
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// display movements//
const displayMovments = (acc, sort = false) => {
  const mov =
    sort === true ? acc.movements.sort((a, b) => a - b) : acc.movements;
  containerMovements.innerHTML = ``;
  mov.forEach(function (mov, i) {
    //calculate date
    const accDate = new Date(acc.movementsDates[i]);
    const displayDate = calcDate(accDate, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
           <div class="movements__type movements__type--${type}">${i} ${type}</div>
           <div class="movements__date">${displayDate}</div>
           <div class="movements__amount">${formattedMov}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
    if (i % 2 == 0)
      document.querySelector(".movements__row").style.backgroundColor =
        "#cfc7c7";
  });
};

//Display Balance//
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  balanceAmount.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

//Display Summary//
const displaySummary = function (acc) {
  summaryin.textContent = formatCur(
    acc.movements
      .filter((mov) => mov > 0)
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2),
    acc.locale,
    acc.currency
  );
  summaryout.textContent = formatCur(
    Math.abs(
      acc.movements.filter((mov) => mov < 0).reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2),
    acc.locale,
    acc.currency
  );
  summaryinterest.textContent = formatCur(
    acc.movements
      .filter((mov) => mov > 0)
      .map((mov) => (mov * 1.2) / 100)
      .filter((int) => int >= 1)
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2),
    acc.locale,
    acc.currency
  );
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
let curUser, timer;

//fake user
// curUser = account1;
// updateUI(curUser);
// app.style.opacity = 100;

//create timer for log out the user
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    timerLabel.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      app.style.opacity = 0;
      statusInfo.textContent = "login to get started";
    }
    time--;
  };
  //set time
  let time = 3;

  //call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

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

    //display date
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minute = `${now.getMinutes()}`.padStart(2, 0);
    // currentDate.textContent = `${day}/${month}/${year} ,   ${hour}:${minute}`;
    const now = new Date();
    const browserLocale = navigator.language;
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    currentDate.textContent = new Intl.DateTimeFormat(
      browserLocale,
      options
    ).format(now);

    //clear input fields
    loginUser.value = loginPIN.value = "";
    loginPIN.blur();
    //timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
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
    //add transfer date
    curUser.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());
    updateUI(curUser);
  }
  transferAmount.value = transferTo.value = "";
  clearInterval(timer);
  timer = startLogOutTimer();
});

//loan
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.trunc(Number(loanAmount.value));
  if (amount > 0 && amount <= curUser.balance) {
    //set 2.5s to show the loan
    setTimeout(function () {
      curUser.movements.push(amount);
      curUser.movementsDates.push(new Date().toISOString());
      updateUI(curUser);
    }, 2500);
  }
  loanAmount.value = "";
  clearInterval(timer);
  timer = startLogOutTimer();
});

//sort
sortbtn.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovments(curUser, true);
});

////////////////////////
