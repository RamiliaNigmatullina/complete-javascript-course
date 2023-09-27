/* Write your code below. Good luck! 🙂 */

// const scoreDolphins = (97 + 112 + 101) / 3;
// const scoreKoalas = (109 + 95 + 123) / 3;

// if (scoreDolphins >= 100 || scoreKoalas >= 100) {
//     if (scoreDolphins > scoreKoalas) {
//         console.log("Dolphins win the trophy");
//     } else if (scoreKoalas > scoreDolphins) {
//         console.log("Koalas win the trophy");
//     } else if (scoreDolphins === scoreKoalas) {
//         console.log("Both win the trophy");
//     }
// }

// day = 'monday';

// switch (day) {
//     case 'monday':
//         console.log('Plan course structure');
//         console.log('Go to coding meetup');
//         break;
//     case 'tuesday':
//         console.log('Prepare theory videos');
//         break;
//     case 'wednesday':
//     case 'thursday':
//         console.log('Write code examples');
//         break;
//     case 'friday':
//         console.log('Record videos');
//         break;
//     case 'saturday':
//     case 'sunday':
//         console.log('Enjoy the weekend :D');
//         break;
//     default:
//         console.log('Not a valid day!');
// }

// if (day === 'monday') {
//     console.log('Plan course structure');
//     console.log('Go to coding meetup');
// } else if (day === 'tuesday') {
//     console.log('Prepare theory videos');
// } else if (day === 'wednesday' || day === 'thursday') {
//     console.log('Write code examples');
// } else if (day === 'friday') {
//     console.log('Record videos');
// } else if (day === 'saturday' || day === 'sunday') {
//     console.log('Enjoy the weekend :D');
// } else {
//     console.log('Not a valid day!');
// }


// Challenge #4

const bill = 275;

/* Write your code below. Good luck! 🙂 */

const tip = bill >= 50 && bill <= 300 ? bill * .15 : bill * .2;

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);