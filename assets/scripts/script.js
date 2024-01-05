'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};
const containerMovements = document.querySelector(".movements");

const displayMovments = movements => {

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
}
displayMovments(account1.movements);