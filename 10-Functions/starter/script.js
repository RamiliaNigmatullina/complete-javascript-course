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
