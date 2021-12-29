---
date: 2021-01-07
slug: yeet-delete-repeat
title: Yeet. Delete. Repeat.
description: >
  We need to ship fast, learn fast — and do it all without burying ourselves in technical debt. Here's one way to set up your team for success.
category: impact
tags: [business, productivity, success, teams]
seo_title: Yeet. Delete. Repeat. How to learn fast and not make a mess.
image: ./images/yeet-delete-repeat.jpg
useImageForSEO: true
cta: default
---

To survive, companies need to provide something valuable to their customers. To know what's valuable, companies need to get feedback. To get feedback, companies need to ship. And to do all of this without wasting huge amounts of time, money, and momentum, companies need to do all three of these *quickly*.

Let's talk about a strategy for moving quickly *without* breaking things or burning out your team.

## Not shipping has high business and emotional costs.

Every company has its list of "we should" and "what if" ideas. In growing companies, this list often ends up collecting dust because there's *so much to do* that [squishy projects](https://www.jason.af/squishy-projects) like these get pushed back indefinitely in favor of more concrete, immediate needs.

Working on immediate needs puts out fires, but it leaves the company in a reactive pattern. This is high stress and can be demotivating, especially if the teams doing the firefighting wish they had time to experiment. 

{% aside "spicy" %}
  **Hot take:** let's pause before anyone objects with, "No one cares if the team is demotivated or stressed! We only care about Results!" Even if you're trying to be a utilitarian BossBot™ about it, we can draw a clear connection from stress and demotivation to high churn and low productivity.
{% endaside %}

No one wants this outcome — so how do we avoid it?

## Protect time to create dual project streams.

Carving out and protecting time for teams to work on squishy ideas is critical for businesses to keep stay innovative and motivated. This time can be allocated in any number of ways:

- quarterly hackathons
- every 4th sprint is dedicated squishy projects
- one day a week

In a perfect world, **teams will have parallel work streams: one dedicated to the well-defined, urgent, load-bearing projects, and one dedicated to exploring** and pursuing the "what ifs" and "we shoulds".

To make parallel work streams sustainable, the exploratory work needs to happen within clearly defined boundaries.

And to that end, dear reader, I humbly suggest adopting **the YEET DELETE REPEAT pattern.**

{% aside %}
  If you're hearing the word "yeet" for the first time: it's youth slang for moving quickly, showing excitement, and throwing something. It's also important to note that — now that I've used this word — it is no longer cool.
{% endaside %}

## Yeet experiments to small test groups as quickly as possible.

Teams should aim to complete an experiment as quickly as possible, which means aggressively scoping down to test a single hypothesis. By limiting the size of the project, the team is forced to focus on the core of the idea, which makes it easier to nail down what the ideal outcome looks like and measure whether the project succeeded.

Then, using small test groups through feature flags, closed betas, or whatever channel the company gathers feedback through, the experiments should *ship*. Immediately. Like, the day they meet the minimum threshold for letting a real person look at them.

Just... please just ship it. Stop thinking about it. Ship. For the love of god. Yeet it and start getting feedback.

{% aside %}
  **Remember:** the goal of an experiment is not to be perfect or ready to roll out everywhere. The goal of an experiment is to find out if the idea is worth pursuing further. The longer we delay shipping the experiment, the more time and money we've spent trying to perfect something that our customers might not want at all.
{% endaside %}

## Delete experiments after collecting all the research.

One of the major complaints about shipping quickly is that it creates overwhelming technical debt. I've worked in companies where this is the case, and I've felt the pain of digging into an undocumented weekend project that's somehow the only thing keeping a core part of the product functioning.

We *do not* want to create that problem for ourselves. Instead, we want to [optimize for deletion](https://www.netlify.com/blog/2020/10/28/optimize-for-deletion-speed-up-development-without-adding-risk/?utm_campaign=devex-jl&utm_source=jason.af&utm_medium=yeet-delete-repeat&utm_content=optimize-for-deletion) — and delete our experiments by default.

To avoid technical debt, experiments should be deleted as part of collecting research. If possible, ship the experiment as an entirely separate codebase. Barring that, build the entire feature into one squash commit that can be reverted. No matter how you build it, assume that the experiment will be completely erased once it's complete.

Once your team has enough research to make a decision, delete the experiment. Add a production version of the project to your load-bearing workstream and include the research and deleted code for reference. Make sure the production project doesn't start with a mess.

{% aside %}
  **Remember:** the goal of the experiment is to *learn*, not to ship a permanent feature. If and when the feature is validated, the team can choose to use some or all of the experimental work if they decide it's not a tech debt risk, but the true value of the experiment is knowing that the huge amount of work that goes into a permanent feature is backed by data proving that customers find it valuable.
{% endaside %}

## Repeat the process and keep the momentum going!

If this process is set up well, teams can quickly ship experiments, then work on load-bearing projects while data is collected to validate the experiment. This means the critical work to keep the wheels on is getting done *as well as* the exploratory work that unlocks innovation.

It may seem counterintuitive, but creating space for an experimentation pipeline will *increase* productivity on the production pipeline:

- Rapid experimentation quickly pares down a crowded backlog, creating more clarity on which features are the most valuable to customers and the company
- Validated projects are more likely to be correctly scoped because discovery work was already done during experimentation

Even without these benefits, teams that have the autonomy to try things and influence the company's decision-making tend to feel more in control of their careers, which has the wonderful side effect of making your company a place that people *enjoy* working (for the BossBots™ out there: that means increased engagement, higher productivity, and lower turnover).

{% aside %}
  **Remember:** healthy teams need to keep momentum going in several directions at once to avoid getting bogged down and burned out. By creating dual work pipelines to focus on experimentation and production work in parallel, teams are able to keep momentum and motivation high while reducing risk, bottlenecks, and burnout.
{% endaside %}

## Learn fast and try not to make a mess.

No process is perfect, and we'll all need to bring the nuance and context of our own companies into the design of a parallel workflow design. If we take the time to do it, though, building the habits, and processes — as well as the team trust and safety — that make parallel workflows possible will pay dividends across multiple areas of the company.

Plus, it's super fun to say: **YEET. DELETE. REPEAT.**

Try it.

...did you say it?

See? Super fun.
