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

if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products have been deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false
