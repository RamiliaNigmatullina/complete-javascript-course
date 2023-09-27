'use strict';

/*
console.log(document.querySelector('.message'));
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let isWon;
let secretNumber;
let score = 0;
let highscore = 0;

const colors = {
  green: '#60b347',
  black: '#222',
};

const widths = {
  small: '15rem',
  large: '30rem',
};

const messages = {
  defeat: '💣 You lost the game!',
  empty: '🛑 No number!',
  high: '📈 Too high!',
  initial: 'Start guessing...',
  low: '📉 Too low!',
  victory: '🎉 Correct Number!',
};

const randomNumber = () => Math.trunc(Math.random() * 20) + 1;

const displayMessage = text =>
  (document.querySelector('.message').textContent = text);
const displayScore = () =>
  (document.querySelector('.score').textContent = score);
const displayHighscore = () =>
  (document.querySelector('.highscore').textContent = highscore);
const displayNumber = number =>
  (document.querySelector('.number').textContent = number);

const decreaseScore = () => score--;
const isGuessAllowed = () => score && !isWon;

const changeBackgroundColor = color =>
  (document.querySelector('body').style.backgroundColor = color);
const changeNumberSectionWidth = width =>
  (document.querySelector('.number').style.width = width);

const updateHighscore = () => {
  if (score > highscore) return;

  highscore = score;

  displayHighscore();
};

const handleWin = () => {
  isWon = true;

  updateHighscore();
  changeBackgroundColor(colors.green);
  changeNumberSectionWidth(widths.large);
  displayMessage(messages.victory);
  displayNumber(secretNumber);
};

const handleCheck = function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!isGuessAllowed()) return;

  if (!guess) {
    displayMessage(messages.empty);
  } else if (guess === secretNumber) {
    handleWin();
  } else {
    if (score > 1) {
      if (guess > secretNumber) {
        displayMessage(messages.high);
      } else if (guess < secretNumber) {
        displayMessage(messages.low);
      }
    } else {
      displayMessage(messages.defeat);
    }
    decreaseScore();
    displayScore();
  }
};

const init = function () {
  isWon = false;
  score = 20;
  secretNumber = randomNumber();

  document.querySelector('.guess').value = '';

  changeBackgroundColor(colors.black);
  changeNumberSectionWidth(widths.small);
  displayMessage(messages.initial);
  displayNumber('?');
  displayScore();
};

init();

document.querySelector('.check').addEventListener('click', handleCheck);
document.querySelector('.again').addEventListener('click', init);
