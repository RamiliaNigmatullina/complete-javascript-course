'use strict';

(function () {
  const header = document.querySelector('h1');

  header.style.color = 'red';

  const body = document.querySelector('body');

  body.addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
