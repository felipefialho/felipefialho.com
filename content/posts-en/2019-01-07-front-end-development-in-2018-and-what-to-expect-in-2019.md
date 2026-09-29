---
title: 'How Front-end Development Went in 2018 and What to Expect for 2019'
date: 2019-01-07 00:00:01
description: 'This article recaps the main news from 2018 and makes a few predictions for 2019.'
tags: ['front-end', 'career']
translationOf: como-foi-o-desenvolvimento-front-end-em-2018-e-o-que-esperar-para-2019
---

## About this article

The following text is a loose translation of the article [A Recap of Frontend Development in 2018](https://levelup.gitconnected.com/a-recap-of-frontend-development-in-2018-715724c9441d) published by [@treyhuffine](https://levelup.gitconnected.com/@treyhuffine).

First I want to thank him for writing it, and second for letting me do this translation.

It's worth noting that the translation is not literal, I adapted some parts to make them easier to understand. If you find any mistakes, let me know and I'll fix them 😊

## WebAssembly makes a big release with the Core Specification Reaching 1.0

WebAssembly is often considered the future of the Web. The goal is to maximize performance, reduce file sizes, and allow Web Development in multiple languages, by offering a binary format that runs on the Web.

At the end of 2017, all the major browsers announced support for WebAssembly. Then, in February 2018, WebAssembly had 3 major releases:

* [The core specification released 1.0](https://www.w3.org/TR/wasm-core-1/) *(en)*

* [JavaScript interface for WebAssembly](https://www.w3.org/TR/wasm-js-api-1/) *(en)*

* [Web API for WebAssembly](https://www.w3.org/TR/wasm-web-api-1/) *(en)*

## NPM downloads of some popular libs

React, jQuery, Angular and Vue are among the 4 most popular libs. Keep reading below to see the latest releases for some of these libraries.

![](assets/1_e036ugWPXTbBzMTSRsXiEw.png)

## React continues its reign as the library evolves

React has dominated web development for years and that didn't slow down in 2018. It's still one of the most loved libraries according to the [Stackoverflow survey](https://insights.stackoverflow.com/survey/2018/#most-loved-dreaded-and-wanted).

The React core team is very active in updating the library and adding features. Throughout 2018, we saw many additions to React v16, including [lifecycle methods](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes), [context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#official-context-api), [pointer events](https://reactjs.org/blog/2018/05/23/react-v-16-4.html), [lazy function](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactlazy-code-splitting-with-suspense), and [React.memo](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactmemo). But the two features that got the most attention are [React Hooks and Suspense API](https://reactjs.org/blog/2018/11/13/react-conf-recap.html).

[React Hooks](https://reactjs.org/docs/hooks-intro.html) was received with great feedback from developers who loved the update. *Hooks* are a way to add state to functional components with the useState function, and they also manage the lifecycle events.

In the following video, [Ryan Florence]() shows how React Hooks made his sample app 90% cleaner.

<iframe width="650" height="400" src="https://www.youtube.com/embed/wXLf18DsV-I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The other big release, *React Suspense*, is a way to manage *data fetching* inside the React components themselves. It suspends rendering while waiting for an async response. *Suspense* is what's behind the lazy function for managing component *code splitting*. The idea is to be able to manage all async loading, like API requests. It will also allow caching the results of a request.

This example shows several *load spinners* on the screen while the isFetching flag is true. With *Suspense*, you get fine-grained control over the UI to specify which fallback components to show while the user waits, plus how long to wait and how to handle navigation. Many think *Suspense* could remove the need to use Redux in projects.

Check out [Dan Abramov]()'s talk building an application using the *Suspense API* 🔥.

<iframe width="650" height="400" src="https://www.youtube.com/embed/nLF0n9SACd4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Vue keeps growing and passes React in GitHub stars

After exploding in 2017, Vue kept growing in 2018. It even surpassed React in the number of GitHub stars.

Vue is very loved, but it's still behind React and Angular in real-world usage by a wide margin. However, Vue has a passionate and growing user base, and the library will probably be a force in the coming years.

## Evan You (creator of Vue) gives us a taste of Vue 3 as the release gets closer

Vue is getting close to its 3.0 release. Creator Evan You gave us an overview in November, both at VueConf Toronto and in the article mentioned below. He put his slides online and the video will be available soon.

## Angular remains steadily used, v7 was released

In October, Angular had another big release with version 7. Angular has had tons of growth and improvements since its initial AngularJS MVC architecture up to its most modern package built on components. With that growth, it picked up new adopters.

Although Angular doesn't have the same zealous fans we see with libraries like React and Vue, it remains a popular choice in professional projects.

Many developers experience fatigue when using React, because it requires the engineer to make lots of dependency and architecture decisions, plus manage the whole build pipeline of the project.

Angular, on the other hand, removes many of those decisions from the developer and helps ensure more consistent *code patterns*.

Angular is a complete and highly opinionated framework, with a CLI managing every step of development. Another bonus for professional environments is that Angular requires TypeScript.

Angular has proven its worth in the web development world and keeps seeing its usage grow.
> NOTE: *@angular/core* represents the new Angular and *angular* represents the old AngularJS

![](assets/1_SXOEH2cmEaC9SBHNp-nvtA.png)

## GraphQL grows in "want to learn", but hasn't overtaken REST

GraphQL got some adoption by tech leaders, like [GitHub](https://developer.github.com/v4/). However, it didn't take off as quickly as some predicted. According to the [State of JS survey](https://2018.stateofjs.com/data-layer/overview/), only 1/5 of frontend developers have used GraphQL, but about 62.5% of developers have heard of it and want to use it.

![](assets/1_m6vDkicw6EUt8uc6EhcXAQ.png)

## CSS-in-JS usage went up

Web Development seems to be moving toward unifying everything with JavaScript, and that's confirmed by the growth of CSS-in-JS, where styles are created using JavaScript strings. This lets you share styles and dependencies using normal JavaScript syntax through *import*/*export*. It also simplifies dynamic styles, since CSS-in-JS components can interpolate props into their style string. Below is an example of classic CSS vs CSS-in-JS.

To manage dynamic styles with CSS, you need to manage class names in the component and update them based on *state*/*props*. You also need a CSS class for each variation:

```js
// Component JS file
const MyComp = ({ isActive }) => {
  const className = isActive ? 'active' : 'inactive';

return <div className={className}>HI</div>
}
```

```css
// CSS file
.active { color: green; }
.inactive { color: red; }
```

With CSS-in-JS, you no longer manage CSS classes. You simply pass *props* to the styled component and handle the dynamic styling. The code is much cleaner and we get a clearer separation between the styles and React, letting the CSS handle dynamic styles based on *props*. Everything reads as normal React and JavaScript code now:

```js
const Header = styled.div`
  color: ${({ isActive }) => isActive ? 'green' : 'red'};
`;

const MyComp = ({ isActive }} => (
  <Header isActive={isActive}>HI</Header>
)
```

The two most popular CSS-in-JS libraries are [styled-components](https://www.styled-components.com/) and [emotion](https://emotion.sh/).

Styled-components has been around longer and has more adoption, but Emotion has been quickly gaining ground, becoming the favorite lib of many developers. Even [Kent C. Dodds]() deprecated his own CSS-in-JS library, Glamorous, in favor of Emotion.

![](assets/1_WfbUcGwcI4hmuD80S9XsCg.png)

Vue also supports CSS *out of the box* when using *Single File Components*. Just by adding the scoped attribute to the component's style tag, Vue uses CSS-in-JS techniques to create scope and not leak styles into other components.

Angular also supports CSS scoping *out of the box* through "[view encapsulation](https://angular.io/guide/component-styles#view-encapsulation)". It's enabled by default.

## Developers find relief with CLI tools

It's no secret that keeping up with the latest libraries, setting up your app correctly and making the right architectural decisions can be extremely exhausting. That pain led to the creation of CLI packages that manage the tooling, letting the developer focus on the app.

This set of tools became the main way developers created apps in 2018. Popular frameworks include [Next.js](https://nextjs.org/) (SSR for React), [Create-React-App](https://github.com/facebook/create-react-app) (client-side React), [Nuxt.js](https://nuxtjs.org/) (SSR for Vue), [Vue CLI](https://cli.vuejs.org/) (client-side Vue), [Expo CLI](https://expo.io/tools#cli) for React Native, and it's the default in [Angular](https://angular.io/).

## Static site generation grows as we try to simplify the Front-end and chase performance

Everyone loved learning the best and newest libraries as the JavaScript revolution happened over the last few years, but now that things are settling down, we're realizing that not every site needs to be a complex single-page application (SPA). That drove the growth of *static generators*. These tools let you code in your favorite libraries, like React or Vue, but generate static HTML files at build time, which lets us serve fully ready pages to users right away.

Static sites are great because they give you an ideal combination of performance and simplicity.

With HTML files rendered at build time, we can immediately send the user a page without needing SSR or CSR, letting them load the site almost instantly. The necessary JavaScript files are downloaded on the client, enabling a *single page* experience.

They're perfect for building personal sites or blogs, but they can easily scale up to larger apps. We saw the rise of popular frameworks for building static websites, like Gatsby and React Static apps for React and VuePress apps for Vue. In fact, static sites became so popular that Gatsby formed a company and received VC funding around its open source library last year.

## Serverless Architecture and JAMStack

With the growing popularity of static sites, we also saw continued growth in backends to go along with them.

Serverless architecture has been a buzzword in web development lately for its ability to decouple client and server code, allowing operations at a reduced cost.

An extension of the serverless philosophy is the [JAMStack ](https://jamstack.org/)(JavaScript, APIs, Markup). The JAMStack philosophy builds on the static site concept discussed in the previous section. It allows faster load times, thanks to pre-built *markup*, and becomes a dynamic SPA on the client, using reusable APIs for the server. In 2018 we saw the first [JAMStack hackathon](https://medium.freecodecamp.org/winners-from-the-2018-freecodecamp-jamstack-hackathon-at-github-2a39bd1db878). [freeCodeCamp](undefined), [Netlify](undefined), and [GitHub](undefined) teamed up to host an in-person and online hackathon, letting people code at GitHub's headquarters or connect with other developers around the world.

To understand how a JAMStack site can scale while keeping its performance, [Quincy Larson](undefined) explains how freecodecamp.org is powered by the JAM architecture.
[**How freeCodeCamp Serves Millions of Learners Using the JAMstack | freeCodeCamp**
*In this talk, Quincy Larson shares about the history of freeCodeCamp, and how the JAMstack is used for...*www.freecodecamp.org](https://www.freecodecamp.org/news/beaucarnes/freecodecamp-jamstack--i9ZVp23pm)

## TypeScript may be the future of JavaScript (but the same can't be said for Flow) and TS 3.0 was released

JavaScript gets criticized for not having statically typed variables. The two main libraries trying to fix that are [TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/en/), but TypeScript seems to have become the favorite. In fact, TypeScript was ranked above JavaScript itself in the Stack Overflow survey, with 67% vs 61.9% for most loved language. According to the State of JS survey, over 80% of developers want to use TS or are already using it. For Flow, only 34% of developers are using it or want to use it.

Everything points to TypeScript being the definitive solution for static typing in JS, and lots of people are choosing it over plain JavaScript.

In 2018, npm downloads for TS grew substantially while Flow stayed very steady. TypeScript seems to be moving at high speed toward widespread adoption. On top of that, [TypeScript got its v3 update](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html).

![](assets/1_frSWl5Yp4FoIUla7wxPIXA.png)

## Accelerate Mobile Pages (AMP) grows fast

AMPs are pages built specifically for mobile devices.

![](assets/1_2A6tPpauW8KI5Pn4MhsG0w.png)

## Webpack 4 arrived in 2018

Just 8 months after the release of Webpack 3, version 4 came out.

Webpack 4 keeps focusing on simplicity and fast builds, promising up to 98% improvement. It goes with *sensible defaults*, handles more features natively, without plugins, and you no longer need a config file to get started. Webpack now also supports WebAssembly and lets you import WebAssembly files directly.

## Babel 7.0 was released

After almost 3 years since the release of version 6, Babel 7 came out in 2018.

Babel is the library that transpiles ES6+ JavaScript to ES5, making our JavaScript code compatible with multiple browsers. The Babel release article says the v7 improvements are "faster, creating an upgrade tool, JS config, config 'overrides', more options for minification, *JSX Fragments*, TypeScript, new proposals and much more!". Babel also moved its packages to the @babel namespace.

## VS Code dominates Text Editors/IDEs

Text editors and IDEs have been battlefields for developers since the old days of Vim vs emacs.

With the creation of [Electron](https://electronjs.org/), open source plugin-based editors exploded, with [Atom](https://atom.io/) taking part in this new market. However, [VS Code](https://code.visualstudio.com/) recently proved to be the developers' favorite and the main general-purpose editor by a significant margin in 2018.

![](assets/1_mLBjsSYDWEAdOy8pUjOjOg.png)

## Most influential articles of 2018

Full list of the top articles of 2018 (all in English):

[**Top Web Development Articles of 2018**
*A list of the best JavaScript, React, Vue, Angular, and frontend stories of 2018. Required reading for all web...*levelup.gitconnected.com](https://levelup.gitconnected.com/top-web-development-articles-of-2018-bd5c3900110b)

Addy Osmani showed us the cost of JavaScript
[**The Cost Of JavaScript In 2018**
*Building interactive sites can involve sending JavaScript to your users. Often, too much of it. Have you been on a...*medium.com](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)

We saw the future of React at React Conf in November
[**React Conf recap: Hooks, Suspense, and Concurrent Rendering | React Blog**
*This year’s React Conf took place on October 25 and 26 in Henderson, Nevada, where more than 600 attendees gathered to...*reactjs.org](https://reactjs.org/blog/2018/11/13/react-conf-recap.html)

Airbnb shared its 2 years of experience with React Native
[**React Native at Airbnb**
*In 2016, we took a big bet on React Native. Two years later, we’re ready to share our experience with the world and...*medium.com](https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c)

Google let us take a peek at the Google Photos Web UI
[**Building the Google Photos Web UI**
*A peek under the hood*medium.com](https://medium.com/google-design/google-photos-45b714dfbed1)

Microsoft is adopting Chromium for Edge
[**Microsoft Edge goes Chromium**
*The rumors were true: Microsoft Edge is moving to the open-source Chromium platform, the same platform that powers...*techcrunch.com](https://techcrunch.com/2018/12/06/microsoft-edge-goes-chromium-and-macos/)

GitHub is acquired by Microsoft
[**Microsoft to acquire GitHub for $7.5 billion | Stories**
*Acquisition will empower developers, accelerate GitHub’s growth and advance Microsoft services with new audiences From...*news.microsoft.com](https://news.microsoft.com/2018/06/04/microsoft-to-acquire-github-for-7-5-billion/)

Ryan Dahl (the creator of Node) tells us about the mistakes he made with Node and gives us a glimpse of the TypeScript *runtime*, Deno

<iframe width="650" height="400" src="https://www.youtube.com/embed/M3BM9TB-8yA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Predictions for 2019

* With a more solid foundation and constant evolution to improve the Web experience, WebAssembly will start to see more life.

* React stays on top, but Vue and Angular keep growing among users.

* CSS-in-JS may become the standard instead of plain CSS.

* Might developers start looking at native [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)?

* Not surprisingly, performance remains a focus and things like PWAs and *code splitting* become the standard for every app.

* Based on PWA adoption, the Web becomes more native with offline capabilities and seamless experiences across desktop and mobile devices.

* We keep seeing growth in CLI tools and frameworks to abstract away the tiresome parts of building apps, letting developers focus on shipping features.

* More companies adopt mobile solutions with a unified codebase, like [React Native](https://facebook.github.io/react-native/) and [Flutter](https://flutter.io/).

* The influence of containerization (ie. Docker, Kubernetes) becomes more popular in frontend development.

* GraphQL adoption increases and it's used at more companies.

* TypeScript starts becoming the default choice instead of plain JavaScript.

* Virtual reality advances with the use of libraries like [A-Frame](https://aframe.io/), [React VR](https://facebook.github.io/react-vr/), and [Google VR](https://developers.google.com/vr/?hl=en).
