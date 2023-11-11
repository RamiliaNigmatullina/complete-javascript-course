'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortedMovements.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date"></div>
        <div class="movements__value">${movement}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, deposit) => {
      const int = (deposit * account.interestRate) / 100;

      return int > 1 ? acc + int : acc;
    }, 0);

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = accounts =>
  accounts.forEach(
    account =>
      (account.username = account.owner
        .toLowerCase()
        .split(' ')
        .map(word => word.at(0))
        .join(''))
  );

createUsernames(accounts);

let currentAccount;

const updateUI = function () {
  // Display movements
  displayMovements(currentAccount.movements);

  // Display balance
  calcDisplayBalance(currentAccount);

  // Display summary
  calcDisplaySummary(currentAccount);
};

const displayApp = (isDisplay = true) =>
  (containerApp.style.opacity = isDisplay ? 100 : 0);

const clearInputFields = function (fields) {
  fields.forEach(field => {
    field.value = '';
    field.blur();
  });
};

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value) && currentAccount) {
    // Display UI and movements
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    displayApp();

    clearInputFields([inputLoginUsername, inputLoginPin]);

    updateUI();
  } else {
    labelWelcome.textContent = 'Credentials are incorrect!';

    displayApp(false);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    clearInputFields([inputTransferTo, inputTransferAmount]);
    updateUI();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    updateUI();
    clearInputFields([inputLoanAmount]);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    clearInputFields([inputCloseUsername, inputClosePin]);

    labelWelcome.textContent = 'Your account has been deleted!';

    displayApp(false);
  }
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  sorted = !sorted;

  displayMovements(currentAccount.movements, sorted);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
/////////////////////////////////////////////////
// 143. The new "at" Method

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

// strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));

/////////////////////////////////////////////////
// 144. Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// --- FOREACH ---
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

/////////////////////////////////////////////////
// 145. forEach With Maps and Sets
const currencies = new Map([
  ['USD', 'Unites States dollars'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterlings'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/

/*
/////////////////////////////////////////////////
// 148. Coding challenge #1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
// 4. Run the function for both test data sets
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far 😉 GOOD LUCK 😀

const checkDogs = (dogsJulia, dogsKate) => {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  // OR
  // const dogsJuliaCorrected = dogsJulia.slice();
  // dogsJuliaCorrected.splice(0, 1);
  // dogsJuliaCorrected.splice(-2);

  const dogs = dogsJuliaCorrected.concat(dogsKate);

  dogs.forEach((age, i) => {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/*
/////////////////////////////////////////////////
// 150. The "map" keywoard

const movements = [200, 450, -400, 3000, -130, 70, 1300];
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);

const movementsUSDfor = [];

for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);

const movementsDescriptions = movements.map(
  (movement, i) =>
    `Movement ${i + 1}: You ${
      movement > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(movement)}`
);

console.log(movements);
console.log(movementsUSD);
console.log(movementsUSDfor);
console.log(movementsDescriptions);
*/

/*
/////////////////////////////////////////////////
// 152. The "filter" Method

const movements = [200, 450, -400, 3000, -130, 70, 1300];
const deposits = movements.filter(movement => movement > 0);
const withdrawals = movements.filter(movement => movement < 0);

const depositsFor = [];
for (const movement of movements) if (movement > 0) depositsFor.push(movement);

console.log(movements);
console.log(deposits);
console.log(depositsFor);
console.log(withdrawals);

/////////////////////////////////////////////////
// 153. The "reduce" Method

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;

// Maximum value
const maxMovement = movements.reduce(
  (max, cur) => (cur > max ? cur : max),
  movements[0]
);
console.log(maxMovement);
*/

/*
/////////////////////////////////////////////////
// 154. Coding challenge #2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// Test data:
// § Data1: [5, 2, 4, 1, 15, 8, 3] § Data2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = ages => {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  // const average = adults.reduce((sum, age) => sum + age, 0) / adults.length;
  const average = adults.reduce(
    (acc, age, _, arr) => acc + age / arr.length,
    0
  );

  console.log(humanAges);
  console.log(adults);

  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

/////////////////////////////////////////////////
// 156. Coding Challenge #3

// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!
// Test data:
// § Data1: [5, 2, 4, 1, 15, 8, 3] § Data2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAgeArrow = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);

const avgArrow1 = calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]);
const avgArrow2 = calcAverageHumanAgeArrow([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);
*/

/*
/////////////////////////////////////////////////
// 157. The find Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');

let accountFor;

for (let i = 0; i < accounts.length; i++) {
  if (accounts[i].owner === 'Jessica Davis') {
    accountFor = accounts[i];
    break;
  }
}
console.log(account);
console.log(accountFor);
*/

/*
/////////////////////////////////////////////////
// 162. flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());
console.log(arrDeep.flat(1)); // 1 – default value
console.log(arrDeep.flat(2));

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance, overalBalance2);
*/

/*
/////////////////////////////////////////////////
// 163. Sorting Arrays
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
owners.sort();
console.log(owners);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
movements.sort();
console.log(movements);

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

movements.sort((a, b) => a - b);
console.log(movements);

// Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
console.log(movements);
*/

/*
/////////////////////////////////////////////////
// 164. More ways of Creating and Filling Arrays
[1, 2, 3];

new Array(1, 2, 3);

const x = new Array(7);
console.log(x);

// x.map(() => 5); // [empty × 7] - doesn't work

x.fill(1); // [1, 1, 1, 1, 1, 1, 1]
x.fill(1, 3);
console.log(x); //  [empty × 3, 1, 1, 1, 1]
x.fill(1, 3, 5);
console.log(x); // [empty × 3, 1, 1, empty × 2]

const arr1 = [1, 2, 3, 4, 5, 6, 7];
arr1.fill(23, 4, 6);
console.log(arr1); // [1, 2, 3, 4, 23, 23, 7]

// Array.from
Array.from({ length: 7 }, () => 1); // [1, 1, 1, 1, 1, 1, 1]
Array.from({ length: 7 }, (cur, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7]

const diceRolls = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
console.log(diceRolls);

const movementsUI1 = document.querySelectorAll('.movements__value');
console.log(movementsUI1); // NodeList(2) [div.movements__value, div.movements__value]

const movementsUI2 = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI2); // (2) [div.movements__value, div.movements__value] -- array

const movementsUI3 = Array.from(
  document.querySelectorAll('.movements__value'),
  el => Number(el.textContent.replace('€', ''))
);
console.log(movementsUI3); // (2) [4000, -378] -- converted array

const movementsUI4 = [...document.querySelectorAll('.movements__value')];
console.log(movementsUI4); // (2) [div.movements__value, div.movements__value] -- array
*/

/////////////////////////////////////////////////
// 166. Array Methods Practice

/*
//1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, dep) => sum + dep, 0);
console.log(bankDepositSum);

const bankDepositSumReduce = accounts.reduce(
  (sum, acc) =>
    sum + acc.movements.reduce((sum, mov) => (mov > 0 ? sum + mov : sum)),
  0
);
console.log(bankDepositSumReduce);

// 2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);

// 2.1 With reduce()
const numDeposits1000Reduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((num, mov) => (mov >= 1000 ? ++num : num), 0);
console.log(numDeposits1000Reduce);

// 2.1 With reduce()
const numDeposits1000ReduceOnly = accounts.reduce(
  (num, acc) =>
    num + acc.movements.reduce((num, mov) => (mov >= 1000 ? ++num : num), 0),
  0
);
console.log(numDeposits1000ReduceOnly);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, mov) => {
      // mov > 0 ? (sums.deposits += mov) : (sums.withdrawals += Math.abs(mov));
      sums[mov > 0 ? 'deposits' : 'withdrawals'] += mov;

      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

const { deposits2, withdrawals2 } = accounts.reduce(
  (sums, acc) => {
    const { deposits, withdrawals } = acc.movements.reduce(
      (sums, mov) => {
        sums[mov > 0 ? 'deposits' : 'withdrawals'] += mov;

        return sums;
      },
      { deposits: 0, withdrawals: 0 }
    );

    sums.deposits2 += deposits;
    sums.withdrawals2 += withdrawals;

    return sums;
  },
  { deposits2: 0, withdrawals2: 0 }
);
console.log(deposits2, withdrawals2);

// 4.
// this is a nice title -> This Is a Nice Title
// google 'title case' for more details
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  return capitalize(
    title
      .toLowerCase()
      .split(' ')
      .map(word => (exceptions.includes(word) ? word : capitalize(word)))
      .join(' ')
  );
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE`'));
*/

/////////////////////////////////////////////////
// 167. Challenge #4

// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)
//     The Complete JavaScript Course 25
// Hints:
// § Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// § Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
// Test data:

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const isLessThanMinFood = dog => dog.curFood < dog.recommendedFood * 0.9;
const isMoreThanMaxFood = dog => dog.curFood > dog.recommendedFood * 1.1;

// // 1.
dogs.forEach(dog => (dog.recommendedFood = dog.weight ** 0.75 * 28));
// console.log(dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
const result = function (dog) {
  if (isLessThanMinFood(dog)) {
    return 'too little';
  } else if (isMoreThanMaxFood(dog)) {
    return 'too much';
  } else {
    return 'enough';
  }
};
console.log(result(dogSarah));

// 3.
const { ownersEatTooMuch, ownersEatTooLittle } = dogs.reduce(
  (summary, dog) => {
    if (isLessThanMinFood(dog)) {
      summary.ownersEatTooLittle.push(dog);
    } else if (isMoreThanMaxFood(dog)) {
      summary.ownersEatTooMuch.push(dog);
    }
    return summary;
  },
  { ownersEatTooMuch: [], ownersEatTooLittle: [] }
);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4.
const ownersStr = dogs => dogs.flatMap(dog => dog.owners).join(' and ');

console.log(`${ownersStr(ownersEatTooMuch)}'s dogs eat too much!`);
console.log(`${ownersStr(ownersEatTooLittle)}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.
console.log(
  dogs.some(dog => !isLessThanMinFood(dog) && !isMoreThanMaxFood(dog))
);

// 7.
const { ownersEatTooMuch2, ownersEatTooLittle2, ownersOkay } = dogs.reduce(
  (summary, dog) => {
    if (isLessThanMinFood(dog)) {
      summary.ownersEatTooLittle2.push(dog);
    } else if (isMoreThanMaxFood(dog)) {
      summary.ownersEatTooMuch2.push(dog);
    } else {
      summary.ownersOkay.push(dog);
    }
    return summary;
  },
  { ownersEatTooMuch2: [], ownersEatTooLittle2: [], ownersOkay: [] }
);

console.log(ownersEatTooMuch2);
console.log(ownersEatTooLittle2);
console.log(ownersOkay);

// 8.
const sortedDogs = dogs
  .slice()
  .sort((dog1, dog2) => dog1.recommendedFood - dog2.recommendedFood);
console.log(sortedDogs);
