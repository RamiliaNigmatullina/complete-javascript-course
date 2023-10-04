'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}`;

    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'Steven'; // Такое возможно, потому что мы объявляем переменную с таким именем в другом скоупе
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      // Reassigning outer scope's variable
      // const output = 'NEW OUTPUT!';

      const output = 'NEW OUTPUT!';
    }
    // {
    //   const str = `Oh, and you're a millenial, ${firstName}`;
    //   console.log(str);
    // }

    // console.log(str); // ReferenceError
    console.log(millenial);
    console.log(output);

    // console.log(add(2, 3)); // ReferenceError: add is not defined
    // !!! If we comment out the first line - 'use strict'; -, the code above will work, it'll log '5' to the console !!!
  }

  printAge();

  console.log(firstName);

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age); // ReferenceError
