---
title: 'React, Angular or Vue: Which JavaScript Framework Would I Choose Today? 🤔'
date: 2021-06-21 00:00:01
description:
  'The most relevant JavaScript Frameworks on the market have been around for a
  few years now, and today we can say they are all very good and easily passed
  the test of time.'
tags: ['stack', 'framework', 'javascript']
translationOf: react-angular-vue-qual-framework-javascript-escolheria-hoje
---

This post is a text version of the video: <strong>REACT, VUE or ANGULAR: Which
JavaScript framework would I choose today</strong>
[that I published on my YouTube channel](https://www.youtube.com/@felipefialhodev)
(in Portuguese).

Worth watching! 😊

<iframe width="650" height="400" src="https://www.youtube.com/embed/L78ENSEHXLE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

## Introduction

This question was asked by Pablo Ferreira on LinkedIn and I'm not going to dodge
it... he asked straight up:

> React or Vue?

And to justify myself 😋

![LinkedIn question](assets/2021-06-21-pergunta.png)

I could easily answer this question by saying it depends on the context and
blah blah blah, but I'm not going to do that, even though that really is the
most sensible answer 😅

## JavaScript Frameworks (or libs)

I've been lucky enough to work with the 3 most popular Frameworks on the market,
meaning I've worked with Angular, Vue and React (and even a little bit of
Svelte).

Over time they've been getting more and more similar in things like performance
and even the features they offer.

I believe the biggest differences today are in how you write the code, where
React differs from Angular and Vue, and in the fact that React is **not a
Framework** but a lib.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1313922039204306944">
    <p>Nos últimos tempos trabalhei com Angular, React e Vue.<br><br>Além de terem maturidade parecida, atualmente muitos conceitos são compartilhados entre eles, isso ajuda muito na curva de aprendizado.<br><br>Com prós e contras, temos três opções sensacionais.<br><br>Quem ganha com isso é a gente 😁</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1313922039204306944">October 7, 2020</a></figcaption>
</figure>

Of these 3 options, I prefer React's way of writing code and solving paradigms
because it's the closest to JavaScript and I find it more readable, plus you
don't have to learn as many things to write components, especially compared to
Angular, for example.

But at the same time there's the architecture side, and this is where I have
some reservations about React.

### Svelte

But first I want to say there are other pretty interesting JavaScript Frameworks
out there.

Among them is Svelte, which has one of the most different approaches right now.
Even though it's a Framework at development time, it _transpiles_ code into
plain JavaScript after the build, taking full advantage of the latest EcmaScript
features, which makes it extremely fast and very close to _vanilla_ JavaScript.

Even so, despite Svelte already having some miles on it, I wouldn't consider it
for a scenario where it's the _core_ of a company's main product, for example.

Mainly considering it has a much smaller community, fewer complementary libs,
and it would definitely be a lot more work to find professionals on the market
interested in working with it.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1301943110256164867">
    <p>➡️ Sobre Svelte<br><br>Faz anos que acompanho, mas tô brincando bastante ultimamente.<br><br>O diferencial é ser um framework durante o desenvolvimento mas compilar pra pequenos módulos em Vanilla JS no build, sem Virtual DOM e sem código extra.<br><br>É super performático e tem uma DevXP foda 😜</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1301943110256164867">September 4, 2020</a></figcaption>
</figure>

### React

Going back to the 3 main Frameworks we have today: as I said before, React is
not a Framework but a lib, so it gives total freedom to the people who will work
on the project to choose which other libs they'll use and what architecture the
project will have.

Although that sounds positive, and it really is in some scenarios, it's exactly
what has always made me hesitant about choosing React for certain projects.

There are lots of decisions to make, lots of different ways of doing the same
thing, and many of those decisions are subjective and often based on personal
taste, and I don't usually like it when decisions are made based on personal
taste and in a subjective way.

> I don't usually like it when decisions are made based on personal taste and in
> a subjective way.

This can be bad, because as the people who made those initial decisions leave
the project, it opens the door for big changes in the architecture and code
structure to be put in place, which are often also based on personal taste.

On top of that, the project won't always have robust documentation explaining in
detail the approaches and patterns that were used and the motivations behind
those choices.

That's why it's very common that, even within the same company, the architecture
of React projects is very different from one to another, even when the projects
have very similar scopes.

### Angular and Vue

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1172513256986087424">
    <p>A data de modificação de alguns arquivos do core do <a href="https://x.com/angular">@angular</a> é a data da Viagem no Tempo feita em um DeLorean  no &quot;De Volta para o Futuro (Back to the Future)&quot; 🚀  <br><br>- 26 de outubro de 1985<br><br>Sensacional 😁 <a href="https://t.co/scTaLluQiL">pic.twitter.com/scTaLluQiL</a></p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1172513256986087424">September 13, 2019</a></figcaption>
</figure>

Angular, on the other hand, has a much more closed scope, with most of the
definitions being more limited and not really recommended to change.

This ensures projects follow more similar patterns and architectures, and on top
of that it has a bunch of features that help during development.

My experience with Angular was extremely positive. I worked with this Framework
for over two years (almost three, actually) and besides the architecture and
patterns I already praised, it also has very well integrated TypeScript, which
helps a ton with project scalability (anyone who uses TypeScript on big projects
knows what I'm talking about).

Meanwhile, Vue strikes a very interesting middle ground between React and
Angular, giving suggestions on how to follow code patterns and architecture but
allowing plenty of flexibility to change them if we want.

Vue also comes with several built-in features we can use if they make sense for
a given project.

### React's Frameworks: Next.js and Gatsby

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1322170844790087682">
    <p>O ecossistema de React amadureceu demais com a consolidação de frameworks como Gatsby e Next.js.<br><br>Ajudaram a definir bons padrões de configurações, arquitetura e desenvolvimento, melhorando muito a DX (Dev Experience) e escalabilidade dos projetos.<br><br>O Next.js 10 tá espetacular ❤️</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1322170844790087682">October 30, 2020</a></figcaption>
</figure>

But so far I've been talking about React, Angular and Vue in their "pure"
versions. All of that changed when React-based Frameworks showed up, and two of
them stood out the most:

- Gatsby
  ([in this post I tell how it was to build the current version of my site using Gatsby](/blog/como-foi-desenvolver-meu-novo-blog-usando-o-gatsbyjs/) (in Portuguese))
- And Next.js

And it's precisely Next.js that, for me, took the React ecosystem to another
level.

It establishes patterns in projects, defines architecture, brings a bunch of
extremely useful features, has wonderful documentation, has native Server Side
Rendering and Static Site Generation that solve many SEO problems, has great
performance scores, has a very active community, gets frequent updates and is
built by an ever bigger and more trustworthy company, Vercel.

All of this while taking advantage of the reliability, stability and component
development style of React that I praised earlier.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1359128693898153988">
    <p>Um conceito que ganhou força nos últimos anos e deve impactar cada vez mais o mercado tech:<br><br>- Dev Experience (DevX)<br><br>Ou seja, melhorar a experiência de desenvolvimento, inclusive automatizando tarefas chatas e repetitivas pra aumentar produtividade nas coisas mais importantes.</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1359128693898153988">February 9, 2021</a></figcaption>
</figure>

On top of that, both Gatsby and Next.js offer an awesome developer experience,
and anyone who works with products knows the difference that makes in our day to
day.

Even though Vue also has Nuxt.js, which is a kind of Next.js for Vue, and it's
also a Framework with lots of features and quite interesting, React with Next.js
has one more advantage that makes a big difference:

> There's a much greater availability of professionals, and this Framework has
> much wider adoption in the market

This makes all the difference because one of the biggest difficulties in scaling
a project or a product is exactly hiring people, and even though the Vue market
is also pretty hot, React and its ecosystem still have a huge lead in that
regard, and I find it very unlikely that this will change in the next few years.

## Stick to concepts, not technologies

It's important to point out that I think the learning curve between the
JavaScript Frameworks I mentioned is very gentle.

Someone who works with React will hardly have difficulties working with Vue (or
Angular) and vice versa. I even think it's important for people who work in
development to be much less attached to the Framework itself and much more to
the concept it brings and the problems it solves, after all frameworks are
almost always passing and we'll work with many of them throughout our careers.

> Frameworks are almost always passing and we'll work with many of them
> throughout our careers.

By the way, I talk about this topic in the video about **What Front-end
Developers need to know**:

<iframe width="650" height="400" src="https://www.youtube.com/embed/GRStdYGAmrQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I also sketched out a bit about the subject in the video about **10 things I
would do if I were starting my career as a (Front-end) developer**:

<iframe width="650" height="400" src="https://www.youtube.com/embed/7yar-WWOifI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

But at the same time there's the whole matter of market demand, and that can
lead people to prefer working and "specializing" in certain Frameworks over
others, and right now the interest in React ends up being greater.

## Answering objectively

Well, having said all that, we can see that all 3 Frameworks easily passed the
test of time, that is, they've become more and more **reliable and stable** as
time went by.

But to wrap up, I'll answer this question objectively:

In their pure versions, among Angular, Vue and React I find Vue the most
balanced of all, and it would be my default choice in most cases.

> In the pure versions of these frameworks **I find Vue the most balanced** of
> all and it would be my default choice in most cases

That leaves Angular as an alternative for projects with a team made up of
Fullstack professionals with more of a Back-end focus, or for more corporate
systems.

But considering the current scenario, with these React Frameworks that showed up
in recent years, which as I said before brought incredible features plus the
consolidation of super well-defined patterns and architectures, these days I
would probably choose React running with Next.JS and TypeScript for the vast
majority of projects 😁

> Today I would choose **React running with Next.JS and TypeScript** for the vast
> majority of projects
