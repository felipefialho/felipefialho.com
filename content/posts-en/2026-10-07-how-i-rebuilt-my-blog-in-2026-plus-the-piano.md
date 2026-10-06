---
title: 'How I rebuilt my blog in 2026 (plus the piano as a bonus)'
date: 2026-10-07 00:00:01
description: 'Native components, maxed-out performance and zero framework in the browser. The blog left Gatsby 2 behind and the Piano came back as a bonus 🎹'
tags: ['performance', 'html', 'css', 'front-end', 'ai']
translationOf: como-foi-reconstruir-meu-blog-em-2026-e-o-piano-de-bonus
---

7 years after the [last big update](/blog/como-foi-desenvolver-meu-novo-blog-usando-o-gatsbyjs) (in Portuguese), this site has a brand new look, landing on its **fourth version** since 2013

The rule that guided everything was simple: if the browser already does it, I don't reimplement it. This post tells what that turned into in practice, the numbers that came out of it, how it was to build everything with AI, what went wrong and the piano that came back as a bonus

## A bit of history

The timeline of this site goes roughly like this:

- **2013:** [Docpad](https://docpad.bevry.me/), Less, Bootstrap and Grunt
- **2015:** [Harp](http://harpjs.com/), Jade, Stylus, BEM and Gulp
- **2019:** [Gatsby](https://www.gatsbyjs.com/), React, GraphQL, Styled Components and Algolia
- **2026:** what you're looking at right now

In 2019 I said Gatsby's performance was "simply spectacular". And for the time, it really was! But software that sits still doesn't stay still, it rots

When I finally opened the project with some patience, I found Gatsby 2 and React 16 with half the plugins deprecated, a ton of JavaScript bundles to render... text, and a Google Tag Manager injected **outside the repository** firing a Universal Analytics that stopped collecting data in July 2023

That's right: **nothing had been measured** for years and I didn't even know 😅

## Why performance matters (even more) in 2026

Performance became one of those topics everybody agrees is important, but that always gets pushed to later. And in 2026 I think that's an increasingly expensive mistake

**The web is mobile, and real-world mobile is modest.** Sometimes we develop on a MacBook with fiber, but a lot of people are on a mid-range Android, on 4G, with a data cap. Every KB I send is paid for by that person, in time and sometimes in money

**JavaScript is the most expensive byte on the page.** A 100 KB image gets downloaded and painted. 100 KB of JavaScript gets downloaded, parsed and compiled (partly off the main thread) and executed on the main thread, the same one that has to respond when you tap the screen. On a modest device, that difference is glaring

**Google measures this.** Core Web Vitals became a ranking signal in 2021, one among many, and since March 2024 INP measures whether the page responds quickly to every interaction, not just the first click. Slow pages may show up less

**And the click got rarer.** With search engines answering directly with AI, fewer people make it to the site. The ones who do deserve a page that opens instantly, not a spinner

So the goal here was clear: **hit a Lighthouse 100**

## The new look: a terminal

The look started from a simple idea: this is the blog of someone who spends the day in a terminal, so why not look like one?

- **Dark by default**, with a light theme derived from the same color tokens
- **[Geist](https://vercel.com/font) and Geist Mono**, with the mono for everything "machine": dates, tags, paths and commands
- **Cyan as screen light** for links and highlights, and a yellow for quotes and notes
- **The logo is a path:** `~/felipefialho`. Inside a post it keeps going, like `~/felipefialho/blog/post-name`
- **The photo** got a cyan mask with scanlines, which fades on hover and shows the photo in color

And the 404 became a real terminal. It shows the path you tried to reach, has commands to click (`cd blog`, `cd labs`, `sudo`) and, if the address looks like one of the posts, suggests the right link with a "did you mean...?". The one answering is the Cartman I drew [with nothing but CSS in 2012](https://codepen.io/felipefialho/details/qzDCJ), the project that started all of this. Click `cartman` to see 😂

## Native components, in practice

After writing an entire post about [native components in 2026](/en/blog/native-components-in-2026-what-html-and-css-do-on-their-own/), I had to use them here too, right?

### Search is a `<dialog>`

The search button at the top has no JavaScript to open the modal. It's just an invoker command, which is Baseline newly available since December 2025:

```html
<button type="button" commandfor="search" command="show-modal" aria-label="Search">
  ...
</button>

<dialog id="search" closedby="any">
  ...
</dialog>
```

Focus, `Esc`, backdrop and top layer come out of the box. `closedby="any"` only adds closing on an outside click, and it isn't Baseline yet: Chrome, Edge and Firefox support it, Safari doesn't. Where it's ignored, `Esc` still closes the modal. The only JavaScript is the `⌘K` shortcut, in a few lines. And the [Pagefind](https://pagefind.app/) search index is only downloaded when you open the dialog. If you don't search, you don't pay for it

### Cookies are a `popover` and a `<dialog>`

The cookie notice is a `popover="manual"`. Since it lives in the top layer, it doesn't push anything on the page around: zero layout shift

The preferences open in a modal `<dialog>`, with switches that are native checkboxes:

```html
<button type="button" commandfor="consent-prefs" command="show-modal">Cookie preferences</button>

<dialog id="consent-prefs" closedby="any">
  <input type="checkbox" switch name="analytics" />
</dialog>
```

The footer link reopens the preferences without a single line of JavaScript. Only Safari draws the `switch` as a toggle, in the other browsers you get a plain checkbox that works the same. And declining is as easy as accepting, right on the first screen

### Reading progress is CSS

The cyan line at the top of the posts follows your reading with scroll-driven animations. And the "34% read · 7 min left" in the header is CSS too: an integer `@property` animated by the scroll, turned into text with `counter()`:

```css
@property --read {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0;
}

.read-live {
  --left: calc(var(--mins) * (100 - var(--read)) / 100);
  counter-reset: pct var(--read) left var(--left);
  animation: read-progress linear both;
}

.read-live::before {
  content: counter(pct) '% read · ' counter(left) ' min left';
}

/* In a separate rule, you'll see why further down */
.read-live {
  animation-timeline: scroll(root);
}

@keyframes read-progress {
  to {
    --read: 100;
  }
}
```

No scroll listener, no `requestAnimationFrame`. It all sits inside a `@supports`, so browsers without support just show the reading time. That includes Firefox, where scroll-driven animations are still behind a flag. In Chrome and Safari 26 they work by default

### And a bunch more stuff

- The post index is a `<details>` on mobile and becomes sticky on desktop
- Navigation between pages uses cross-document view transitions, with one line of CSS: `@view-transition { navigation: auto; }`. The post title on the home turns into the title of the post page. It works in Chrome, Edge and Safari, and Firefox just navigates normally
- Page prefetching uses speculation rules, a JSON inside a `<script type="speculationrules">`. Only Chromium browsers understand it, the others ignore the script without an error
- The light and dark theme uses `light-dark()` in the color tokens

### Embeds that only load on click

This was the detail I liked the most

The old posts have dozens of YouTube videos and CodePens. Each of those iframes loads hundreds of KB and makes requests to third parties as soon as it shows up on screen

Now they all become an `<iframe>` with `srcdoc`: a minimal HTML with a play button. The real video only loads when you click:

```html
<iframe
  src="https://www.youtube-nocookie.com/embed/ID?autoplay=1"
  srcdoc="<a href='https://www.youtube-nocookie.com/embed/ID?autoplay=1'>▶ Play video</a>"
  loading="lazy"
  title="YouTube video"
></iframe>
```

`srcdoc` takes priority over `src`, so nothing is downloaded until the click navigates the iframe. Zero JavaScript, zero third-party requests before their time.

## The numbers

Measured on the local preview, still without the compression Netlify applies:

- **Home, Labs and posts:** 100 in performance, accessibility, best practices and SEO, on mobile and desktop
- **On every page:** CLS 0 and Total Blocking Time 0 ms
- **LCP:** between 1.4 s and 1.7 s on mobile and under half a second on desktop

And what made the difference to get there:

- **Zero framework in the browser.** [Astro](https://astro.build/) generates static HTML and only ships JavaScript when you ask for it. All the JavaScript on the home page adds up to about **5 KB** (theme, consent and the search shortcut), and the whole HTML is 15 KB gzipped
- **Lean fonts.** Geist and Geist Mono with a Latin subset add up to 52 KB. Two families, and still less than the single font of the previous version
- **Inline CSS.** It's just a few KB per page, so going straight into the HTML eliminates a request that was blocking rendering
- **Old images, untouched.** The blog has had 82 MB of images since 2013, including a 17 MB PNG (!!). None of them were renamed or converted: in production they go through Netlify's Image CDN, which delivers AVIF or WebP at the right size, with `width` and `height` to avoid layout shift
- **Nothing from third parties before its time.** No external request happens before you interact with the page

I also removed the post covers. They were the biggest element on screen on mobile, pushed the text down, and each one had a different aspect ratio. In their place, each post gets a social card generated at build time with [Satori](https://github.com/vercel/satori), with the title, date, reading time and tags

## Analytics without wrecking performance

This was the biggest challenge

The solution was to load it **at the right moment**: Google Analytics 4 only loads **after** you accept cookies, and Google Tag Manager is gone. Less script before consent means less weight on the page and less data collected before its time, and the two go hand in hand

## The rest of the change

- **Stack:** Astro + TypeScript + plain CSS, no preprocessor and no CSS-in-JS. In 2019 I spent an entire post explaining Styled Components. In 2026 native CSS has nesting, `light-dark()` and container queries, and I didn't need any of that
- **English:** 23 posts were translated into English, everything from 2024 onward plus a few classics. You're reading one of them, and they live at [/en/](/en/)
- **URLs:** all 73 posts stay at the same addresses, and the 2013 redirects still work

## 100% vibe coding

Just like with CSS Components: **I didn't write a single line of code for this project by hand**

But vibe coding isn't asking for "make me a pretty blog" and hoping for the best. As I said in the post about [context engineering](/en/blog/ai-and-context-engineering-in-a-project-from-scratch-with-vibe-coding/), the job is giving the AI **the right information, in the right format, at the right time**

### 1. UI and UX settled before anything else

Before any code, the UI and UX decisions were settled in Claude Design: the look, the pages, the states of each interaction and even the favicon. When implementation started, the "how should it look" was already answered, and the AI didn't have to guess anything

### 2. Decisions before code

The design didn't answer everything. So, in plan mode, the questions only I could answer came before a single line:

- The design is dark only, but it has a theme button. What about the light theme? Derive it from the same tokens
- The old 404 had jokes and the Konami code. Keep them? No, just the new terminal
- The designed post has no ads. Remove them? No, keep the existing ones, in the new style

It's the same principle as the [committed plans](/en/blog/ai-stack-that-will-level-up-your-work-as-a-dev/): nothing moves forward with an open decision. If something is left for later, it has to be written down

### 3. One spec for everyone

All of that became a single spec file: the token table for both themes, the project rules (performance first, native components, accessibility, bilingual) and one section per page pointing to its design reference. Every agent started from the same context, so nobody invented their own version of what to build

### 4. Opus orchestrates, Sonnet executes

Execution followed the split I already use day to day: Opus planning and orchestrating, Sonnet writing code

First, **one** sequential foundation: fonts, tokens, header and footer, because everything else depends on them. Then five subagents in parallel, each one owning its files: home, post, Labs and 404, cookies and search, and brand (favicon and share cards)

Running agents in parallel on the same repository needs house rules. Each one had its own server port, nobody ran the full build (one would wipe out the other's) and the shared files, like the Labs data, I changed **before** dispatching the agents, so nobody fought over the same file

And an honest detail: in the middle of the testing round, **the weekly Sonnet limit ran out** 😅 Opus finished the job

### 5. Visual loop until it matches the design

Each agent took screenshots of its page with Playwright and compared them to the design: first on desktop, then on mobile and in the light theme. And repeated until they matched

Even so, the human eye caught things the comparison didn't. The hover on the post rows pushed the text 16 px to the side. That came from the design itself, but in practice it was annoying. It became a `box-shadow` that paints the background without moving anything

### 6. Tests in a loop and self-review

The e2e tests ran in a loop, each one three times in a row to hunt down flaky tests, until everything was green. And following my e2e rules: page objects, locators by accessible role (`getByRole`) and no `waitForTimeout`

The rules, by the way, do half the work. Things like "never use em dashes", "comments in English" and "tests live in `__tests__`" are written once and apply to every agent, like I said in the post about [skills and rules](/en/blog/ai-stack-that-will-level-up-your-work-as-a-dev/)

### What went wrong

As always, nothing came out perfect on the first try:

- The first favicon looked exactly like the Facebook logo: a white "f" on a blue square 🤦‍♂️ Then it became an underlined "ff" like a link, and now it's `ff_`, with the terminal cursor
- The progress bar simply didn't move. The CSS minifier folded `animation-timeline` into the `animation` shorthand, Chrome rejects that form and dropped the whole declaration. Hence the separate rule up there
- A `.reading` class in the new header had the same name as an old helper, and the post header shrank to 720 px
- The copy code button went blank two seconds after the click: the script read `data-label` and the HTML had `data-copy`. The e2e tests caught it
- Inlining the CSS broke search, which was loading its own CSS dynamically
- The embeds were loading YouTube thumbnails before consent. That's what turned into the `srcdoc` solution

In the end the project shipped with 252 unit tests and 45 e2e tests with Playwright, including one that guarantees that **no third-party request happens before interaction**. Performance that isn't tested gets worse again

And it's worth repeating what I said in the stack post: whatever the tooling, the one responsible for each delivery is still **you**. The AI wrote all the code, but every design, product and trade-off decision went through me

## Bonus: the piano is back too

While I was reviving CSS Components, I got some momentum and fixed up another project: the [Piano](https://piano.felipefialho.com), a piano you can play right in the browser

It was in the ICU: webpack 5 + Pug + Stylus + Babel, **113 vulnerabilities** in `npm audit` and no deploy since October 2023, because the automatic Netlify publishing was stuck

It became Vite + TypeScript + plain CSS, with tests in Vitest and a check in a real browser confirming that each of the **24 notes** plays the right sample. The look became the instrument's case: white lacquer in light mode, ebony in dark mode and a strip of red felt above the keys

And I finally fixed the keyboard. The old mapping started at **Caps Lock**, which on macOS toggles on and off instead of staying pressed 😂 Now it follows the tracker layout, the same one as FL Studio, and uses the **physical position of the key** instead of the character, so it works on any keyboard layout:

```ts
const key = document.querySelector<HTMLElement>(`[data-code='${event.code}']`);
```

And yes, the Piano uses JavaScript. Audio in the browser needs JS, there's no CSS magic that solves that. Native components aren't dogma, it's about using each tool for what it does well

## Conclusion

In 2019 I ended the post saying it got long and still felt short. Still true 😅

If I had to sum up this project in one sentence it would be this: **focus on performance**

And performance isn't a luxury. It's respect for whoever is on the other side of the screen, on the modest phone, on the flaky 4G, with little time and little patience

- [Blog code on GitHub](https://github.com/felipefialho/felipefialho.com)
- [Piano](https://piano.felipefialho.com) ([code](https://github.com/felipefialho/piano))
- [The 2019 post about Gatsby](/blog/como-foi-desenvolver-meu-novo-blog-usando-o-gatsbyjs) (in Portuguese)
- [Native components in 2026](/en/blog/native-components-in-2026-what-html-and-css-do-on-their-own/)

See you at the next version, around 2033 🥳
