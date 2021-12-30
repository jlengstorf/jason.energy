---
date: 2018-09-09
slug: dirt-floors
title: >
  Dirt Floors: How to Stop Putting Out Fires and Solve the Real Problem
description: >
  What do dirt floors have to do with going to school? And what does any of 
  that have to do with working more effectively?
category: impact
tags: [teams, business, productivity]
image: ./images/dirt.jpg
cta: focus
---

In every company I’ve ever worked with, there’s a paradox: everyone seems to want to do things that make the product (or service) better, yet the work to actually _do that_ never seems to get done.

This isn’t because {% footnote id="incompetent" %}everyone in the company is incompetent.{% endfootnote %}

{% footnoteText id="incompetent" %}
Yes, yes, I know that _your_ bosses and coworkers are all incompetent. But that poses an interesting philosophical question: if a company is operated by incompetent people who only hire other incompetent people, what does that say about you, the person who was also hired work there?

It seems more plausible that the people you work with are pretty good at their jobs, but aren’t prioritizing the things you want them to.
{% endfootnoteText %}

In my experience, the problem is rarely incompetence. Instead, {% footnote id="me" %}the problem stems from leadership{% endfootnote %} missing the Big Problems and burning all available time and energy chasing little problems — which are really just the visible symptoms of the Big Problems.

{% footnoteText id="me" %}
In at least one of these scenarios, leadership was me.
{% endfootnoteText %}

{% figure
  creditLink="https://unsplash.com/photos/LPEWE3RmFp0",
  credit="Wes Hicks"
%}
![Leaves on dirt.](images/dirt.jpg)
{% endfigure %}

## What do dirt floors have to do with skipping school?

Let me veer off into a seemingly unrelated story to illustrate a point: imagine you’re tasked with getting kids to show up to school. If we approach this from a standard business angle, we might start by looking at the education system: is the curriculum engaging? Are the kids being supported? {% footnote id="leave" %}Can we incentivize attendance somehow?{% endfootnote %} Maybe we should look at the buses and other transportation?

{% footnoteText id="leave" %}
Beyond the traditional incentive, of course, which is, “If you graduate, you _never have to come back here again_.”
{% endfootnoteText %}

And if those efforts failed to improve attendance, we might throw up our hands and call the kids unreachable, or blame their parents and community: “Look, we tried! These kids just don’t want to learn! These people don’t value education!”

The schools, though, are only one part of a much more complex system. The kids going to school are part of a community, and that community is impacted by countless other variables that aren’t visible within the context of the schools themselves.

However, if we take a step back and look at the system as a whole we might start asking different questions:

Do these kids want to be in school? (They do.)

Why are they missing school? (They’re sick.)

**If we slow down to ask questions before trying to fix the problem, we can see that the problem we _actually_ need to solve is different than what we assumed at the start.** This starts a deeper line of questioning.

Why are these kids sick? (They have parasitic worms and other infections.)

Why do they have worms? (They live in houses with dirt floors.)

Through this line of questioning, we’ve discovered a deeper problem. And it leads to a solution that might seem nonsensical at first: “if we want more kids to attend school, we need to address the dirt floors in their houses.”

But the data supports this: [deworming children reduces absenteeism](http://emiguel.econ.berkeley.edu/research/worms-identifying-impacts-on-education-and-health-in-the-presence-of-treatment-externalities) at school by about 25%, and replacing dirt floors with cement [reduces parasitic infestations by 78%](https://openknowledge.worldbank.org/bitstream/handle/10986/7295/wps421401update1.pdf?sequence=1).

## Where are the dirt floors in our projects?

In my experience, every organization has at least one “dirt floor” problem.

When I was a front-end architect at IBM, my team was supposed to be improving the performance of several problematic UIs. As we started our research, we realized that there was more than just front-end development involved: our teams were burning a huge amount of time and energy struggling with {% footnote id="yak-shaving" %}seemingly unrelated tasks{% endfootnote %} — by the time they got to performance tuning, they were already stressed out, exhausted, and up against looming deadlines.

{% footnoteText id="yak-shaving" %}
Here’s an incomplete list of things a front-end developer at IBM needed to do before they were able to actually start working:

- Learn where multiple code projects lived
- Install each of those code projects
- Find the developer who built the project to ask why it isn’t working and get help troubleshooting it
- Install networking software
- Configure that networking software
- Find about a dozen secret keys and other credentials that weren’t documented anywhere
- Wait for Chuck (not his real name) to get back from lunch so he could restart the service that had locked up
- Read through hundreds of lines of undocumented code to figure out what the hell was going on in the first place

This isn’t a problem that’s unique to IBM.
{% endfootnoteText %}

We couldn’t just say, “Hey, team, focus on performance!” They would agree with that — we all knew performance was what we’d agreed to prioritize. However, after spending multiple days fighting with all the unrelated-but-unavoidable work, there just wasn’t enough time or energy left to do the job properly.

**Before we could fix our performance problems, we needed to fix our dirt floors.** We built a few small, internal utilities to remove that frustration: a one-click configuration tool for development environments, a helper library that eliminated a bunch of busywork, an [improved data layer](https://youtu.be/T3FbZsYXi50) to make it easier to understand what was going on.

Once we fixed the dirt floors, we started making incredible progress on timelines that seemed {% footnote id="physics" %}bureaucratically impossible.{% endfootnote %}

{% footnoteText id="physics" %}
It’s an incontrovertible law of business that the timeline for a project increases exponentially by the number of people who have to approve it.
{% endfootnoteText %}

By dedicating time to correcting the underlying problems, we went from every developer in the organization wasting multiple days setting up their development environment, to a couple developers spending a week building helper tools.

We slowed down, fixed the root problem, and as a result saw {% footnote id="gstgf" %}sweeping improvements across our entire organization.{% endfootnote %} Our developers were able to actually focus on the performance of their project, and other teams were able to work on their actual goals instead of [yak shaving](/yak-shaving/) for days to get there.

{% footnoteText id="gstgf" %}
Another way to put this is to “go slow to go fast” — before acting, take a minute to think things through, plan, and _then_ act. Otherwise you risk doing the wrong thing and wasting a bunch of time chasing the wrong problem.
{% endfootnoteText %}

## Where are your dirt floors?

What problems might be at the root of other problems in your career? In your life? What are you ignoring that might be at the root of your other problems?

Take a few minutes to [Find the Why](/find-the-why/) behind some of your biggest frustrations, and see if you’ve got some dirt floors to get rid of.
