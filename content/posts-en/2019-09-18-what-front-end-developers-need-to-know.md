---
title: 'What Front-end Developers Need to Know'
date: 2019-09-18 00:00:01
description: 'Simple answer: HTML, CSS and JavaScript. But simple is something Front-end Development stopped being a long time ago 😄'
tags: ['front-end', 'career']
translationOf: o-que-front-end-developers-precisam-saber
---

### Video version

This is a video version of the content presented in this article
[that I published on my YouTube channel](https://www.youtube.com/@felipefialhodev).

Worth watching! 😁

<iframe width="650" height="400" src="https://www.youtube.com/embed/GRStdYGAmrQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## First, some data

I looked at [Google Trends](https://trends.google.com.br) for the interest in the
terms _Front-end Developer_ (Worldwide) and _Desenvolvedor Front-end_ (Brazil),
over the last 10 years.

The numbers represent search interest relative to the highest point on the chart
for a given region and time period. A value of 100 is the peak popularity for a
term. A value of 50 means the term was half as popular. A score of 0 means there
wasn't enough data for the term.

This was the result worldwide:

![Google Trends: Front-end Developer](assets/2019-o-que-front-enders-precisam-saber-front-end-developer.png)

In Brazil, despite the ups and downs, the picture isn't very different:

![Google Trends: Desenvolvedor Front-end](assets/2019-o-que-front-enders-precisam-saber-desenvolvedor-front-end.png)

In other words, Front-end Development is still on the rise and should stay that
way in the coming years. Companies are increasingly looking for this
professional profile, and more and more people are interested and looking for
information to get into this profession.

Some things that make sense right now might not make sense in the future. The
development world moves extremely fast, and so do my opinions 😂

That said, I'm going to list some skills I consider important for working in
this field. I'm not bringing the absolute truth and I'm far from having the
knowledge for that, but I'm bringing the personal view of someone who has been
doing this for 10 years, that is, me.

Let's go! 😜

## The basics of Web Development

These are things that cover web development in general and are extremely
important for a solid career.

### Domain and hosting setup

No matter what project you're building or working on, it will be hosted
somewhere and needs a domain configured.

We have more and more solutions that automate these steps, like
[Netlify](https://www.netlify.com/), [Heroku](https://www.heroku.com/) and
[AWS](https://aws.amazon.com) products. But these options won't always be
available, so it's worth understanding how the process works and knowing how to
set it up manually.

### Terminal

![Terminal](assets/2019-o-que-front-enders-precisam-saber-terminal.png)

The terminal is still one of the most used tools in our day to day. A good part
of the technologies used in modern Front-end Development need to be run from a
terminal.

The good news is that we now have several libs with shortcuts that make this
feature, often scary, easier to use. Also, some code editors like
[VSCode](https://code.visualstudio.com/) already have an integrated terminal,
which helps a lot day to day.

### How _client-side_ and _server-side_ communicate

It's also very important to understand how _client-side_ and _server-side_
communicate. A good part of the work in Front-end development is integrating and
interacting with APIs.

Some cool topics to study:

- Web Services, REST and GraphQL
- Operations: POST, GET, PUT, PATCH, and DELETE
- HTTP protocol

[Akita](https://twitter.com/AkitaOnRails)'s YouTube channel (in Portuguese) has a
bunch of videos explaining some of these topics really well,
[I suggest watching a few of them](https://www.youtube.com/user/AkitaOnRails).

### Git and Version Control

It's almost impossible to imagine software development without a version control
system. And for years now [Git](https://git-scm.com/) has been the biggest name
in that category.

![Git](assets/2019-o-que-front-enders-precisam-saber-git-.jpg)

Spending some time studying Git and its commands is very important. Every
project and product you work on should use this technology for code versioning,
and it's extremely powerful.

It's also important to say that Git and Github are different things, just like
Java and JavaScript.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1172208296213864448">
    <p>java !== javascript<br><br>git !== github</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1172208296213864448">September 12, 2019</a></figcaption>
</figure>

Lots of people still mix them up, but Git is the version control technology.
Github, Bitbucket, Gitlab and so on are sites with visual interfaces to browse
and view the result of that versioning. Github, for example, also works as a
social network for development.

## HTML, CSS and JavaScript

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1146852062027767808">
    <p>Desenvolvimento Front-end, por baixo dos panos se resume em: <br><br>- HTML <br>- CSS <br>- JavaScript<br><br>Não ter essa base, seria tipo ser jogador(a) de futebol ⚽️, sem fundamentos básicos ou conhecer as regras do esporte.<br><br>Você pode até fazer uns gols, mas dificilmente vai ganhar os jogos. <a href="https://t.co/VP4URRjuta">https://t.co/VP4URRjuta</a></p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1146852062027767808">July 4, 2019</a></figcaption>
</figure>

It became a cliché, lots of people say to study the fundamentals (I say it all
the time). And since we're talking about Web development, behind the fantastic
world of frameworks, in the end everything generates HTML, CSS and JavaScript,
and that's exactly why it's so important to know these things well.

### Let me give you an example

In recent years I've worked a lot with Angular, which is a JavaScript framework.
Angular uses TypeScript, a superset of JavaScript. For styles I've been using
Sass and PostCSS, the first is a CSS preprocessor and the second a CSS
postprocessor.

In some projects I also use
[Kratos as a boilerplate](https://github.com/felipefialho/kratos-boilerplate),
among the technologies are Webpack, which is a JavaScript module bundler, CSS
Modules, which is a CSS modularizer, and Pug, which is an HTML template engine.

Throughout my (already long, 10 years man 😱😱) career, I've used technologies
like jQuery (JavaScript), Jade (HTML), LESS (CSS), Stylus (CSS), Grunt
(JavaScript), Gulp (JavaScript), Bootstrap (HTML, CSS and JavaScript) and so
many others that made sense at the time.

This alphabet soup has one thing in common:

> In the end they all use HTML, CSS and JavaScript

### And there's the learning curve

It doesn't matter what new lib blew up in the market, or how complex that new
technology everyone is talking about seems... the more you know about the holy
trinity of front-end, the smoother your learning will be for everything that
derives from them.

I like to create [personal projects to learn new things](/lab/), so when
developing the new version of this site, I used
[a stack](/blog/como-foi-desenvolver-meu-novo-blog-usando-o-gatsbyjs/) (in Portuguese) with
technologies I had never worked with before. To name a few:

- JavaScript (Gatsby / React)
- CSS (Styled Components)

Even working on a completely new stack, with technologies I had never used
before, in a few days I managed to learn these new concepts and get fluent in
development.

That would be impossible if I didn't have a good knowledge of the fundamentals.

### Perfect! So is knowing just this base enough? 😁

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1045659621820694528">
    <p>“O que sabemos é uma gota, o que ignoramos é um oceano.” <br><br>Isaac Newton, discursando sobre desenvolvimento front-end</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1045659621820694528">September 28, 2018</a></figcaption>
</figure>

There are other essential things, and I'll talk about some of them now.

## Concepts and Methodologies

There's not much point in mastering any technology if you don't know what to do
with it, or rather, don't know what it's for.

Every new development lib or technology created aims to solve some conceptual
problem, to automate complicated things we face day to day, to improve
processes and so generate more value for the final product.

Part of today's JavaScript frameworks, for example, exist to solve componentization
problems and some are based on the concept of reactive programming. These are
things we were already trying to solve in other ways in the past. These
technologies are the (re)evolutions of several techniques we already used
before.

The development world is cyclical.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1164506266712051713">
    <p>Frameworks estão para programação como a calculadora está para a matemática.<br><br>Facilita a vida, agiliza o trabalho e ajuda a evitar erros, mas não servem pra nada se você não souber que problema está resolvendo com eles.</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1164506266712051713">August 22, 2019</a></figcaption>
</figure>

### Another good example, CSS-in-JS libs

At first lots of people turned up their noses (I was one of them), but they're
wonderful in the current development scene, since they use JavaScript to solve
problems that CSS unfortunately doesn't solve on its own.

We've always had class collision problems, so we created methodologies like BEM
to help with that, and CSS-in-JS libs do it automatically.

In the past, using inline CSS was common, but it ended up becoming a bad
practice because even though it avoids collisions and performs well, the
scalability was terrible. What does CSS-in-JS also do? When necessary it injects
some inline styles, but all automatically, with reusable and scalable code.

Like I said: Cyclical.

## UX and UI

You don't need to be a designer, but it's ideal to have great layout sense, be
detail-oriented and a perfectionist, and above all know how to work very closely
with the people who handle design and user experience, explaining possible
technical limitations and proposing improvements during development.

![A non-designer’s guide to UX design](assets/2019-o-que-front-enders-precisam-saber-ux-ui.jpeg)_Credit:
[uxdesign.cc](https://uxdesign.cc/a-non-designers-guide-to-ux-design-210bb6662cae)_

During the Front-end development _boom_ a few years ago, it was common to say
the field would split into two types of professionals: those focused on
Engineering (JavaScript) and those focused on Design (CSS). I thought so too,
but I don't think the profession went that way, nor that it makes sense today.

I understand there are different profiles, and that naturally some people will
feel more comfortable creating algorithms, while others will enjoy building
interfaces more. But they go hand in hand, more and more.

User experience is what separates incredible products, which you love using
every day, from not-so-great ones. UX also involves accessibility and usability,
which are essential points.

In the end, Front-end Development translates into code the whole experience
designed by the UX/UI team. And experience goes from a beautiful, accessible and
pleasant-to-navigate interface, to a project that performs well, loads fast and
doesn't drain the battery or data plan of the person accessing it.

It doesn't matter how wonderful the code is if it doesn't deliver a badass
experience to the end user. Incredible code producing a product with bad UI/UX
will only serve to stroke the ego of whoever built it.

## Back-end and DevOps

![Fullstack Developer](assets/2019-o-que-front-enders-precisam-saber-fullstack.png)_Credit:
[@sepandassadi](https://medium.com/@sepandassadi/become-a-full-stack-web-developer-free-resources-8a1c2c0ebd41)_

First I need to say that I do believe in the Fullstack Developer myth. These
people exist, they're out there and they're more common than you'd think. And
contrary to what people say, I also don't think they have technical _deficits_
for not being specialized. Maybe so, but not always.

Some of these people went beyond having just one specialization to having
several. Totally possible, over **many** years of career.

Also, someone who's Fullstack on one stack won't necessarily be Fullstack on
another stack, and won't completely master every area of product development. I
think the term says the person would be able to actively take part in every
stage, that is:

- Front-end
- Back-end
- DevOps

In the Front-end world, the possibility of being Fullstack within some projects
grew a lot with the advent of technologies like
[Node.js](https://nodejs.org/en/) years ago and
[Serverless](https://serverless.com/) nowadays.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1135880180029898754">
    <p>É Front-end Developer e quer se aventurar com Back-end? <br>Indico a stack:<br><br>- Node.js + Serverless<br><br>Node é o JavaScript de sempre e com Serverless, você não precisa se preocupar com infraestrutura.<br><br>A curva de aprendizado tende a ser menor e pode dar confiança pra seguir em frente.</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1135880180029898754">June 4, 2019</a></figcaption>
</figure>

**But do I need to be Fullstack?** 😱

As always, it depends.

It depends a lot on the company you work for, the companies you want to work
for, and the career plan you want to follow.

I also wouldn't worry too much about it early in your career, Front-end already
has enough content to keep you busy for a few years. Maybe early on it's worth
getting a superficial idea of how other stages of development work, but you
don't need to go that deep.

However, over time I think it's important to gain more knowledge, even if you
don't specialize much in these _sister_ areas, I think it's increasingly
important to learn about them. That knowledge tends to even improve your skills
as a Front-end Developer.

Some of the biggest and best companies in the world, like Google, AWS and many
others, look for professionals with this _Software Engineer_ profile. Also, the
transition into leadership roles is easier thanks to the broader view of all the
stages of development.

## The _soft skills_

You've probably heard many times about the importance of developing your _soft
skills_. But you should hear it even more. Seriously, they're essential, we need
to improve as people to deal with other people.

![Soft skills](assets/2019-o-que-front-enders-precisam-saber-soft-skills.png)_Credit:
[ied.eu](https://ied.eu/project-updates/1st-transnational-meeting-for-the-project-eva-skills/)_

Think of _soft skills_ as all your behavioral, emotional and social abilities.
That is, while _hard skills_ are technical abilities that are easy to assess,
_soft skills_ are extremely subjective and hard to evaluate.

That caricature of programmers with poor social skills makes less and less sense
in the job market. No matter how shy you are, it's increasingly important to
improve your communication and develop your interpersonal skills.

Also, you need to understand the product you're working on.

> And it makes a lot of sense!

First, because the technical view and logical reasoning of developers can help a
lot in coming up with ideas, your contribution is extremely valuable.

Second, because as I said above, we don't write code for the sake of code, we
build things for people to use. Improving your ability to understand the end
user's needs directly impacts the quality of development.

The emotional side is also very important, knowing how to handle pressure,
prioritize your tasks and receive (and also give) feedback are factors we need
to work on day after day.

We also need to strive for a balanced life, because of the nature of this
profession it's very easy to get swallowed by code, neglecting our health
(physical and mental) and also our personal life. Knowing how to balance all of
this is also a _soft skill_, and one of the most important, if you're not well
with yourself, you won't be able to do your best.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1022092350254968833">
    <p>A vida é tipo um &quot;The Sims&quot;, temos barras de satisfação em:<br><br>- Saúde<br>- Vida pessoal<br>- Vida profissional<br><br>Se uma delas diminuir, as outras duas serão afetadas e também vão diminuir. <br><br>A diferença é que não dá pra começar de novo se der ruim.<br><br>Bora se cuidar 👊</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1022092350254968833">July 25, 2018</a></figcaption>
</figure>

## Front-end Development Roadmap

If you want to go deeper into modern Front-end Development topics, a good tip is
to check out _roadmaps_ and diagrams.

They show the "path of least resistance" through some technologies and concepts
you've surely seen or will see during your career. And what's more, they're
frequently updated as new relevant technologies or concepts appear.

I'll leave two of them here, both in English:

- [Step by step guide to becoming a modern frontend developer](https://roadmap.sh/frontend)
- [About Web Development](https://coggle.it/diagram/Vz9LvW8byvN0I38x/t/web-development)

## Conclusion

We spend 8 hours a day working
[and many more getting to the office or studying](/blog/2015-09-28-uma-reflexao-sobre-salarios-valor-hora-e-qualidade-de-vida/) (in Portuguese).

Each application we build can positively impact the daily lives of many people
all over the world: automating their tasks, making content easier and more
accessible, or even bringing mobility and a better quality of life to them. All
of this becomes possible through technology.

Our work is challenging and exciting. Day after day we're challenged with new
technologies and new paradigms.

From time to time we need to let go of old ideas and concepts so we can build a
better professional (and personal) version of ourselves.

That's badass! ❤️
