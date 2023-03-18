let counter = 0;

function rightslide(carouselSlide, carouselImages) {
  let size = carouselImages[0].clientWidth;
  if (counter >= carouselImages.length - 2) return;
  carouselSlide.style.transition = `transform 0.4s ease-in-out`;
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  console.log("Counter: ", counter);
}

function leftslide(carouselSlide, carouselImages) {
  let size = carouselImages[0].clientWidth;
  if (counter <= 0) return;
  carouselSlide.style.transition = `transform 0.4s ease-in-out`;
  counter--;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  console.log("Counter: ", counter);
}

export { rightslide, leftslide, counter };
