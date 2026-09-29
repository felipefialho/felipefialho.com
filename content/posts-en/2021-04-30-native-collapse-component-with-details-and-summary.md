---
title: 'Collapse in 5 minutes without JavaScript!'
date: 2021-04-30 00:00:01
description: 'Building a fully working Collapse component in under 5 minutes using just HTML and CSS 🥳'
tags: ['css', 'html', 'summary', 'details']
translationOf: html-criando-um-componente-de-collapse-nativo-com-as-tags-details-e-summary
---

This is the text version of the video: <strong>NO JAVASCRIPT - Collapse with
HTML and CSS in 5min!</strong>
[that I published on my YouTube channel](https://www.youtube.com/@felipefialhovlog) (in Portuguese).

It's worth watching! 😊

<iframe width="650" height="400" src="https://www.youtube.com/embed/j5VcN8A_zqQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Introduction

In 2014 I created a project called
[CSS Components](https://css-components.felipefialho.com/) whose goal was to
recreate Bootstrap components using **just HTML and CSS**, with no
**JavaScript** at all.

Back then I imagined that in the future it would be really easy to build a
bunch of native components using only CSS and HTML, but that's not exactly what
happened in the following years.

Quite the opposite,
[our dependence on JavaScript only grew](/blog/que-front-end-developers-precisam-saber) (in Portuguese).

Until recently, to build these components without JavaScript, most of the time
we had to use techniques that mainly took advantage of the checked and
unchecked state of elements like `checkbox` and `radio`, and that's exactly the
approach I used for most of the components in CSS Components.

[The project is available on GitHub if you want to study the code](https://github.com/felipefialho/css-components)
😁

That worked well in many cases, but it didn't make sense for most projects.

But even though HTML and CSS don't evolve as fast as JavaScript usually does,
we've had some really nice advances in this area.

Some of these new things are tags like `<details>` and `<summary>`, which let
you build a native collapse component using just HTML, and that's what I'm going
to explain here.

## The badass `<details>` and `<summary>`

All we need is two tags, `<details>` and `<summary>`, and we could even stop
right here, since the open and close effect is already fully working.

```html
<details class="collapse">
  <summary class="title">Titulo</summary>
  <div class="description">Texto</div>
</details>
```

But I also added a bit of CSS to make the example nicer. I started by adding
some CSS Variables, which
[are the same ones I used in the article where I explained how they work](/en/blog/the-superpowers-of-native-css-variables/),
and I also took the chance to add a few styles to the `body`.

```scss
:root {
  --space-xxs: 4px;
  --space-xs: 8px;
  --space-sm: 16px;
  --space: 24px;
  --space-md: 32px;
  --space-lg: 48px;
  --space-xlg: 64px;

  --screen-sm: 768px;

  --gray: #555;
  --gray-dark: #333;
  --gray-darker: #111;
  --gray-light: #f1f1f1;
  --gray-lighter: #fafafa;
  --blue: #187888;
  --yellow: #e6af05;
  --white: #fff;
  --black: #000;

  --brand-primary: var(--blue);
  --background: var(--white);
  --text-color: var(--gray-darker);
}

body {
  background-color: var(--background);
  color: var(--text-color);
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
}
```

Then I'll remove the default arrows, which work fine but are really ugly, and
start styling this component.

```scss
details {
  summary {
    list-style: none;
  }
}
```

As you can see, I'm using SCSS as the CSS preprocessor, and I'll start by
editing the `<details>` element that uses the `.collapse` class, adding
properties to center it and set a max width.

I also added border and shadow styles to make the element look nicer, and with
the `:first-child` selector I can make the margin apply only when it's the
first element, pulling it away from the top.

I also added `margin-bottom` only when it's not the last element, which keeps
the margin from leaking onto other elements.
[A few years ago I wrote an article explaining the not() pseudo-selector](/blog/css-o-fodastico-not) (in Portuguese).

I also added some transition effects on the `background-color` of the
`<details>` element and used `will-change`, a property that helps optimize the
performance of certain properties during the CSS transition.

Finally, I changed the `background-color` property when the element is in the
`:hover` state, and with that we get a pretty decent hover effect.

```scss
.collapse {
  border: solid 1px var(--gray-lighter);
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  transition: background-color 0.25s;
  will-change: background-color;

  &:first-child {
    margin-top: var(--space);
  }

  &:not(:last-child) {
    margin-bottom: var(--space-sm);
  }

  &:hover {
    background-color: var(--gray-lighter);
  }
}
```

The next step is styling the `<summary>` element, which I targeted with the
`.title` class, adding `padding` to improve the inner spacing and
`cursor: pointer`, which doesn't come by default on this element.

```scss
.title {
  cursor: pointer;
  font-weight: 600;
  padding: var(--space-sm);
  position: relative;
```

And last, let's style the `.description` class, which will only be visible
after clicking the `<summary>` element. I'll also add a border, tweak the font,
and set the padding to match the one used on `.title`.

```scss
.description {
  border-top: var(--gray-light) solid 1px;
  font-size: 14px;
  line-height: 21px;
  padding: var(--space-sm);
}
```

Now we already have a component that's much nicer to look at and fully working.
The video could end here again, but we can still make a few things even cooler,
like changing the behavior when the element is open or closed and adding some
transitions.

So, inside the `<summary>` element that uses the `.title` class, I'll use the
CSS `:after` pseudo-element with absolute positioning, and instead of an arrow
icon I'll use a cute and always useful emoji to help me in this example 😅

Since the `:after` pseudo-element is absolute, to center it I'll use a
well-known technique with `transform: translateX(-50%)` and `top: 50%`, and
finally I'll also position it on the right with `right: var(--space-sm)`.

```scss
.title {
  &:after {
    content: '😴';
    position: absolute;
    right: var(--space-sm);
    transform: translatey(-50%);
    top: 50%;
  }
}
```

But this can get even cooler. This time I'll change our emoji inside the
`:after` on the `.title` class whenever the `<details>` element is in the hover
state.

And last, I'll use the `[open]` selector, which is natively tied to the
`<details>` element, to switch the emoji depending on whether the element is
open or closed. Think about how many other possibilities we'd have to play
around with from here.

```scss
.collapse {
    .title:after {
      content: "🙂";
    }
  }

  &[open] {
    .title:after {
      content: "😍";
    }
  }
}
```

You can play around with this a lot and do some really cool stuff using CSS to
make these state transitions even more badass.

### Accessibility

And since `<details>` and `<summary>` are native HTML tags, they're
automatically accessible and semantic. You get that for free without having to
do any extra implementation.

### Markdown

And one extra tip:

On top of everything, it works in markdown, which means you can easily add this
feature to make your projects' READMEs even cooler.

### Result

Component finished, and as you can see I didn't have to add a single line of
JavaScript 😜

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/felipefialho/embed/yLgxdzR?default-tab=result" title="Pen by @felipefialho on CodePen" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/felipefialho/pen/yLgxdzR">See @felipefialho's pen on CodePen</a></figcaption>
</figure>

On
[Can I Use we can see that this feature is completely stable](https://caniuse.com/?search=details)
today and works in all browsers.

Awesome, right? 💙

## Conclusion

Beyond semantics, HTML seems to be moving toward bundling more and more native
features, which tends to save us a lot of lines of code and a lot of
development time.

We're thankful for that.
