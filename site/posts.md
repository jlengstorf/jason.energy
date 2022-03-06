---
layout: post-list

slug: posts
description: >
  I've made a ton of mistakes, learned a lot of lessons, and — in a few fortunate cases — figured out techniques that make my life more pleasant and fulfilling. I'll never tell you how to live your life, but I wrote down a little bit of how I live mine.
---

<div class="post-previews">
  {% for post in collections.posts %}
  {%- if post.data.image -%}
  <div class="post-preview" style="--bg-image: url({{post.data.image | cloudinary(post.inputPath, 420)}})">
  {%- else -%}
  <div class="post-preview" style="--bg-image: url({{post.data.seo_title | seoImage}})">
  {%- endif -%}
    <h2><a href="/{{post.data.slug}}/">{{ post.data.title }}</a></h2>
    <p class="description">{{ post.data.description }}</p>
    <span aria-hidden="true">read this post &rarr;</span>
  </div>
  {% endfor %}
</div>
