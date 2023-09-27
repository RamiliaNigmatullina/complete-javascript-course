'use strict';

// let hasDriversLicences = false;
// const passTest = true;

// if (passTest) hasDriverLicences = true;
// if (hasDriversLicences) console.log('I can drive :D');

// // Functions
// function logger() {
//     console.log('My name is Ramilia');
// }

// logger();


// function fruitProcessor(apples, oranges) {
//     console.log(apples, oranges);
//     const juice = `Juice with ${apples} apples and ${oranges} oranges`;
//     return juice;
// }

// fruitProcessor(5, 0);
// console.log(fruitProcessor(5, 0));


// // 34. Function declaration VS expression
// // Function declaration

// const age1 = calcAge1(1991);
// function calcAge1(birthYear) {
//     return 2037 - birthYear;
// }

// const calcAge2 = function (birthYear) {
//     return 2037 - birthYear;
// }
// const age2 = calcAge2(1991);

// console.log(age1, age2);


// // // 35. Arrow functions
// const calcAge3 = birthYear => 2037 - birthYear;
// const age3 = calcAge3(1991);
// console.log(age3);

// const yearsUntilRetirement1 = birthYear => {
//     const age = 2037 - birthYear;
//     const retirement = 65 - age;
//     return retirement;
// }
// console.log(yearsUntilRetirement1(1991));


// const yearsUntilRetirement2 = (birthYear, firstName) => {
//     const age = 2037 - birthYear;
//     const retirement = 65 - age;
//     return `${firstName} retires in ${retirement} years`;
// }
// console.log(yearsUntilRetirement2(1991, 'Jonas'));
// console.log(yearsUntilRetirement2(1980, 'Bob'));


// // 39. Introduction to arrays
// const friends = ['Michael', 'Steven', 'Peter'];
// console.log(friends);

// const years = new Array(1991, 1984, 2008, 2020);
// console.log(friends[0]);
// console.log(friends[2]);

// console.log(friends.length);
// console.log(friends[friends.length - 1]);

// friends[2] = 'Jay';
// console.log(friends);

// friends = ['Bob', 'Alice']

// const firstName = 'Jonas';
// const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
// console.log(jonas);

// const calcAge = birthYear => 2037 - birthYear;
// const years = [1990, 1967, 2002, 2010, 2018];
// const age1 = calcAge(years[0]);
// const age2 = calcAge(years[1]);
// const age3 = calcAge(years[years.length - 1]);
// console.log(age1, age2, age3);

// const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
// console.log(ages);


// // 40. Basic Array Operations (Methods)
// // Add element
// const friends = ['Michael', 'Steven', 'Peter'];
// console.log(friends);

// const newLength = friends.push('Jay'); // Adds an element to the end
// console.log(friends);

// friends.unshift('John'); // Adds an element to the beginning
// console.log(friends);

// // Remove element
// const popped = friends.pop(); // Last elem + returns the deleted elem
// console.log(friends);

// friends.shift(); // First elem + returns the deleted elem
// console.log(friends);

// // Index
// console.log(friends.indexOf('Steven'));
// console.log(friends.indexOf('Bob'));

// // Check if elem exists, returns true or false, uses strct equality (===)
// console.log(friends.includes('Steven'));
// console.log(friends.includes('Bob'));

// friends.push(10);
// console.log(friends.includes('10'));
// console.log(friends.includes(10));


// // 42. Introduction to Objects
// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     age: 2037 - 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven'],
// };

// // 43. Dot vs Brackets Notation
// console.log(jonas.lastName);
// console.log(jonas['lastName']);

// const nameKey = 'Name';
// console.log(jonas['first' + nameKey]);
// console.log(jonas['last' + nameKey]);

// const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job and friends.')

// if (jonas[interestedIn]) {
//     console.log(jonas[interestedIn]);
// } else {
//     console.log('Wrong request!');
// }

// jonas.location = 'Portugal';
// jonas['twitter'] = '@jonasschmedtman';
// console.log(jonas);

// console.log(`${jonas.firstName} has ${jonas.friends.length} friends and his best friend is called ${jonas.friends[0]}`);



// // 44. Object Methods
// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     birthYear: 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven'],
//     hasDriversLicense: true,
//     calcAge: function (birthYear) {
//         return 2037 - birthYear;
//     },
// };

// console.log(jonas.calcAge(1991));
// console.log(jonas['calcAge'](1991));


// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     birthYear: 1991,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven'],
//     hasDriversLicense: true,
//     calcAge: function () {
//         console.log(this);
//         return 2037 - this.birthYear;
//     },
//     getSummary: function () {
//         this.description = `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license`;

//         return this.description;
//     }
// };

// console.log(jonas.calcAge());
// console.log(jonas.getDescription());



// // 46. Iteration: The for loop
// // for loop keeps running while condition is TRUE
// for (let rep = 1; rep <= 10; rep++) {
//     console.log(`Lifting weights repetition ${rep}`);
// }



// // 47. Looping arrays, breaking and continue
const jonas = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael', 'Peter', 'Steven']
];
// const types = [];

// for (let i = 0; i < jonas.length; i++) {
//     console.log(jonas[i], typeof jonas[i]);

//     // types[i] = typeof jonas[i];
//     types.push(typeof jonas[i]);
// }

// console.log(types);

// const years = [1991, 2007, 1969, 2020];
// const ages = [];

// for (let i = 0; i < years.length; i++) {
//     ages.push(2037 - years[i]);
// }

// console.log(ages);

// // continue and break

// console.log('--- ONLY STRINGS ---');

// for (let i = 0; i < jonas.length; i++) {
//     if (typeof jonas[i] !== 'string') continue;

//     console.log(jonas[i], typeof jonas[i]);
// }

// console.log('--- BREAK WITH NUMBERS ---');

// for (let i = 0; i < jonas.length; i++) {
//     if (typeof jonas[i] === 'number') break;

//     console.log(jonas[i], typeof jonas[i]);
// }



// // 48. Looping Backwards and Loops in Loops
// for (let i = jonas.length - 1; i >= 0; i--) {
//     console.log(i, jonas[i]);
// }

// for (let exercise = 1; exercise < 4; exercise++) {
//     console.log((`-------- Starting exercise ${exercise}`));

//     for (let rep = 1; rep < 6; rep++) {
//         console.log((`Exercise ${exercise}: Lifting weight repetition ${rep}`));
//     }
// }


// // 49. The while loop
// let rep = 1;
// while (rep <= 10) {
//     console.log(`WHILE: Lifting weights repetition ${rep}`);

//     rep++;
// }

// let dice = Math.trunc(Math.random() * 6) + 1;

// while (dice !== 6) {
//     console.log(`You rolled a ${dice}`);
//     dice = Math.trunc(Math.random() * 6) + 1;

//     if (dice === 6) console.log(('Loop is about to end...'));
// }