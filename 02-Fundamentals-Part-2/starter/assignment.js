'use strict';

// // Functions

// function describeCountry(country, population, capitalCity) {
//     console.log(`${country} has ${population} million people and its capital city is ${capitalCity}`);
// }

// const russiaDescription = describeCountry('Russia', 143, 'Moscow');
// const finlandDescription = describeCountry('Finland', 6, 'Helsinki');
// const polandDescription = describeCountry('Poland', 38, 'Warsaw');


// // Function Declarations vs. Expressions
// const percentage1 = percentageOfWorld1(1441);
// const percentage2 = percentageOfWorld1(2882);
// const percentage3 = percentageOfWorld1(4323);

function percentageOfWorld1(population) {
    return population / 7900 * 100;
}

// console.log(percentage1, percentage2, percentage3);

// const percentageOfWorld2 = function (population) {
//     return population / 7900 * 100;
// }

// const percentage4 = percentageOfWorld1(1441);
// const percentage5 = percentageOfWorld1(2882);
// const percentage6 = percentageOfWorld1(4323);

// console.log(percentage4, percentage5, percentage6);


// // Arrow Functions
// const percentageOfWorld3 = population => population / 7900 * 100;

// const percentage7 = percentageOfWorld3(1441);
// const percentage8 = percentageOfWorld3(2882);
// const percentage9 = percentageOfWorld3(4323);

// console.log(percentage7, percentage8, percentage9);


// // Functions Calling Other Functions
// const describePopulation = function (country, population) {
//     const percentage = percentageOfWorld3(population);
//     const description = `China has ${population} million people, which is about ${percentage}% of the world.`

//     console.log(description);
// }

// describePopulation('China', 1441);
// describePopulation('Russia', 143);
// describePopulation('Finland', 5.6);


// // Introduction to Arrays
// const populations = [1441, 143, 38, 5.6];
// console.log(populations.length === 4);

// const percentages = [
//     percentageOfWorld1(populations[0]),
//     percentageOfWorld1(populations[1]),
//     percentageOfWorld1(populations[2]),
//     percentageOfWorld1(populations[3])
// ];
// console.log(percentages);

// // Introduction to Objects
// const myCountry = {
//     country: 'Russia',
//     capital: 'Moscow',
//     language: 'russian',
//     population: 143,
//     neighbours: ['North Korea', 'China', 'Mongolia', 'Kazakhstan', 'Azerbaijan', 'Georgia', 'Ukraine', 'Belarus', 'Latvia', 'Estonia', 'Finland', 'Norway'],
// };

// // Dot vs. Bracket Notation

// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);

// myCountry.population = myCountry.population + 2;
// myCountry['population'] = myCountry['population'] - 2;

// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);


// // Object Methods
// const myCountry = {
//     country: 'Russia',
//     capital: 'Moscow',
//     language: 'russian',
//     population: 143,
//     neighbours: ['North Korea', 'China', 'Mongolia', 'Kazakhstan', 'Azerbaijan', 'Georgia', 'Ukraine', 'Belarus', 'Latvia', 'Estonia', 'Finland', 'Norway'],
//     describe: function () {
//         const description = `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`;

//         console.log(description);

//         return description;
//     },
//     checkIsland: function () {
//         this.isIsland = !Boolean(this.neighbours.length);

//         return this.isIsland;
//     }
// };

// myCountry.describe();
// myCountry.checkIsland();
// console.log(myCountry);


// // Iteration: The for Loop
// for (let voter = 1; voter <= 50; voter++) {
//     console.log(`Voter number ${voter} is currently voting`);
// }


// // Looping Arrays, Breaking and Continuing
// const percentages2 = [];

// for (let i = 0; i < populations.length; i++) {
//     percentages2.push(percentageOfWorld1(populations[i]));
// }

// console.log(percentages2);


// // Looping Backwards and Loops in Loops
// const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

// for (let i = 0; i < listOfNeighbours.length; i++) {
//     for (let j = 0; j < listOfNeighbours[i].length; j++) {
//         console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
//     }
// }


// // The while Loop
// let i = 0;

// while (i < listOfNeighbours.length) {
//     let j = 0;

//     while (j < listOfNeighbours[i].length) {
//         console.log(`Neighbour: ${listOfNeighbours[i][j]}`);

//         j++;
//     }

//     i++;
// }

// const percentages3 = [];
// let i = 0;

// while (i < populations.length) {
//     const perc = percentageOfWorld1(populations[i]);
//     percentages3.push(perc);

//     i++;
// }

// console.log(percentages3);
