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
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <style>
  .mySlides {display:none;}
  </style>
</head>

<!-- Origami Wheel Project -->
<br>
<b>Car with Transformable Wheel Using Compliant Origami Mechanism</b>
<br>
<i>VM350 Design & Manufacturing II</i>, <a href="https://sites.ji.sjtu.edu.cn/jaehyungju/" target="_blank"><i>Prof. Ju Jaehyung</i></a>
<br>

<div class="container p-3 my-3 border">
<div class="w3-content w3-display-container">

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/car.png" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Assembled View
    </div>
  </div>

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
</div>

<!-- Trebuchet Project -->
<br>
<b>Controlled Trebuchet Car</b>
<br>
<i>VM250 Design & Manufacturing I</i>
<br>

<div class="container p-3 my-3 border">
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