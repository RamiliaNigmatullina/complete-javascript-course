'use strict';

let activePlayerIndex;
let currentScore;
let playing;
let scores = {};

const maxScore = 100;
const maxDice = 6;

const classes = {
  active: 'player--active',
  winner: 'player--winner',
};

const players = document.querySelectorAll('.player');

const diceImg = document.querySelector('.dice');

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const displayScore = (playerIndex = activePlayerIndex) =>
  (document.querySelector(`#score--${playerIndex}`).textContent =
    scores[playerIndex]);
const displayCurrentScore = (playerIndex = activePlayerIndex) =>
  (document.querySelector(`#current--${playerIndex}`).textContent =
    currentScore);

const showDice = function (number) {
  diceImg.classList.remove('hidden');

  diceImg.src = `./dice-${number}.png`;
};

const randomDice = () => Math.trunc(Math.random() * maxDice) + 1;
const nextPlayerIndex = () =>
  playing ? (activePlayerIndex + 1) % players.length : null;

const reset = () => {
  playing = true;

  activePlayerIndex = 0;
  currentScore = 0;

  for (let i = 0; i < players.length; i++) {
    scores[i] = 0;

    displayScore(i);
    displayCurrentScore(i);

    players[i].classList.remove(classes.winner);
  }

  diceImg.classList.add('hidden');

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
  if (!playing) return;

  // Generate a random dice roll
  const dice = randomDice();

  showDice(dice);

  // Check for rolled 1
  if (dice === 1) {
    switchPlayer();
  } else {
    currentScore += dice;
    displayCurrentScore();
  }
};

const switchPlayer = (updateScore = false) => {
  if (!playing || (updateScore && currentScore === 0)) return;

  if (updateScore) {
    // Add current score to active player's score
    scores[activePlayerIndex] += currentScore;
    displayScore();

    // Check if player's score is >= 100
    if (scores[activePlayerIndex] >= maxScore) {
      playing = false;

      players[activePlayerIndex].classList.add(classes.winner);
      diceImg.classList.add('hidden');
    }
  }

  // Reset current score
  currentScore = 0;
  displayCurrentScore();

  // Switch to the next player
  activePlayerIndex = nextPlayerIndex();
  showActivePlayer();
};

rollBtn.addEventListener('click', handleRollDice);
holdBtn.addEventListener('click', switchPlayer.bind(this, true));
newGameBtn.addEventListener('click', reset);

reset();
