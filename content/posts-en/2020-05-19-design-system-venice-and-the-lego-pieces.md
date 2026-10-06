---
title: 'Design System, Venice and the Lego pieces'
date: 2020-05-19 00:00:01
description:
  'More about the architecture, development and technologies behind Venice, the
  Design System at Juntos Somos Mais.'
tags: ['design system', 'css', 'typescript', 'react', 'vue']
translationOf: design-system-venice-e-as-pecas-do-lego
---

_This article was originally published on the
[Juntos Somos Mais](https://medium.com/juntos-somos-mais) Medium, worth
following for new posts_ 😁

I've always loved Lego (and the knockoffs from other brands). I must have been
about 5 years old when I first got my hands on those blocks, and what impressed
me the most was being able to make all kinds of combinations with completely
different results, without ever modifying the original pieces.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1260986959171854337">
    <p>A primeira experiência que tive com Design System e Componentes foi brincando com LEGO</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1260986959171854337">May 14, 2020</a></figcaption>
</figure>

## Before: JS+ Tech Talks

On 04/23/2020 we had the first edition of JS+ Tech Talks, organized by the
tech team at [Juntos Somos Mais](https://www.juntossomosmais.com.br/).

I had the honor of giving a talk about the whole concept behind our Design
System and the strategies we're using, and the full content is available in the
video below (in Portuguese).

### JS+ Tech Talk #1: Design System (04/23/2020)

<iframe width="650" height="400" src="https://www.youtube.com/embed/6uWzv_P_Ui0?t=181" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What a Design System is and what it's for

In the shortest way possible, a Design System is a set of standards and
components that aim to unify design and code. In practice, as
[Nathan Curtis](https://twitter.com/nathanacurtis) put it:

> It's a product that should serve other products.

Design Systems need to be living documents, with always up-to-date documentation
and components that are modified or created according to the needs of the other
teams.

That's because the focus isn't the project itself, it doesn't exist as an end in
itself. The goal is to serve a series of other internal (and even external!)
products, unifying all the visual and behavioral parts, in things like:

- Color palette
- Spacing
- Typography
- Components
- Etc

Besides standardization, the scalability and resilience of the products also
benefit a lot. That's because components that would be duplicated (both design
and code) are created only once, in an agnostic context completely detached from
specific business rules. This way the quality of the development tends to
improve, and tests are also easier to write.

Since the components won't need to be built again, the speed of developing new
features inside the products also gets a big boost.

Another super relevant benefit is the possibility of gradually replacing legacy
code with the components developed in the Design System, all without putting the
business evolution of the products at risk.

Good examples of Design Systems are:

- [Material Design](https://material.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Primer](https://primer.style/)

It's an extremely broad subject with many layers of thought.

A good research source to go deeper on this topic is the
[Design System Repo](https://designsystemsrepo.com/), which brings thousands of
examples of working DSs and lots of articles written over the last few years on
the subject.

## Design System in practice

I started working at [Juntos Somos Mais](https://www.juntossomosmais.com.br/) in
February/20. We have projects in React and Vue, using very different
technologies between them (Styled Components, Stylus, TypeScript, NextJS…)

One of the challenges I got in my first few days was exactly figuring out how we
could standardize our products, both in code and visually.

The idea of creating a Design System came up quickly, but **how**?

## Web Components

![Web Components](assets/2020-05-19-webcomponents.png)

Because of the variety of stacks, Web Components was the first thing we thought
of, precisely because it's completely agnostic about technologies and, in
theory, can be used with any framework (or none at all).

We ran tests using [Svelte](https://svelte.dev/) and
[Stencil](https://stenciljs.com/).

**Svelte** is a framework only at development time, but it generates good old
Vanilla JavaScript after the build. It can be used to create components
(JavaScript or Web Components) or entire applications.

**Stencil** was created by the [Ionic Framework](http://ionicframework.com/)
team and is meant exclusively for building Web Components, so the whole
experience is very focused on that.

Both looked promising, despite the differences between them. In our scenario and
for what we needed, **Stencil** turned out to be the better choice.

However, after some tests, problems showed up, especially in the integration
with React, where [some adaptations](https://stenciljs.com/docs/react) would be
needed for it to work as expected.

Especially for more complex components the outlook wasn't so optimistic, and
even though Web Components seemed like an almost natural path, the considerable
unpredictability ended up being a deciding factor, since the DS was going to
grow and it would be hard to go back yet again.

## Plan B: Multiple Design Systems

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1242798337348247553">
    <p>Tenho trabalhado no Design System da Juntos, usando de stack:<br><br>- Monorepo<br>- Storybook<br>- React/Vue<br>- TypeScript<br>- CSS Modules<br><br>A ideia é compartilhar estilos e deixar configurável com Variáveis CSS, facilitando customização, criação de temas, etc.<br><br>Tá sendo uma experiência foda 😍</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1242798337348247553">March 25, 2020</a></figcaption>
</figure>

So we went with plan B: different versions for different frameworks.

I didn't like this idea, especially because of the need to duplicate code (both
logic and CSS) and the difficulty we'd have standardizing the visuals and
keeping consistency across versions.

But with a bit of planning and architecture, things changed 😜

# And that's how Venice was born

![Venice](assets/2020-05-19-venice.png)

Venice can be a city in Italy (Venezia), a city in Florida, or also a
neighborhood in Los Angeles, which is where we drew inspiration to name the
Design System.

The project's code is open and available at the links below.

- **Github** repository:
  [https://github.com/juntossomosmais/venice](https://github.com/juntossomosmais/venice)
- **React** version:
  [https://juntossomosmais.github.io/venice/react/](https://juntossomosmais.github.io/venice/react/)
- **Vue** version:
  [https://juntossomosmais.github.io/venice/vue/](https://juntossomosmais.github.io/venice/react/)

# The current stack

This is what the current stack looks like:

- [Monorepo](https://github.com/korfuri/awesome-monorepo)
- [Lerna](https://github.com/lerna/lerna)
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [Storybook](https://storybook.js.org/) (MDX)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [CSS Variables](https://developer.mozilla.org/pt-BR/docs/Web/CSS/var)
- [React](https://reactjs.org/)
- [Vue](https://vuejs.org/)

Next I'll talk about each of these choices and why we're using them.

## Monorepo

![Monorepo](assets/2020-05-19-0_ygBMtdWwuYuVDO4W.png)_Image credit:
[javascript-in-plain-english](https://medium.com/javascript-in-plain-english/javascript-monorepo-with-lerna-5729d6242302)_

When a new feature or component is developed in **Venice**, it has to be
available in all the Design System libs (React and Vue). Keeping them in
separate repositories would be unfeasible for several reasons, but the main one
is:

- Code reuse

Things like documentation, tokens, variables and styles would be exactly the
same in both the React and Vue versions, so it made a lot of sense to keep them
inside the same repository structure.

Monorepos are here to stay and have been widely adopted, and even though they're
not a silver bullet (**nothing is**), it fit our scenario like a glove.

## Lerna and Yarn Workspaces

Still on the subject of Monorepos, we have an awesome duo: Lerna and Yarn
Workspaces.

They work perfectly well together.

**Lerna** handles versioning and publishing of the packages, and brings a bunch
of useful commands for running commands across the shared projects.

**Yarn Workspaces** adds intelligence and optimizes dependency management,
avoiding for example installing _node_modules_ with the same packages over and
over inside each project. It also allows cross-installing projects within the
Monorepo itself as dependencies, meaning your project inside a Monorepo can be
used as a package inside another project.

Below are two very good guides explaining these tools:

- [A Beginner’s Guide to Lerna with Yarn Workspaces](https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d)
- [Creating a Monorepo with Lerna & Yarn Workspaces](https://medium.com/hy-vee-engineering/creating-a-monorepo-with-lerna-yarn-workspaces-cf163908965d)

## Storybook (MDX)

![Storybook](assets/2020-05-19-storybook.png)

Storybook was chosen to manage the stories inside each Design System, and it's
also responsible for the visual presentation of the components and the
documentation.

There are plenty of tools with this purpose nowadays, but we chose Storybook
because of its:

- Integration with lots of technologies
- Ability to write in MDX
- Huge plugin offering
- Ease of use
- Solidity

## TypeScript

![Typescript](assets/2020-05-19-typescript.png)_Image credit:
[technotification](https://www.technotification.com/2019/06/typescript-3-5-released.html)_

I've been using TypeScript for a few years now and I'm in love with it ❤️

But the decision to use TypeScript in this case came from being able to create
interfaces that can be shared across all the Design Systems inside **Venice**,
guaranteeing greater integrity in each component's _props_.

In other words, it doesn't matter if we're using the Vue or the React version of
the component, the TypeScript interfaces make sure the names and shapes of each
_prop_ are exactly the same.

Absolutely necessary.

As if that weren't enough, TypeScript is also in charge of transpiling and
therefore building the libs, avoiding some silly mistakes in the code that could
go unnoticed.

## Sass, PostCSS and CSS Modules

![CSS Modules](assets/2020-05-19-cssmodules.png)

Given that we have more than one Design System inside **Venice** and some (a
lot of) things are shared between them, we got to one of the most important
questions: **Styles**.

Duplicating styles could bring inconsistencies to the components, besides making
them harder to maintain. So the ideal scenario would be for the components, in
React or Vue, to share a single version of those styles.

On top of that, we had another challenge: isolation.

Given these needs, the Sass, PostCSS and CSS Modules combo proved to be
extremely effective.

That's because CSS-in-JS libs like Styled Components, for example, have
different versions for React and Vue, while CSS Modules is quite agnostic and
adapts well to any technology.

To better understand how CSS has evolved over the last few years and the many
options we have today, this article is worth reading:

- [From Sass and BEM to CSS-in-JS: The (r)evolution of CSS throughout history](/en/blog/from-sass-and-bem-to-css-in-js-the-evolution-of-css/)

This way we create just one CSS for each component, and those styles are used in
both the Vue and React versions, ensuring visual consistency and avoiding code
duplication.

## CSS Variables

Another extremely important matter was the variables that need to be shared, not
only between the components inside **Venice** but across all the applications.

Things like:

- Colors
- Spacing
- Typography

These things guarantee visual consistency, so they needed to be scalable and
available in a single place.

As I said before, when it comes to CSS the projects use varied stacks: Styled
Components, Stylus and Sass. And the only technology common to all of them is
CSS itself.

So native CSS variables solved this for us: just import **Venice** into the
projects and they're available. Besides being dynamic and easy to use, they work
in any scenario.

## React and Vue

![React and Vue](assets/2020-05-19-reactvue.png)_Image credit:
[javascript-in-plain-english](https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd)_

Last but not least, the frameworks.

React and Vue were already used in our current projects, so the components would
need to work for both.

So whenever a new component is born in **Venice**, it's built with working
versions for both Vue and React. However, much of the code used to develop the
components is written only once and shared between them, like styles,
documentation and interfaces.

With specific versions for each framework we can guarantee their stability, and
not get any nasty surprises from things breaking because of adaptations.

# Conclusion

Design Systems are fundamental when we think about scalable products with
consistent interfaces. Big companies are investing heavily in this concept
precisely to speed up the launch of new products and also to improve the quality
of what gets built.

Maybe some of us got the chance to play with Lego as kids, and back then… having
fun without realizing it, we had already learned a lot of the concepts I wrote
about in this huge text.

We need to play more ❤️
