---
date: 2021-01-09
slug: convince-the-team
title: Convince your team to learn fast and try not to make a mess
description: >
  People asked how to overcome objections from team members, management, & leadership when trying to adopt change. These ideas might help.
category: impact
tags: [business, productivity, success, teams]
seo_title: How to convince your team to learn fast and try not to make a mess
image: ./images/learn-fast-try-not-to-make-a-mess.jpg
useImageForSEO: true
cta: default
---

In previous posts, I've been working through some ideas around building more productive teams. These ideas are centered around two major themes so far:

1. **[The type of work we do in any company happens on a spectrum](https://www.jason.af/squishy-projects), and our internal processes need to be flexible enough to adapt and support the type of work being done.** Success depends on the completion of well-defined, production-ready work ("load-bearing projects") as well as validating ideas from research, team members, and customer feedback ("squishy projects").
2. **We need to take care of existing customers and products while continuing to explore and innovate. That requires deliberate effort to set up and sustain.** Exploratory work and production should happen in parallel workstreams that complement and strengthen each other (what I lovingly call [the Yeet Delete Repeat pattern](https://www.jason.af/yeet-delete-repeat)).

In further discussions with friends and folks around the community, questions came up that are worth addressing — let's do that in this post.

{% aside %}
  **Heads up:** I've paraphrased and combined questions here to avoid naming or shaming any teams.
{% endaside %}

## What if our problem is that we focus too much on squishy projects?

> In our company, a lot of the squishy projects that show promise go directly to production, even though they were meant to be experimental. We have so many ideas coming from our own team and customers that we don't seem to be able to slow down and work on stability.

Especially in startups, this can be a huge challenge. If leadership is pushing hard for new features and unwilling to prioritize work on stability, tech debt, or general quality improvements, it can feel like *everything* on the roadmap is squishy and the entire product is held together with duct tape, wishes, and an increasingly frazzled team of ops engineers.

This is a hard problem to solve, and — depending on the maturity of the company's leadership — it may prove to be a lost cause. Each company is different, so it's on us to assess our own situations and decide when it makes sense to push for change, and when it makes sense to look for a role that's better aligned with our working style.

However, there are some strategies that I've used in the past that can help turn the ship toward more sustainable, less stressful practices.

### Find the dirt floors

To make any meaningful change, we need to understand why things are the way they are. This means [we need to find the dirt floors](https://www.jason.af/dirt-floors): what is *causing* leadership to think this way?

To use an analogy, if there's a bucket in the middle of the floor you might say, "This bucket is a tripping hazard and we should move it." If leadership responds, "Can't. We have to have the bucket there," that might seem illogical and stubborn. With a little digging, though, you might learn the root cause is a leaky roof, and the bucket catches the water. If you know about the leaky roof, you can stop complaining about the bucket and focus on the roof — once the roof is fixed, the bucket's no longer necessary and no one will care if you remove it.

### Focus on the win-win

When explaining the benefits of something, it's tempting to talk about what's in it for *me:* "Cleaning up this tech debt means I won't have to dig through frustrating code and make changes in multiple places for every feature!"

While true, this doesn't present a compelling argument to managers and leaders who have their own challenges and problems. I've made this case in the past, and the response I got was along the lines of, "Well, we pay you to dig through code and add features, so maybe suck it up and do your job?"

Tech debt doesn't *only* affect the people doing the work, though! If we think about what the manager is struggling with, we can rephrase our request and include how it benefits *them* instead: "The delays in shipping are due to the complexity of this older area of the code. If we take a sprint to clean this up, we should be able to deliver things *much* faster!"

Put yourself in the shoes of the person you're attempting to win over, and try to understand why they're stressed out (remember: where are the dirt floors?). Present a concrete plan that solves their personal problems and you have a much better chance of getting buy-in.

## What if people on the team tend to treat the first draft as the final draft?

> My team always jokes that "the first draft is the final draft, so make sure you bring something solid." Because of this, people tend to work quietly on projects for a long time before showing them. It's a Catch-22 because we have trouble getting buy-in if it's not polished, but the more polished it is, the more likely it gets shipped as a final draft.

This is something I've run into in multiple companies, and I've personally been guilty of keeping something quiet until I felt like it was perfect to avoid getting nitpicked into oblivion by people who thought we were reviewing for production.

A parallel workstream for validation and production is designed to solve exactly this problem, but that might not be apparent at first.

### Providing structure and space removes anxiety

Creating an actual process for experimental work, processes to support it, and clear expectations about how things move from idea to validation to production creates reliability in your team's environment. It helps to remove the anxiety around exploration, because exploration is no longer an extra activity, but *part of the job*.

Removing the mystery around where ideas come from creates stability, reliability, and — most importantly — a foundation for trust. And, as [Amberley Romo reminded me](https://twitter.com/amber1ey/status/1345054006884896770), no amount of process will help if the team doesn't have trust.

This kind of stability and trust is also called _psychological safety_, which is [a strong predictor of team performance](https://services.google.com/fh/files/misc/state-of-devops-2019.pdf).

### Don't forget the "delete" part of "Yeet Delete Repeat"

Building deletion into the process is extremely important. Without deletion, a prototype can leak into the broader codebase, making it both fragile and hard to remove, and that's how tech debt is born.

The validation workstream needs to have a heavy focus on sandboxing experiments, releasing only to limited test groups, and [optimizing for deletion](https://www.netlify.com/blog/2020/10/28/optimize-for-deletion-speed-up-development-without-adding-risk/?utm_campaign=devex-jl&utm_source=blog&utm_medium=jason.af&utm_content=optimize-for-deletion). **I also strongly recommend that the last step of an experimental project should be to delete the project.**

If the project is greenlit for production, the team who picks up the project shouldn't have to start by cleaning up a mess. They should have the data and the original code available for reference, but they should be starting with no code actually committed — it's important that they can make decisions without the influence of inertia skewing the outcomes.

{% aside %}
  **Heads up!** Deleting code after validation is something I do even for personal projects. For example, when I teach workshops, I build the teaching project once, think about what could improve and what I'd do differently, then delete it and build it again using that information. It leads to cleaner, easier to explain code because it separates the process of "can I make this work at all?" from "how do I do this properly?"
{% endaside %}

## How do we convince management it's a good idea to work on something that won't go to production?

> I would have trouble convincing management it's a good idea to spend time working on something that won't go to production. They see this kind of stuff as a distraction.

At the heart of every company is the need to survive, and the only way a company can survive is by continuously shipping valuable things to production that keep customers happy (and paying).

On the surface, a workstream dedicated to validating squishy ideas might seem like a waste of resources — and it definitely can be! I've seen several "experimental" teams spun up at companies that focused on innovation and exploration, but failed to create any meaningful impact or benefit for the company.

How is working on squishy projects and creating a workstream for validation different from those failed attempts?

### The validation pipeline is part of the production process

Experimental teams that are isolated from the rest of the company are able to act quickly and autonomously, but they're also completely out of the loop. The barriers that protect the team from red tape and slowdowns are *also* barriers preventing the team from feeding value back into the company.

Unless the experimental team is working on something entirely separate from the rest of the company — a true [skunk works project](https://en.wikipedia.org/wiki/Skunkworks_project), which by definition should be short-lived — adding barriers sets the team up for failure.

To avoid this, the experimental side of the dual workstream approach serves to identify, scope, derisk, and validate experimental ideas that immediately go into the production pipeline.

{% aside "spicy" %}
  **Hot take:** all of the validation work happening in the experimental workstream will get done whether or not it's planned for. The difference is that companies who put a full production team and process on ideas before validating them spend far more time and money on it.
{% endaside %}

### Dual workstreams avoid production bottlenecks

In many companies, there are a huge number of unexplored opportunities that could improve the product, add more value, and make a huge impact. Many of those ideas are captured in "parking lots" or iceboxes or aging Jira tickets because they're not formal enough to get prioritized in a production pipeline.

At the opposite end of the spectrum, ideas can end up on the product roadmap because someone with enough power was willing to champion the project.

Combined with the list of projects determined through research, customer feedback, and other production channels, this can lead to a sense of both being overwhelmed by the amount of things to do and feeling powerless to influence the roadmap because ideas from team members don't have champions to push them through prioritization.

A validation pipeline acts as a stabilizer: by working on ideas with a "learn fast and don't make a mess" mindset, it's less challenging to get an idea prioritized for validation; by creating a culture of validation before adding a project to the production workstream, it's harder for a pet project to leapfrog the queue and clog up the product roadmap.

## What happens if stakeholders don't care if a project is a long-term success?

> If someone in leadership or management is trying to ship a project so they can land their next raise or promotion, they don't necessarily care if they're saddling the team with a bunch of tech debt; they just want to ship to production so they can show that they delivered something.

In some companies, the incentives get misaligned and promotions and raises get tied to *visible delivery* with very little concern for long-term cost or maintainability. (For a solid breakdown of how "doing good work" gets decoupled from "deserves a promotion", read this post from Michael Lynch about [why he quit his job at Google](https://mtlynch.io/why-i-quit-google/).)

If that sounds like your company, and you decide it's worth sticking it out and trying to make positive change, here are a few strategies you can try.

### You can ship more and faster by embracing experimentation

Visibly shipping something, as far as I can tell, boils down to having something you can link to or share metrics from. And by that standard, leadership can visibly ship *so much more* by adopting the parallel workstream process.

Experiments are small, have clear success metrics, and make a big impact on the company's bottom line. While I was at IBM, my team was able to ship multiple experiments faster than other teams delivered a single feature. The validation research from those experiments helped us avoid person-months of effort on ideas that didn't work, which meant we shipped production features faster because we had more information about what success looks like.

**Everyone I worked with on that team got promoted.** My old manager has been promoted twice. This process made us *more* visible, and *more* likely to get a promotion.

This goes back to the idea of finding the win-win. This process truly is better for everyone; we just have to help the whole team see the individual benefits *for them*.

### Shipping responsibly compounds wins until it seems like magic

Managers and leaders who not only ship, but who ship things supported by data that make measurable, positive improvements to the product get promoted further and faster. **Investing in learning fast and not making a mess helps teams (and leadership) appear to be superhuman: they have tons of new things shipping with clear metrics on what's working and what's not; they have fewer projects that go over schedule or end up failing after months of effort; they have great team dynamics, trust, and engagement; they rack up meaningful wins reliably.**

This isn't magic — working quickly to learn whether or not something is a good idea both racks up the "we shipped!" wins while *also* quickly identifying which projects will be successful. Only putting validated projects into production lets teams work with confidence and clarity to deliver production-ready wins consistently. Being on a team that ships things is extremely motivating, and the higher communication required for this process builds more trust among team members.

I've seen multiple teams pull this off at companies of wildly varying sizes. The secret isn't in who the team is or how big the company is; it's in creating the right environment and processes that let teams thrive.

## The process alone isn't enough — the team needs to be bought in

These questions all point to a larger challenge: to get the benefits of a dual workstream, the whole company (or at least the whole team) needs to be bought in and willing to follow the process. This isn't unique; the work required for any idea to succeed is 20% building the tool and 80% driving awareness and adoption of the tool.

{% aside "spicy" %}
  **Hot take:** driving adoption and consensus on a team relies heavily on great communication and trust on the team.  If that's not there, no amount of process can save you — instead, focus on the root problem and identify the things causing the breakdown of trust and communication. If you don't solve that first, you're dead in the water.
{% endaside %}

This means that it doesn't matter whether we think this approach is correct. What matters is whether or not we can bring this approach to our team, discuss the trade-offs, and arrive at an approach that we all agree works and — critically — that we're all willing to adhere to.

But if we're willing to do that work, the benefits (to us as individuals, to our team, to the company, and to our customers) are incredible. It's work well worth doing.
