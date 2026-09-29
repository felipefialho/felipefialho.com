---
title: 'These Abstractions Are Killing Your Code''s Scalability (But Hey, At Least It''s DRY, Right?)'
date: 2025-05-27 00:00:01
description: 'Let''s talk architecture? How I scale more efficiently these days and stay more pragmatic when writing code.'
tags: ['architecture', 'abstractions', 'modularity', 'clean code', 'dry']
translationOf: abstracoes-tao-matando-a-escalabilidade-do-seu-codigo
---

This is a video version of the content presented in this article,
[which I published on my YouTube channel](https://www.youtube.com/@felipefialhovlog) (in Portuguese).

Worth watching! 😁

<iframe width="650" height="400" src="https://www.youtube.com/embed/-GnsFbfH3rY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

📚 Recommended books on the topic

- [Código Limpo: Habilidades Práticas do Agile Software](https://amzn.to/43j38hy)
- [Arquitetura Limpa: Guia Para Estrutura e Design de Software](https://amzn.to/4keAMuM)
- [Mastering Clean Code: Essential Principles](https://amzn.to/3FchMxQ)
- [Clean Code in JavaScript](https://amzn.to/3SZqPVP)

> Life is too short to create super complex reusable abstractions that will only be used once. If something is only going to be used once, it didn't even need to be reusable, much less complex - Clarice Lispector

In this post, I want to talk about technical maturity, well-made abstractions, and, above all, *when you should NOT abstract anything*.

## The urge to abstract

You're there, chilling, browsing through the project's code. Then you find a few snippets that are slightly duplicated. Everything works, it's readable... but it's repeated. And then comes that almost uncontrollable urge that lives deep in the soul of every dev: **refactor everything**.

Except now you create generic, supposedly reusable abstractions... and in practice, nobody understands anything anymore. The code that used to be simple and functional turns into a time bomb.

This is the first step toward your project starting to crumble.

## Abstracting is not the problem. Abstracting too early is.

Yes, you can and should create abstractions. But the real problem is **premature abstractions**.

Pure visual components like buttons, cards, and tags (those do make sense to create early in the project), as long as:

- you're **sure they'll be reused**;
- and they **keep visual consistency** across different contexts.

But careful: visual abstractions are one thing, **behavioral** abstractions are a different story.

## Practical example: the button that opens modals

Imagine two buttons that open different modals. One opens the payment confirmation modal. The other, an edit modal.

Visually? The same.
Behavior? Completely different.

You decide to create a generic component: `ButtonWithModal`. And then you try to put the logic for opening any modal inside it. Result? A tangle of conditionals specific to each use case.

And before long you have an `if` inside an `if`, hacks to handle the exception to the exception... and nobody understands what that button is supposed to do anymore.

This is the moment where *duplicating code would be better*.

Yes, duplicated code.

A `ButtonWithPaymentModal`, another `ButtonWithEditModal`.

Simpler, more direct, easier to maintain. Later, **with time**, if 10 of these buttons show up and 7 of them are similar, then yes: analyze, refactor, and create an abstraction based on reality, no fortune-telling.

## DRY and Clean Code: misunderstood

I consider **Clean Code** and **DRY (Don't Repeat Yourself)** to be some of the most misunderstood concepts in programming. Many people believe DRY is about eliminating every single bit of code repetition, but it's much more about avoiding repetition of behavior.

As for Clean Code, because of the almost messianic aura built around it, when misinterpreted it can lead to an obsession with code patterns and a purely aesthetic readability that completely ignores the context, the product, and scalability. That happens when you follow concepts without understanding where they came from or the problems they were trying to solve, detaching them from reality.

These concepts often describe an idealized world, more how things should be than how they are. When applied without considering the real context, the result can be the opposite of what was intended. Clean Code is a classic example: the pursuit of perfect code patterns leads to neglecting the most important thing in a product: its delivery and the end user's experience.

No decision should be made "for the code".

Code is just the means to achieve a result: letting the user have a good experience with the application.

Code is a means, not an end.

## Recap

To wrap up, here's a straightforward summary:

1. **Let time validate it**. Only abstract after the pattern proves to be real and consistent.
2. **A badly made abstraction is worse than duplication**. In doubt? Duplicate.
3. **Don't confuse appearance with behavior**. Code that looks similar shouldn't always be merged.
4. **Visual components without logic can be abstracted early**, if they're really reused.
5. **Be modular**. First solve it locally. Then abstract it for the module. Only after that, if it makes sense, for the whole project.

## Evolutionary Modularity: How I Think About Abstractions Today

Now I want to go deeper into my view on abstractions, which I call evolutionary modularity.

First, I deeply analyze the demand, its needs, and how it should scale, at first. Then I write code that's simple enough to work, aiming for maximum readability and clarity, especially in this initial phase.

Once the feature is done, I have two paths:

- **Tight deadline or urgency:** I can simply ship what was built. Delivering value is and always will be the most important part.
- **Time available:** I start analyzing the patterns in the code. If it makes sense in the current context, I create abstractions used only in that context, without thinking about anything generic or global. These abstractions are very specific to the behavior of the component or function. The goal is to make the code more readable, cohesive, and clear, with self-explanatory functions.

These abstractions stay in a very specific, contextual layer.

### The Second Phase: Modular and Shared Abstractions

Next, we get to the second phase. Imagine that this code, initially restricted to one feature, starts getting new iterations. Within the module you work in, new features and components may show up and start sharing elements.

Note that we're talking about iterations on a product or feature that's already in production and reasonably stable.

This is a good time to create **shared abstractions within that module**.

They still solve module-specific problems, without trying to be overly generic. The focus is on eliminating duplication and managing repeated code within that part of the application. This also gives you a better understanding of what could, in the future, be scaled up to a more global abstraction layer.

By working on these abstractions in more specific layers, you have much more control. If they prove effective and consolidate as patterns, they can, down the road, become a global abstraction for the whole project.

### The Final Stage: Global Consolidation and Beyond

Finally, we reach the stage of consolidating these abstractions and patterns. Here we're talking about abstractions that work globally, meaning they'll be used across the whole application. This naturally introduces a significant risk, since any problem or change in them will affect the entire application.

Sharing abstractions across several modules of a project can be made easier by monorepo tools like NX, which offer awesome features for organizing modules and global abstractions.

In an even more complex scenario, but one that does happen, you may need to share these abstractions not only between modules of the same project, but across distinct applications. That would involve a centralized repository for helpers, components, or a design system.

Here, complexity increases considerably, because we get into package management to fix bugs, implement features, or make big changes to these abstractions.

Building this progression carefully protects your project against premature abstractions and, at the same time, ensures a gradual and safe evolution of the whole application.

## The Complexity of Technical Maturity

Another point I often bring up is the **complexity of doing all of this**.

It's not just about writing code, taking a quick course, or using an AI to generate a prompt. Everything I described requires very broad theoretical and, above all, practical knowledge. To create quality abstractions and think about architecture this way, you need considerable experience and background, with lots of mistakes made in the past.

This is an area where I see AI struggling a lot, and that should persist in the near future.

The connections and correlations needed to get good results **require deep knowledge of diverse subjects and the ability to tie all those loose ends together**.

Notice that nothing I've covered so far is about generating code. We're talking about planning the delivery, building features and applications efficiently, and correlating different elements to ensure a stable architecture and scalable code.

## The Code Delivery Lifecycle

These days, I split code delivery into five main stages:

- **Make it work:** My first concern is that the feature works. It doesn't matter if it's optimized or refactored; first, it has to work. After this stage, the feature is ready to ship. With tight deadlines or urgent demands, I can ship this already-working part and worry about improvements later.
- **Write tests:** Already during the feature phase, I start working on tests, whether unit, integration, or end-to-end.
- **Refactor (if it makes sense):** Only after the testing stage do I start refactoring. If refactoring makes sense at that moment, I do it. If the code is already good enough, I don't worry about it right away.
- **Optimize (if needed):** In this phase, I also work on optimization. Code that's functional and usable isn't always performant. If it doesn't perform well, users may struggle, which hurts product adoption. Whenever necessary, I invest time in this stage.
- **Monitor in production:** After the code goes to production and the feature is used by end users, a crucial but rarely discussed part of front-end is monitoring. With tools like Sentry, for example, you get instant feedback on users' errors, making sure the feature is accessible with the fewest bugs possible.

## The Sophistication in Simplicity

Here's the thing: in the past, I was the kind of developer who complicated things to look smarter or more technically knowledgeable. I created complex, absurd abstractions to show off sophistication, hoping people would look at my code and think: "Wow, what complex code, he must be really good!"

But over time, we realize that the greatest sophistication for a developer is simplicity.

Today, more than ever, I prefer what's simple, well done, efficient, and, above all, functional. All with a focus on a solid architecture that's easy to scale and, above all, easy to maintain.

We need to iterate and test quickly in production, validating whether the idea or product makes sense to users. At the same time, we must make sure everything we build is scalable and adaptable to fast changes of direction.

And for that, more than ever, we need **less over-engineering** and **a lot more pragmatism**.
