'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

///////////////////////////////////////
// 248. Our First AJAX Call: XMLHttpRequest
// https://countries-api-836d.onrender.com/countries/

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1_000_000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

/*
// old school way
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('poland');


// ///////////////////////////////////////
// // 250. Welcome to Callback Hell

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// ///////////////////////////////////////
// (new number, previous one - 251) 252. Promises and Fetch API

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

const request = fetch('https://restcountries.com/v3.1/name/portugal');
// returns a promise

///////////////////////////////////////
// 253. Consuming Promises

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

*/

const getJSON = function (url, errorMsg = 'Something went wrong') {
  // .then(
  //   response => response.json(),
  //   err => alert(err)
  // )
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

/*
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`)
    .then(data => {
      renderCountry(data[0]);

      if (!data[0].borders) throw new Error('No neighbour found!');

      const neighbour = data[0].borders[0];
      // const neighbour = 'non-existing code';

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
      renderError(`Something went wrong (${err.message}). Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});
// getCountryData('australia');

///////////////////////////////////////
// 254. Chaining Promises

///////////////////////////////////////
// 255. Handing Rejected Promises

///////////////////////////////////////
// 259. The Event Loop in Practice

console.log('Test start'); // 1

setTimeout(() => console.log('0 sec timer'), 0); // will be put in the callback queue in 0 seconds // 4

Promise.resolve('Resolved promise 1').then(res => console.log(res)); // this promise will be immediately resolved // 3

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1_000_000_000; i++) {}
  console.log(res);
});

console.log('Test end'); // 2

// Порядок вывода:
// Test start
// Test end
// Resolved promise 1
// 0 sec timer


///////////////////////////////////////
// 260. Building a Simple Promise

// function here is an executor function
// this executor function should eventually produce a result value (the future value of the promise)
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening...');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN!');
    } else {
      reject(new Error('You lost your money.'));
    }
  }, 2000);
});

// To set the promise as fulfilled, we use the resolve function. So basically calling
// the resolve function like this, we'll mark this promise as a fulfilled promise.

// By using the timer we did actually encapsulate some asynchronous behavior into this promise.
// That's the whole point of promises in the first place.

// consuming the promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
// We usually only build promises to basically wrap old callback based functions into promises.
// And this is a process that we call promisifying. So basically promisifying means to convert
// callback based asynchronous behavior to promise based.


// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Here is a chain of asynchronous behaviour that happens nicely in a sequence
// and all without the callback hell
// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
    return wait(1);
  });

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// will be resolved immediately
Promise.resolve('any str').then(x => console.log(x));
Promise.reject('any str 2').catch(x => console.error(x));

///////////////////////////////////////
// 261. Promisifying the Geolocation API

// // Callback based API:
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );
// console.log('Getting position');

*/
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

/*

getPosition()
  .then(res => console.log(res))
  .catch(err => console.error(err));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// 263. Consuming Promises with Async/Await

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location');
    const dataGeo = await resGeo.json();

    console.log(dataGeo);

    // Country data
    // await will stop the code execution at this point of the function until the promise is fulfilled
    // (until the data has been fetched in this case)
    // Stopping execution in an async function doesn't block the main thread of code execution
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting location');

    console.log(res);

    // async/await is syntactic sugar over the "then" method in promises
    // the same:
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
    //   console.log(res)
    // );

    const data = await res.json();
    console.log(data);

    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(err.message);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('FIRST');
const city = whereAmI();
console.log(city); // return a promise, not a string ('You are in ...')
// whereAmI()
//   .then(city2 => console.log(`2: ${city2}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));
console.log('SECOND');

// IIF - immediately invoked functions
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  } finally {
    console.log('3: Finished getting location');
  }
})();

*/

///////////////////////////////////////
// 264. Error Handling With try...catch

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.error(err.message);
// }

///////////////////////////////////////
// 265. Returning Values from Async Functions

///////////////////////////////////////
// 266. Running Promises in Parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // The commented code below will send requests one by one which is not good
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);

    // The code below will send requests in parallel which is good in our case
    // If one of the promises rejects, the whole promise.all actually rejects as well
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0]));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

///////////////////////////////////////
// 267. Other Promise Combinatora: race, allSettled and any

// Promise.race
// (like others receives an array of promises and returns a promise)
// This promise returned by Promise.race is settled as soon as one of the input promises is settled.
// (settled means that the value is available,
// it doesn't matter if the promise got rejected or fulfilled)

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

// Promise.race is very useful to prevent against never ending promises
// or also very long running promises.

// If a user has a very bad internet connection, then a fetch reques in your application
// might take way too long to actually be useful. And we can create a special time out promise,
// which automatically rejects after a certain time has passed.

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

// If the timeout happens first, then all of this below will be rejected
Promise.race([getJSON(`https://restcountries.com/v3.1/name/italy`)], timeout(2))
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled (ES2020)
// Will return an array of all settled promises (no difference if these promises are resolved ("fulfilled") or rejected)

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any (ES2021)
// Takes an array of multiple promises and then this one will return the first fulfilled promise
// and it will simply ignore rejected promises. Promise.any is very similar to the Promise.race
// with the only difference that rejected promises are ignored

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
