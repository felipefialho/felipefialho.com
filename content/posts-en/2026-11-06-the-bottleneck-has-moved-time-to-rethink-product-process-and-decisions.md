---
title: 'The bottleneck has moved: time to rethink product, process and decisions'
date: 2026-11-06 00:00:01
description: 'Writing code got fast, but maintaining and scaling a product is still expensive. And when quality and speed stop competing, the biggest risk becomes missing the timing ⏱️'
tags: ['architecture', 'product', 'ai', 'design system', 'front-end']
translationOf: o-gargalo-mudou-de-lugar-hora-de-rever-produto-processo-e-decisao
---

Writing code has never been this fast. A screen, a flow, an entire feature ships in a fraction of the time it took two years ago

But the cost of a product was never just in the code. **Maintaining, evolving and scaling is still expensive**, and in some cases it got even more expensive, because now you can create a lot more stuff to maintain

That difference changes the weight of decisions. When building was expensive, the cost of building itself put the brakes on bad decisions. Now that this cost plummeted, the brakes are gone, and the people who need to do that math are exactly the ones choosing the path

So this post is about that: why architecture decisions have increasingly become product decisions, why the biggest risk today is missing the timing, and an example I know well: a design system in a small team

## What stopped being the bottleneck and what is still expensive

It's worth separating the two, because they're easy to mix up

**No longer the bottleneck:**

- Writing a component, a screen, an endpoint
- Duplicating and updating code following patterns
- Prototyping an idea until it works
- Refactoring something covered by tests
- Building the MVP of a new product

**Still expensive:**

- Missing the delivery timing
- Coordinating teams, versions and releases
- Undoing a decision that has already spread across the product
- Maintaining an abstraction shared by several consumers
- Building the wrong thing, shipping it to production and only finding out afterwards

Notice that the second list is almost entirely about decisions, not code. The LLM writes the abstraction in minutes, but it doesn't pay the cost of keeping it alive for years, especially when that abstraction is tightly coupled and simply throwing it away isn't always simple

## Quality and speed stopped competing

For a long time the conversation was a tug of war: either ship fast or ship well. Architecture was much more about protecting the quality of a team that needed to move fast and the direction the product should scale in

That changed

Today you can set up mechanisms that guarantee quality without stalling the pipeline: spec before code, tests the agent itself has to make pass, visual regression, automated reviewers. I wrote about this in [the harness that makes the agent prove it got it right](/en/blog/ai-first-and-the-agentic-loop-the-harness-that-makes-the-agent-prove-it-got-it-right/) and in [manual code review does not scale anymore](/en/blog/manual-code-review-does-not-scale-anymore-and-what-to-do-instead/)

When quality is guaranteed by a mechanical process, it stops being the argument for going slow

And that leaves a new question that matters a lot: **what do we lose by waiting?**

### The risk now is timing

If your competitor builds as fast as you do, the advantage is no longer in who writes better code. It's in who validates faster, adjusts faster and gets there first with the right thing

An architecture decision that adds two weeks of setup, one more release cycle or a dependency between teams costs exactly that: weeks in which the product isn't in the user's hands. Before, that cost got diluted in the time everything took. Today it shows, because everything else got fast

This isn't about hacking things together to get there first. It's about **not paying for structure the product doesn't need yet**, precisely because now you can keep quality without it

### The process needs to keep up too

And it's not just architecture. The same math applies to how the team works

Scrum, the Spotify model and blah blah blah: a lot of what the tech industry adopted as a ready-made recipe needed revisiting well before AI. Planning that takes the whole morning, refinement that doesn't refine, retros that change nothing, squads, tribes and guilds copied without context (in a setup that not even Spotify itself worked like, [as someone who worked there explained](https://www.jeremiahlee.com/posts/failed-squad-goals/))

Lots of energy going into rituals and little left for evolving the product

While a feature took weeks, the cost of those rituals got diluted in the time it took to build. Now that it ships in hours, it shows: planning can take longer than the delivery itself

And part of the complexity that left the code ended up precisely in the decision and validation stages. A ritual that helps you decide and validate faster is still worth it. A ritual that only exists because it always has, and nobody stopped to think about why, becomes a bottleneck

The funny thing is that lean startup was always about this: putting the idea in the user's hands early, learning from it and adjusting

At some point the industry turned the idea into layers and layers of bureaucracy, and now the landscape helps us get back to it. But that takes the courage to rethink concepts and let go of practices that don't work anymore

**A process that neither helps the product reach the user nor protects the people using it is just money going down the drain**

## Devs thinking like product people

This pushes devs into a place that used to belong more to product

I already mentioned in the post about [front-end in 2025](/en/blog/front-end-development-in-2025-and-what-to-expect/) that understanding the business impact of decisions and the cost/return of what gets built would matter more and more

And it really did, even more than I expected

In practice, before any structural decision I try to answer a few questions:

- **Who pays for maintaining this two years from now?** Not who builds it, who maintains it
- **How much time does this add until the user sees something?**
- **Can it be undone?** A reversible decision can be made fast, an irreversible one or one with a high correction cost deserves more care
- **Is the problem this solves still expensive today?** Lots of classic solutions exist for a cost AI has already knocked down
- **Can we get to the same result spending less?**

The fourth question is the one that has made me rethink concepts the most. And the best example I have is design systems

## Example: a design system in a small team

I've helped create design systems more than once, and both followed the same model: a versioned component lib with documentation in Storybook (although more decentralized approaches already existed, they're also very expensive to maintain, including at the infra level)

In both cases the lib was consumed by about 3 or 4 applications and maintained by the same team that shipped product. There was no design system team, there was the same old team taking care of the lib between one feature and the next

### This decision was already risky before

In the [2020 post](/en/blog/design-system-venice-and-the-lego-pieces/) I quoted a sentence I still agree with all these years later:

> a design system is a product that should serve other products

And that's exactly what explains the cost

If it's a product, it needs what any product needs: an owner, a roadmap, support, documentation and people taking care of it full time

In a large company, with many teams and many products on top of the same foundation, a dedicated design system team easily pays for itself. The cost is split across all consumers, each product team stops reinventing its own Button, and consistency across brands and products becomes a real problem someone needs to solve

Now in a company with 3 or 4 applications and no dedicated team, the math was always tight

This isn't news brought by AI

The lib becomes a side job competing with what brings money in, and when priorities get tight, and they always do, the lib gets pushed back

### The cost that doesn't show up in the code

Writing the component was never the problem, it was like that before too

The expensive part is **keeping the lib alive**

Every published lib needs versions, and every version needs care. Changed the Input's inner spacing? Is it a patch, minor or major? Will whoever is on the old version break? And each consumer project sits on a different version: one on 3.2, another stuck on 2.8 because 3.0 changed the Modal API, and the third doesn't even remember why it pinned the version

Then comes the timing cost. The project needs a small tweak, like a loading state on the Button. But the Button lives in the lib. So the flow becomes: open a PR in the lib, wait for review, publish a new version, update the dependency in the project and only then move on with the task. A 10-minute detail crosses two repositories and sometimes two teams

And when the lib is maintained by the same team that ships product, the lib release competes with the product delivery. Guess who loses 😅

To escape that cycle, the lib starts accepting everything. Every project asks for a variation, every variation becomes a prop, and you end up with that Button with more props than the whole form:

```ts
// The component every shared lib ends up with
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  loadingText?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  iconOnly?: boolean
  fullWidth?: boolean
  rounded?: boolean
  uppercase?: boolean
  as?: 'button' | 'a' | 'div'
  href?: string
  tooltip?: string
  // and the one prop only a single project uses
  legacyCheckoutStyle?: boolean
}
```

Each prop is one more combination to test, document and keep compatible

I already talked about this in the post about [abstractions that are killing your code scalability](/en/blog/abstractions-are-killing-your-code-scalability/): a bad abstraction is worse than duplication

### What changed: solving the same problems costs less

The lib was never the goal. It was the best way we had to solve a few problems:

- **Duplication:** ten screens with the same button meant ten places to fix the same bug
- **Consistency:** design and code needed to speak the same language
- **Speed:** not rewriting every component in every project

What changed is that today you can solve a good part of that at a much lower cost, and that needs to go into the math

**Duplication is no longer the problem it used to be.** With written patterns and tests in each project, an LLM updates the copies of a component in minutes, and each project's tests guarantee nothing broke. The argument that held up the lib in a small company was the cost of duplication, and that cost plummeted

**Consistency can come from a foundation, not a package.** Instead of a lib, a single knowledge base with tokens, components, composition examples and usage rules, written so both people and AI can follow it. Today you can already bring that together in a tool like [Claude Design](https://claude.ai/design), and a Claude Code skill syncs the base with each project:

```css
/* Tokens synced from the shared base */
:root {
  --color-primary: oklch(55% 0.2 260);
  --color-danger: oklch(58% 0.22 25);
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --radius-control: 0.5rem;
}
```

And the rules are written in a way an agent can follow:

```md
## Button

- One primary button per screen section
- Destructive actions use the danger variant and always ask for confirmation
- Icon-only buttons require an accessible label
- Never use a button for navigation, use a link
```

The component lives in the project, the way it needs to be there, with no generic Button trying to serve everyone and no release to tweak a detail. Consistency comes from the base, and visual regression catches it when something drifts from the standard. **The same source, not the same package**

**And the base serves more people than the lib did.** The lib served the front-end projects. The base also serves product and design, who can prototype with AI from the same pieces that exist in the code, validate with users and only send to the dev queue what already made sense

It's the kind of thing that reduces the most expensive cost on that list up there: building the wrong thing

### The decision is still about context

None of this means design system libs are dead

A large company with a dedicated team, several brands on top of the same foundation, or a public design system consumed by outside people are still scenarios where the lib pays for itself

The point is different: in a smaller company, the lib was already a risky bet, and now there's an alternative that solves a good part of the same problems, costs less to maintain and doesn't put a release in the way of every tweak

Ignoring that is making the risky decision

## And there's another thing

Building fast isn't building for free, so it's worth looking at the costs on the other side too

- **Easy to create becomes expensive to maintain.** When anything ships in minutes, it's easy to fill the product with features, screens and variations someone will have to maintain. The question "who maintains this?" matters even more when creating is easy
- **Speed is no excuse to skip the process.** The timing gain only exists if the quality mechanisms are there. Without tests, without specs and without well-structured guard rails, what looks like speed is just debt arriving faster
- **A poorly documented base produces confident mistakes.** In the design system example, a vague rule makes the AI fill the gap with a guess, and the result comes out pretty but off-standard, which turns into debt later
- **Someone still needs to own it.** The work gets smaller, but it doesn't go to zero. A base without an owner gets outdated just like the lib did
- **A prototype is not production.** A clickable flow that looks finished creates pressure to ship it as is. It validates the idea, the dev is still the one who delivers the code
- **Depending on a tool has a cost.** If the base lives in a tool you don't control, make sure tokens and rules also exist as versioned files in the repository

## Conclusion

The bottleneck moved from code to decisions. Maintaining, scaling and deciding wrong are still expensive

With mechanisms that guarantee quality without sacrificing speed, the argument for building structure "just in case" loses strength, and what starts to weigh is the time until the product reaches the user. Missing the timing became one of the most expensive mistakes you can make

That's why architecture decisions can't be purely technical anymore. They need to consider who pays for maintenance, how much time they add until delivery and whether the problem they solve still costs what it used to

Fewer layers and less premature abstraction: good code needs to be ready to scale when the idea works and easy to throw away when it doesn't. And the process around it needs to be light enough to let that happen

A design system in a small team is just one example. It's worth looking with the same eyes at monorepos, micro-frontends, shared abstractions, that infrastructure layer that "will be useful in the future"

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1678790896651739140">
    <p>Times inteiros focados na evolução de frameworks com milhões em investimento e suporte de comunidades<br><br>Mas o dev no auge da sua vaidade conclui que é melhor ele mesmo criar um framework artesanal pra usar no core do produto<br><br>Sem testes, nem documentação e que já vai nascer legado</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1678790896651739140">July 11, 2023</a></figcaption>
</figure>

So before creating anything someone will need to maintain, answer who will keep taking care of it two years from now

If the answer is "we'll figure it out later", you already know the answer 😁
