---
layout: plain
title: software
permalink: /software/
description: Open-source software by Ahcène Boubekki.
---

<h1 class="page-title">Software</h1>
<p class="page-lead">Open-source code from my research, and a small app.</p>

<!-- Each software has its own page in _pages/software/, with "software: true" in its front matter
     (and order, summary, img, tech): it then appears here as a card. -->
{% assign items = site.pages | where: "software", true | sort: "order" %}
<div class="cards">
{% for s in items %}
  <a class="card" href="{{ s.url | relative_url }}">
    {% if s.img %}<img src="{{ s.img | relative_url }}" alt="">{% endif %}
    <div class="body">
      <h3>{{ s.title }}</h3>
      <p>{{ s.summary }}</p>
      {% if s.tech %}<span class="tech">{{ s.tech }}</span>{% endif %}
    </div>
  </a>
{% endfor %}
</div>
