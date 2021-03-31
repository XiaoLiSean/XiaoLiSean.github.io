---
layout: archive
title: "Selected Projects"
permalink: /projects/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <style>
  .mySlides {display:none;}
  </style>
</head>

<!-- Origami Wheel Project -->
<br><br><hr><br>
<b>Data-driven Analysis on SEIRS ODE</b>
<br>
<i>AEROSP 729 Machine Learning for Science</i>, <a href="https://aero.engin.umich.edu/people/karthik-duraisamy/" target="_blank"><i>Prof. Karthik Duraisamy</i></a>
<p>Apply data-driven methods (e.g. neural network, dynamic modes decomposition) to analyze epidemic trends modeled by SEIRS ODE [<a href="https://github.com/XiaoLiSean/Machine_Learning_SEIRS" target="_blank">Github</a>]</p>
<br>

<div class="w3-content w3-display-container" id="slideshow3">

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/nn.png" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Neural Network Prediction
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/koop.png" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Koopman Decomposition Prediction
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/dmd.png" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Dynamic Modes Decomposition Prediction
    </div>
  </div>

<button class="w3-button w3-display-left w3-black" onclick="plusSlides(-1, this.parentNode)">&#10094;</button>
<button class="w3-button w3-display-right w3-black" onclick="plusSlides(1, this.parentNode)">&#10095;</button>
</div>


<!-- Origami Wheel Project -->
<br><br><hr><br>
<b>Car with Transformable Wheel Using Compliant Origami Mechanism</b>
<br>
<i>VM 350 Design & Manufacturing II</i>, <a href="https://sites.ji.sjtu.edu.cn/jaehyungju/" target="_blank"><i>Prof. Ju Jaehyung</i></a>
<p>Laminated material is used to fabricate the compliant origami wheels which enable flexible control of the wheel diameter and improve adaptability to orographical variations.</p>
<br>

<div class="w3-content w3-display-container" id="slideshow2">

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/car.png" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Assembling  View
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/explosiveView.jpg" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Explosive View
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/Climbing.jpg" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Climbing
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/origamiWheel.gif" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Origami Wheel Transformation
    </div>
  </div>

<button class="w3-button w3-display-left w3-black" onclick="plusSlides(-1, this.parentNode)">&#10094;</button>
<button class="w3-button w3-display-right w3-black" onclick="plusSlides(1, this.parentNode)">&#10095;</button>
</div>

<!-- Trebuchet Project -->
<br><br><hr><br>
<b>Controlled Trebuchet Car</b>
<br>
<i>VM 250 Design & Manufacturing I</i>
<p>Controllable trebuchet car for ball shooting gaming</p>
<br>

<div class="w3-content w3-display-container" id="slideshow1">
  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/trebuchetAssemble.jpg" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Assembling  View
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/trebuchetExplosive.jpg" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Explosive View
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/shooting.png" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Shooting Mechanism
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