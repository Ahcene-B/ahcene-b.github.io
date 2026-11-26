---
layout: page
title: software
permalink: /software/
description: Open-source tools from my research.
nav: true
nav_order: 3
---

<!-- Each software has its own page in _pages/software/, with "software: true" in its front matter (and
     order, summary, img): it then appears here as a card. -->
{% assign items = site.pages | where: "software", true | sort: "order" %}
<div class="row">
{% for s in items %}
  <div class="col-sm-6 mb-4">
    <a href="{{ s.url | relative_url }}" style="text-decoration: none; color: inherit;">
      <div class="card h-100">
        {% if s.img %}<img src="{{ s.img }}" class="card-img-top" alt="{{ s.title }}">{% endif %}
        <div class="card-body">
          <h4 class="card-title" style="color: #000;">{{ s.title }}</h4>
          <p class="card-text" style="color: #333;">{{ s.summary }}</p>
        </div>
      </div>
    </a>
  </div>
{% endfor %}
</div>
