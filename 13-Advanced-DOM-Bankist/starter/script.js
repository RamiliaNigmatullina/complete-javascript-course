'use strict';

// https://bankist-dom.netlify.app

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// The next solution will create too many copies of the same function
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

// tabs.forEach(tab => tab.addEventListener('click', () => console.log('TAB')));
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
// const handleHover = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = opacity;
//     });
//     logo.style.opacity = opacity;
//   }
// };
// nav.addEventListener('mouseover', e => handleHover(e, 0.5));
// nav.addEventListener('mouseout', e => handleHover(e, 1));

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API

// // This callback function here will get called each time that the observed element, so our
// // target element (section1), is intersecting the root element at the threshold that we defined
// const observerCallback = function (entries, observer) {
//   // entries is an array (because 'threshold' is an array)

//   entries.forEach(entry => console.log(entry));
//   // IntersectionObserverEntry {time: 9836.600000023842, rootBounds: DOMRectReadOnly, boundingClientRect: DOMRectReadOnly, intersectionRect: DOMRectReadOnly, isIntersecting: true, …}
//   // boundingClientRect: DOMRectReadOnly {x: 0, y: -28, width: 1253, height: 1430.890625, top: -28, …}
//   // intersectionRatio: 0.3347565233707428 --- IT MEANS THAT IT'S BIGGER THAN 10% (> 0.1)
//   // intersectionRect: DOMRectReadOnly {x: 0, y: 0, width: 1253, height: 479, top: 0, …}
//   // isIntersecting: true --- intersectionRatio > 0.1, THAT'S WHY isIntersecting IS true
//   // isVisible: false
//   // rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 1253, height: 479, top: 0, …}
//   // target: section#section--1.section
//   // time: 9836.600000023842
//   // [[Prototype]]: IntersectionObserverEntry
// };

// const observerOptions = {
//   root: null, // root element is the element that we want our target element to intersect; null = view port
//   // threshold: 0.1, // this is a percentage of intersection at which the observer callback will be called; 0.1 = 10%
//   // we can have multiple thresholds, so here we can have an array
//   threshold: [0, 0.2], // so 0% here means that basically our callback will trigger each time
//   // that the target element moves completely out of the view, and also as soon as it entries
//   // the view. That's because the callback function will be called when the threshold is
//   // passed when miving into the view and when moving out of the view.
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1); // section1 is target here

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // it's a box of X pixels that will be applied outside of our target element
});
headerObserver.observe(header);

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// LECTUTES

/*
///////////////////////////////////////
// 186. Selecting, Creating and Deleting Elements

/////////////////////
// Selecting elements
console.log(document.documentElement); // <html lang="en">
//   <head>...</head>
//   <body>...</body>
// </html>
// OR html-object
console.log(document.head); // <head>...</head> OR head-object
console.log(document.body); // <body>...</body> OR body-object

const header = document.querySelector('.header');
console.log(header); // <header class="header">...</header> (the first element with this class)

const allSections = document.querySelectorAll('.section');
console.log(allSections); // NodeList(4) [section#section--1.section, ...]

console.log(document.getElementById('section--1')); // <section class="section" id="section--1"></section>

const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // HTMLCollection(9) [button.btn--text.btn--scroll-to, button.btn.operations__tab.operations__tab--1.operaions__tab--active, ...]

// !!! HTML collections are so-called life collections

console.log(document.getElementsByClassName('btn')); // HTMLCollection(5) [button.btn.operations__tab.operations__tab--1.operations__tab--active, ...]

//////////////////////////////////
// Creating and inserting elements

// We learnt the next method before
// .insertAdjecantHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

////////////////////
// Deleting elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // new way
    // message.parentElement.removeChild(message); // old way
  });

///////////////////////////////////////
// 187. Styles, Attributes and Classes

// Styles
message.style.background = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // => (nothing)
console.log(message.style.backgroundColor); // => rgb(55, 56, 61)

console.log(getComputedStyle(message)); // returns a big object
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 40px

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', '#0080ff');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:8080/starter/img/logo.png
console.log(logo.className); // nav__logo

// Non-standard
console.log(logo.designer); // undefined
console.log(logo.getAttribute('designer')); // Jonas

// Setting attributes
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // http://127.0.0.1:8080/starter/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png

const link = document.querySelector('.twitter-link');
console.log(link.href); // https://twitter.com/jonasschmedtman
console.log(link.getAttribute('href')); // https://twitter.com/jonasschmedtman

const link2 = document.querySelector('.nav__link--btn');
console.log(link2.href); // http://127.0.0.1:8080/starter/#
console.log(link2.getAttribute('href')); // #

// Data attributes
console.log(logo.dataset.versionNumber); // 3.0

// Classes
logo.classList.add('className1', 'className2');
logo.classList.remove('className1', 'className2');
logo.classList.toggle('className');
logo.classList.contains('className');
// logo.className = 'jonas'; // DO NOT USE - it overrides existing classes

///////////////////////////////////////
// 188. Implementing Smooth Scrolling

// There are 2 ways

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  console.log('s1coords: ', s1coords); // top coordinate is relative to the view port
  console.log('target coordinates: ', e.target.getBoundingClientRect());
  // console.log('Current scroll (x|y)', window.pageXOffset, window.pageYOffset); -- these methods are deprecated, see the next line
  console.log('Current scroll (x|y)', window.scrollX, window.scrollY);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // The next solution won't work for the case when scrolling starts not from the beginning of the page
  // window.scrollTo(s1coords.left, s1coords.top);

  // The next solution will work, but it does scrolling too fast
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // The first way (the best smooth solution)
  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });

  // The second way
  section1.scrollIntoView({ behavior: 'smooth' });
}); // unit – px

///////////////////////////////////////
// 189. Types of Events and Event Handlers

// 3 ways
// 1.
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// });

// 2.
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');

//   // h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// 3 - see HTML
// <!-- <h1 onclick="alert('HTML alert')"> -->


///////////////////////////////////////
// 191. Event Propagation in Practice

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.target === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
  console.log(e.target === this);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
    console.log(e.target === this);
  },
  true
);

///////////////////////////////////////
// 193. DOM Traversing
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight]
console.log(h1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]

console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode); // <div class="header__title">...</div>
console.log(h1.parentElement); // <div class="header__title">...</div> - the same IN THIS CASE

h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways: siblings
console.log(h1.previousElementSibling); // null
console.log(h1.nextElementSibling); // <h4>A simpler banking experience for a simpler life.</h4>

console.log(h1.previousSibling); // #text
console.log(h1.nextSibling); // #text

// All siblings
console.log(h1.parentElement.children); // HTMLCollection(4) [...]
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
