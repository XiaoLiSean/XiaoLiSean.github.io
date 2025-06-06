---
title: "Seannet: Semantic Understanding Network for Localization under Object Dynamics"
collection: publications
permalink: /publication/2021-10-05-ArXivSeanNet
---

<i><b>Xiao Li</b></i>,  <i>Yidong Du</i>, <a href="https://www.zhenzeng.org/" target="_blank" style="color:#7a8288;"><i>Zhen Zeng</i></a>,  <a href="https://ocj.name/" target="_blank" style="color:#7a8288;"><i>Chad Jenkins</i></a> 

We aim for domestic robots to perform long-term indoor service. Under the object-level scene dynamics induced by daily human activities, a robot needs to robustly localize itself in the environment subject to scene uncertainties. Previous works have addressed visual-based localization in static environments, yet the object-level scene dynamics challenge existing methods for the long-term deployment of the robot. This paper proposes a <b>SE</b>mantic underst<b>AN</b>ding <b>Net</b>work (SeanNet) architecture that enables an effective learning process with coupled visual and semantic inputs. With a dataset that contains object dynamics, we propose a cascaded contrastive learning scheme to train the SeanNet for learning a vector scene embedding. Subsequently, we can measure the similarity between the current observed scene and the target scene, whereby enables robust localization under object-level dynamics. In our experiments, we benchmark SeanNet against state-of-the-art image-encoding networks (baselines) on scene similarity measures. The SeanNet architecture with the proposed training method can achieve an 85.02% accuracy which is higher than baselines. We further integrate the SeanNet and the other networks as the localizers into a visual navigation application. We demonstrate that SeanNet achieves higher success rates compared to the baselines. 

[<a href="https://github.com/XiaoLiSean/Cognitive-Map/tree/CoRL2021" target="_blank" style="color:#5DADE2;">code</a> <span>&#183;</span> <a href="https://arxiv.org/abs/2110.02276" target="_blank" style="color:#5DADE2;">arXiv</a>]

<br>
<hr>
<b>Automated Coffee Making by a Domestic Robot</b> 
<div class="w3-content w3-display-container" id="slideshow3">
  <div class="w3-display-container mySlides">
    <img src="http://XiaoLiSean.github.io/images/serviceTask.gif" style="width:100%">
  </div>
</div>

