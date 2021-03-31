---
layout: archive
title: "Current Research"
permalink: /research/
author_profile: true
---

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<style>
.mySlides {display:none;}
</style>

{% include base_path %}

<!-- Cognitive Map Project -->
<hr>
<b>Scene Graph Centric Cognitive Map</b> [<a href="https://github.com/XiaoLiSean/Cognitive-Map" target="_blank" style="color:#5DADE2;">Github</a>]
<br>
<i>In Collaboration with Yidong Du and Dr. Zhen Zeng, Advisor:</i> <a href="https://ocj.name/" target="_blank" style="color:#5DADE2;"><i>Prof. Chad Jenkins</i></a>
<p>Design a cognitive map representation to enable a dynamic memory of scene set-ups for autonomous agents, Create a image and scene graph based Neuron Network for localization with uncertainties using Pytorch</p>
<br>

<div class="w3-content w3-display-container" id="slideshow3">
  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/serviceTask.gif" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Autonomous Coffee Making Service Task
    </div>
  </div>

<button class="w3-button w3-display-left w3-black" onclick="plusSlides(-1, this.parentNode)">&#10094;</button>
<button class="w3-button w3-display-right w3-black" onclick="plusSlides(1, this.parentNode)">&#10095;</button>
</div>


<!-- Set Membership Localization Project -->
<hr>
<b>A Set Theoretic Approach to RC Car Localization</b> [<a href="https://github.com/XiaoLiSean/SetThmSLAM" target="_blank" style="color:#5DADE2;">Github</a>]
<br>
<i>In Collaboration with Dr. Yutong Li, Advisor:</i> <a href="https://sites.google.com/a/umich.edu/kolmanovsky/" target="_blank" style="color:#5DADE2;"><i>Prof. Ilya Kolmanovsky</i></a>
<p>Set membership based localization for CCTV system with monocular and stereo cameras</p>
<br>

<div class="w3-content w3-display-container" id="slideshow2">
  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/monoCCTV.gif" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      CCTV with Monocular Cameras
    </div>
  </div>

  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/stereoCCTV.gif" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      CCTV with Stereo Cameras
    </div>
  </div>

<button class="w3-button w3-display-left w3-black" onclick="plusSlides(-1, this.parentNode)">&#10094;</button>
<button class="w3-button w3-display-right w3-black" onclick="plusSlides(1, this.parentNode)">&#10095;</button>
</div>


Independed Study
======
<!-- Autonomous Parking Project -->
<hr>
<b>Test Platform for Autonomous Driving Functionalities</b> [<a href="https://github.com/yutlizy/RC-car" target="_blank" style="color:#5DADE2;">Github</a>]
<br>
<i>ME 590 Independent Study in Collaboration with Dr. Yutong Li, Advisor:</i> <a href="https://sites.google.com/a/umich.edu/kolmanovsky/" target="_blank" style="color:#5DADE2;"><i>Prof. Ilya Kolmanovsky</i></a>, <a href="https://me.engin.umich.edu/people/faculty/bogdan-epureanu" target="_blank" style="color:#5DADE2;"><i>Prof. Bogdan Epureanu</i></a>
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
