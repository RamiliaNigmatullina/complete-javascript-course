'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicios pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredients, ...otherIngredients) {
    console.log(mainIngredients);
    console.log(otherIngredients);
  },
};

// //
// // 103. Destructuring arrays

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // Switching variables
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// // Receive 2 return values from a function;
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Nested destructurnig
// const nested = [2, 4, [5, 6]];
// const [a, , [b]] = nested;
// console.log(a, b);

// // Default values
// const [p, q, r = 10] = [8, 9]; // p = 8, 1 = 9, r = 10

/*
//
// 103. Destructuring objects

// Destructuring
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Destructuring and giving new names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

// Destructuring object passed as an argument to a function
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({ address: 'Via del Sole, 21' });
*/

/*
/////////////////////////////////////////////////
// 105. The Spread Operator (...)

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];

// Iterables: arrays, string, mapd, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 's'];
console.log(letters);
console.log(...str);

const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
console.log(ingredients);

restaurant.orderPasta(...ingredients);
*/

/*
/////////////////////////////////////////////////
// 106. Rest

// SPREAD, because on RIGHT side of =
const arr = [1, 2, [3, 4]];

// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, rizotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, rizotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// 2) Functions
const add = function (...numbers) {
  console.log(numbers);

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];

  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
*/

/*
/////////////////////////////////////////////////
// 108. The Nullish Coalescing Operator (??)
const numGuests = 0;
const guests = numGuests || 10; // => 10
const guestsCorrect = numGuests ?? 10; // => 0

console.log(guests, numGuests);
*/

/*
/////////////////////////////////////////////////
// 109. Logical Assignment Operator

const rest1 = {
  name: 'Carpi',
  numGuests: 20,
};

rest1.numGuests ||= 10;
rest1.numGuests ??= 10;
rest1.name &&= '<ANONYMOUS>';
*/

/*
/////////////////////////////////////////////////
// 109. Logical Assignment Operator
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const item of menu.entries()) {
  console.log(item);
  console.log(`${item[0] + 1}: ${item[1]}`);
}

console.log([...menu.entries()]);

// Using de-structuring
for (const [i, element] of menu.entries()) {
  console.log(`${i + 1}: ${element}`);
}
*/

/*
/////////////////////////////////////////////////
// 112. Enhanced Object Literals

// 1
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
};
const restaurant2 = {
  name: 'Classico Italiano',
  openingHours,
};
console.log(restaurant2);

// 2
const restaurant3 = {
  order(starterIndex, mainIndex) {
    console.log(starterIndex, mainIndex);
    return;
  },
};
restaurant3.order(1, 2);

// 3
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours2 = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [`day-${2 + 4}`]: {
    open: 0,
    close: 24,
  },
};

console.log(openingHours2);
*/

/*
/////////////////////////////////////////////////
// 113. Optional Chaining (?.)
console.log(restaurant?.openingHours?.mon?.open); // => undefined

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open;
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1)) ?? 'Method does not exist';

// Arrays
const users = [{ name: 'Jonas', email: 'some@email.com' }];
console.log(users[0]?.name ?? 'User array empty');
*/

// /////////////////////////////////////////////////
// // 114. Looping Objects: Object Keys, Values and Entries

// // Property NAMES
// const properties = Object.keys(restaurant.openingHours);
// console.log(properties); // => (3) ['thu', 'fri', 'sat']

// let openStr = `We are open on ${properties.length} days: `;

// for (const day of properties) {
//   openStr += `${day}, `;
// }
// console.log(openStr); // => We are open on 3 days: thu, fri, sat,

// // Property VALUES
// const values = Object.values(restaurant.openingHours);
// console.log(values); // =>
// /*
// [
//     {
//         "open": 12,
//         "close": 22
//     },
//     {
//         "open": 11,
//         "close": 23
//     },
//     {
//         "open": 0,
//         "close": 24
//     }
// ]
// */

// // Entire object
// const entries = Object.entries(restaurant.openingHours);
// console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }
// /*
// On thu we open at 12 and close at 22
// On fri we open at 11 and close at 23
// On sat we open at 0 and close at 24
// */

/*
/////////////////////////////////////////////////
// 116. Sets
const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  ' Rizotto',
  'Pasta',
  'Pizza',
]);
console.log(orderSet);

console.log(new Set('Jonas'));

console.log(new Set('Jonas'));
console.log(new Set(''));

console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));
console.log(orderSet.add('Garlic Bread'));
console.log(orderSet.delete('Rizotto'));
console.log(orderSet.clear());

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(new Set('jonasschmedtmann')); // => 11
*/

/*
/////////////////////////////////////////////////
// 117. Maps: Fundamentals
const rest = new Map();
rest.set('name', 'Classica Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lispon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest.get('name'));
console.log(rest.get(true));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
console.log(rest.size);
console.log(rest.delete(2));
console.log(rest.size);
console.log(rest.clear());
console.log(rest.size);

rest.set([1, 2], 'Test');
console.log(rest.get([1, 2])); // these [1, 2] objects are different

rest.set(document.querySelector('h1'), 'Heading');
console.log(rest.get(document.querySelector('h1')));
*/

/*
/////////////////////////////////////////////////
// 118. Maps: Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);
console.log(question);

console.log(Object.entries(restaurant.openingHours)); // returns an array of arrays
const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(hoursMap);

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer'));
// console.log(question.get(answer === question.get('correct')));

// Convert map to array
console.log([...question]);
console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
*/

/*
/////////////////////////////////////////////////
// 121. Working With Strings - Part 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]); // A
console.log('B737'[0]); // B

console.log(airline.length); // 16
console.log(airline.indexOf('r')); // 6
console.log(airline.lastIndexOf('r')); // 10
console.log(airline.indexOf('Portugal')); // 8
console.log(airline.indexOf('portugal')); // -1

console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4, 7)); // Air (the 4th symbol is included, the 7th is NOT)

console.log(airline.slice(0, airline.indexOf(' '))); // AIR
console.log(airline.lastIndexOf(' ') + 1); // Portugal

console.log(airline.slice(-2)); // al

const checkMiddleSeat = function (seat) {
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('Middle :(');
  else console.log('You got lucky!');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas')); // returns an array

console.log(typeof new String('jonas')); // object
console.log(typeof new String('jonas').slice(1)); // string
*/

/*
/////////////////////////////////////////////////
// 122. Working With Strings - Part 2
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase()); // tap air portugal
console.log(airline.toUpperCase()); // TAP AIR PORTUGAL

// Fix capitalization in name
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '    Hello@Jonas.Io \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); // g - global

// Booleans
const plane = 'A320neo';
console.log(plane.includes('A320')); // true
console.log(plane.includes('Boeing')); // false
console.log(plane.startsWith('Air'));
console.log(plane.endsWith('neo'));

// Practice exercide
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome abroad!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket knife');
checkBaggage('Socks and camera');
checkBaggage('Got so,e snacks amd a gun for prtection');
*/

/*
/////////////////////////////////////////////////
// 122. Working With Strings - Part 2

// Split and join
console.log('a+very+nice+string'.split('+')); // (4) ["a", "very", "nice", "string"]
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
console.log(['Mr.', firstName, lastName.toUpperCase()].join(' '));

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }

  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+')); // ++++++Go to gate 23!
console.log(message.padStart(17, '+').padEnd(23, '+')); // +++Go to gate 23!++++++

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(64637836)); // ****7836
console.log(maskCreditCard(3378463864647384)); // ************7384
console.log(maskCreditCard('334859493847755774747')); // *****************4747

// Repeat
const message2 = 'Bad weather... All Departues Delayed...';
message2.repeat(5);

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};
planesInLine(3);
planesInLine(5);
*/

///////////////////////////////////////
// 125. String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const formattedType = str =>
  (str.includes('Delayed') ? '🔴 ' : '') + str.replaceAll('_', ' ').trim();

const formattedAirport = str => str.replace(/[^a-zA-Z]+/g, '').toUpperCase();

const formattedTime = str => `(${str.replace(':', 'h')})`;

const formattedFlights = [];
let maxLength = 0;

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');

  let formattedFlight =
    formattedType(type) +
    ' from ' +
    formattedAirport(from) +
    ' to ' +
    formattedAirport(to) +
    ' ' +
    formattedTime(time);

  const length = formattedFlight.length;
  if (length > maxLength) maxLength = length;

  formattedFlights.push(formattedFlight);
}

for (const flight of formattedFlights)
  console.log(flight.padStart(maxLength, ' '));
