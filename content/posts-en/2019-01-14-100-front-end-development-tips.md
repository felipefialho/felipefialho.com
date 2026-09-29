---
title: '100 Front-end Development Tips'
date: 2019-01-14 00:00:01
description: '👉 A joke that turned into a really cool thread: 💯 quick tips about Front-end Development'
tags: ['html', 'javascript', 'css']
translationOf: 100-dicas-sobre-desenvolvimento-front-end
---

In the last few days Twitter got a bunch of super useful threads based on the premise: “Give me a RT or a like and I'll tweet about the topic”.

I thought the game was cool and adapted it to the developer scene with this thread:

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1083160362642522112">
    <p>Vou entrar na brincadeira! 😂<br><br>1 RT = 1 dica rápida de front-end</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1083160362642522112">January 10, 2019</a></figcaption>
</figure>

Truth is, I figured my thread would get few RTs, I never imagined the game would catch on so much among devs, but it took off!

Besides the high number of retweets, other people decided to jump in and play with the dev theme too, and anyone on Twitter had a week full of amazing tips.

It was a fun challenge to come up with all these tips, and I even had plenty more in mind, but writing this sequence wore me out more than I thought it would, so I decided to stop at 100, which is a nice number (who knows, maybe more will come in a while? 😜).

I also [created a Moment to make it easier to view inside Twitter](https://twitter.com/i/moments/1083766796321243138).

But on the internet nothing scales better than written text, so here it is.

## 100 quick tips about Front-end

<b>1.</b> Visually, `<b>` and `<strong>` make the element bold. The difference is that `<b>` carries no semantics at all, while `<strong>` represents important text.

<b>2.</b> `<i>` and `<em>` make the element italic and both carry semantic meaning, with `<i>` usually used for things like expressions in other languages and `<em>` to indicate emphasis in the text.

<b>3.</b> That means it's not a good idea to use `<i>` to represent things like icons, elements with no semantics like `<span>` work better for that.

<b>4.</b> Some elements carry no semantic value at all, `<div>` and `<span>` are good examples.

<b>5.</b> By default `<div>` is display: block and `<span>` is display: inline, don't waste lines of CSS setting or changing that.

<b>6.</b> When building your components, first focus on making sure the HTML is semantic.

<b>7.</b> If you get the semantics right, you can use CSS classes to style things (thinking about plain CSS).

<b>8.</b> Still on semantics, you can think of the hierarchy of information as if you were laying out a book.

<b>9.</b> Use only `<h1>` to `<h6>` tags to create headings.

<b>10.</b> A fun fact is that these days you can use `<a>` to wrap other elements (except another `<a>`).

<b>11.</b> In the past, when we needed to build, for example, a card with a link, we had to pull off hacks like leaving an `<a>` inside the card with position absolute 0.

<b>12.</b> If you use component-based libs, don't fall for the temptation of stripping out all the HTML semantics. Keep writing accessible code.

<b>13.</b> We use lang on the `<html>` tag, but a cool tip is that you can use lang on any element and declare the default language of the text.

<b>14.</b> And more, you can also style any element in CSS based on its lang, like this:

```css
.description[lang=”en”] { color: red };
.description[lang=”pt-br”] { color: blue };
```

<b>15.</b> This extends to any attribute on HTML elements, which means you can combine WAI-ARIA with CSS and create some really cool stuff, like this Tooltip in CSS Components.

[![CSS Components](assets/css-components.jpg)](https://www.felipefialho.com/css-components/#component-tooltip)

<b>16.</b> Interestingly, even classes can be used this way, for example:

```css
a[class=”active”]
```

<b>17.</b> Since classes can be used this way, you can also do cool things like selecting only elements that have a certain word somewhere in the class:

```css
span[class*=”icon-”]
```

<b>18.</b> Or even better, matching space-separated words.

```css
span[class~=”icon arrow-right”]
```

<b>19.</b> You can also select only elements that start with a certain word:

```css
span[class^=”icon”]
```

<b>20.</b> With that you can do really cool things, like selecting only secure links (maybe to add a padlock icon?):

```css
a[href^=”https://”]
```

<b>21.</b> You can also do things like select all the disabled elements in your project and add styles:

```css
[disabled] { cursor: not-allowed; }
```

<b>22.</b> In the past it was common to add a class, for example, to the last items of a list to reset styles:

```html
<li class=”last”></li>
```

```css
li {
  border: black solid 1px;
}

.last {
  border: 0;
}
```

<b>23.</b> With the arrival of pseudo-classes in CSS3, years ago, that's no longer necessary:

```css
:last-child {
  border: 0;
}
```

<b>24.</b> But the tip above is pretty bad, the ideal is to not reset properties in CSS at all, that stopped making sense once :not became supported in browsers:

```css
li:not(:last-child} {
  border: black solid 1px;
}
```

<b>25.</b> :not is one of my favorite CSS pseudo-classes, I've [already written a whole article](/blog/css-o-fodastico-not/) (in Portuguese) about it:

<b>26.</b> Using only CSS you can remove an element from the screen if it has no content:

```css
div:empty {
  display: none;
}
```

<b>27.</b> You can even mix pseudo-classes, for example, to give an element a behavior if it's the last child, but not if it's also the first child at the same time:

```css
.btn:last-child:not(:first-child)
```

<b>28.</b> You can make some really wild combinations of pseudo-classes and pseudo-selectors, for example, grab a .title class only if it's not an h2 and .header is not active:

```css
.header:not(.active) + .main .title:not(h2)
```

<b>29.</b> Pseudo-selectors, by the way, help a ton to avoid resetting properties and to do cool stuff with CSS.

<b>30.</b> You can, for example, select only the next element and change the style based on the sibling's class, something like:

```css
.btn.active + .btn {
  margin-left: 20px;
}
```

<b>31.</b> Or even select all the following sibling elements to add styles:

```css
.btn.active ~ .btn {
  margin-top: 20px;
}
```

<b>32.</b> We can also combine pseudo-classes and pseudo-selectors to do things like:

```css
input[type=”checkbox”]:checked ~ p {
  color: red;
}
```

<b>33.</b> From that base, we can build super-interactive CSS by taking advantage of the states of elements like radio and checkbox, and make an element show up or disappear:

```css
p {
  display: none;
}

input[type=”checkbox”]:checked ~ p {
  display: block;
}
```

<b>34.</b> With this you can do surreal things with CSS, without using JavaScript.

This is the foundation of all those little games and components built with CSS only, and even though it looks like witchcraft, you just saw that it's super simple.

<b>35.</b> Years ago (many years) I [wrote an article showing how I built all the CSS Components](/blog/e-possivel-utilizar-componentes-desenvolvidos-apenas-com-css/) (in Portuguese):

<b>36.</b> Speaking of selectors, they have a matching performance cost in browsers. And it's important to take that into account when writing your code.

<b>37.</b> Selector performance, from best to worst, is:

1. `#header`
2. `.header`
3. `header`
4. `nav + header`
5. `main > h1`
6. `main header`
7. `*`
8. `[type=”text”]`
9. `.header:before, header: after`

<b>38.</b> Avoid nesting elements by doing things like:

```css
body header ul li
```

<b>39.</b> The ideal, if you're not using CSS-in-JS, is to use classes to style elements and avoid deep nesting.

<b>40.</b> I've already written an [article explaining all the advantages of using classes](/blog/porque-usar-classes-para-estilizar-elementos/) (in Portuguese)

<b>41.</b> It's precisely to make CSS less chaotic and to make code easier to maintain that methodologies like BEM or RCSS were created.

<b>42.</b> But they don't solve CSS's main problem, which is called specificity. Style collisions are the biggest source of problems when we work with CSS on large projects.

<b>43.</b> To solve the specificity problem, our old buddy JavaScript stepped in, bringing solutions like:

- CSS Modules
- CSS-in-JS

They make sure the style doesn't leak into other components.

<b>44.</b> The downside of some CSS-in-JS libs is that they require component-based applications (like React, Angular and Vue) to work.

<b>45.</b> But you can use, for example, CSS Modules if you're using Webpack in your project, I used this solution in my [Kratos Boilerplate](https://github.com/LFeh/kratos-boilerplate) and it can work for your static projects:

<b>46.</b> One of the cool things about CSS Modules and other CSS-in-JS libs is that you no longer need to think so hard about class names.

Instead of using: `.header__title`
You can just use: `.title`

<b>47.</b> If you develop for modern browsers, after the rise of Flexbox and CSS Grid, you don't need to use float anymore to build grids in your projects.

<b>48.</b> CSS Grid also removes much of the need to bet on grid system libs, like the one from Bootstrap or even PostCSS-based ones like Lost or Jeet.

<b>49.</b> CSS Grid and Flexbox can and should be used together, even though they solve similar problems, each one has its own specific use.

<b>50.</b> Flexbox is one-dimensional and ideal for the inner layout of components.

Like in a header with a logo on the left and a menu button on the right, where you can use:

```css
.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 60px;
}
```

<b>51.</b> CSS Grid is multidimensional and ideal for the macro part of the layout, like grids.

It also works really well for creating a list of cards, for example. Plus it scales easily on mobile.

<b>52.</b> Make good use of media queries. Ideally, you shouldn't build thinking about desktop and then override things on mobile. It works better to use the mobile-first concept and scale up the components as the resolutions get bigger.

<b>53.</b> You can create scopes inside the class through media queries.

That means you can keep everything that's generic to all resolutions outside the media queries and, inside them, only what's specific to that resolution.

<b>54.</b> Years ago I wrote this [article explaining how to create media query scopes](/blog/otimizando-e-organizando-as-media-queries/) (in Portuguese), and the idea hasn't changed much since then:

<b>55.</b> In the past, we used `<div>` and `<span>` for a lot of things that should carry semantics. The tags introduced with HTML5 solved a good chunk of those problems.

<b>56.</b> When you're building a component, always check whether you're making good use of HTML elements and whether you could use others that make more sense.

<b>57.</b> There are currently around ~110 HTML tags. It's pretty unlikely that there isn't one that fits each occasion exactly.

<b>58.</b> `<main>`, for example, should be used only once in the project and defines the main content inside `<body>`.

I usually add it as a sibling of the main `<header> `and `<footer>` tags.

```html
<body>
  <header><header>
  <main></main>
  <footer></footer>
</body>
```

<b>59.</b> You can have multiple `<header>` and `<footer>` elements across the project.

They can be used to define the header or footer of any context, such as inside `<article>` or `<section>`, for example.

<b>60.</b> `<article>` and `<section>` tend to cause some confusion about their usage. It's important to say that you can have an `<article>` inside a `<section>` and vice versa.

<b>61.</b> Years ago there was an [awesome discussion about article vs section](https://github.com/frontendbr/forum/issues/23) on [@frontendbr](https://twitter.com/frontendbr) and I strongly recommend checking it out:

<b>62.</b> Whenever you write an address inside a text, use the `<address>` element, whose exact purpose is to make that content semantic.

<b>63.</b> Ideally you should use the `<nav>` tag for every section of the project that represents navigation.

You can also have multiple `<nav>` elements across the application.

<b>64.</b> Make use of the `<noscript>` tag. It lets you give feedback to the user if JavaScript isn't available for some reason.

<b>65.</b> You can see a roundup of the [most used HTML tags in this section of the MDN (Mozilla Developer Network)](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element).

<b>66.</b> By the way, that's another tip. [I'm in love with MDN](https://developer.mozilla.org/). It's the place where I feel most confident validating things, and I always learn something new.

<b>67.</b> And it's worth remembering that everyone can contribute content and translations to MDN. Golden tip from [@larienmf](https://twitter.com/larienmf) 😄

<b>68.</b> You can improve your project's semantics and accessibility even more by using WAI-ARIA, which is split into two categories: `roles` and `states / properties`.

<b>69.</b> You can, for example, use [role=”dialog”] for modal components.

```html
<div role=”dialog”>
```

<b>70.</b> You can also define which are the main `<header>` and `<footer>`.

```html
<header role=”banner”>
<footer role=”contentinfo”>
```

<b>71.</b> Another cool possibility is making purely visual elements invisible to screen readers.

It works well with icons:

```html
<svg aria-hidden=”true”>
```

<b>72.</b> You can provide information about the element when the text isn't available on screen.

Again, an example with an icon:

```html
<svg aria-label=”Facebook”>
```

<b>73.</b> WAI-ARIA becomes even more important as we build components with elements that have no HTML semantics, for example in components abstracted by JavaScript.

It's a way to provide accessibility and meaning to the tags you created.

<b>74.</b> You can even access all the values of WAI-ARIA properties with :before and :after in CSS and do some really wild stuff like this:

<blockquote class="twitter-tweet"><p lang="pt" dir="ltr">👉 Criei um exemplo de código usando React, daquela solução em Pure CSS p/ adicionar label no Slider do Material.<br><br>Observe que uso apenas:<br><br>- [aria-valuenow]<br>- :after<br><br>Sem modificar nada no JavaScript do componente.<br><br>CSS é incrível, confia 💙<a href="https://t.co/7TsG1kkZgH">https://t.co/7TsG1kkZgH</a></p>&mdash; felipe.js (@felipefialho_) <a href="https://twitter.com/felipefialho_/status/1067093417451290624?ref_src=twsrc%5Etfw">November 26, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<b>75.</b> I've already written an [article about WAI-ARIA with some cool examples](/blog/sobre-wai-aria-acessibilidade-e-semantica/) (in Portuguese).

<b>76.</b> Never forget that :after and :before in CSS don't work without the content property 😋

```css
:before { content: “Já acabou?”; }
:after { content: “Ainda não”; }
```

Worth noting that they're inline by default.

<b>77.</b> By the way, I really like :before and :after, they let me do all sorts of things with CSS without touching the HTML.

Think about it: with just 1 HTML element, you actually have<b> 3.</b> That opens up a sea of possibilities.

<b>78.</b> But a fair warning: all the content you add to the content of `:before` and `:after` has no semantic value and doesn't render in the HTML.

That means the text won't be accessible. Use it only for purely visual extras.

<b>79.</b> When you get a project, analyze it and see everything that could be a component. Don't think in whole pages.

Build separate components and make the page be the grouping of them. That applies to SPAs as well as static projects.

<b>80.</b> You don't work alone.

Talk to your team, especially designers, and explain components and how all modern applications are built on them.

That will make your code a lot more on point.

<b>81.</b> The unit I use the most is rem, and to use it as if it were px, just add:

```css
html { font-size: 10px; }
```

And 1.6rem becomes approximately 16px.

<b>82.</b> One advantage of rem is that it scales across different resolutions, since the proportion is based on the root. If you want the measurements to be proportionally smaller or bigger, just decrease or increase the root's font-size:

```css
media (max-width: 600px) {
  html {
    font-size: 10px;
  }
}
```

<b>83.</b> Making the font-size fluid automagically:

```css
html {
  font-size: calc(#{$minimum-size}px + (#{$maximum-size} — #{$minimum-size}) * ((100vw — #{$minimum-viewport}px) / (#{$maximum-viewport} — #{$minimum-viewport})));
}
```

Confusing? Check out this example I left for you on Codepen:

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/felipefialho/embed/wRYoPN?default-tab=result" title="Pen by @felipefialho on CodePen" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/felipefialho/pen/wRYoPN">See @felipefialho's pen on CodePen</a></figcaption>
</figure>

<b>84.</b> Avoid using magic numbers, whether in CSS or JavaScript. A tip is to create a scale for your CSS variables:

```scss
$space-xxs : .4rem;
$space-xs : .8rem;
$space-sm : 1.6rem;
$space : 2.4rem;
$space-md : 3.2rem;`
$space-lg : 4.8rem;
```

<b>85.</b> Watch out for z-index madness. Create variables for it and set up a lint rule to block commits that don't use those variables for z-index.

```js
$zindex-default: 1;
$zindex-footer: 10;
$zindex-header: 30;
$zindex-overlay: 40;
```

<b>86.</b> Easily understanding how `em` works: it's based on the parent's size, that is.

```css
.pai { font-size 10px; }
.filho1 { font-size: .8rem; }
.filho2 { font-size: 1.2rem; }
```

`.filho1` will be approximately `8px` and `.filho2` will be approximately `12px`.

<b>87.</b> If you want to test whether a JavaScript variable has a value:

```js
const xis = 'x'
const hasXis = !!xis
console.log(hasXis) // true
```

<b>88.</b> To ensure integrity and avoid bugs, the ideal is to always compare by type:

```js
console.log(1 === '1') // false
```

<b>89.</b> But you can compare values ignoring the type:

```js
console.log(1 == '1') // true
```

<b>90.</b> const variables are not immutable by default:

```js
const felipe = ['corinthiano', 'maloqueiro']
felipe.push('sofredor')
console.log(felipe) // ['corinthiano', 'maloqueiro', 'sofredor']
```

<b>91.</b> For const variables to be immutable you need to add Object.freeze:

```js
const d2k = Object.freeze(['javascript', 'ninja', 'react'])
d2k.push('jquery') // Uncaught TypeError: Cannot add property 3, object is not extensible
```

<b>92.</b> You can easily concatenate strings using template literals:

```js
const f = (s = '❤️') => `I ${s} CSS`
console.log(f())
// I ❤️ CSS
```

<b>93.</b> With the spread operator you can easily concatenate arrays:

```js
const skills1 = [ 'css', 'html' ]
const skills2 = [ 'js', 'ts' ]
const newSkills = [ ...skills1, ...skills2, 'ux' ]
console.log(newSkills) // [ 'css', 'html', 'js', 'ts', 'ux' ]
```

<b>94.</b> You can also merge objects:

```js
const felipe = { name: 'Felipe', company: 'Cubo' }
const xhamps = { nickname: 'Xhamps Monstro' }
const xhampelipe = { ...xhamps, ...felipe }
console.log(xhampelipe)
// { nickname: "Xhamps Monstro", name: "Felipe", company: "Cubo" }
```

<b>95.</b> You can also turn a string into an array with the spread operator:

```js
const s = 'HTML'
const c = [ ...s ]
console.log(c) // [ 'H', 'T', 'M', 'L' ]
```

<b>96.</b> The combo of spread operator and destructuring is simply killer:

```js
const person = { name: 'Felipe', lastName: 'Fialho', age: 28 }
const { name, age } = person
console.log(name, age) // Felipe 28
```

<b>97.</b> If you want to do the opposite and create a new object (or array) with the rest of the original, we have the rest operator:

```js
const person = { name: 'Felipe', lastName: 'Fialho', age: 28 }
const { name, ...restOfPerson } = person
console.log(restOfPerson) // { lastName: "Fialho", age: 28 }
```

<b>98.</b> A tip is to use parameter destructuring in functions, it makes them more descriptive at the call site and saves you from having to guess the order of the parameters.

```js
const person = ({ name, age }) => `${name} tem ${age} anos`
person({ age: '28', name: 'Felipe'})
// Felipe tem 28 anos
```

<b>99.</b> For images, with the CSS object-fit property you can use proportions that were previously only possible with background-image:

```css
img { object-fit: cover; }
```

1<b>00.</b> Combining `position: relative` and `:before`, you can handle the aspect ratio of images. This is especially useful for handling the proportions of videos and iframes.

I made this example on Codepen for you to check out:

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/felipefialho/embed/MBdrer?default-tab=result" title="Pen by @felipefialho on CodePen" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/felipefialho/pen/MBdrer">See @felipefialho's pen on CodePen</a></figcaption>
</figure>

Liked it? 😄
