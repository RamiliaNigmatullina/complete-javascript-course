// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const abcdef = 23;
// const calcAge = birthYear => 2037 - birthYear;

// console.log(calcAge(1997));

// FIXME
// TODO

// const calcTempAmplitude = function (temps) {
//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];

//     if (typeof curTemp !== 'number') continue;
//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }

//   return max - min;
// };
// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
// const amplitude = calcTempAmplitude(temperatures);

// console.log(amplitude);

// const calcTempAmplitudeNew = function (t1, t2) {
//   const temps = t1.concat(t2);

//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];

//     if (typeof curTemp !== 'number') continue;
//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }

//   return max - min;
// };

// const amplitude2 = calcTempAmplitudeNew(
//   [3, -2, -6, -1, 'error'],
//   [9, 13, 17, 15, 14, 9, 5]
// );

// console.log(amplitude2);

// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     value: prompt('Degrees celsius:'),
//   };

//   //   console.log(measurement.value);
//   //   console.warn(measurement.value);
//   //   console.error(measurement.value);
//   //   console.log(measurement);
//   //   console.table(measurement);

//   //   debugger;

//   const kelvin = measurement.value + 273;

//   return kelvin;
// };

// console.log(measureKelvin());

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  let forecast = '...';

  for (let i = 0; i < arr.length; i++) {
    forecast += ` ${arr[i]}°C in ${i + 1} days ...`;
  }

  return forecast;
};

console.log(printForecast(data1));
console.log(printForecast(data2));
