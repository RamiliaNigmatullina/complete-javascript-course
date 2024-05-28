///////////////////////////////////////
// 271. An Overview of Modern JavaScript Development

// npm - both repository (where code is stored) and software (on our computers to install and manage these packages)

// bundling is super important for two big reasons:
// 1. Older browsers don't support modules at all. So code that's in a module could not be executed at all.
// 2. It's also better for peroformance to send less files to the browser and it's also beneficial that the bundling step compresses our code.

// Webpack or parcel are called JS bundlers because they take our raw code and transform it into a JS bundle.
// Webpack is the more popular one, but it can be really hard and confusing to set it up.
// That's because there's a lot of stuff that we need to configure manually in order to make it work properly.
// Parcel is a zero configuration bundler, which simply works out of the box. So we don't have to write any set up code.

///////////////////////////////////////
// 272. An Overview of Modules in JavaScript

///////////////////////////////////////
// 273. Exporting and importing in ES6 Modules
// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(price, tq);


console.log('Importing module');

// // import everything:
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// it works but it's better not to use mixed exports
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);
/*
///////////////////////////////////////
// 274. Top-Level await (ES2022)
// works in modules only:
// <script type="module" defer src="script.js"></script>
// google: json placeholder
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
// await keyword here works outside of an async function, before we did it:
// async function x() {}
// But this behaviour actually blocks the execution of the entire module now.
// As we learnt in the previous section, this is sometimes not exactly what we want:
console.log(data);
console.log('Something');
// change the interneet speed to slow 3G, and you'll see that we have to wait for the fetch above before

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  // es2022 - .at
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);

// It's very important to remember that using top-level await (await outside of any async function)
// will block the entire module in a way that we really couldn't block code execution before.
// And so this is not only a really helpful tool, but also one that we need to use with great care.

///////////////////////////////////////
// 275. The Module Pattern

// Just like in regular modules that we just learned about, the main goal of the module pattern
// is to encapsulate functionality to have private data, and to expose a public API.
// And the best way of achieving all that is using a function. Because functions give us private
// data by default and allow us to return values.

// How module pattern is implemented:
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

// we can access the variables and methods from ShoppingCart2 because of "closures" - access to variables in "birthplace"
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 4);

console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); // undefined

*/
// This is how the module pattern works and it works very well and it has been working for a long
// time for developers, so long before ES6 modules even existed in JS. Now, the problem is that if
// we wanted one module per file, like we have with ES6 modules, then we would have to create
// different scripts and link all of them in the HTML file. And that then creates a couple of
// problems, like we have to be careful with the order in which we declare them in HTML, and we
// would have all of the variables living in the global scope, and finally, we also couldn't bundle
// them together using a module bundler (that is very important). So the module pattern that we just
// learned about, works pretty good, but it has some limitations. That's exactly the reason why
// native modules were added to the language in ES6.

///////////////////////////////////////
// 276. CommonJS Modules
// Besides native ES modules and Module Pattern, there are also other module systems that have been
// used by JS in the past. But they were not native JS. So they relied on some external
// implementations. 2 examples: AMD Modules and CommonJS Modules.
// CommonJS modules are important for us, because they have been used in Node.js for almost all of
// its existence. So only very recently, ES Modules have actually been implemented in Node.js.
// Node.js is a way of running JS in a server outside of a browser.
// All the modules in the NPM repository still use the CommonJS module system. And the reason for
// that is that NPM was originally only intended for Node (which uses CommonJS).

// Export
// // 1 file - 1 module
// // the code below will wotk in a node
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//   );
// };

// // Import
// const { addToCart } = require('./shoppingCart.js');

import cloneDeep from './../node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);
