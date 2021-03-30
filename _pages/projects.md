---
layout: archive
title: "Selected Projects"
permalink: /projects/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<!-- Origami Wheel Project -->
<br>
<b>Car with Transformable Wheel Using Compliant Origami Mechanism</b>
<br>
<i>VM350 Design & Manufacturing II</i>
<br>

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<style>
.mySlides {display:none;}
</style>

<div class="w3-display-container mySlides">
  <img src="http://XiaoLiSean.github.io/images/car.png" style="width:100%">
  <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
    Assembled View
  </div>
</div>

<div class="w3-content w3-display-container">
<div class="w3-display-container mySlides">
  <img src="http://XiaoLiSean.github.io/images/explosiveView.jpg" style="width:100%">
  <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
    Explosive View
  </div>
</div>

<div class="w3-display-container mySlides">
  <img src="http://XiaoLiSean.github.io/images/origamiWheel.gif" style="width:100%">
  <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
    Origami Wheel Transform
  </div>
</div>

<button class="w3-button w3-display-left w3-black" onclick="plusDivs(-1)">&#10094;</button>
<button class="w3-button w3-display-right w3-black" onclick="plusDivs(1)">&#10095;</button>
</div>


<!-- Trebuchet Project -->
<br>
<b>Controlled Trebuchet Car</b>
<br>
<i>VM250 Design & Manufacturing I</i>
<br>

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<style>
.mySlides {display:none;}
</style>

<div class="w3-content w3-display-container">
<div class="w3-display-container mySlides">
  <img src="http://XiaoLiSean.github.io/images/trebuchetAssemble.jpg" style="width:100%">
  <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
    Assembled View
  </div>
</div>

<div class="w3-display-container mySlides">
  <img src="http://XiaoLiSean.github.io/images/trebuchetExplosive.png" style="width:100%">
  <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
    Explosive View
  </div>
</div>

<div class="w3-display-container mySlides">
  <img src="http://XiaoLiSean.github.io/images/shooting.gif" style="width:100%">
  <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
    Shooting Mechanism
  </div>
</div>

<button class="w3-button w3-display-left w3-black" onclick="plusDivs(-1)">&#10094;</button>
<button class="w3-button w3-display-right w3-black" onclick="plusDivs(1)">&#10095;</button>
</div>



<!-- Function defined to show picture slider -->
<script>
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}
</script>