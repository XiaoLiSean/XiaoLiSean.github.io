---
layout: archive
title: "Active Projects"
permalink: /projects/
author_profile: true
---

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/assets/css/w3.css">

{% include base_path %}

<hr />

* <b>Diffusion policy for car racing with CBF-based safety filter and RL guidance</b> [<a href="https://github.com/XiaoLiSean/racing-diffusion-rl" target="_blank" style="color:#5DADE2;">Github</a>]

* <b>Vision-Language Model for Highway Vehicle Intent Inference and Trajectory Prediction</b> [<a href="https://github.com/XiaoLiSean/vlm-drv-intention" target="_blank" style="color:#5DADE2;">Github</a>]

<hr /> <h2>Project Gallery</h2>

<div class="project-gallery">

  <a class="project-card" data-project="rccar" href="#" role="button" tabindex="0" aria-label="Open project: RC car test platform">
    <img class="project-card__thumb" src="/images/projects/rccar.png" alt="RC car platform">
    <div class="project-card__caption">
      <span class="project-card__title">Test Platform for Autonomous Driving</span>
      <span class="project-card__brief">RC car platform for autonomous parking with path planning, control, and infrastructure-based localization.</span>
    </div>
  </a>

  <a class="project-card" data-project="fastslam" href="#" role="button" tabindex="0" aria-label="Open project: FastSLAM">
    <img class="project-card__thumb" src="/images/projects/fastslam.gif" alt="FastSLAM tested on Victoria Park">
    <div class="project-card__caption">
      <span class="project-card__title">FastSLAM and Data Association Error Analysis</span>
      <span class="project-card__brief">FastSLAM algorithms tested on toy and Victoria Park datasets with error analysis.</span>
    </div>
  </a>

  <a class="project-card" data-project="origami" href="#" role="button" tabindex="0" aria-label="Open project: Origami wheel">
    <img class="project-card__thumb" src="/images/projects/car.png" alt="Origami wheel car assembly">
    <div class="project-card__caption">
      <span class="project-card__title">Car with Transformable Origami Wheel</span>
      <span class="project-card__brief">Compliant origami wheels with variable diameter for improved terrain adaptability.</span>
    </div>
  </a>

  <a class="project-card" data-project="trebuchet" href="#" role="button" tabindex="0" aria-label="Open project: Trebuchet car">
    <img class="project-card__thumb" src="/images/projects/trebuchetAssemble.jpg" alt="Trebuchet car assembly">
    <div class="project-card__caption">
      <span class="project-card__title">Controlled Trebuchet Car</span>
      <span class="project-card__brief">Remote-controlled trebuchet car for accurate ball launching in competitive games.</span>
    </div>
  </a>

</div>

<!-- ============================================================================ -->
<!-- Modals (hidden until a card is clicked) -->
<!-- ============================================================================ -->

<dialog class="project-modal" id="modal-rccar">
  <div class="project-modal__panel">
    <button class="project-modal__close" type="button" data-close aria-label="Close">&times;</button>
    <h2>Test Platform for Autonomous Driving Functionalities</h2>
    <p>
      [<a href="https://github.com/yutlizy/RC-car" target="_blank" style="color:#5DADE2;">Github</a>]
      <br>
      <i>ME 590 Independent Study in Collaboration with Dr. Yutong Li, Advisor:</i>
      <a href="https://sites.google.com/a/umich.edu/kolmanovsky/" target="_blank" style="color:#5DADE2;"><i>Prof. Ilya Kolmanovsky</i></a>,
      <a href="https://me.engin.umich.edu/people/faculty/bogdan-epureanu" target="_blank" style="color:#5DADE2;"><i>Prof. Bogdan Epureanu</i></a>
    </p>
    <p>Develop a software and hardware RC car platform to validate autonomous parking applications, including path planning, control, and infrastructure-based localization.</p>

    <div class="w3-content w3-display-container" id="slideshow1">
      <div class="w3-display-container mySlides">
        <img src="/images/projects/rccar.png" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">RC Car</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/path_planning.png" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Path Planning</div>
      </div>
      <div class="w3-display-container mySlides">
        <video src="/images/projects/OptiTrack Localization.mp4" style="width:100%" autoplay loop muted playsinline></video>
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">OptiTrack Localization</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/trajectory tracking.gif" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Trajectory Tracking</div>
      </div>
      <div class="w3-display-container mySlides">
        <video src="/images/projects/Autonomous Parking.mp4" style="width:100%" autoplay loop muted playsinline></video>
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Autonomous Parking</div>
      </div>
      <button class="w3-button w3-display-left w3-black" onclick="plusSlides(-1, this.parentNode)">&#10094;</button>
      <button class="w3-button w3-display-right w3-black" onclick="plusSlides(1, this.parentNode)">&#10095;</button>
    </div>
  </div>
</dialog>

<dialog class="project-modal" id="modal-fastslam">
  <div class="project-modal__panel">
    <button class="project-modal__close" type="button" data-close aria-label="Close">&times;</button>
    <h2>FastSLAM and Data Association Error Analysis</h2>
    <p>
      [<a href="https://github.com/XiaoLiSean/fastSLAM" target="_blank" style="color:#5DADE2;">Github</a>],
      [<a href="https://www.youtube.com/watch?v=l1vEpVRktko" target="_blank" style="color:#5DADE2;">Video</a>]
      <br>
      <a href="https://robots.engin.umich.edu/mobilerobotics/" target="_blank" style="color:#5DADE2;"><i>NAVARCH 568 Mobile Robotics</i></a>,
      <i>Advisor:</i>
      <a href="https://robotics.umich.edu/profile/maani-ghaffari/" target="_blank" style="color:#5DADE2;"><i>Prof. Maani Ghaffari</i></a>
    </p>
    <p>FastSLAM algorithms proposed in <a href="http://www.probabilistic-robotics.org/" target="_blank" style="color:#5DADE2;">"Probabilistic Robotics"</a> are coded and tested on toy and Victoria Park datasets.</p>

    <div class="w3-content w3-display-container" id="slideshow2">
      <div class="w3-display-container mySlides">
        <img src="/images/projects/fastslam.gif" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">FastSLAM2.0 Tested on Victoria Park Dataset</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/fastslamToy.gif" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">FastSLAM Tested on Toy Dataset</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/dubious.png" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Dubious Feature</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/unknow1_err.png" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Error Analysis on Toy Dataset</div>
      </div>
      <button class="w3-button w3-display-left w3-black" onclick="plusSlides(-1, this.parentNode)">&#10094;</button>
      <button class="w3-button w3-display-right w3-black" onclick="plusSlides(1, this.parentNode)">&#10095;</button>
    </div>
  </div>
</dialog>

<dialog class="project-modal" id="modal-origami">
  <div class="project-modal__panel">
    <button class="project-modal__close" type="button" data-close aria-label="Close">&times;</button>
    <h2>Car with Transformable Wheel Using Compliant Origami Mechanism</h2>
    <p>
      <i>VM 350 Design &amp; Manufacturing II</i>,
      <i>Advisor:</i>
      <a href="https://scholar.google.com/citations?user=HwQqch0AAAAJ&hl=en" target="_blank" style="color:#5DADE2;"><i>Prof. Ju Jaehyung</i></a>
    </p>
    <p>Laminated materials are used to fabricate compliant origami wheels, enabling flexible control of wheel diameter and improved adaptability to terrain variations.</p>

    <div class="w3-content w3-display-container" id="slideshow3">
      <div class="w3-display-container mySlides">
        <img src="/images/projects/car.png" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Assembling View</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/explosiveView.jpg" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Explosive View</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/Climbing.jpg" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Climbing</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/origamiWheel.gif" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Origami Wheel Transformation</div>
      </div>
      <button class="w3-button w3-display-left w3-black" onclick="plusSlides(-1, this.parentNode)">&#10094;</button>
      <button class="w3-button w3-display-right w3-black" onclick="plusSlides(1, this.parentNode)">&#10095;</button>
    </div>
  </div>
</dialog>

<dialog class="project-modal" id="modal-trebuchet">
  <div class="project-modal__panel">
    <button class="project-modal__close" type="button" data-close aria-label="Close">&times;</button>
    <h2>Controlled Trebuchet Car</h2>
    <p><i>VM 250 Design &amp; Manufacturing I</i></p>
    <p>Build a remote-controlled trebuchet car designed for accurate ball launching in competitive games.</p>

    <div class="w3-content w3-display-container" id="slideshow4">
      <div class="w3-display-container mySlides">
        <img src="/images/projects/trebuchetAssemble.jpg" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Assembling View</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/trebuchetExplosive.jpg" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Explosive View</div>
      </div>
      <div class="w3-display-container mySlides">
        <img src="/images/projects/shooting.png" style="width:100%">
        <div class="w3-display-bottomright w3-large w3-container w3-padding-16 w3-black">Shooting Mechanism</div>
      </div>
      <button class="w3-button w3-display-left w3-black" onclick="plusSlides(-1, this.parentNode)">&#10094;</button>
      <button class="w3-button w3-display-right w3-black" onclick="plusSlides(1, this.parentNode)">&#10095;</button>
    </div>
  </div>
</dialog>

<!-- Slideshow init (existing) -->
<script type="text/javascript" src="/assets/js/showSlides.js"></script>

<!-- Modal open/close behavior. Block comments only — Jekyll's compress_html
     strips newlines inside <script> tags, which breaks // line comments. -->
<script>
  (function() {
    /* Use the native <dialog> element with showModal(). The browser puts the
       dialog in its top layer, which sits above ALL other page content
       regardless of z-index or stacking contexts. The masthead, sidebar,
       footer all get covered by the ::backdrop. */
    function openModal(name) {
      var modal = document.getElementById('modal-' + name);
      if (!modal || typeof modal.showModal !== 'function') return;
      modal.showModal();
    }
    function closeModal(modal) {
      if (modal && typeof modal.close === 'function') modal.close();
    }
    var cards = document.querySelectorAll('.project-card[data-project]');
    for (var i = 0; i < cards.length; i++) {
      (function(card) {
        card.addEventListener('click', function(e) {
          e.preventDefault();
          openModal(card.getAttribute('data-project'));
        });
        card.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(card.getAttribute('data-project'));
          }
        });
      })(cards[i]);
    }
    /* Close button(s) inside each dialog. */
    var closers = document.querySelectorAll('.project-modal [data-close]');
    for (var j = 0; j < closers.length; j++) {
      (function(closer) {
        closer.addEventListener('click', function() {
          closeModal(closer.closest('dialog'));
        });
      })(closers[j]);
    }
    /* Click on the ::backdrop closes the dialog. We can't bind directly to the
       backdrop pseudo-element, but a click on the dialog itself outside its
       inner panel registers as a click on the dialog element. */
    var dialogs = document.querySelectorAll('dialog.project-modal');
    for (var k = 0; k < dialogs.length; k++) {
      (function(dlg) {
        dlg.addEventListener('click', function(e) {
          if (e.target === dlg) closeModal(dlg);
        });
      })(dialogs[k]);
    }
  })();
</script>
