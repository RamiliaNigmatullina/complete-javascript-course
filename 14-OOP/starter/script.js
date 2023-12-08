'use strict';

/*
//////////////////////////////////////////////
// 208. Constructor Functions and the new Operator
// constructor functions
const Person = function (firstName, birthYear) {
  // console.log(this); // Person {}

  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this: it can create a lot of copies of the same functions (1 instance = +1 copy)
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
// console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991}

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

// console.log(matilda, jack);
// Person {firstName: 'Matilda', birthYear: 2017} Person {firstName: 'Jack', birthYear: 1975}

// console.log(jonas instanceof Person);

//////////////////////////////////////////////
// 209. Prototypes
// console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// jonas.calcAge(); // Any object always has access to the methods and properties from its prototype
// matilda.calcAge(); // The prototype of Jonas and Matilda is Person.prototype

// Confirmation:
// console.log(jonas.__proto__); // Prototype of Jonas - created in step 3
// -> This is how JS knows internally that the Jonas object is connected to Person.prototype

// Prototype of the Jonas object is essentially the prototype property of the conctructor function
// console.log(jonas.__proto__ === Person.prototype); // true
// console.log(Person.prototype.isPrototypeOf(jonas)); // true
// console.log(Person.prototype.isPrototypeOf(Person)); // false
// .prototypeOfLinkedObjects -> IN our MIND we can change the .prototype method to this one. This is a more honest name (but it doesn't exist, of course).

Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species); // Homo Sapiens Homo Sapiens
// But '.species' is not their direct properties
// console.log(jonas.hasOwnProperty('firstName')); // true
// console.log(jonas.hasOwnProperty('species')); // false

//////////////////////////////////////////////
// 210. Prototypal Inheritance and The Prototype Chain

//////////////////////////////////////////////
// 211. Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__);
// {species: 'Homo Sapiens', calcAge: ƒ, constructor: ƒ}
// calcAge: ƒ ()
// species: "Homo Sapiens"
// constructor: ƒ (firstName, birthYear)
// [[Prototype]]: Object

// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
// constructor: ƒ Object()
// hasOwnProperty: ƒ hasOwnProperty()
// isPrototypeOf: ƒ isPrototypeOf()
// propertyIsEnumerable: ƒ propertyIsEnumerable()
// toLocaleString: ƒ toLocaleString()
// toString: ƒ toString()
// valueOf: ƒ valueOf()
// __defineGetter__: ƒ __defineGetter__()
// __defineSetter__: ƒ __defineSetter__()
// __lookupGetter__: ƒ __lookupGetter__()
// __lookupSetter__: ƒ __lookupSetter__()
// __proto__: (...)
// get __proto__: ƒ __proto__()
// set __proto__: ƒ __proto__()

console.log(jonas.__proto__.__proto__.__proto__); // null – Object.prototype is top of the chain

console.log(Person.prototype.constructor);
// ƒ (firstName, birthYear) {
// // console.log(this); // Person {}

// // Instance properties
// this.firstName = firstName;
// this.birthYear = birthYear;

// // Never do this: it can create a lot of copies …

console.dir(Person.prototype.constructor); // ƒ Person(firstName, birthYear)
// Every function is also an object

console.log(Person.prototype.constructor.prototype);
// {species: 'Homo Sapiens', calcAge: ƒ, constructor: ƒ}
// calcAge: ƒ ()
// species: "Homo Sapiens"
// constructor: ƒ (firstName, birthYear)
// [[Prototype]]: Object

const arr = [3, 6, 6, 4, 5, 6, 9, 9, 3]; // new Array === []
console.log(arr.__proto__);
// [constructor: ƒ, at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, …]
// at: ƒ at()
// concat: ƒ concat()
// constructor: ƒ Array()
// copyWithin: ƒ copyWithin()
// entries: ƒ entries()
// every: ƒ every()
// fill: ƒ fill()
// filter: ƒ filter()
// find: ƒ find()
// findIndex: ƒ findIndex()
// findLast: ƒ findLast()
// findLastIndex: ƒ findLastIndex()
// flat: ƒ flat()
// flatMap: ƒ flatMap()
// forEach: ƒ forEach()
// includes: ƒ includes()
// indexOf: ƒ indexOf()
// join: ƒ join()
// keys: ƒ keys()
// lastIndexOf: ƒ lastIndexOf()
// length: 0
// map: ƒ map()
// pop: ƒ pop()
// push: ƒ push()
// reduce: ƒ reduce()
// reduceRight: ƒ reduceRight()
// reverse: ƒ reverse()
// shift: ƒ shift()
// slice: ƒ slice()
// some: ƒ some()
// sort: ƒ sort()
// splice: ƒ splice()
// toLocaleString: ƒ toLocaleString()
// toReversed: ƒ toReversed()
// toSorted: ƒ toSorted()
// toSpliced: ƒ toSpliced()
// toString: ƒ toString()
// unshift: ƒ unshift()
// values: ƒ values()
// with: ƒ with()
// Symbol(Symbol.iterator): ƒ values()
// Symbol(Symbol.unscopables): {at: true, copyWithin: true, entries: true, fill: true, find: true, …}
// [[Prototype]]: Object

console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__); // === Object.prototype

// BUT extending the prototype of a built-in object is generally NOT a good idea
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1); // check all ptototypes

console.dir(x => x + 1); // function prototype
*/

//////////////////////////////////////////////
// 212. Coding Challenge #1

/*
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them

Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
  return this;
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
  return this;
};

/*
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();

// mercedes.brake();
// mercedes.brake();
// mercedes.brake();

bmw.accelerate().accelerate().brake();

//////////////////////////////////////////////
// 213. ES6 Classes

// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
  // method:
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey, ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted (we cannot use them before they are declaired, even they are class declarations; function declarations are hoisted)
// 2. Class are first-class citizes (like functions; it means we can pass them into functions and also return them from functions; this because classes are special kind of functions)
// 3. Classes are executed in strict mode (even the 'strict mode'; line isn't added at the beggining)

//////////////////////////////////////////////
// 214. Setters and Getters
// setters and getter properties are ACCESSOR properties
// other properties are DATA properties

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.latest);

console.log(jessica.age); // will be added as property to object

class PersonCl2 {
  // method:
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance method
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // _ below is required because we set here the same property as in constructor
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there!');
  }
}

const jessica2 = new PersonCl2('Jessica Davis', 1996);
console.log(jessica2.fullName);
jessica2.fullName = 'Jessica D.';
console.log(jessica2.fullName);

//////////////////////////////////////////////
// 215. Static Methods
console.log(Array.from(document.querySelectorAll('h1'))); // [h1]
// console.log([1, 2, 3].from()); // Uncaught TypeError: [1,2,3].from is not a function

// .from is attached to Array constructor, not to prototype property of the constructor.
// So therefore all the arrays do NOT inherit this method. Because its not on their prototype.
// Its simply attached to the constructor itself.
// So Array.from here is basically just a simple function, but it's a function that's attached to the Array constructor.
// We also say that the .from method is in the Array namespace.
// Number.parseFloat('12.4') is the same thing
// These are static methods
// Add a static method:

Person.hey = function () {
  console.log('Hey there!');
  console.dir(this); // this is the object on which the method is called, in our case - Person.hey(); - it's a Person (the constructor function)
};

Person.hey();
// This method is not inhereted, because it's not in prototype of the jonas object:
// jonas.hey(); // Uncaught TypeError: jonas.hey is not a function

PersonCl2.hey();

//////////////////////////////////////////////
// 216. Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven); // {}, [[Prototype]]: Object
steven.name = 'Steven';
steven.birthYear = 2002;
console.log(steven); // {name: '', birthYear: 2002 }, [[Prototype]]: Object
steven.calcAge(); // 35

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

//////////////////////////////////////////////
// 217. Coding Challenge #2
// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.
// Test data:
// § Data car 1: 'Ford' going at 120 km/h

*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speedUS) {
    this.speed = speedUS * 1.6;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
}
/*
const bmwCl = new CarCl('BMW', 120);
const mercedesCl = new CarCl('Mercedes', 95);
const ford = new CarCl('Ford', 100);

bmwCl.accelerate().accelerate().brake();
console.log(`${bmwCl.speedUS} mi/h`);
bmwCl.speedUS = 56.25;
console.log(`${bmwCl.speedUS} mi/h`);

mercedesCl.brake().brake().brake().accelerate();
console.log(`${mercedesCl.speedUS} mi/h`);

ford.brake().brake().brake().accelerate();
console.log(`${ford.speedUS} mi/h`);


//////////////////////////////////////////////
// 218. Inheritance Between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);


//////////////////////////////////////////////
// 219. Coding Challenge #3

// Your tasks:
// 1. Use a constructor function to implement an ElectricCar (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! Hint: Review the definiton of polymorphism 😉
// Test data:
// § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge *= 0.99;
  console.log(
    `Tesla going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(100);
tesla.accelerate();
console.log(tesla.__proto__);
console.log(tesla.__proto__.__proto__);
console.dir(EV.prototype.constructor);


//////////////////////////////////////////////
// 220. Inheritance Between "Classes": ES6 Classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    this._fullName = name;
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there!');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this._fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();


//////////////////////////////////////////////
// 221. Inheritance Between "Classes": Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

// 3.37 - diagram

//////////////////////////////////////////////
// 222. Another Class Example

class Account {
  // 1) Public fields (public instance field / instances)
  locale = navigator.language;

  // 2) Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    this.#pin = pin;
    // Protected property
    // this._pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods
  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);

    return this;
  }

  // _approveLoan(val) {
  //   return true;
  // }

  withdraw(val) {
    this.deposit(-val);

    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }

    return this;
  }

  static helper() {
    console.log('Helper');
  }

  // 4) Private methods
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);

Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);

//////////////////////////////////////////////
// 223. Encapsulation: Protected Properties and Methods

// IMPORTANT: there is a convention to use _ for protected methods

//////////////////////////////////////////////
// 224. Encapsulation: Private Class Fields and Methods

// Private Class Fields and Methods are actually part of a bigger proposal for improving and
// changing JS classes which is simply called Class Fields. Now this Class fields proposal is
// currently at stage 3. And so right now it's actually not yet part of the JS language.
// However, being at stage 3 means that it's very likely that at some point, it will move forward to
// stage number 4. And then it will actually become a part of the JS language. And that's probably
// gonna happen some point soon in the future. Поэтому мы пройдем их в этом курсе.

// Why is this proposal actually called Class fields? In traditional OOP languages properties are
// usually called fields. This means that this new proposal JS is moving away from the idea that
// classes are just syntactic sugar over constructor functions. Because with this new class features
// classes actually start to have abilities that we didn't previously have with constructor
// functions.

// In this pr§oposal, there are 4 different kinds of fields and methods, and actually it's even 8:
// 1) Public fields (public instance field)
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

//////////////////////////////////////////////
// 225. Chaining Methods

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

//////////////////////////////////////////////
// 226. Coding Challenge #4


// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!
// Test data:
// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
*/

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);

    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;

    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );

    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(
  rivian
    .accelerate()
    .accelerate()
    .accelerate()
    .brake()
    .chargeBattery(100)
    .accelerate()
);
console.log(rivian.speedUS);
