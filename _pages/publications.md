---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if site.author.googlescholar %}
  <div class="wordwrap">Latest articles in my <a href="{{site.author.googlescholar}}"> Google Scholar profile</a>.</div>
{% endif %}

{% include base_path %}
<hr />
<h2>Preprints</h2>

<hr />
<!-- ============================================================================ -->
<br>
Autonomous Driving With Perception Uncertainties: Deep-Ensemble Based Adaptive Cruise Control
<br>
<!-- ============================================================================ -->
<br>
Interaction-Aware Decision-Making for Autonomous Vehicles in Forced Merging Scenario Leveraging Social Psychology Factors
<br>
<!-- ============================================================================ -->
<br>
System-level Safety Guard: Safe Tracking Control through Uncertain Neural Network Dynamics Models
<br>
<!-- ============================================================================ -->
<br>
Decision-Making for Autonomous Vehicles with Interaction-Aware Behavioral Prediction and Social-Attention Neural Network
<br>
<!-- ============================================================================ -->
<br>
Set-theoretic Localization for Mobile Robots with Infrastructure-Based Sensing
<br>
<!-- ============================================================================ -->
<br>
Seannet: Semantic Understanding Network for Localization under Object Dynamics
<br>
<!-- ============================================================================ -->
<br>
Modeling and Control of Diesel Engine Emissions using Multi-layer Neural Networks and Economic Model Predictive Control
<br>
<!-- ============================================================================ -->
<br>
Model Predictive Control of Diesel Engine Emissions Based on Neural Network Modeling
<br>
<!-- ============================================================================ -->

<!-- New style rendering if publication categories are defined -->
<!-- {% if site.publication_category %}
  {% for category in site.publication_category  %}
    {% assign title_shown = false %}
    {% for post in site.publications reversed %}
      {% if post.category != category[0] %}
        {% continue %}
      {% endif %}
      {% unless title_shown %}
        {{ category[1].title }}<hr />
        {% assign title_shown = true %}
      {% endunless %}
      {% include archive-single.html %}
    {% endfor %}
  {% endfor %}
{% else %}
  {% for post in site.publications reversed %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %} -->