---
title: 'From Zero to Front-End Hero (Part 2)'
date: 2016-06-14 00:00:01
description: 'A complete guide to learning Front-End development'
tags: ['career', 'learning', 'css', 'html', 'javascript']
translationOf: do-zero-a-heroi-do-front-end-parte-2
---

This article is the second part of the "From Zero to Front-End Hero" series. In the first part, you learned how to build layouts with HTML and CSS, using some of the best practices. In part two, we're going to focus on learning JavaScript as a standalone language, adding interactivity to interfaces, JavaScript design, architectural patterns and how to build web applications.

Just like with HTML and CSS, there are thousands of JavaScript tutorials out there. However, especially for someone new to the Front-End world, it's hard to figure out which tutorials to use and in what order to do them. The main goal of this series is to give you a roadmap to help you learn Front-End.

If you haven't read the [first part yet, do that before you keep reading](/en/blog/from-zero-to-front-end-hero-part-1/).

## JavaScript basics

JavaScript is a cross-platform programming language that can be used for pretty much anything these days, but we'll get back to that later, once you understand the basics of how developers use JavaScript for the web.

### Language

Before learning how to apply JavaScript on the web, you should learn about the language itself. To start, read the Mozilla Developer Network's [Language basics crash course](https://developer.mozilla.org/en-US/Learn/Getting_started_with_the_web/JavaScript_basics). This tutorial will teach you the basics of the language, like variables, conditionals and functions.

Then, read the following sections of the MDN [JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide):

- [Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
- [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Loops and iterations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

Don't worry too much about memorizing the syntax, you can always look it up. Instead, focus on understanding important concepts like variable instantiation, loops and functions. If the material feels too dense, that's fine. You can come back to it later. Once you put these concepts into practice, they'll get a lot clearer.

To break up the monotony of text-based learning, check out the [Codecademy JavaScript course](https://www.codecademy.com/learn/JavaScript). It's hands-on and fun. Also, if you have time, for each concept listed above, read the matching chapter in [Eloquent JavaScript](http://eloquentJavaScript.net) to reinforce your learning. _Eloquent JavaScript_ is a free online book that every aspiring Front-End developer should read.

### Interactivity

![Using JavaScript to animate layouts](https://d262ilb51hltx0.cloudfront.net/max/800/1*V4UtSyfCN9DDpl70IxXSHA.gif)

Now that you have a basic knowledge of JavaScript, the next step is to apply it to the web. To understand how JavaScript interacts with websites, you first have to understand the [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)'.

The DOM is a representational structure of HTML documents. It's a tree structure made of objects that correspond to the HTML nodes. To read more about the DOM, read [What is the DOM](https://css-tricks.com/dom) from CSSTricks. It gives a simple, straightforward explanation of the subject.

![Inspecting the DOM](https://d262ilb51hltx0.cloudfront.net/max/800/1*o1lGaXpnKYgp2r9CFOI_9A.png)

JavaScript interacts with the DOM to change and update it. Here's an example where we select an HTML element and change its content:

```js
var container = document.getElementById('container');
container.innerHTML = 'New Content!';
```

Don't worry, that was just a simple example. You can do a lot more than that by manipulating the DOM with JavaScript. To learn more about using JavaScript to interact with the DOM, read the following MDN sections, [The Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

- [Events](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)
- [Examples of web and XML development using the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Examples)
- [How to create a DOM tree](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/How_to_create_a_DOM_tree)
- [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [Locating DOM elements using selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)

Once again, focus on the concepts and not the syntax. Be able to answer the following questions:

- What is the DOM?
- How do you query elements?
- How do you add _event listeners_?
- How do you change DOM properties?

For a list of common JavaScript interactions with the DOM, check out PlainJS's [JavaScript Functions and Helpers](https://plainjs.com/JavaScript). This site gives examples of how to do things like set [styles on HTML elements](https://plainjs.com/JavaScript/styles/set-and-get-css-styles-of-elements-53) and add [keyboard _event listeners_](https://plainjs.com/JavaScript/events/getting-the-keycode-from-keyboard-events-17). And if you want to go deeper, you can read the DOM section in [Eloquent JavaScript](http://eloquentJavaScript.net/13_dom.html).

### Inspector

To _debug_ client-side JavaScript, we use the developer tools built into browsers. The inspector panel is available in most browsers and lets you see the source code of web pages. You can check when JavaScript runs, print debug states to the console and see things like network requests and other resources.

Here's a [tutorial](https://developer.chrome.com/devtools) on using Chrome's _developer tools_. If you're using Firefox, you can check out [this tutorial](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector).

![Chrome developer tools](https://d262ilb51hltx0.cloudfront.net/max/800/1*wW-FbgJhP0R_id-XPOSKpg.jpeg)

## Practicing the basics

At this point, you haven't learned that much about JavaScript yet. Still, the last section had a huge amount of information. I think it's a good time to take a break and run some small experiments. They should help solidify some of the concepts you just learned.

Experiment 1

For experiment 1, go to [AirBnB](https://www.airbnb.com), open your browser's _inspector tools_ and click on the [console tab](https://developer.chrome.com/devtools/docs/console). Here you can run JavaScript on the page. What we're going to do is have some fun manipulating a few of the elements on the page. See if you can do all of the following DOM manipulations.

![Airbnb.com](https://d262ilb51hltx0.cloudfront.net/max/800/1*5L17hFKIMTsBFQOLCy8tCQ.png)

I picked the AirBnB site because the CSS class names are relatively simple and aren't obfuscated by a compiler. But you can do this on any page you want.

- Select a header tag with a unique class name and change its text
- Select any element on the page and remove it
- Select any element and change one of its CSS properties
- Select a specific section and move it 250 pixels down
- Select any component, like a panel, and adjust its visibility
- Define a function called `doSomething` with a "Hello world" alert and then run it
- Select a paragraph, add a click _ event listener_ to it and run something every time it's clicked

If you get stuck, use the [JavaScript Functions and Helpers](https://plainjs.com/JavaScript) guide as a reference. I based most of these tasks on it, and below is an example of how to complete the first bullet:

```js
var header = document.querySelector('.text-branding')
header.innerText = ‘Boop'
```

The main goal of this experiment is to put into practice some of the things you learned about JavaScript and DOM manipulation.

### Experiment 2

![JavaScript lets developers build interactive interfaces](https://d262ilb51hltx0.cloudfront.net/max/800/1*7365CToqHiLkXf16Di8xRw.gif)

Using CodePen, write some basic JavaScript that uses DOM manipulation and needs some programming logic to work. The focus of this experiment is to take some of the things you learned in [From Zero to Front-End Hero](/en/blog/from-zero-to-front-end-hero-part-1/) and combine them with JavaScript. Here are a few examples for reference that might inspire you.

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/mecarter/embed/RNomVo?default-tab=result" title="Mood Color Generator" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/mecarter/pen/RNomVo">Mood Color Generator</a> by Mark E. Carter on CodePen</figcaption>
</figure>

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/nodws/embed/heILd?default-tab=result" title="Apple Liquid Glass Calculator" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/nodws/pen/heILd">Apple Liquid Glass Calculator</a> by Nodws on CodePen</figcaption>
</figure>

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/jasonchan/embed/wMaEwN?default-tab=result" title="Javascript Quiz Engine" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/jasonchan/pen/wMaEwN">Javascript Quiz Engine</a> by jason on CodePen</figcaption>
</figure>

<p class="embed embed-link">The original pen is no longer available on CodePen.</p>

### More JavaScript

Now that you know some JavaScript and have had a bit of practice, let's move on to more advanced concepts. The concepts below aren't directly related to each other. I grouped them in this section because they're needed to understand how to build more complex Front-End systems. You'll get a better sense of how to put them to use when you reach the experiments and Frameworks section.

## Language

As you build more projects with JavaScript, you'll run into some _higher level_ concepts. Here's a list of a few of them. When you have time, go through all of them. [Eloquent JavaScript](http://eloquentJavaScript.net) also covers a lot of this material, in case you want to round out your learning.

- [Prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Scoping](https://spin.atomicobject.com/2014/10/20/JavaScript-scope-closures)
- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Event bubbling](http://JavaScript.info/tutorial/bubbling-and-capturing)
- [Apply, call, and bind](http://JavaScriptissexy.com/JavaScript-apply-call-and-bind-methods-are-essential-for-JavaScript-professionals)
- [Callbacks and promises](https://www.quora.com/Whats-the-difference-between-a-promise-and-a-callback-in-JavaScript)
- [Variable and function hoisting](http://adripofJavaScript.com/blog/drips/variable-and-function-hoisting)
- [Currying](http://www.sitepoint.com/currying-in-functional-JavaScript)

### Imperative vs. Declarative

There are two kinds of approaches to how JavaScript interacts with the DOM: imperative and declarative. On one hand, declarative programming focuses on _what_ happens. On the other hand, imperative programming focuses on _what_ and also on _how_.

```js
var hero = document.querySelector('.hero')
hero.addEventListener(‘click’, function() {
  var newChild = document.createElement(‘p’)
  newChild.appendChild(document.createTextNode(‘Hello world!’))
  newChild.setAttribute(‘class’, ‘text’)
  newChild.setAttribute(‘data-info’, ‘header’)
  hero.appendChild(newChild)
})
}
```

This is an example of imperative programming, where we manually query an element and keep its state in the DOM. In other words, we're focusing on _how_ to get something done. The biggest problem with this code is that it's fragile. If someone changes the class name in the HTML from `hero` to `villain`, the _event listener_ won't work anymore, since the `hero` class won't exist in the DOM.

Declarative programming solves this problem. Instead of selecting elements, you leave that to the Framework or Library you're using. This lets you focus on _what_ instead of _how_. To read more, check out [The State Of JavaScript: A Shift From Imperative To Declarative](http://www.tysoncadenhead.com/blog/the-state-of-JavaScript-a-shift-from-imperative-to-declarative#.Vz0WEZMrIUE) and [Three D’s of Web Development #1: Declarative vs. Imperative](http://developer.telerik.com/featured/three-ds-of-web-development-1-declarative-vs-imperative).

This guide teaches the imperative approach first, before introducing the declarative approach with frameworks like [Angular](https://angular.io) and libraries like [React](https://facebook.github.io/react). I recommend learning in this order because it lets you see the problem the declarative approach solves.

### Ajax

Throughout these articles and tutorials, you've probably seen the term [Ajax](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) mentioned a few times. Ajax is a technique that lets web pages interact with the server using JavaScript.

![Ajax is what makes content dynamic](https://d262ilb51hltx0.cloudfront.net/max/800/1*kkezNwUnuEiAztlQRkJ69A.gif)

For example, when you submit a form on a website, it collects your input and makes an HTTP request that sends data to a server. When you post a tweet on Twitter, your Twitter client makes an HTTP request to the Twitter API server and updates the page with the server's response.

For reading about Ajax, see [What is Ajax](http://www.vandelaydesign.com/what-is-ajax-webdev). If you still haven't fully grasped the concept, take a look at [Explain it like i’m 5, what is Ajax](https://www.reddit.com/r/explainlikeimfive/comments/19gvn9/explain_it_like_im_5_what_is_ajax). If that's still not enough, you can read [Eloquent JavaScript’s chapter on HTTP](http://eloquentJavaScript.net/17_http.html).

Today, the browser standard for making HTTP requests is [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). You can read more about _Fetch_ in this article by [Dan Walsh](https://davidwalsh.name/fetch). It covers how _Fetch_ works and how to use it. You can also find a _Fetch_ [polyfill](http://stackoverflow.com/questions/7087331/what-is-the-meaning-of-polyfills-in-html5) with its documentation [here](https://github.com/github/fetch).

### jQuery

So far, you've been doing DOM manipulation using only JavaScript. But there are several DOM manipulation libraries that provide APIs to simplify the code you write.

One of the most popular DOM manipulation libraries is [jQuery](https://jquery.com). Keep in mind that jQuery is an imperative library. It was written before Front-End systems became as complex as they are today. Nowadays, complex user interfaces are managed with declarative frameworks, using libraries like Angular and React. Still, I recommend you learn jQuery because you'll probably run into it many times during your career as a Front-Ender.

![jQuery is an abstraction on top of simple DOM manipulation](https://d262ilb51hltx0.cloudfront.net/max/800/1*4XD5t8AEjQFWeTWEIdhQpw.gif)

To learn the jQuery basics, check out [jQuery’s Learning Center](http://learn.jquery.com). It's a step-by-step walkthrough of important concepts like animations and event handling. If you want an interactive tutorial, you can try the [Codecademy’s jQuery course](https://www.codecademy.com/learn/jquery).

Keep in mind, jQuery isn't always the solution for imperative DOM manipulation. [PlainJS](https://plainjs.com/JavaScript) and [You Might Not Need jQuery](http://youmightnotneedjquery.com) are two sites that show JavaScript functions equivalent to frequently used jQuery functions.

### ES5 vs. ES6

Another important concept to understand about JavaScript is [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) and how it relates to JavaScript. There are two main flavors of JavaScript you'll run into today: ES5 and ES6. They're ECMAScript standards that JavaScript uses. You can think of them as versions of JavaScript. The ES5 final draft was finalized in 2009 and it's what we've been using up to now.

ES6, also known as ES2015, is the new standard that brings new language constructs like [constants](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to JavaScript. It's important to note that ES6 brings new language features, but we still define things semantically in terms of ES5. For example, classes in ES6 are merely [_syntactical sugar_](https://en.wikipedia.org/wiki/Syntactic_sugar) over JavaScript's [prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

It's essential to know both ES5 and ES6, since you'll see applications that use one or the other. A good introduction to ES6 is [ES5, ES6, ES2016, ES.Next: What’s going on with JavaScript versioning](http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-JavaScript-versioning) and Dan Wahlin's [Getting Started with ES6: The Next Version of JavaScript](http://weblogs.asp.net/dwahlin/getting-started-with-es6-%E2%80%93-the-next-version-of-JavaScript). After that, you can see a full list of changes from ES5 to ES6 at [ES6 Features](http://es6-features.org/#Constants). If you want even more, check out this [GitHub repository about ES6 features](https://github.com/lukehoban/es6features).

## More practice

If you've made it this far, give yourself a pat on the back. You've already learned a lot about JavaScript. Let's put what you learned into practice.

### Experiment 3

![Flipboard.com](https://d262ilb51hltx0.cloudfront.net/max/800/1*vThR7vEzW40OloxGnbmwuA.png)

Experiment 3 will teach you how to use skills like DOM manipulation and jQuery. For this experiment, we'll take a more structured approach and copy the Flipboard homepage using the Codecademy tutorial, [Flipboard’s home page and add interactivity with JavaScript](https://www.codecademy.com/skills/make-an-interactive-website).

During the tutorial, focus on understanding how to build an interactive website, when to make it interactive and how to apply jQuery.

### Experiment 4

Experiment 4 combines what you learned about HTML and CSS with your introductory JavaScript course. For this experiment, you'll build a clock with your own style and make it interactive using JavaScript. Before you start, I recommend reading [Decoupling Your HTML, CSS, and JavaScript](http://philipwalton.com/articles/decoupling-html-css-and-JavaScript) to learn the basics of CSS naming once JavaScript gets thrown into the project. I also put together a list of _pens_ on CodePen for you to use as a reference for this experiment. For more examples, search for [clock](http://codepen.io/search/pens?q=clock&limit=all&type=type-pens) on CodePen.

- [Flat Clock](http://codepen.io/stevenfabre/pen/Cyhjb)
- [jQuery Wall Clock](http://codepen.io/mattlitzinger/pen/ruEyz)
- [Fancy Clock](http://codepen.io/rapidrob/pen/IGEhn)
- [Retro Clock](http://codepen.io/OfficialAntarctica/pen/VYzvgj)
- [Simple JavaScript Clock](http://codepen.io/dudleystorey/pen/unEyp)

You can do this experiment in two ways:

1. Start by designing and building the layout in HTML and CSS, and add interactivity with JavaScript.
1. Write the JavaScript logic first and then move on to the layout.

You can use jQuery, but feel free to use plain JavaScript.

## JavaScript Frameworks

Now that you know the JavaScript basics, it's time to learn about JavaScript Frameworks.

Frameworks are JavaScript libraries that help you structure and organize your code. They give developers repeatable solutions to complex Front-End problems, like state management, routing and performance optimization. They're commonly used to build [web apps](http://www.visionmobile.com/blog/07/web-sites-vs-web-apps-what-the-experts-think).

I'm not going to include a description of every JavaScript framework. But here's a quick list of a few Frameworks:

- [Angular](https://angularjs.org)
- [React](https://facebook.github.io/react) + [Flux](https://facebook.github.io/react/docs/flux-overview.html)
- [Ember](http://emberjs.com)
- [Aurelia](http://aurelia.io)
- [Vue](http://vuejs.org)
- [Meteor](https://www.meteor.com)

You don't have to learn all the Frameworks. Pick one and learn it well. Don't focus on the Frameworks themselves. Instead, understand their programming philosophies and the principles they're built on.

## Architectural Patterns

Before looking at Frameworks, it's important to understand some architectural patterns they commonly use: [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), [model-view-viewmodel](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) and [model-view-presenter](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter). These patterns are designed to create a clear [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) between the layers of the application.

Separation of concerns is a principle that suggests splitting the application into specific layers. For example, instead of the HTML holding the application state, you can use a JavaScript object (usually called `model`) to store the state.

To learn more about these patterns, first read about MVC on [Chrome Developers](https://developer.chrome.com/apps/app_frameworks). Then, read [Understanding MVC And MVP (For JavaScript And Backbone Developers)](https://addyosmani.com/blog/understanding-mvc-and-mvp-for-JavaScript-and-backbone-developers). In that article, don't worry about learning Backbone, just look at the parts with the MVC and MVP explanations.

Addy Osmani also wrote about MVVM in [Understanding MVVM: A Guide For JavaScript Developers](https://addyosmani.com/blog/understanding-mvvm-a-guide-for-JavaScript-developers). To learn more about the origins of MVC and why it came about, read Martin Fowler's essay called [GUI Architectures](http://martinfowler.com/eaaDev/uiArchs.html). Finally, read the [JavaScript MV* Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvcmvp) section in [Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book), a fantastic online book.

## Design Patterns

JavaScript Frameworks don't reinvent the wheel. Most of them rely on _design patterns_. You can think of _design patterns_ as templates for solving common problems in software development.

Since understanding _design patterns_ in JavaScript isn't a prerequisite for learning a Framework, I suggest going through the following list at some point.

- [Decorator](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternJavaScript)
- [Factory](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternJavaScript)
- [Singleton](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternJavaScript)
- [Revealing module](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternJavaScript)
- [Facade](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternJavaScript)
- [Observer](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternJavaScript)

Understanding and being able to implement a few of these _design patterns_ will not only make you a better developer, but also help you understand what some Frameworks are doing behind the scenes.


### AngularJS

AngularJS is an [MVC](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvc) Framework and sometimes an [MVVM](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvvm) Framework. It's maintained by Google and it shook up the JavaScript community when it was released in 2010.

![AngularJS](https://d262ilb51hltx0.cloudfront.net/max/800/1*lFZ7nP3KlRtb69abn19xJQ.png)

Angular is a declarative Framework. The reading that helped me the most to understand the shift from imperative to declarative programming in JavaScript was [How is AngularJS different from jQuery](http://stackoverflow.com/questions/13151725/how-is-angularjs-different-from-jquery) on StackOverflow.

If you want to learn more about Angular, check out the [documentation](https://docs.angularjs.org/guide). They also have a tutorial called [Angular Cat](https://docs.angularjs.org/tutorial/step_00) that lets you jump into coding right away. A more complete guide to learning Angular can be found in this [GitHub repository](https://github.com/timjacobi/angular2-education) by Tim Jacobi. Also, check out the [best practice styleguide](https://github.com/johnpapa/angular-styleguide), written by John Papa.

### React + Flux

Angular solves many problems developers face when building complex Front-End systems. Another popular tool is [React](https://facebook.github.io/react), which is a library for building _user interfaces_. You can think of it as the V in MVC. Since React is just a library, it's often paired with an architecture known as [Flux](https://facebook.github.io/flux).

![React](https://d262ilb51hltx0.cloudfront.net/max/800/1*c0JXNVxVnTlOuQCnDqA6CA.png)

Facebook developed React and Flux to address some of the shortcomings of MVC and its scalability problems. Take a look at their talk known as [Hacker Way: Rethinking Web App Development at Facebook](https://www.youtube.com/watch?list=PLb0IAmt7-GS188xDYE-u1ShQmFFGbrk0v&v=nYkdrAPrdcw). It talks about the future and the origins of Flux.

<iframe width="100%" height="415" src="https://www.youtube.com/embed/nYkdrAPrdcw?list=PLb0IAmt7-GS188xDYE-u1ShQmFFGbrk0v" frameborder="0" allowfullscreen></iframe>

To get started with React + Flux, first learn React. A good start is the [React documentation](https://facebook.github.io/react/docs/getting-started.html). After that, check out [React.js Introduction For People Who Know Just Enough jQuery To Get By](http://reactfordesigners.com/labs/reactjs-introduction-for-people-who-know-just-enough-jquery-to-get-by) to help you transition away from the "jQuery mindset".

Once you have a basic understanding of React, start learning Flux. A good place to start is the [official Flux documentation](https://facebook.github.io/flux/docs/overview.html). Then check out [Awesome React](https://github.com/enaqx/awesome-react), a curated list of links that will help you take your learning even further.

## Practicing with Frameworks

Now that you have a basic knowledge of Frameworks and architectural patterns, it's time to put them into practice. During these two experiments, focus on applying the architectural concepts you learned. Keep your code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), with a [clear separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns), and use the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle).

### Experiment 5

This experiment is about taking apart and rebuilding the _Todo MVC_ app using framework-agnostic JavaScript. In other words, keep the JavaScript plain, without a Framework. The goal of this experiment is to show how MVC works without mixing in Framework-specific syntax.

![](https://d262ilb51hltx0.cloudfront.net/max/800/1*ISCVxjX3_691DLnV3EPZ3w.png)

To start, check out the final result on [TodoMVC](http://todomvc.com/examples/vanillajs). The first step is to create a new local project and first set up the three MVC components. Since this is an experiment, reference the full source code in this [GitHub repository](https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs). If you can't fully replicate the project or don't have the time, that's fine. Download the code from the repository and play around with the different MVC components until you understand how they relate to each other.

### Experiment 6

Experiment 6 is a good MVC application exercise. Understanding MVC is an important step in learning JavaScript Frameworks. Below is a Scotch.io tutorial for building an Etsy clone using Angular.

![](https://d262ilb51hltx0.cloudfront.net/max/800/1*zOIJ31nV3rDYBidYkPSH_A.png)

[Build an Etsy Clone with Angular and Stamplay](https://scotch.io/tutorials/build-an-etsy-clone-with-angular-and-stamplay-part-1) will teach you how to build a web app using Angular, interface with [APIs](https://en.wikipedia.org/wiki/Application_programming_interface) and structure large projects. After finishing this tutorial, you should be able to answer the following questions:

- What is a web app?
- How are MVC/MVVM applied with Angular?
- What is an API and what does it do?
- How do you organize and structure large codebases?
- What are the advantages of adding _directive components_ to your UI?

If you want to build other web apps using Angular, try [Build a Real-Time Status Update App with AngularJS & Firebase](https://www.sitepoint.com/real-time-status-update-app-angularjs-firebase).

### Experiment 7

![React + Flux](https://d262ilb51hltx0.cloudfront.net/max/800/1*3HrnGSbAzIM5Lwu0_eqmjw.png)

Now that you understand MVC, it's time to try [Flux](https://facebook.github.io/flux). Experiment 7 will build a _todo list_ using the React and Flux architecture. You can find the full tutorial on the [Facebook’s Flux documentation site](https://facebook.github.io/flux/docs/todo-list.html). It walks you step by step through using React to build interfaces and how Flux is applied to build web apps.

After you complete that tutorial, you can try other related tutorials like [How to Build a Todo App Using React, Redux, and Immutable.js](https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js) and [Build a Microblogging App With Flux and React](http://code.tutsplus.com/courses/build-a-microblogging-app-with-flux-and-react).

## Stay up to date

Just like the rest of Front-End, the JavaScript landscape changes fast. It's important to always stay one step ahead.

Below is a list of websites, blogs and forums that are informative and enjoyable to read.

- [Smashing Magazine](https://www.smashingmagazine.com/tag/JavaScript)
- [JavaScript Weekly](http://JavaScriptweekly.com)
- [Ng Weekly](http://www.ng-newsletter.com)
- [Reddit JavaScript](https://www.reddit.com/r/JavaScript)
- [JavaScript Jabber](https://devchat.tv/js-jabber)

## Learn by example

As always, the best way to learn is by example.

### Styleguides

JavaScript styleguides are code conventions developed to help you keep your code readable and easy to maintain.

- [AirBnB JavaScript Styleguide](https://github.com/airbnb/JavaScript)
- [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)
- [Node Styleguide](https://github.com/felixge/node-style-guide)
- [MDN Coding Style](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Coding_Style)

### Codebases

I can't stress enough how useful it is to read good code. Learn how to search [GitHub](https://github.com) for relevant repositories whenever you're looking into something new.


- [Lodash](https://github.com/lodash/lodash)
- [Underscore](https://github.com/jashkenas/underscore)
- [Babel](https://github.com/babel/babel)
- [Ghost](https://github.com/TryGhost/Ghost)
- [NodeBB](https://github.com/NodeBB/NodeBB)
- [KeystoneJS](https://github.com/keystonejs/keystone)


## Final thoughts

By the end of this guide, you should have a solid understanding of JavaScript fundamentals and how to apply them on the Web. Remember, this guide gives you a general map of the path. If you want to become a Front-End hero, it's important that you spend time working on projects to apply these concepts. The more projects you build, and the more you fall in love with them, the more you'll learn.

This article is the second part of a two-part series. What's missing from this guide is an introduction to [Node](https://nodejs.org/en), a platform that lets JavaScript run on servers. In the future, I may write a part three about server-side development with Node and things like [noSQL](https://en.wikipedia.org/wiki/NoSQL) databases.

## About this article

This text was a loose translation of the fantastic article [From Zero to Front-End Hero (Part 2)](https://medium.freecodecamp.com/from-zero-to-front-end-hero-part-2-adfa4824da9b#.342vpy7aq) published on Medium by [@jonathanzwhite](https://twitter.com/jonathanzwhite).

So I want to thank him, first for writing this great piece, and second for allowing me to translate it.

It's worth pointing out that the translation isn't literal, I adapted a few parts to make it easier to follow. If you find any serious translation errors, you can open a [pull request](https://github.com/felipefialho/felipefialho.github.io) with the fix or an [issue telling me where the error is](https://github.com/felipefialho/felipefialho.github.io/issues).
