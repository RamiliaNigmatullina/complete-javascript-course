'use strict';

/*
/////////////////////////////////////////////////
// 128. Default Parameters

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  bookings.push(booking);
  console.log(booking);
};

console.log(createBooking('LH123'));
console.log(createBooking('LH123', 2, 800));
console.log(createBooking('LH123', 2));
console.log(createBooking('LH123', undefined, 1000));

/////////////////////////////////////////////////
// 129. How Passing Arguments Works: Value vs. Reference

const flight = 'LH123';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 2478391002,
};

const checkIn = function (flightNum, passenger) {
  (flightNum = 'LH999'), (passenger.name = 'Mr. ' + passenger.name);

  if (passenger.passport === 2478391002) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight); // LH123 - not changed
console.log(jonas); // {name: 'Mr. Jonas Schmedtmann', passport: 2478391002} - changed

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
};
newPassport(jonas);
checkIn(flight, jonas); // => Wrong passport! alert
*/

/*
/////////////////////////////////////////////////
// 130. First-Class and Higher-Order Functions

// First-class functions
const add = (a, b) => a + b;

const counter = {
  value: 23,
  inc: function () {
    this.value++;
  },
};

const greet = () => console.log('Hey Jonas');

// btnClose.addEventListener('click', greet);

// counter.inc.bind(someOtherObject)

// Higher-order functions

// function that receives another function
// const greet = () => console.log('Hey Jonas');
// btnClose.addEventListener('click', greet);

// function that returns new function
function count() {
  let counter = 0;
  return function () {
    counter++;
  };
}
*/

/*
/////////////////////////////////////////////////
// 131. Functions Accepting Callback Functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('Hi');
};
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);
*/

/*
/////////////////////////////////////////////////
// 132. Functions Returning Functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');
greet('Hello')('Jonas');

const greet2 = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey2 = greet('Hey');
greeterHey2('Jonas');
greeterHey2('Steven');
greet2('Hello')('Jonas');
*/

/*
/////////////////////////////////////////////////
// 133. The call and apply Methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() { ... }
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );

    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

console.log(lufthansa);

const book = lufthansa.book;

// book(23, 'Sarah Williams'); // Uncaught TypeError: Cannot read properties of undefined (reading 'airline')

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

// Apply methods
const flightInfo = [583, 'George Cooper'];
book.apply(eurowings, flightInfo);
book.call(eurowings, ...flightInfo);

console.log(eurowings);

/////////////////////////////////////////////////
// 134. The bind Method

const bookEW = book.bind(eurowings);
bookEW(23, 'Stewen Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// Challenge: rewrite the function above without bind – function returns a function

const addTaxRate = rate => value => value + value * rate;
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100);
*/

/////////////////////////////////////////////////
// 136. Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// OR
(() => console.log('This will never run again'))();

// console.log(isPrivate); // Uncaught ReferenceError: isPrivate is not defined

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate); // Uncaught ReferenceError: isPrivate is not defined
console.log(notPrivate); // 46

/////////////////////////////////////////////////
// 137. Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;

    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker); // ƒ anonymous()
// ...
// [[Scopes]]: Scopes[3]
// 0: Closure (secureBooking) {passengerCount: 3}
// 1: Script {runOnce: ƒ, secureBooking: ƒ, booker: ƒ}
// 2: Global {window: Window, self: Window, document: document, name: '', location: Location, …}

/////////////////////////////////////////////////
// 138. More Closure Examples

// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
f(); // 46

const h = function () {
  const b = 777;

  f = function () {
    console.log(b * 2);
  };
};
g();
f(); // 46

// Re-assigning f function
h();
f(); // 1554

console.dir(f); // ƒ f()
// [[Scopes]]: Scopes[3]
//   0: Closure (h) {b: 777}
//   1: Script {runOnce: ƒ, secureBooking: ƒ, booker: ƒ, f: ƒ, g: ƒ, …}
//   2: Global {window: Window, self: Window, document: document, name: '', location: Location, …}

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // This variable declaired in the global scope doesn't matter because the closure is above the global scope
boardPassengers(180, 3);
