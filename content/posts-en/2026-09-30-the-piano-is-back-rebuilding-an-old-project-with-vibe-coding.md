---
title: 'The Piano Is Back Too: Rebuilding an Old Project with Vibe Coding'
date: 2026-09-30 00:00:01
description: 'I was on a roll reviving old projects and the Piano was literally restored haha'
tags: ['ai', 'front-end', 'css', 'javascript']
translationOf: o-piano-tambem-voltou-reconstruindo-um-projeto-antigo-com-vibe-coding
---

While I was reviving CSS Components (which became the post about [native components in 2026](/en/blog/native-components-in-2026-what-html-and-css-do-on-their-own/)), I got some momentum and ended up fixing up another project:

The [Piano](https://piano.felipefialho.com)

A piano you can play right in the browser, made with just CSS and JavaScript. Another one of those old projects I knew was abandoned and that every time I thought "I'll look at this next week" haha

Spoiler: next week arrived, in the same Claude Code session.

## It was worse than I remembered

If CSS Components was in bad shape, the Piano was in the ICU:

- webpack 5 + Pug + Stylus + Babel
- **113 vulnerabilities** in `npm audit`, 4 of them critical and 44 high
- All in the build tooling, none in the piano itself
- No deploys since October 2023

And that last item had the same explanation as the other project: Netlify's automatic publishing was stuck. Nothing had gone live in years and I didn't even remember it. We found the blocker and unblocked it right there, in the same session.

## 100% vibe coding

**I didn't write a single line of code by hand**. My role was to steer: say what I wanted, approve the plan, review, be suspicious, and decide.

The result:

- Vite + TypeScript + plain CSS
- pnpm
- Unit tests with Vitest
- CI with CodeQL

And since it's pointless for the tests to pass if the piano doesn't play, the verification was done in a real browser with Playwright, checking that each of the **24 notes** plays the right sample. Because nobody deserves an out-of-tune piano 😅

## The page became the instrument's case

The redesign idea was simple: the page itself is the piano.

- White lacquer in light mode and ebony in dark mode
- Title in Bodoni Moda, brass colored
- A strip of red felt right above the keys, just like a real piano
- Each key with its keyboard letter printed on it and the note name (C4 and C5 in red, so you can find your way around)
- Self-hosted fonts, no depending on anyone

It's the kind of detail that back in the day I would have left for "a v2 someday". This time it all fit in the same session.

## The keyboard that finally makes sense

This was the part that bothered me the most.

The old mapping started at **Caps Lock**, which on macOS toggles on and off instead of staying pressed, so it wasn't reliable at all. And it also used Enter and the left arrow as piano keys. Don't ask me what I was thinking 😂

Now it follows the classic tracker layout, the same one FL Studio and trackers use:

- **Lower octave:** `Z X C V B N M` on the white keys and `S D G H J` on the black keys
- **Upper octave:** `Q W E R T Y U` on the white keys and `2 3 5 6 7` on the black keys

And the kicker: the mapping is by the key's **physical position** (`KeyboardEvent.code`) and not by the character. So it works on any keyboard layout, ABNT2 (Brazilian), US, AZERTY, whatever. Each piano key carries the physical key code in the HTML:

```html
<div class="piano-key__white" data-code="KeyZ" data-label="C4" data-hint="Z"></div>
<div class="piano-key__black" data-code="KeyS" data-hint="S"></div>
```

And the JavaScript just looks for the key with the same code:

```ts
const key = document.querySelector<HTMLElement>(`[data-code='${event.code}']`);
```

Shortcuts with Ctrl, Cmd or Alt are ignored, so you don't play a C every time you hit `Cmd + C`.

Another change that seems small but changes everything: **keys stay pressed while you hold them**, whether with mouse, touch or keyboard. Before, it was just a fixed 100ms blink, no matter how long you held.

## What about mobile?

On a phone held upright, one playable octave shows up along with a suggestion to turn the device sideways. In landscape, both full octaves appear.

## Yes, this one uses JavaScript

Unlike CSS Components, where the rule was zero JavaScript on the whole site, the Piano uses JS, and that's fine.

Audio in the browser needs JavaScript, there's no CSS magic that solves that. The sound runs on [Howler.js](https://howlerjs.com/), while the piano's visuals are still CSS.

The lesson here isn't "JavaScript is bad", it's to use each tool for what it does well. 2026's HTML and CSS solve a lot on their own, but playing a piano sample isn't one of those things.

## Conclusion

Same story as the other project: years of putting it off, a few hours to fix it.

And once again what made the difference wasn't AI "doing everything on its own", it was having a process around it: a plan approved before any code, tests, CI and verification in a real browser. The one who decided the stack, the look and the keyboard mapping was me, and the one who answers for the delivery is still me.

If you haven't read it yet, the main post of this batch is the one about [native components in 2026](/en/blog/native-components-in-2026-what-html-and-css-do-on-their-own/), where I put each 2014 component side by side with today's native version.

- [Piano](https://piano.felipefialho.com)
- [Code on GitHub](https://github.com/felipefialho/piano)

Now go play something and tell me about it 🎹
