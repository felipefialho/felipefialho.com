---
title: 'Handling Dynamic Import Errors in JavaScript'
date: 2024-02-26 00:00:01
description:
  'Tired of getting angry at dynamic import errors? Let''s learn how to handle them and keep your app running 🙏'
tags: ['javascript']
translationOf: como-lidar-com-de-erros-importacao-dinamica-javascript
---

## Introduction

Picture an e-commerce app where the user is about to finish a purchase, and when they click the button the app breaks?

> A real disaster 😱

If you use [dynamic imports](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import) in your JavaScript projects, you've probably run into some "mysterious" errors in Sentry (or other monitoring tools), like

- `Failed to fetch dynamically imported module`
- `Unexpected token '<'`
- `ChunkLoadError`

These errors can be critical and stop your app from working properly, so it's essential to understand how to mitigate them to guarantee the best experience for your users

## What are dynamic imports?

Before getting into how to handle the errors, it's worth explaining what Dynamic Imports are.

Also known as Lazy Load, dynamic imports happen at runtime, meaning they aren't loaded when the app loads, but only when they're actually needed.

```html
<button id="load-module">Load Module</button>

<script>
  const loadModule = document.getElementById('load-module')

  loadModule.addEventListener('click', async () => {
    const module = await import('./dynamicModule.js')
    module.myFunction();
  })
</script>
```

This is useful for loading modules when needed or based on user actions, like in dynamic routes, which helps app performance a lot.

The problem is that, since they're loaded at runtime, these imports can fail, and that's where the trouble starts. Since these are module loading errors, they can completely break the app, keeping the user from navigating any further.

## How to handle loading errors

### Change your deploy strategy

One of the main problems with dynamic imports is related to deploying new versions of your app.

If a deploy happens while a user is browsing the site, the old code will keep requesting the dynamic module chunks from the previous version. If those modules no longer exist in the new version, errors will happen and the app will stop working for that user until they reload the page.

> To mitigate this problem, it's essential to keep the old builds and chunk hashes available for a period of time after the deploy

To mitigate this problem, it's essential to keep the old builds and chunk hashes available for a period of time after the deploy. This guarantees that users who are still on the previous version keep having access to the resources they need, even after the update.

This strategy already solves most of the errors related to dynamic imports during a deploy.

I'd say more than 90% of the problems I had with dynamic imports were solved with this strategy.

## Users with connection problems

Another thing that can cause dynamic import errors is connection problems and even the use of ad blockers.

To make things even harder, for security reasons the browser doesn't allow retrying the import of a script even if the module fails to load. Although there are no 100% effective solutions for dealing with network failures, a few alternatives can help:

- **Force a page reload**: This option isn't ideal, since it can create a bad experience for the user, but it may be necessary in some cases and can work well when the problem happens during a route change or on an initial load. It's not recommended for situations where the error happens during a user interaction
- **Show an error message**: Let the user know about the problem and offer the option to refresh the page manually. This approach gives you more control over the user experience, but it requires specific implementations

## Extra tips

### Monitor your errors

Use tools like Sentry to track and identify dynamic import errors (and so many others) in your app. This is fundamental to understand how often these problems happen and what impact they have, and to make sure you're taking the right steps to mitigate them.

### Use caching tools

Caching dynamic modules can reduce load time and minimize the risk of network-related errors. One way to do that is with [import-maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import-maps), which lets you define import mappings to module URLs. That can be useful to make sure modules are available even when the network fails.

### Service Workers

Service Workers can be used to intercept and handle network failures, letting you show an error message or even load an offline version of the app. This can be useful to make sure the user has a consistent experience.

## Conclusion

I got really mad at dynamic import errors and had a hard time finding material that helped me understand and deal with these problems. So I hope this article helped you better understand how to handle them and make sure your app keeps working.

Even though these strategies can help, they still don't guarantee these errors won't happen. That's why it's essential to keep monitoring and to understand when these errors are happening in your app.

Tamo junto! 🚀
