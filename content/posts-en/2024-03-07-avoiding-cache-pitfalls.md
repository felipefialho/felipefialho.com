---
title: 'Avoiding Cache Pitfalls 🤡'
date: 2024-03-07 00:00:01
description: '"It''s not working? Must be the cache!", that phrase is super common among devs, but did you know that badly configured caching can actually destroy your application?'
tags: ['javascript', 'spa', 'service-worker', 'cache']
translationOf: evitando-as-armadilhas-do-cache
---

## Introduction

In this article, I'll share a true story about how a Service Worker configuration mistake caused an infinite loop that prevented users from receiving updates with new versions of the application, and how we solved that problem.

## The story

A few years ago, around 2017 (it's been a while, huh!), I worked on an SPA (Single Page Application) that was being converted into a PWA (Progressive Web App) using [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers), a technology that lets web apps be installable, work offline and offer a better user experience.

The process went pretty smoothly until we noticed two crucial mistakes:

- We forgot to remove `index.html` from the Service Worker cache
- We forgot to remove `service-worker.js` from the server cache

And that's when the shit hit the fan 🤡

## Consequences

At first we didn't notice any errors, the application kept working normally, and users didn't report problems. But when we released a new version the problems started to show up.

Users who already had the application installed weren't getting the new version. They kept using the old version even after reloading the page, since the Service Worker was serving a cached version of `index.html` and the server's `service-worker.js` was also cached, preventing the new version from being downloaded.

That's because SPAs (Single Page Applications) load `index.html` only once and then use JavaScript to update the page content.

Since `index.html` was cached, users didn't receive those new JavaScript and CSS chunks, so the application kept running the old version, forever! 😱


### First attempts at a solution

The first thing we tried was invalidating the Service Worker cache. However, that didn't solve the problem, because `index.html` (which also called the Service Worker) was still cached.

That's because the Service Worker was always serving the cached version of `index.html`, which called the Service Worker, which in turn served the cached version of `index.html`, and so on.

That created an infinite loop that prevented users from receiving updates with new versions of the application 🤡

A "manual" alternative was simply to ask users who contacted us reporting problems to completely clear their browser cache, but that wasn't a scalable solution and it didn't guarantee that all users would do it.

## Final solution

After a lot of investigation and analysis, we found a solution that solved most cases:

- We intercepted the request for `index.html` on the server
- We injected a script to completely clear any Service Worker
- We added a new Service Worker, this time configured correctly

This interception was done on the server, where we could add a script that cleared the Service Worker cache, but it could also be done through script managers like Google Tag Manager.

The script that cleared the Service Worker cache was simple:

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
```

Finally, peace! 🕊

## Conclusion

This experience shows how important it is to be careful with caching in web applications. Badly done configurations can cause serious problems that are hard to diagnose and even harder to fix.

It's really worth reading articles and docs about Service Worker and caching to avoid falling into the same traps as this one.

I strongly recommend reading the [Service Worker Guide](https://developers.google.com/web/fundamentals/primers/service-workers) and this [article about caching by CSS Wizardry](https://csswizardry.com/2019/03/cache-control-for-civilians/) to better understand how caching works and how to avoid problems like this one.

This story was first told on Xwitter

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1765755625063997813">
    <p>Sabia que configurações mal feitas de cache tem potencial pra destruir sua aplicação?<br><br>Se liga nessa história<br><br>Uns anos atrás tava trabalhando num SPA e configuramos o Service Worker pra transformar num PWA, até ai tudo tranquilo se não fosse por dois problemas:<br><br>Esquecemos de…</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1765755625063997813">March 7, 2024</a></figcaption>
</figure>
