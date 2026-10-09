---
title: 'Manual code review does not scale anymore (and what to do instead)'
date: 2026-10-09 00:00:01
description: 'AI agents generate code much faster than sapiens can review it. Maybe code reviews have turned into just a ritual from old times'
tags: ['ai', 'programming', 'workflow']
translationOf: code-review-artesanal-nao-escala-mais-e-o-que-fazer-no-lugar
---

Manual code review does not scale anymore

AI agents generate code much faster than sapiens can review it, and that slows down the pipeline and turns into the famous **LGTM** on autopilot

I've been working on a different approach to this problem for at least 1 year, and this post is about it

The idea is not to stop reviewing. It's to change **what** we review and **when**, because the place where the review happens today is no longer the place where the decisions are made

## What a code review is for

Before changing the process, it's worth remembering why it exists. Code reviews have always had two main purposes:

- **Catching bugs or wrong decisions:** a second person looks at what the first one missed, whether it's a logic error, an edge case or a choice that will cost a lot later
- **Spreading knowledge of the code across the team:** whoever reviews learns how that part works, and whoever wrote it explains the reasons behind the choices

Notice that neither purpose is "check line by line". Reading line by line has always been the means, never the goal. As long as the means worked, nobody had to question the goal

## What breaks when agents generate the PR

On a team that reviews everything by hand, PRs start being created much faster than they can be followed. An agent puts together in minutes a PR that a person would take a day to write, and the reading time stays the same as always

The result is a queue. And nobody wants to be the bottleneck in the queue, so the pressure goes all in one direction: approve quickly

Then what everyone has already seen happens:

- The PR that is too big gets an "LGTM" after a quick pass, because really reading everything doesn't fit in the day
- The review spreads less knowledge, because nobody really understood what changed
- The review becomes irrelevant, because nobody read it carefully

So the review loses its reason to exist and becomes just a ritual from old times

The two purposes it had go unfulfilled, and the team keeps spending time on something that, in most cases, simply doesn't add value anymore

## Reading the PR only shows what changed

There is a deeper problem than speed. A diff shows **what** changed, but the **why** behind each choice doesn't live in the diff. It lives in the docs, the specs or the plan that came before the code

The mental model, the architecture decisions and the reasons for each path are in those documents. When the review starts only at the PR, whoever reviews has to rebuild the reasoning by looking at the result, and that is the most expensive part and the easiest one to get wrong

That's why it makes more sense for the review to start where the decisions are made, and not where they have already become code

## A 3-layer path

The approach I use shifts the focus of the review to three fronts that complement each other. None of them works well on its own

### 1. The team learns before the code

The first layer is reviewing **docs, specs and plans before the AI implements**. This is where the real decisions live:

- Architecture: where the change lives and what it touches
- Contract: what goes in, what comes out, who depends on it
- What must not change: what the implementation is not allowed to break
- How it will scale: what happens when the volume or the number of uses grows

This spreads the reasons across the team, which was one of the original purposes of the review, only now before the code exists. Whoever reads the spec understands the decision, not just its result

And there's a cost gain that we feel fast: fixing a wrong decision here can save **thousands of tokens and hours of work**. Changing a paragraph of a spec is cheap. Changing a whole PR that is already implemented, with tests and everything, is much more expensive

And of course, we can also use LLMs to help with this

### 2. The mechanical part of the review stays with the agents

The second layer is leaving the mechanical part of the review to the agents. Each one with a focus:

- Regression
- Security
- Performance

And the point that makes the difference: running each one on **different models and prompts**, with a clean context. Each model makes mistakes in its own way, so the chance of the same bug slipping past all of them is smaller than the chance of slipping past just one. It's the same logic as having different people review, only at the speed the volume of PRs demands

This is not underestimating AI

LLMs almost always review better than we do when they read the doc, the spec and the plan. That's why it makes sense to hand them the mechanical work, and save human time for where it pays off the most

### 3. Gates in the pipeline

The third layer is the pipeline deciding whether the PR passes. The gates:

- **Code smells:** static analysis catches the pattern nobody wants to see again
- **Preview deploy:** someone can open it and see it working before approving
- **Tests:** the behavior the spec described still holds
- **Types:** the contracts still fit together

The gates catch what the spec got right and the implementation got wrong, which is exactly the kind of failure that reviewing the spec alone can't see. A right spec doesn't guarantee right code, and a gate without a spec only validates what someone already decided wrongly

## What still goes through people

None of this means stopping the reviews completely

**Strategic PRs** still go through people: auth, data, migrations and architecture

These are the areas where a mistake costs a lot, and where knowledge of the critical code has to stay within the team. If only the AI knows how authentication works, the team has lost part of what it knows about its own product

The difference is in what the person does in that PR. They are not there to check syntax, which the agents and the gates already looked at. They are there to confirm that the decision makes sense for the product and for the business

## Not everything is roses

This approach has a cost and a limit, and it's worth being honest about both:

- **A bad spec generates bad code very quickly.** If layer 1 is done carelessly, the AI implements the wrong decision fast and with tests passing. The gate checks whether the code matches the spec, not whether the spec is good
- **Agents also spend tokens.** Several review rounds, each with a different focus and model, have a cost. It's worth more on a big or risky PR than on a small adjustment
- **It takes work to set up.** Writing good docs, specs and plans is a team habit. If nobody maintains this material, the review before the code doesn't work
- **It doesn't fully replace the human side.** Mentoring, discussing approaches and talking about decisions still exist, only earlier and around the spec

It's also not a recipe to apply the same way in every team. Think of it as a starting point to adjust to your context, your volume of PRs and how much your team already documents its decisions

## Conclusion

When the speed of generating code surpassed the speed of reading code, line-by-line review stopped being a safeguard and became a ritual. Approving on autopilot doesn't protect anyone

Human work moves up one layer: deciding what is going to be built before the code, instead of checking every line of PRs that have probably already gone through several rounds of AI review. The agents handle the mechanical part, the gates guarantee the behavior, and the team keeps what only it can do, which is deciding

And the one who decides is still us. The person responsible for each delivery is still **YOU**, and that doesn't change just because the code arrived faster

The question is no longer whether the code is right, it's whether the decision is right

## Worth reading too

- [AI stack that will level up your work as a dev](/en/blog/ai-stack-that-will-level-up-your-work-as-a-dev/)
- [AI and context engineering in a project from scratch with vibe coding](/en/blog/ai-and-context-engineering-in-a-project-from-scratch-with-vibe-coding/)
