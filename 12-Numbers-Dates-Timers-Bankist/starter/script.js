'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2023-11-10T16:33:06.386Z',
    '2023-11-14T14:43:26.374Z',
    '2023-11-15T18:49:59.371Z',
    '2023-11-18T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  // Call the timer every second
  const tick = function () {
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === -0) {
      clearInterval(timer);

      labelWelcome.textContent = 'Login to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 30;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// Create current date and time
// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Experimenting with API
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric', // 2-digit
      // weekday: 'long'
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
/////////////////////////////////////////////////
// 170. Converting and Checking Numbers

console.log(23 === 23.0); // true
console.log(0.1 + 0.2); // 0.30000000000000004

console.log(Number(23)); // (number)
console.log(+'23'); // (number)

// Parsing
console.log(Number.parseInt('30px')); // 30
console.log(Number.parseInt('px30')); // NaN

console.log(Number.parseInt('30px', 10)); // 30, второй аргумент – система счисления
console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseInt('2.5rem')); // 2

console.log(parseFloat('  2.5rem  ')); // 2.5 – не надо использовать этот метод

console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false

// Check if value is number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false

/////////////////////////////////////////////////
// 171. Math and Rounding
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); // 2 -> cubic root

console.log(Math.max(5, 18, '23', 11, 2)); // 23
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN
console.log(Math.min(5, 18, 23, 11, 2)); // 2

console.log(Math.PI);
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;

console.log(randomInt(1, 3));
console.log(randomInt(5, 8));

// Rounding integers
console.log(Math.trunc(23.3)); // 23

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23

console.log((2.7).toFixed(0)); // 3 (string)
console.log((2.7).toFixed(3)); // 2.700 (string)
console.log((2.345).toFixed(2)); // 2.35 (string)
console.log((2.345).toFixed(2)); // 2.35 (string)

/////////////////////////////////////////////////
// 172. The Remainder Operator
console.log(5 % 2); // 1
console.log(5 / 2); // 2.5

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

/////////////////////////////////////////////////
// 173. Numeric Separators

// 287,460,000,000

const diameter = 287460000000;
const diameter2 = 287_460_000_000;

console.log(diameter, diameter2);

const priceCents = 345_99;

console.log(Number('230000')); // 230000
console.log(Number('230_000')); // NaN

/////////////////////////////////////////////////
// 174. Working With BigInt
console.log(2 ** 53 - 1); // 9007199254740991 – the biggest number that JS can safely represent
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

console.log(2 ** 53 + 0); // 9007199254740992
console.log(2 ** 53 + 1); // 9007199254740992 (numbers are the same)

console.log(236846278346278356782456834);
console.log(236846278346278356782456834n); // bigint

console.log(BigInt(1234324)); // 1234324n

// Operations
console.log(10000n + 10000n); // 20000n

const huge = 236846278346278356782456834n;
const num = 23;
// console.log(huge * 23); // script.js:487 Uncaught TypeError:
// // Cannot mix BigInt and other types, use explicit conversions at

console.log(huge * BigInt(num)); // 5447464401964402205996507182n

console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(typeof 20n); // bigint
console.log(20n == 20); // true
console.log(huge + ' is REALLY big!!!'); // 236846278346278356782456834 is REALLY big!!!

// console.log(Math.sqrt(16n)); // script.js:498 Uncaught TypeError: Cannot convert a BigInt value to a number
// // at Math.sqrt (<anonymous>

console.log(11n / 3n); // 3n
console.log(10n / 3n); // 3n
console.log(10 / 3); // 3.3333333333333335

/////////////////////////////////////////////////
// 175. Creating Dates

// Create a date (4 ways)
const now = new Date();
console.log(now); // Sat Nov 18 2023 00:20:39 GMT+0100 (Central European Standard Time)

console.log(new Date('Aug 02 2020 18:05:41')); // this date string is safe to use
console.log(new Date('December 24, 2015')); // custom date strings are not safe to use
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // Nov 19 2037 15:23:05 GMT+0100 (Central European Standard Time)
console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT+0100 (Central European Standard Time)

// UNIX time –> January 1, 1970
console.log(new Date(0)); // Thu Jan 01 1970 01:00:00 GMT+0100 (Central European Standard Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 01:00:00 GMT+0100 (Central European Standard Time)

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // Thu Nov 19 2037 15:23:00 GMT+0100 (Central European Standard Time)

console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0

console.log(future.toISOString()); // 2037-11-19T14:23:00.000Z
console.log(future.getTime(2142253380000)); // (milliseconds)

console.log(new Date(2142253380000)); // Thu Nov 19 2037 15:23:00 GMT+0100 (Central European Standard Time)

console.log(Date.now()); // 1700263272126

console.log(future.setFullYear(2040)); // 2236947780000

/////////////////////////////////////////////////
// 176. Adding Dates to "Bankist" application

/////////////////////////////////////////////////
// 177. Operations With Dates
const future1 = new Date(2037, 10, 19, 15, 23);
console.log(+future1); // 2142253380000

const calcDaysPassed = (date1, date2) => date2 - date1;
console.log(calcDaysPassed(new Date(2037, 3, 24), new Date(2037, 3, 14))); // 864000000

const calcDaysPassed2 = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 68 * 24);
console.log(calcDaysPassed2(new Date(2037, 3, 24), new Date(2037, 3, 14))); // 8.823529411764707

/////////////////////////////////////////////////
// 178. Internatiolizing Dates (Intl)
const now = new Date();
console.log(new Intl.DateTimeFormat('en-US').format(now)); // 11/18/2023

// Google: ISO language code table
// https://www.lingoes.net

const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
console.log(new Intl.DateTimeFormat('en-US', options).format(now)); // Saturday, November 18, 2023 at 12:31 AM

/////////////////////////////////////////////////
// 179. Internatiolizing Numbers (Intl)
const num = 3884764.23;
console.log(`US: ${new Intl.NumberFormat('en-US').format(num)}`); // US: 3,884,764.23
console.log(`Germany: ${new Intl.NumberFormat('de-DE').format(num)}`); // Germany: 3.884.764,23
console.log(
  `${navigator.language}: ${new Intl.NumberFormat(navigator.language).format(
    num
  )}`
); // ru-RU: 3 884 764,23

const options2 = {
  style: 'currency', // 'percent', 'currency'
  // unit: 'mile-per-hour', // 'celsious'
  currency: 'EUR',
  // useGrouping: false,
};
console.log(new Intl.NumberFormat('en-US', options2).format(num)); // €3,884,764.23

/////////////////////////////////////////////////
// 180. Timers: setTimeout and setInterval
setTimeout(() => console.log('Here is your pizza!'), 3000);

// with arguments
setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  'olives',
  'spinach'
);

// clearTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log('Waiting...');
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);

setInterval(() => {
  console.log(
    Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date())
  );
}, 1000);

/////////////////////////////////////////////////
// 181. Implementing a Countdown Timer

// clearInterval(timer_name); // stop a timer
*/
