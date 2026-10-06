---
title: 'Native components in 2026: what HTML and CSS already do on their own'
date: 2026-09-28 00:00:01
description: 'Modal, dropdown, tooltip, carousel and much more without a single line of JavaScript, side by side with the 2014 hacks 😁'
tags: ['css', 'html', 'components', 'front-end', 'performance']
translationOf: componentes-nativos-em-2026-o-que-o-html-e-o-css-ja-fazem-sozinhos
teaser:
  before:
    label: 2014.html
    code: |
      <input type="radio"
        name="tab" hidden>
      <label for="t1">
      .tab:checked ~ .panel
  after:
    label: 2026.html
    code: |
      <details
        name="tab">
      <summary>
      ::details-content
---

In 2014 I wrote a post here on the blog asking whether
[it's possible to use components built with CSS only](/blog/e-possivel-utilizar-componentes-desenvolvidos-apenas-com-css/) (in Portuguese).

In the conclusion I said **YES** and dropped this line:

> I wouldn't be surprised if this becomes a trend going forward.

12 years later I went back to that project and I can say it passed the test of time. Both the CSS + HTML combo and the browser evolved, and now we can do all of this (and a lot more!) **natively**, in an extremely performant and accessible way, with animations as a bonus.

So this post is about exactly that: what HTML and CSS already do on their own in 2026, using the 2014 project as proof, component by component.

## A bit of history

It all started back in 2012 with a [Cartman made with CSS only](https://codepen.io/felipefialho/pen/qzDCJ). A silly experiment, but that's where I started looking for CSS solutions I could actually use in real projects.

In 2014 that became [Pure CSS Components](https://css-components.felipefialho.com): 6 interface components without a single line of JavaScript.

- Carousel
- Collapse/Accordion
- Dropdown
- Modal
- Tab
- Tooltip

All of it built with hidden `checkbox` and `radio` inputs (and in the beginning also with the `:target` pseudo-class). Checked and unchecked was our "state management" back then.

And the best part (!!): a lot of people **really** used it in production on real projects. On GitHub it got close to 700 stars, which was a lot for a project that was born from a silly experiment and the curiosity of a dev still early in his career exploring the possibilities.

Now the project was rebuilt from scratch with a very simple idea: every 2014 component was preserved exactly as it was and shows up **side by side with its native 2026 version**. It's like a "before and after" of how browsers and CSS evolved.

## 2014 hack vs. 2026 native

### Collapse

In 2014 it was an `<input type="checkbox" hidden>` with a `<label>` and the sibling selector `~` to reveal the content. If you wanted an accordion, you switched to `type="radio"` with the same `name`.

[Back in 2021 I already talked here about the badass `<details>` and `<summary>`](/en/blog/native-collapse-component-with-details-and-summary/), but since then they've gotten even more powerful.

Now the exclusive accordion (where only one stays open at a time) is just a matter of putting the same `name` on all the `<details>`:

```html
<!-- Same name = exclusive group: opening one closes the others -->
<div class="collapse">
  <details name="now-accordion" open>
    <summary>Install</summary>
    <div class="panel">
      <p>Clone the repository and run <code>pnpm install</code>.</p>
    </div>
  </details>
  <details name="now-accordion">
    <summary>Run locally</summary>
    <div class="panel">
      <p>Start the dev server with <code>pnpm dev</code>.</p>
    </div>
  </details>
</div>
```

Notice that it's literally the same `radio` with `name` trick from 2014, except now HTML itself does it for you 😁

And the open and close animation, which was always the Achilles' heel of `<details>`, can now be done with the `::details-content` pseudo-element:

```css
/* Animate the native content slot to and from height: auto */
@media (prefers-reduced-motion: no-preference) {
  @supports (interpolate-size: allow-keywords) and selector(::details-content) {
    :scope {
      interpolate-size: allow-keywords;
    }

    details::details-content {
      block-size: 0;
      overflow-y: clip;
      transition:
        block-size 220ms var(--ease),
        content-visibility 220ms allow-discrete;
    }

    details[open]::details-content {
      block-size: auto;
    }
  }
}
```

`interpolate-size: allow-keywords` is what lets you animate to `auto`, something we dreamed about for years. And notice the `@supports`: if the browser doesn't know `::details-content`, the collapse keeps working, just without the animation. Same thing for people who prefer less motion, thanks to `prefers-reduced-motion`.

### Modal

In the [first 2014 post](/blog/e-possivel-utilizar-componentes-desenvolvidos-apenas-com-css/) (in Portuguese) the modal used `:target`, but the version preserved on the site is the one with a hidden `checkbox` and a bunch of `<label>`s pointing to it:

```html
<label class="btn" for="then-modal-one">Modal!</label>

<div class="modal">
  <input class="modal-open" id="then-modal-one" type="checkbox" hidden>
  <div class="modal-wrap" aria-hidden="true" role="dialog">
    <label class="modal-overlay" for="then-modal-one"></label>
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Modal in CSS?</h2>
        <label class="btn-close" for="then-modal-one" aria-hidden="true">×</label>
      </div>
      ...
    </div>
  </div>
</div>
```

The button that opens it is a `<label>`, the dark backdrop that closes it is a `<label>`, the "×" is a `<label>`... all of it to check and uncheck a single `checkbox` 😅

It worked, but focus, `Esc` and screen readers were left to luck.

Now we have `<dialog>` with **invoker commands**:

```html
<button class="button" type="button" commandfor="now-modal" command="show-modal">
  Discard changes
</button>

<dialog id="now-modal" class="modal" closedby="any" aria-labelledby="now-modal-title">
  <h3 id="now-modal-title">Discard unsaved changes?</h3>
  <footer class="modal-footer">
    <!-- autofocus: the safe choice gets focus when the dialog opens -->
    <button class="button" type="button" commandfor="now-modal" command="close" autofocus>Keep editing</button>
    <button class="button button-primary" type="button" commandfor="now-modal" command="close">Discard</button>
  </footer>
</dialog>
```

`commandfor` points to the `<dialog>`'s `id` and `command="show-modal"` says what to do. `closedby="any"` makes the modal close when you click outside or press `Esc`. Focus, backdrop, top layer, all for free.

And to animate it we use `@starting-style`, which defines the element's initial state at the moment it appears:

```css
@media (prefers-reduced-motion: no-preference) {
  .modal,
  .modal::backdrop {
    transition:
      opacity var(--duration) var(--ease),
      display var(--duration) allow-discrete,
      overlay var(--duration) allow-discrete;
    opacity: 0;
  }

  .modal[open],
  .modal[open]::backdrop {
    opacity: 1;
  }

  @starting-style {
    .modal[open],
    .modal[open]::backdrop {
      opacity: 0;
    }
  }
}
```

`display` and `overlay` with `allow-discrete` keep the `<dialog>` in the top layer until the exit fade finishes. Something we didn't even dream of in 2014 😁

### Dropdown

In 2014 it was yet another hidden `checkbox`. Now it's the **Popover API** with `popovertarget`, and positioning is handled by **CSS anchor positioning**, which pins the menu to the button without you having to calculate anything.

And the hover variant, which used to be a `:hover` in CSS, now uses `interestfor`.

### Tooltip

The tooltip uses `popover="hint"` together with `interestfor` and anchor positioning. It's the kind of thing we installed an entire library for, for years.

### Tab

The native version uses exclusive `<details name>` visually arranged as tabs.

But here I have to be honest: without JavaScript you can't implement the tabs pattern with arrow key navigation. It works and it's accessible as a group of `<details>`, but it's not the full tabs pattern.

### Carousel

The 2014 carousel was the most "creative" one (read: hack). A `radio` before each item, three pairs of `<label>`s for the arrows and that monstrous `nth-child` selector for the indicators.

Now it's `scroll-snap` to lock the items, `::scroll-button()` for the arrows and `::scroll-marker` for the indicators. All generated by the browser itself.

## Born native

Besides the 6 original components, I created a new section called **Born native** with 10 components that didn't even have a 2014 version, because it simply wasn't possible with CSS alone:

- **Custom select** with `appearance: base-select` and `::picker(select)`. Yes, we can finally style the `<select>` 🥳
- **Switch** and **segmented control** using `:has()`
- **Forms** with `field-sizing: content` and `:user-invalid`
- **File tree** with nested `<details>`
- **Filter drawer** with `<dialog>`
- **Sticky header** with scroll-state container queries
- **Table of contents with scroll-spy** using `scroll-target-group` and `:target-current`
- **Reading progress bar** with scroll-driven animations
- **Radial menu** with `sibling-index()`, `sibling-count()`, `cos()` and `sin()`
- **Gallery** with cross-document view transitions

And one detail I decided to keep: the site's light/dark theme button ("lights") uses exactly the 2014 trick, a hidden `checkbox` together with `:has()`:

```css
/* Lights toggle: a hidden checkbox flips the scheme, the 2014 way */
@media (prefers-color-scheme: light) {
  :root:has(#lights:checked) {
    color-scheme: dark;
  }
}

@media (prefers-color-scheme: dark) {
  :root:has(#lights:checked) {
    color-scheme: light;
  }
}
```

A tribute to the original project 😁

## What about performance?

The big question with this kind of component is **performance**. So I ran Lighthouse on the site's home page (production build, local preview):

- **Mobile:** Performance 90, LCP 2.9 s, Total Blocking Time 0 ms and CLS 0
- **Desktop:** Performance 100, LCP 0.6 s, Total Blocking Time 0 ms and CLS 0.008
- **Both:** Accessibility 97, Best Practices 100 and SEO 100

And what goes to the browser:

- JavaScript: **0 files, 0 KB**
- CSS: two files, about 2.3 KB and 1.4 KB gzipped
- Total page weight: 301 KiB, mostly self-hosted fonts and images

For comparison: jQuery 3.7.1 alone is 87 KB minified (about 30 KB gzipped), and that's before any plugin. And the typical 2014 stack was exactly that, jQuery + one plugin for each component.

But the gain isn't just about weight. When the browser does the work:

- There's no JavaScript to download, parse and execute
- Nothing runs on the main thread to manage state, opening and closing is handled by the browser itself
- `<dialog>` and popover live in the top layer, so the `z-index` war is over
- Scroll-driven animations and scroll snapping can run off the main thread
- There's no hydration
- It works with JavaScript disabled (and yes, I tested it)
- Less code means fewer places for a bug to hide
- Accessibility comes out of the box: focus, `Esc` and light dismiss

That's also why I decided to remove Google Tag Manager and the ads the site had before. The site has no analytics, nothing tracking you, and that's what made it **truly zero JavaScript**. If you want to support the project, there's [GitHub Sponsors](https://github.com/sponsors/felipefialho).

Now, being honest: the home page HTML is huge, about 1.37 MB raw (76 KB gzipped). That's because each demo's code already comes with syntax highlighting and is embedded in the page, even with the "view code" panels closed. The 90 on mobile basically comes from the first paint of a very long page, not from interactivity. It's on the improvement list, like loading that code only when someone asks for it.

## It's not all roses

Many of these features currently only work in Chromium-based browsers.

That's why the site lists the support for each feature and **every component has a usable fallback**. If the browser doesn't support it, you don't end up with a broken component, just a simpler version.

This is not a "you can use everything in production tomorrow". It's a snapshot of where browsers are heading.

## Zero JavaScript, but 100% vibe coding

There's a pretty funny irony in this whole story:

> a project whose rule is **not having a single line of JavaScript** only came back to life because I built it entirely with vibe coding

But first I have to make a confession: I put off touching this project for **years (decades!)** haha

Abandoned software doesn't sit still, it rots. I went almost 10 years without any major improvement and, when I finally took a calm look, I found dead placeholder images, a rawgit CDN that no longer exists, Bower installation instructions and 39 vulnerabilities in `npm audit`, 1 of them critical. That feeling of opening a drawer you haven't touched in 10 years.

It wasn't just updating dependencies, it was redoing the whole project, and in my head that was weeks of work that never fit into my life these days. Next week lasted a good few years 😅

In 2026, building this kind of project is practically trivial with LLMs. So I finally redid **the whole project, design included, in a few hours** using my faithful sidekick Claudinho Code, with that planning, skills, roles and subagents setup I've covered in n posts, like [my AI stack for devs](/en/blog/ai-stack-that-will-level-up-your-work-as-a-dev/), and on social media.

And I want to be 100% transparent here: **I didn't write a single line of code of this project by hand**. Not HTML, not CSS, not config. Everything came out of a conversation with [Claude Code](https://claude.ai/code), in a long session of a few hours. My job was to steer, review and decide.

### How it went in practice

It started in plan mode: an analysis of the old stack and a written plan that I read, adjusted and approved before any line of code. No blindly vibe coding in the dark.

Then came the execution in atomic commits and PRs, with subagents in parallel: Opus for design, research and the more complex parts, Sonnet for the more mechanical tasks.

To decide which "Born native" components could be built without JavaScript, a subagent used the octocode MCP to dig through MDN, web-features and specs, and checked real browser support on [webstatus.dev](https://webstatus.dev). That's [context engineering](/en/blog/ai-and-context-engineering-in-a-project-from-scratch-with-vibe-coding/) in practice: the LLM doesn't guess, it goes after the source.

And every change was tested in a real browser with Playwright: light and dark mode, desktop and mobile, keyboard and mouse, and even a round with JavaScript disabled to prove the zero JS was real. On top of that, lint, type-check, build and self-review agents before each PR.

### The AI got it wrong (and also caught mistakes)

Not everything was pretty, and that's exactly why this whole process exists:

- The ported 2014 CSS came out **60% bigger**, because the `rem`s were based on the old `font-size: 62.5%` on the root. A review round caught it.
- An agent locked in a browser support version that webstatus.dev proved wrong
- The link color failed the contrast test and had to be fixed

Nothing out of this world, a human dev would do way dumber stuff. The difference is having a process that catches it before it goes to production, and keeping an eye on things is still my job.

And there was one nobody remembered: the production deploy on Netlify had been **stuck since October 2023**, with automatic publishing turned off. Meaning nothing had gone live in years. Claude found that and unblocked it through the Netlify CLI/MCP. As a bonus, the 7 old zip download URLs now redirect to a GitHub release, so nobody lands on a broken link.

### What was my call

At the end of the day I'm still the one deciding, so:

- Astro + pnpm + plain CSS (I did consider SCSS, but plain CSS in 2026 handles everything)
- Keeping the 2014 components intact
- The "Then vs Now" side by side idea
- Lowercase typography
- The favicon with the puzzle piece emoji 🧩
- Removing Google Tag Manager and any line of JS
- Asking for this post and the cover, which was also generated in the same session (I rewrote almost all the text, of course 😅)

In other words, my work here **was exactly what's expected of a software engineer in 2026**: maintaining my own AI ecosystem (well-configured skills, rules, MCPs and subagents), planning and approving the plan before any code, deciding architecture and stack, reviewing every output while distrusting everything that wasn't verified, and saying no when a suggestion doesn't make sense.

As I said in the post about [what to expect from 2026](/en/blog/front-end-development-and-programming-in-2026-what-to-expect/), we won't write code by hand anymore, but increasingly guide, review and orchestrate. And as I always say, regardless of the tooling you use, the person responsible for every delivery is still YOU.

## Conclusion

In 2014 we used a hidden `checkbox` because it was the only way. In 2026 HTML and CSS do this natively, with accessibility, focus and animation as a bonus, and without sending 1 KB of JavaScript to the user.

That "trend" I predicted came true, except the browser got there before I did.

And after years of putting it off, it took just a few hours with an AI by my side to bring this project back to life. Here's a lesson for that side project that's abandoned in your drawer too 😉

- [Pure CSS Components](https://css-components.felipefialho.com)
- [Code on GitHub](https://github.com/felipefialho/css-components)
- [The original 2014 post](/blog/e-possivel-utilizar-componentes-desenvolvidos-apenas-com-css/) (in Portuguese)
