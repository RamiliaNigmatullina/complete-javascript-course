'use strict';

let activePlayerIndex;
let scores = {};
let currentScores = {};

const maxScore = 100;
const maxNumber = 6;

const classes = {
  active: 'player--active',
  winner: 'player--winner',
};

const players = document.querySelectorAll('.player');

const diceImg = document.querySelector('.dice');

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const displayScore = activePlayerIndex =>
  (document.querySelector(`#score--${activePlayerIndex}`).textContent =
    scores[activePlayerIndex]);
const displayCurrentScore = activePlayerIndex =>
  (document.querySelector(`#current--${activePlayerIndex}`).textContent =
    currentScores[activePlayerIndex]);

const displayDice = function (number) {
  diceImg.style.display = 'block';

  diceImg.src = `./dice-${number}.png`;
};

const randomNumber = () => Math.trunc(Math.random() * maxNumber) + 1;
const nextPlayerIndex = () => (activePlayerIndex + 1) % players.length;

const setWinner = isSet => {
  if (typeof activePlayerIndex === 'undefined') return;

  const classList = players[activePlayerIndex].classList;
  isSet ? classList.add(classes.winner) : classList.remove(classes.winner);

  // players[activePlayerIndex].classList.toggle(classes.winner);

  disableButtons(isSet);
};

const disableButtons = isDisabled => {
  rollBtn.disabled = isDisabled;
  holdBtn.disabled = isDisabled;
};

const reset = () => {
  setWinner(false);

  for (let i = 0; i < players.length; i++) {
    scores[i] = 0;
    currentScores[i] = 0;

    displayScore(i);
  }

  activePlayerIndex = 0;

  diceImg.style.display = 'none';

  showActivePlayer();
};

const showActivePlayer = () => {
  for (let i = 0; i < players.length; i++) {
    const classList = players[i].classList;

    activePlayerIndex === i
      ? classList.add(classes.active)
      : classList.remove(classes.active);
  }
};

const handleRollDice = () => {
  const number = randomNumber();

  displayDice(number);

  if (number === 1) {
    handleHold(false);

    return;
  }

  currentScores[activePlayerIndex] += number;
  displayCurrentScore(activePlayerIndex);
};

const handleHold = isSaveCurrentScore => {
  if (isSaveCurrentScore && currentScores[activePlayerIndex] === 0) return;

  // Add current score to active player's score
  if (isSaveCurrentScore) {
    scores[activePlayerIndex] += currentScores[activePlayerIndex];

    displayScore(activePlayerIndex);
  }

  // Reset current score
  currentScores[activePlayerIndex] = 0;

  displayCurrentScore(activePlayerIndex);

  // Check if player's score is >= 100
  if (isSaveCurrentScore && scores[activePlayerIndex] >= maxScore) {
    setWinner(true);

    return;
  }

  // Switch to the next player
  activePlayerIndex = nextPlayerIndex();

  showActivePlayer();
};

rollBtn.addEventListener('click', handleRollDice);
holdBtn.addEventListener('click', handleHold.bind(this, true));
newGameBtn.addEventListener('click', reset);

reset();
