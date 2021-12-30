---
layout: default

title: Software, Gear, and Other Things Jason Lengstorf Uses
description: >
  I get a lot of questions about what gear, software, and other stuff I use. To make it easier to share, I've collected a list here.≈
---

{% aside %}
**Heads up!** I actually use everything listed here. A few of the links on this page will send me a little money if you click them and buy the thing. If you're not comfortable with that, I tried to include model numbers so it's easy to search.
{% endaside %}

## Gear

{% for item in uses.items.gear %}
{% uses item %}
{% endfor %}

## Software

{% for item in uses.items.software %}
{% uses item %}
{% endfor %}
