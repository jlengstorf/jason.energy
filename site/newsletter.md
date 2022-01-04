---
layout: default

title: Subscribe to my newsletter to get posts & updates delivered directly to your inbox.
seo_title: Subscribe to Jason's newsletter to get posts & updates straight to your inbox.
description: >
  I share my best posts in my newsletter. I also occasionally share updates and news when it's relevant and helpful.
---

<div class="opt-in">
  <div class="opt-in-image">
    <img loading="lazy" src="https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,c_fill,w_280,h_296/jason.af/opt-in.jpg" alt="Illustration of a letter with a heart on the top flap." />
  </div>
  <form action="/api/subscribe" method="POST">
    <label for="firstName">First Name</label>
    <input id="firstName" name="firstName" type="text" />
    <label for="email">Email</label>
    <input id="email" name="email" type="email" />
    <button type="submit">Subscribe</button>
    <p class="notice"><small>I will never share your personal information because I'm not a jerk.</small></p>
  </form>
</div>
