---
layout: archive
title: "Current Research"
permalink: /research/
author_profile: true
---

{% include base_path %}

<title>Independed Study</title>
<!-- Autonomous Parking Project -->
<hr>
<b>Test Platform for Autonomous Driving Functionalities</b>
<br>
<i>ME 590 Independent Study, Advisor:</i> <a href="https://sites.google.com/a/umich.edu/kolmanovsky/" target="_blank"><i>Prof. Ilya Kolmanovsky</i></a>, <a href="https://me.engin.umich.edu/people/faculty/bogdan-epureanu" target="_blank"><i>Prof. Bogdan Epureanu</i></a>
<p>Develope software and hardware RC-Car platform for validate autonomous parking application</p>
<br>

<div class="w3-content w3-display-container" id="slideshow1">
  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/rccar.png" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      RC Car
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/path_planning.png" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      MATLAB Parking Valet Path Planning
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/OptiTrack Localization.gif" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      OptiTrack Localization
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/trajectory tracking.gif" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Trajectory Tracking
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/Autonomous Parking.gif" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Autonomous Parking
    </div>
  </div>

<button class="w3-button w3-display-left w3-black" onclick="plusSlides(-1, this.parentNode)">&#10094;</button>
<button class="w3-button w3-display-right w3-black" onclick="plusSlides(1, this.parentNode)">&#10095;</button>
</div>


<!-- Function defined to show picture slider -->
<script>
var slideshow1 = document.getElementById("slideshow1");
slideshow1.currentSlideIndex = 1;
showSlides(slideshow1.currentSlideIndex, slideshow1);

var slideshow2 = document.getElementById("slideshow2");
slideshow2.currentSlideIndex = 1;
showSlides(slideshow2.currentSlideIndex, slideshow2);

var slideshow3 = document.getElementById("slideshow3");
slideshow3.currentSlideIndex = 1;
showSlides(slideshow2.currentSlideIndex, slideshow3);

function plusSlides(n, slideshow) {
  showSlides(slideshow.currentSlideIndex += n, slideshow);
}

function currentSlide(n, slideshow) {
  showSlides(slideshow.currentSlideIndex = n, slideshow);
}

function showSlides(n, slideshow) {
  var i;
  var slides = slideshow.getElementsByClassName("mySlides");
  if (n > slides.length) {slideshow.currentSlideIndex = 1}    
  if (n < 1) {slideshow.currentSlideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideshow.currentSlideIndex-1].style.display = "block";  
}
</script>
