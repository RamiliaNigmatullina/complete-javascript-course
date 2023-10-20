'use strict';

/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below to insert the elements), and conversion will happen when the button is pressed.

Test data (pasted to textarea, including spaces):
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure

Should produce this output (5 separate console.log outputs):

underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅

Hints:
1. Remember which character defines a new line in the textarea 😉
2. The solution only needs to work for a variable made out of 2 words, like a_b
3. Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
4. This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!

Afterwards, test with your own test data!
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const button = document.querySelector('button');
const textarea = document.querySelector('textarea');

const convert = function () {
  const variables = textarea.value.split('\n');
  const convertedVariables = [];
  let maxLength = 0;

  for (const variable of variables) {
    const words = variable.trim().toLowerCase().split('_');
    let convertedVariable = '';

    for (let [i, word] of words.entries()) {
      convertedVariable +=
        i === 0 ? word : word.replace(word[0], word[0].toUpperCase());
    }

    convertedVariables.push(convertedVariable);

    const length = convertedVariable.length;
    if (length > maxLength) maxLength = length;
  }

  for (const [i, variable] of convertedVariables.entries())
    console.log(`${variable.padEnd(maxLength + 1, ' ')} ${'✅'.repeat(i + 1)}`);
};

button.addEventListener('click', convert);
