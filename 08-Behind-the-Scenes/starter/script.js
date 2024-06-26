'use strict';

// // 93. Scoping in Practice

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     const output = `${firstName}, you are ${age}, born in ${birthYear}`;

//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       const firstName = 'Steven'; // Такое возможно, потому что мы объявляем переменную с таким именем в другом скоупе
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }

//       // Reassigning outer scope's variable
//       // const output = 'NEW OUTPUT!';

//       const output = 'NEW OUTPUT!';
//     }
//     // {
//     //   const str = `Oh, and you're a millenial, ${firstName}`;
//     //   console.log(str);
//     // }

//     // console.log(str); // ReferenceError
//     console.log(millenial);
//     console.log(output);

//     // console.log(add(2, 3)); // ReferenceError: add is not defined
//     // !!! If we comment out the first line - 'use strict'; -, the code above will work, it'll log '5' to the console !!!
//   }

//   printAge();

//   console.log(firstName);

//   return age;
// }

// const firstName = 'Jonas';
// calcAge(1991);
// // console.log(age); // ReferenceError

//
//
//
// // 95. Hosting and TDZ in Practice
// console.log(me);
// console.log(job); // Uncaught ReferenceError: Cannot access 'job' before initialization
// console.log(year); // Uncaught ReferenceError: Cannot access 'year' before initialization

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

//
//
// // Functions

// console.log(addDecl(1, 2));
// console.log(addExpr(2, 3)); // Uncaught ReferenceError: Cannot access 'addExpr' before initialization
// console.log(addArrow(3, 4)); // Uncaught ReferenceError: Cannot access 'addArrow' before initialization
// console.log(addExpr2(2, 3)); // Uncaught TypeError: addExpr2 is not a function
// console.log(addArrow2(3, 4)); // Uncaught TypeError: addArrow2 is not a function

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// const addArrow = (a, b) => a + b;

// var addExpr2 = function (a, b) {
//   return a + b;
// };

// var addArrow2 = (a, b) => a + b;

// WHY USING VAR IS SO DANGEROUS (EXAMPLE)

// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products have been deleted!');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x); // true
// console.log(y === window.y); // false
// console.log(z === window.z); // false

//
//
//
// // 97. The this keyword in Practice

// // 1
// console.log(this);

// // 2
// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAge(1991);

// // 3
// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAgeArrow(1991);

// // 4
// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };

// jonas.calcAge();

// // 5
// const matilda = {
//   year: 2017,
// };
// matilda.calcAge = jonas.calcAge;

// console.log(matilda);

// matilda.calcAge();

// // 6
// const f = jonas.calcAge; // copying
// f(); // Uncaught TypeError: Cannot read property 'year' of undefined

//
//
//
// 98. Regular Functions VS Arrow Functions

// // 1
// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
//   greet: () => console.log(`Hey ${this.firstName}`),
// };

// jonas.greet(); // => Hey undefined

// // 2
// var firstName = 'Matilda';

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
//   greetFunc: function () {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };

// jonas.greet(); // => Hey Matilda
// jonas.greetFunc(); // => Hey Jonas

// // 3 Pre ES6 solution using self
// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);

//     const self = this; // self ot that –> pre ES6 solution
//     const isMillenial = function () {
//       console.log(self);
//       console.log(self.year >= 1981 && self.year <= 1996);
//     };
//     isMillenial();
//   },
// };

// jonas.calcAge();

// // 4 Modern ES6 solution using arrow function
// const jonas2 = {
//   year: 1991,
//   calcAge: function () {
//     console.log(2037 - this.year);

//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial();
//   },
// };

// jonas2.calcAge();

//
//
//
// 100. Primitives vs. objects in practice

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log(jessica.lastName, marriedJessica.lastName);
// marriedJessica = {} // Uncaught TypeError: Assignment to constant variable

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2); // shallow copy
jessicaCopy.lastName = 'Davis';

jessicaCopy.push('Mary');
jessicaCopy.push('John');

console.log('Before marriage', jessica2);
console.log('After marriage', jessicaCopy);
