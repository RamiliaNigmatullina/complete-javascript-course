'use strict';

// Your tasks:

// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast3G” in the dev tools Network tab

// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'
// 2. Use .map to loop over the array,to load all the images with the 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img- 3.jpg']. To test, turn off the 'loadNPause' function

// PART 1
const imgContainer = document.querySelector('.images');

const wait = async function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.classList.add('parallel');
    img.src = imgPath;
    // img.onerror = _ => reject(new Error('Wrong image path'));

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

const hideCurrentImg = () => (currentImg.style.display = 'none');

// try {
//   (async function () {
//     let waitSec = 5;

//     currentImg = await createImage('img/img-1.jpg');
//     await wait(waitSec);
//     hideCurrentImg();
//     currentImg = await createImage('img/img-2.jpg');
//     await wait(waitSec);
//     hideCurrentImg();
//     currentImg = await createImage('img/img-3.jpg');
//     await wait(waitSec);
//     hideCurrentImg();
//   })();
// } catch (err) {
//   console.error(err);
// }

// PART 2
const loadAll = async function (imgArr) {
  // const imgs = imgArr.map(img => createImage(img));
  // console.log(imgs);

  const imgs = await Promise.all(imgArr.map(img => createImage(img)));
  console.log(imgs);
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
