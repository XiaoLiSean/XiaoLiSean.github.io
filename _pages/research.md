---
layout: archive
title: "Current Research"
permalink: /research/
author_profile: true
---

<!-- Include style sheet -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/assets/css/w3.css">

{% include base_path %}
<!-- Set Membership Localization Project -->
<hr>
<b>Set-theoretic Localization for Mobile Robots with Infrastructure-based Sensing</b> [<a href="https://github.com/XiaoLiSean/SetThmSLAM" target="_blank" style="color:#5DADE2;">Github</a>, <a href="https://arxiv.org/abs/2110.01749" target="_blank" style="color:#5DADE2;">arXiv</a>]
<br>
<i>In Collaboration with Dr. Yutong Li, Advisor: Prof. Anouck Girard</i> <a href="https://sites.google.com/a/umich.edu/kolmanovsky/" target="_blank" style="color:#5DADE2;"><i>Prof. Ilya Kolmanovsky</i></a>
<p>The proposed method computes sets that over-bound the robot body and orientation under an assumption of known noise bounds on the sensor and robot motion model. We establish theoretical properties and computational approaches for this set-theoretic localization approach and illustrate its application to an automated valet parking example in simulations and to omnidirectional robot localization problems in real-world experiments.</p>

<!-- SeanNet Project -->
<hr>
<b>SeanNet: Semantic Understanding Network for Localization Under Object Dynamics</b> [<a href="https://github.com/XiaoLiSean/Cognitive-Map/tree/CoRL2021" target="_blank" style="color:#5DADE2;">Github</a>，<a href="https://arxiv.org/abs/2110.02276" target="_blank" style="color:#5DADE2;">arXiv</a>]
<br>
<i>In Collaboration with Yidong Du and</i> <a href="https://www.zhenzeng.org/" target="_blank" style="color:#5DADE2;"><i>Dr. Zhen Zeng</i></a>, <i>Advisor:</i> <a href="https://ocj.name/" target="_blank" style="color:#5DADE2;"><i>Prof. Chad Jenkins</i></a>
<p>This research work proposes a scene graph enhanced deep neuron network for localization under visual uncertainties using Pytorch. The proposed network is provided to have a better performance in visual navigation tasks under object dynamics compared to those using CNN benchmark architectures.</p>

<!-- Cognitive Map Project -->
<hr>
<b>Dynamic Scene Graph and Visual Navigation</b> 
<br>
<i>In Collaboration with Yidong Du and</i> <a href="https://www.zhenzeng.org/" target="_blank" style="color:#5DADE2;"><i>Dr. Zhen Zeng</i></a>, <i>Advisor:</i> <a href="https://ocj.name/" target="_blank" style="color:#5DADE2;"><i>Prof. Chad Jenkins</i></a>
<p>This research work develops a cognitive map representation that enables a dynamic memory of scene set-ups for autonomous agents. Image and scene graph-based Neuron Network is designed for localization with uncertainties using Pytorch. This research work ultimately enables the domestic robot for intelligent service tasks facing object-level visual uncertainties.</p>

<div class="w3-content w3-display-container" id="slideshow3">
  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/serviceTask.gif" style="width:100%">
    <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">
      Autonomous Coffee Making Service Task
    </div>
  </div>
</div>



<br>
<h2>Independed Study</h2>
<!-- Autonomous Parking Project -->
<hr>
<b>Test Platform for Autonomous Driving Functionalities</b> [<a href="https://github.com/yutlizy/RC-car" target="_blank" style="color:#5DADE2;">Github</a>]
<br>
<i>ME 590 Independent Study in Collaboration with Dr. Yutong Li, Advisor:</i> <a href="https://sites.google.com/a/umich.edu/kolmanovsky/" target="_blank" style="color:#5DADE2;"><i>Prof. Ilya Kolmanovsky</i></a>, <a href="https://me.engin.umich.edu/people/faculty/bogdan-epureanu" target="_blank" style="color:#5DADE2;"><i>Prof. Bogdan Epureanu</i></a>
<p>Develope software and hardware RC-Car platform for validate autonomous parking application. (i.e. path planning, control, and visual-based localization)</p>

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

  <!-- The image w3-content container is of max_width 980 for all -->
  <!--   Keep ratio of 16:9
  height = 980*9/16
  image_width = height/original_h(850)*original_w(1042)
  padding = (980 - image_width)/image_width/2 *100% -->

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
<script type="text/javascript" src="/assets/js/showSlides.js">
