'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

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
