---
layout: plain
title: about
permalink: /
main_class: home
demo: true
description: Ahcène Boubekki, postdoctoral researcher at the University of Copenhagen and the Pioneer Centre for AI.
---

<div class="wrap">
    <div class="intro">
      <div class="intro-name"><h1>Ahcène Boubekki</h1><p class="role-line">Postdoctoral researcher</p></div>
      <div class="intro-body">
        <p>I work at the <a href="https://www.math.ku.dk/english/">Department of Mathematical Sciences</a> of the <a href="https://www.ku.dk">University of Copenhagen</a> and at the <a href="https://www.aicentre.dk/">Pioneer Centre for Artificial Intelligence</a>.</p>
        <p>I like opening black boxes: understanding what neural networks learn is, to me, the way to make them trustworthy. In practice, I work on it with <a href="https://www.aicentre.dk/yoda-yearning-to-operationalize-democratic-ai">the YODA initiative</a> (Yearning to Operationalize Democratic AI) at the Pioneer Centre, with Line Clemmensen and Sneha Das: workshops and meetups to share know-how and good practices, and to raise awareness of AI regulations such as the EU AI Act.</p>
        <div class="buttons">
          <a class="button primary" href="{{ '/assets/pdf/ABoubekki_CV.pdf' | relative_url }}">Résumé</a>
          <a class="button" href="{{ '/publications/' | relative_url }}">Publications</a>
        </div>
      </div>
      <div class="portrait demo">
        <canvas id="nave-canvas" width="210" height="280" role="img" aria-label="My photo, as regions found by NAVE with a random CNN, each painted in its average colour"></canvas>
        <img id="nave-photo" src="{{ '/assets/img/photo.jpg' | relative_url }}" alt="" hidden>
        <div class="demo-row">
          <button type="button" id="nave-toggle" class="demo-button" aria-pressed="true">Photo</button>
          <button type="button" id="nave-new" class="demo-button">New weights</button>
        </div>
        <label class="demo-row demo-label">Concepts <input type="range" id="nave-k" min="2" max="8" value="5" aria-label="Number of concepts"><output id="nave-k-out">5</output></label>
        <fieldset class="demo-row demo-blocks"><legend>Blocks</legend>
          <label><input type="checkbox" data-block="0"> 1</label>
          <label><input type="checkbox" data-block="1" checked> 2</label>
          <label><input type="checkbox" data-block="2" checked> 3</label>
        </fieldset>
        <p class="demo-caption">My photo through <a href="https://github.com/Ahcene-B/NAVE">NAVE</a>, with a random CNN running in your browser.</p>
      </div>
    </div>
  </div>
</div>

  <section class="wrap block" aria-labelledby="questions-title">
    <div class="block-head"><h2 id="questions-title">Research questions</h2></div>
    <div class="questions">
      <div class="question">
        <h3>Explainable AI</h3>
        <p>What concepts does an encoder learn during training? Which ones are important for the downstream task? Can we detect biases at the embedding or concept level?</p>
      </div>
      <div class="question">
        <h3>Trustworthy AI</h3>
        <p>How can we inspect and audit a model from its internal representation? Does a foundation model hold the features a task needs, and if not, can we seed them without retraining it?</p>
      </div>
      <div class="question">
        <h3>Representation learning</h3>
        <p>What is a good neighborhood for self-supervised learning? Can we build a model from pretrained blocks?</p>
      </div>
    </div>
    <p class="keywords">Trustworthy AI, mechanistic interpretability, explainable AI, representation learning, unsupervised methods, deep learning, machine learning.</p>
  </section>

  <section class="wrap block" aria-labelledby="pubs-title">
    <div class="block-head">
      <h2 id="pubs-title">Recent publications</h2>
      <a href="{{ '/publications/' | relative_url }}">All publications</a>
    </div>
    <ol class="rows">
      <li><span class="date">2027</span><div><span class="title">A five-step decomposition of how practitioners reason about the EU AI Act</span><span class="meta">A. Boubekki, O. Kokoulina, S. Das, L. H. Clemmensen. Innovative Applications of Artificial Intelligence (IAAI-27).</span></div><span></span></li>
      <li><span class="date">2026</span><div><a class="title" href="https://arxiv.org/abs/2509.15198" style="text-decoration: none">Explaining deep learning for ECG using time-localized clusters</a><span class="meta">A. Boubekki, K. Patlatzoglou, J. Barker, F. Siong Ng, A. H. Ribeiro. IEEE Transactions on Biomedical Engineering.</span></div><a class="go" href="https://arxiv.org/abs/2509.15198">Paper</a></li>
      <li><span class="date">2026</span><div><span class="title">Explainable AI needs formalization</span><span class="meta">S. Haufe, R. Wilming, B. Clark, R. Zhumagambetov, A. Boubekki, J. Martin, D. Panknin. npj Artificial Intelligence 2, 42.</span></div><span></span></li>
      <li><span class="date">2026</span><div><a class="title" href="https://doi.org/10.1007/978-3-032-37664-0_26" style="text-decoration: none">Multi-depth Concept Extraction for Post-Hoc Vision Encoder Explanation</a><span class="meta">A. Boubekki, S. G. Fadel, S. Mair. ECML PKDD, Springer.</span></div><a class="go" href="https://doi.org/10.1007/978-3-032-37664-0_26">Paper</a></li>
      <li><span class="date">2026</span><div><a class="title" href="https://arxiv.org/pdf/2603.28466" style="text-decoration: none">Post-hoc Self-explanation of CNNs</a><span class="meta">A. Boubekki, L. Clemmensen. ICLR 2026 Workshop on Unifying Concept Representation Learning.</span></div><a class="go" href="https://arxiv.org/pdf/2603.28466">Paper</a></li>
      <li><span class="date">2025</span><div><span class="title">SuperCM: Improving Semi-Supervised Learning and Domain Adaptation through differentiable clustering</span><span class="meta">D. Singh, A. Boubekki, R. Jenssen, M. Kampffmeyer. Pattern Recognition.</span></div><span></span></li>
    </ol>
  </section>

  <section class="wrap block" aria-labelledby="talks-title">
    <div class="block-head">
      <h2 id="talks-title">Recent talks and events</h2>
      <a href="{{ '/talks/' | relative_url }}">All talks</a>
    </div>
    <ol class="rows">
      <li><span class="date">24 Nov 2026</span><div><span class="title"><span class="role">Organizer</span>Practices of Trustworthy AI</span><span class="meta">Meetup of the Claude Community Copenhagen and YODA, Copenhagen</span></div><a class="go" href="https://luma.com/claude-bdg0">Event</a></li>
      <li><span class="date">4 Nov 2026</span><div><span class="title"><span class="role">Talk</span>The AI Act in Five Steps</span><span class="meta">AI Denmark 2026, Digital Tech Summit, Copenhagen</span></div><span></span></li>
      <li><span class="date">27 May 2026</span><div><span class="title"><span class="role">Talk</span>Under the Hood of Black-Box Models: Deciphering Neural Networks with NAVE</span><span class="meta">Driving AI 2026, IDA Conference, Copenhagen</span></div><span></span></li>
      <li><span class="date">7 May 2026</span><div><span class="title"><span class="role">Organizer</span>YODA Workshop</span><span class="meta">Copenhagen</span></div><a class="go" href="https://www.aicentre.dk/yoda-yearning-to-operationalize-democratic-ai">Page</a></li>
      <li><span class="date">2026</span><div><span class="title"><span class="role">Workshop</span>D3A workshop: Tools and Methods for Operationalizing the AI Act in Research and Industry</span><span class="meta">Copenhagen</span></div><span></span></li>
    </ol>
  </section>

  <section class="wrap block" aria-labelledby="software-title">
    <div class="block-head">
      <h2 id="software-title">Software</h2>
      <a href="{{ '/software/' | relative_url }}">All software</a>
    </div>
    <div class="cards">
      <a class="card" href="{{ '/software/nave-xai/' | relative_url }}">
        <img src="https://raw.githubusercontent.com/Ahcene-B/NAVE/main/docs/assets/example.png" alt="">
        <div class="body"><h3>nave-xai</h3><p>NAVE explanations of CNN and ViT encoders, extended to time-series and text encoders. Includes a GIMP 3 plugin.</p><span class="tech">Python package, MIT license</span></div>
      </a>
      <a class="card" href="{{ '/software/admuter/' | relative_url }}">
        <img src="{{ '/assets/img/admuter.png' | relative_url }}" alt="">
        <div class="body"><h3>AdMuter</h3><p>An Android app that mutes YouTube ads, or plays your own sound instead.</p><span class="tech">Android app, MIT license</span></div>
      </a>
    </div>
  </section>
  <div class="about-end"></div>
