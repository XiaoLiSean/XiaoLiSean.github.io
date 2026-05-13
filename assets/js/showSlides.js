/* Slideshow controller used by _pages/projects.md.
   Each slideshow on the page is identified by id="slideshowN" and contains
   children with class "mySlides". This script initializes any slideshow that
   exists on the current page; it tolerates missing ids so unused slots don't
   throw and abort the rest of the script.
*/

function showSlides(n, slideshow) {
  var slides = slideshow.getElementsByClassName("mySlides");
  if (n > slides.length) { slideshow.currentSlideIndex = 1; }
  if (n < 1) { slideshow.currentSlideIndex = slides.length; }
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideshow.currentSlideIndex - 1].style.display = "block";
}

function plusSlides(n, slideshow) {
  showSlides(slideshow.currentSlideIndex += n, slideshow);
}

function currentSlide(n, slideshow) {
  showSlides(slideshow.currentSlideIndex = n, slideshow);
}

(function initAll() {
  /* Initialize any slideshow1..slideshow8 that exists on the page. */
  for (var i = 1; i <= 8; i++) {
    var s = document.getElementById("slideshow" + i);
    if (!s) { continue; }
    s.currentSlideIndex = 1;
    showSlides(s.currentSlideIndex, s);
  }
})();
