---
title: 'From Sass and BEM to CSS-in-JS: the (r)evolution of CSS throughout history 🚀'
date: 2019-10-02 00:00:01
description: 'An article about CSS and how its methodologies evolved over the past few years.'
tags: ['css', 'javascript', 'styled-components', 'css-in-js']
translationOf: do-sass-e-bem-ao-css-in-js-a-evolucao-do-css-ao-longo-da-historia
---

## People are writing CSS with JavaScript 😱? Yes 🥳

If you've never heard of or never used CSS-in-JS, writing CSS inside JavaScript can feel weird. But don't panic!

In this article I'll talk a bit about the evolution of CSS and why writing CSS this way can be a good idea nowadays.

## Starting from the beginning, the evolution of CSS

![CSS3](assets/2019-10-02-css.jpg)

CSS was released on December 17, 1996, more than 20 years ago. Its full name is Cascading Style Sheets (CSS) and it's used to add style to a web document.

There are a few ways to apply CSS:

- Directly on the elements
- Inside the `<style>` tag
- Linking to a CSS file that contains the styles

Depending on how long you've been in the field, you might not know this, but less than 10 years ago, almost no browser supported basic things like:

- `border-radius`
- `box-shadow`
- `linear-gradient()`
- `opacity`
- `rgba`

In other words, it was rough!

To add a simple rounded border or shadow to elements, we had to add images with transparency, and in `.gif`, since IE6 didn't support `.png`.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1176453466904023041">
    <p>Já temos uma geração inteira de devs que nunca precisaram usar coisas como:<br><br>- imagens pra borda arredondada<br>- DXImageTransformMicrosoft<br>- filter: alpha(opacity=50)<br>- clear: both<br>- getElementById<br><br>Tempo ta voando 😱</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1176453466904023041">September 24, 2019</a></figcaption>
</figure>

### But things got better

In the last few years there have been huge (r)evolutions in CSS, and not only were basic issues like adding transparency and rounded borders solved, but for quite a while now it's been possible to use properties and selectors that make day-to-day work so much easier, to name a few examples:

- `calc()`
- `filter`
- `display: flex` and `display: grid`
- `position: sticky`
- `vh`, `vw`, `vmin`, `vmax`, `rem` and so on
- `:after` and `:before`
- `:nth-child`, `:first-child`, `:last-child` and so on
- `:not()`

Anyway, the list is huge and it opened up a world of possibilities.

### CSS experiments

These new features also made it possible for all kinds of experiments using only CSS to appear. Between 2012 and 2014, we had a large number of drawings and games built without images or JavaScript.

It was a phase of learning and figuring out how to work with the updates that kept coming, so I jumped on the wave too. I'll mention three experiments I made back then:

- In 2012 I created this Cartman:

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/felipefialho/embed/qzDCJ?default-tab=result" title="Eric Cartman in Pure CSS (2012)" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/felipefialho/pen/qzDCJ">Eric Cartman in Pure CSS (2012)</a> by Felipe Fialho on CodePen</figcaption>
</figure>

- A little later, around 2013, I drew this [piano with gradients](http://piano.felipefialho.com).

- Until in 2014, I wanted to create a Bootstrap-style UI framework without a single line of JavaScript, so I released [CSS Components](https://css-components.felipefialho.com/).

All of these things would have been impossible a few years earlier, and that made it possible to build much more mature and scalable interfaces.

## Preprocessors and postprocessors

![Preprocessors](assets/2019-10-02-preprocessors.png)*Image credit: [growingwiththeweb](https://www.growingwiththeweb.com/2014/03/css-preprocessors-are-here-to-stay.html)*

At the beginning of the decade a lot of preprocessors showed up, like:

- [Sass](https://sass-lang.com/)
- [Less](http://lesscss.org/) 
- [Stylus](http://stylus-lang.com/)

And a little after that came the concept of postprocessors, like [PostCSS](https://postcss.org/) and its libs.

It was incredible, because from that moment on it was possible to do things never imagined before with CSS, like nesting elements and creating variables and mixins.

They were decisive for CSS to start gaining more solidity during development and, not only that, they helped _plain_ CSS itself to reinvent itself. 

Since then even native variables have been added, in the so-called CSS Module 4, making it possible to create dynamic layouts like the _dark mode/light mode_ of the blog you're reading right now.

And looking to the future, things like native nesting may show up soon, removing part of the need for preprocessors:

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1104854866395099136">
    <p>A era dos pré-processadores CSS está oficialmente chegando ao fim. <a href="https://t.co/4k1E40x824">https://t.co/4k1E40x824</a></p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1104854866395099136">March 10, 2019</a></figcaption>
</figure>

## Specificity and style collisions

But even with all the evolution of CSS properties and selectors, some problems remained unsolved, like specificity and style collisions.

### Why it's a problem

The more nested and the more specific, the harder it gets to override properties. Using IDs makes this scenario even worse ([don't use IDs, seriously](/blog/porque-usar-classes-para-estilizar-elementos/) (in Portuguese)).

This also directly impacts performance, nested elements are slower to load, and you can test that in [this project](https://t.co/yWWbQsMrBI?amp=1).

Style collisions happen when you style a [tag without using classes](/blog/porque-usar-classes-para-estilizar-elementos/) (in Portuguese) or create classes with the same names to style your elements.

This is one of the reasons behind the most famous CSS gif in the world.

![Classic CSS gif](assets/2019-10-02-gif.gif)

This whole mess also tends to increase the use of `!important`. And once it's used, maintenance becomes extremely complex, requiring you to nest more and more (and use another `!important`) to override things.

(For me the only exception for using `!important`, and with caution, is to override properties of _third-party_ libs that we don't have access to).

This whole mess produces code like this:

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1103700905575309313">
    <p>Que tal analisar esse código CSS, digamos... complicado, e apontar possíveis pontos de melhoria?<br><br>Vem comigo nessa thread 😊<a href="https://t.co/kwsXqXVPhZ">https://t.co/kwsXqXVPhZ</a> <a href="https://t.co/gsdM3GRG7c">pic.twitter.com/gsdM3GRG7c</a></p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1103700905575309313">March 7, 2019</a></figcaption>
</figure>

And CSS alone doesn't have mechanisms to prevent this from happening.

## CSS methodologies

![OOCSS + SMACSS + BEM](assets/assets/2019-10-02-organizing.jpg)*Image credit: [Gainesville Front-end Developers Meetup](https://www.youtube.com/watch?v=IKFq2cSbQ4Q)*

To help with that, a series of CSS methodologies appeared, you've probably heard of acronyms like:

- SUITCSS
- DRYCSS
- SMACSS
- OOCSS
- RSCSS
- ITCSS
- BEM

All of them were designed to improve architecture and create standards. They were also developed to avoid specificity and style collisions in the project.

## BEM

That alphabet soup mentioned above isn't mutually exclusive and some of them can be used together, but among all of these, [BEM](http://getbem.com/introduction/) always appealed to me the most.

The premise is simple: `Block__Element--Modifiers`.

That is, if you're going to create a `menu` for your project, it would look something like:

```css
.menu { ... }

.menu__link { ... }

.menu__link--active { ... }
```

And yes, it works! Since there's a pattern that has to be followed, the code gets more organized, and since the elements are "scoped" within a block, the risk of collision between classes drops a lot.

On top of that, the idea is to never nest elements, so you wouldn't write things like:

```css
.header .menu .link { ... }
.header .menu .link.active { ... }
```

That way your project's specificity starts to get WELL (BEM, couldn't resist 😂) more under control.

### But it has its problems

Still, it has its problems. After all, everything is manual and you could still, for example, have two `.menu` classes in the project, which would automatically cause a collision.

On top of that, some classes can get huge and often not very semantic, not to mention that coming up with names for them is a pain (`.menu-main-item__link`, who hasn't?).

## CSS Modules

![CSS Modules](assets/2019-10-02-css-modules.jpg)

Given that scenario, between 2015 and 2016, [CSS Modules](https://github.com/css-modules) showed up, which literally gives you the ability to write modules for CSS using a module bundler like Webpack. 

That way you can focus on more important things than thinking about class names.

Instead of writing:

```css
.menu__item__link { }
```

You write:

```css
.link { }
```

Generating:

```css
._link_12ie2_1 { }
```

All automatic and with no risk of collision.

If you liked it, you can see an implementation of CSS Modules with Webpack in the [Kratos Boilerplate](https://github.com/felipefialho/kratos-boilerplate).

**Native CSS Modules?**

Creating native scopes in CSS has been discussed for some time, but it seems to have gained traction in recent months, with discussions happening in [csswg-drafts](https://github.com/w3c/csswg-drafts/issues/4061) and in [WebComponents](https://github.com/w3c/webcomponents/issues/759).

I believe there are real chances of implementations in that direction happening in the near future.

## And finally: CSS-in-JS

![CSS in JS](assets/assets/2019-10-02-css-in-js.jpg)*Image credit: [ruanyifeng](http://www.ruanyifeng.com/blog/)*

Taking into account all the context I explained earlier, CSS-in-JS solutions make a lot of sense, because they take advantage of current JavaScript componentization methods to create performant, collision-proof components, with a process that's extremely automated.

Some of the most popular libs today are:

- [styled-components](https://www.styled-components.com/)
- [Emotion](https://emotion.sh/docs/introduction)
- [JSS](https://cssinjs.org/)

My only experience so far has been with Styled Components, so the examples will be based on it.

## Styled Components

Styled Components was built to improve the way we handle CSS in React application components.

Some [advantages](https://www.styled-components.com/docs/basics):

- **Automatic Critical CSS:** Components are rendered and automagically inject only their own styles, nothing more. Combined with _code splitting_, it helps load less code for the end user.
- **No class collisions:** As we saw earlier, this is one of the biggest problems with CSS, and styled-components provides collision-proof class names.
- **CSS removal:** Since it works directly in the components, it can easily analyze which code will or won't be used, including code that's added after user interaction. That also helps shrink the final code.
- **Simple dynamic styling:** By adapting styles based on the `props` received, you can create dynamic styles easily and intuitively.
- **Painless maintenance:** Everything you need lives in the component's own context, making it easy to find everything you need for development.
- **Automatic _vendor prefixing_**: You write your CSS in the best standard on the market and that's it, the components take care of providing support for old browsers.

Here's an example:

```js
import styled from 'styled-components'

export const Main = styled.div`
  align-items: center;
  display: flex;
`
```

It will automagically generate:

```css
.styled__Main-sc-11b8j8d-1-bSsuBw {
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
```

You can also pass `props` to create dynamic styles:

```js
const Button = styled.button`
  background-color: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
`;
render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```

This will generate:

```css
.sc-fzXfMC {
  background-color: white;
  color: tomato;
}

.sc-fzXfMB {
  background-color: tomato;
  color: white;
}
```

Badass, right?

### Improving how styles are imported

The most common approach is to separate the component styles, usually inside a `styled.js` file, which means you have to import each style individually, something like:

```js
import { Header, HeaderMain, HeaderBrand} from './styled'
```

To make this process easier, considering we're styling a specific component and all the styles will be used, [Willian Justen](https://willianjusten.com.br) gave a really cool tip to simplify the import.

```js
import * as S from './styled'

const Header = () => {
  return (
    <S.Header>
      <S.HeaderMain>
        <S.HeaderBrand />
      </S.HeaderMain>
    </S.Header>
  )
}
```

Handy.

### Awesome! But I use Angular, now what? 😱

In that case I have good news and bad news.

The bad news is that Styled Components was created with React in mind (but it works [really well in Vue](https://dev.to/codestuff2/theme-your-app-with-styled-components-in-vue-28h0), Svelte and so on), and it's not recommended for Angular applications.

The good news is that Angular, since version 2, already ships with a pretty complete system for handling CSS and style isolation. This system is called [Component Styles](https://angular.io/guide/component-styles) and it works really well with any preprocessor (and postprocessor) on the market, and it even works natively with [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=pt-br).

It has two main modes:

- **Shadow DOM:** Uses [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=pt-br) to add styles to the component's host and then places the component's view inside it.
- **Emulated view encapsulation (default):** emulates Shadow DOM behavior by preprocessing (and renaming) the CSS code for the component's view, similar to the CSS Modules we saw earlier.

Example:

```css
.title {
  font-size: 2rem:
}
```

Will generate:

```css
.title[_ngcontent-pmm-6] {
  font-size: 2rem:
}
```

It also implements _pseudo-class_ syntax for _Custom Elements_, like `:host`, `:host()` and `:host-context()`, which makes a possible export to Web Components easier.

## Styled Components extensions to make the whole damn thing easier 😜

Besides the advantages presented earlier, Styled Components also has a series of extensions that make day-to-day work so much easier, and I'll show you two of them now.

### styled-media-query

Writing media queries is a pain, having standards and consistency is even more annoying, so since the days I coded CSS with Stylus, I used [Rupture](https://www.npmjs.com/package/rupture-sass) to make the implementation easier. After I adopted Sass, I kept using [rupture-sass](https://www.npmjs.com/package/rupture-sass).

[styled-media-query](https://github.com/morajabi/styled-media-query) follows the same idea, and makes handling media queries much simpler and more organized.

Just write:

```js
import styled from 'styled-components';
import media from 'styled-media-query';

const Box = styled.div`
  background: black;

  ${media.lessThan("medium")`
    background: red;
  `}

  ${media.between("medium", "large")`
    background: green;
  `}

  ${media.greaterThan("large")`
    background: blue;
  `}
`;
```

It will generate:

```css
div {
  background: black;

  @media (max-width: 768px) {
    background: red;
  }

  @media (min-width: 768px) and (max-width: 1170px) {
    background: green;
  }

  @media (min-width: 1170px) {
    background: blue;
  }
}
```

Simple, effective and scalable.

### Styled Icons

The days when you had to download icons manually and create sprites using your favorite task runner are gone. [Styled Icons](https://styled-icons.js.org/) makes this experience simple and smooth.

```js
import styled from 'styled-components'
import { Zap } from 'styled-icons/octicons/Zap'

const RedZap = styled(Zap)`
  color: red;
`

const App = () => <RedZap />
```

And that's it! Your icon will be available as an SVG, which means you can, for example, easily change the color with a simple `fill: gray`.

## Conclusion

In recent years JavaScript has taken over the responsibility of several layers of Web Development, and it has had a positive impact on how we build things, including the way we work with CSS (Stylus, PostCSS, etc.). That said, using JavaScript to automate more and more processes we used to do manually ends up being natural.

Things change fast in the Front-end world, every now and then something new comes along that changes how we deal with the technologies on the market, but it's always worth learning new concepts at each stage of these changes. If you haven't used CSS-in-JS yet, it's worth testing and trying to implement it in your stack.

Cheers 🥳
