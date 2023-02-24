import '/styles/property.css';
import { DateRangePicker } from 'vanillajs-datepicker';
import 'vanillajs-datepicker/css/datepicker.css';

const elem = document.getElementById('foo');
const rangepicker = new DateRangePicker(elem, {
  autohide: true
});

const startElem = document.getElementById('start');
const endElem = document.getElementById('end');

startElem.addEventListener('changeDate', function(e) {
  console.log('start', e.detail.date);
});

endElem.addEventListener('changeDate', function(e) {
  console.log('end', e.detail.date);
});


// Slider Code ===================

// https://codepen.io/davehert/pen/MWrYjZy

// Select all slides
const slides = document.querySelectorAll(".slide");

// loop through slides and set each slides translateX
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// select next slide button
const nextSlide = document.querySelector(".btn-next");

// current slide counter
let curSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  //   move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// select next slide button
const prevSlide = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// Slider Code ends ===============

// display menu section based on URL
const URLhash = window.location.hash;
if(URLhash) {
  // get split value
  const splitHash = URLhash.split("#")
  if(splitHash[1]) {
    const elemValue = splitHash[1];
    displaySelectedMenuInfo(elemValue);

  } 
}

// Code to toggle tabs
const menuTabs = document.getElementsByClassName('menu-tabs');
const menuTabsArray = Array.from(menuTabs);

menuTabsArray.forEach(elem => {
  elem.addEventListener('click', function(event) {
    const elemValue = this.dataset.value;
    displaySelectedMenuInfo(elemValue);
  })
})


// displays the selected menu info based on user selection and url
function displaySelectedMenuInfo(elemValue) {
  // hide all elements inside the wrapper
    // .property-menu-info-wrapper
    const allElementsToHide = document.querySelectorAll('.property-menu-info-wrapper > div')
    allElementsToHide.forEach(elem => elem.classList.add("hide"));

    // remove hide class
    const elemToShowClass = `property-${elemValue}-tab`;
    const elemToShow = document.getElementsByClassName(elemToShowClass);
    elemToShow[0].classList.remove("hide");
}