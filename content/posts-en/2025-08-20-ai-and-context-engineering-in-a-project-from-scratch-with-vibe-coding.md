---
title: 'AI and Context Engineering in a project from scratch with vibe coding'
date: 2025-08-20 00:00:01
description: 'I gave in to vibe coding and built an entire app in 5 minutes! Just kidding 😅'
tags: ['ai', 'front-end', 'programming']
translationOf: ai-e-engenharia-de-contexto-em-um-projeto-do-zero-com-vibe-coding
---

I've been actively using LLMs to write code for at least 2 years, usually to ship features in projects that already existed.

That said, I spent the last month completely immersed in **vibe coding** to build a real-world, complex application from scratch, with **Next.js + TypeScript**.  

Here are my takeaways on the tools, models and workflows I used along the way:  

## ➡️ Tools I used  

### VS Code + Copilot  

I used this combo for a long time and, overall, it worked well.  

The problem is that, just like in life, for every glimpse of happiness we have to deal with disappointment and frustration:  

- **Sonnet 4** got a token limit.  
- **Copilot's unlimited GPT 4.1** is so lazy and hallucinates so much that it could be called *Artificial Dumbness*.  

And I'm dumb and lazy enough for both of us.  

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1947395637579788501">
    <p>Assinei o Cursor<br><br>Depois das mudanças no GitHub Copilot, limitando LLMs como Sonnet 4, ficou simplesmente intragável usar<br><br>O modelo ilimitado do GPT 4.1 do Copilot, além de preguiçoso, alucina tanto que podia ser chamado de Burrice Artificial<br><br>E de burro e preguiçoso basta eu</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1947395637579788501">July 21, 2025</a></figcaption>
</figure>

### Cursor  

It was love at first prompt.  

The **unlimited auto mode** works really well, letting you switch to Sonnet 4 on complex tasks and go back to auto on the simpler ones.  

Result: an efficient workflow that's easy on tokens.  

On top of that, the **DX is absurdly good**, especially if you work with front-end.  

## ➡️ LLMs I used  

- **Claude Sonnet 4**: Best overall output, understands the project context, follows instructions even with simple prompts.  
- **Claude Opus 4.1**: Burns through tokens like an old Opala (a gas-guzzling Brazilian classic car) drinks gasoline, but gets impressive results. Worth using for very complex tasks or for working on the initial structure of the application.  
- **Auto mode (Cursor)**: Supposedly picks the best cost-benefit for your task. I saw a lot of people badmouthing it, but it worked really well for me, especially once the application was more structured. 
- **GPT 5**: Faster and with fewer hallucinations than 4.1, but still behind Sonnet 4 for front-end.  
- **GPT 4.1**: Unbearable: bad outputs, cut in half, and no grasp of context.  

I also tested **o4 mini, Gemini 2.5 and Grok 2**, but only briefly, so I can't draw solid conclusions.  

## ➡️ Context Engineering

This term got popular fast, and for good reason. 

It's basically about **setting the stage** so LLMs can be more efficient.

It's not just writing a good prompt.

Instead of simply asking a question, you give the model the context, the persona and the instructions it needs to produce the output you want. 

In the programming world, this is crucial to turn an LLM from a generic tool into a coding assistant that will actually help you in the real world.

The idea is to give them **exactly what they need**: the right information, in the ideal format, at the right time, so the answers are accurate and controlled. In other words, building a system that dynamically assembles a complete workflow.

That includes: 

- Relevant documentation and files  
- Expected output format  
- Historical context  
- Code examples
- Clear instructions  

### What can help with context engineering?

Context engineering goes beyond just giving clear instructions. By providing additional information, you help the LLM better understand your input, which results in a more accurate output.

**1. Give the LLM a Persona**

By assigning a "role" to the LLM, you steer it toward a specific perspective and tone. This is especially useful for tasks that require a particular communication style.

*Example of a Prompt with a Persona*: 

> You are an expert full-stack developer with 15 years of experience specializing in Node.js backend APIs. You always follow best practices and prioritize security and performance. Your task is to write a fast and efficient function to handle HTTP POST requests that creates a new user.

By using the "experienced developer" persona, you guide the LLM to generate high-quality code that follows the language's conventions and best practices, instead of generic code.

**2. Give Input and Output Examples (Few-Shot Learning)**

Showing the LLM how you want the response to be formatted can drastically reduce the risk of it "hallucinating" or returning an off-pattern result.

This is known as "few-shot learning".

**Prompt with Examples:** 

>`Given a URL, extract the domain name.
>
> Input: 'https://www.google.com/search'
> Output: 'https://www.google.com/search?q=google.com'
>
> Input: 'https://github.com/microsoft'
> Output: 'github.com'
>
> Input: 'http://my-blog.com'
> Output: 'my-blog.com'

With this, the LLM learns the pattern of your request from the examples. This ensures the response will be consistent and in the desired format.

**3. Include ALL Constraints and Limitations**

Defining what the LLM should not do is just as important as saying what it should do.

**Prompt with Constraints:** 

> Write a simple JavaScript script to read a JSON file and print its contents. The script must NOT use any external libraries like 'fs-extra' or 'lodash'. Use only built-in Node.js modules.

The "don't use external libraries" instruction keeps the LLM from generating code that might be incompatible with your project environment.

**4. Structure Your Prompt**

Clarity is key. Using a clear structure, like Markdown formatting, helps organize your request into logical sections.

**Structured Prompt:**

> Task
> Write a simple JavaScript function to sort a list of numbers.
> Context
> The list can contain positive and negative integers.
> Constraints
> Do not use the built-in 'sort()' method. Implement a sorting algorithm from scratch.
> Desired Output Format
> The function should return a sorted list.

Organizing the prompt into sections ( Task, Context, Constraints and Desired Output Format) makes it easier for the LLM to read, lowering the chance of it skipping an important instruction.

**5. Create a context file**

For more complex prompts, or ones that need information from several files, you can create a text file, like `context.md`, with your detailed prompt and load it into the LLM. This is useful for:

- **Reuse:** You can save and reuse complex prompts for recurring tasks.
- **Organization:** Keeps your prompt clean and well-structured.
- **Collaboration:** Lets other team members use the same context to get consistent answers.

That way, instead of typing a long prompt every time, you can just load the file, making sure all instructions and context are provided consistently.

Tools like Cursor and Copilot let you load files as context by adding them to context folders, so it's worth reading the docs for each one.

**6. Add your project files as context**

This is a more powerful way to provide context. It lets the LLM analyze the code architecture, the dependencies, the naming conventions and other details that would be hard to describe manually.

**Scenario:** You need the LLM to create a new component for your React project.

**Action:** Add the package.json file so the LLM understands the dependencies. Then add the UserComponent.js and UserComponent.scss files so the LLM understands the current code style and the CSS classes you're already using.

**Prompt after the upload:**

> Given the context from the files I've uploaded, create a new 'ProductCard' component. It should follow the same structure and coding style as 'UserComponent.js' and use classes from the 'UserComponent.scss' file to maintain a consistent look.

The ability to "see" the context files lets the LLM generate code that fits seamlessly into your existing project, saving refactoring time and minimizing errors.

**7. Use MCP Servers to enrich the context**

MCP Servers are a way to extend the power of LLMs. They are servers you can access via API that can provide additional context to the LLM.

A good example is [context7](https://github.com/upstash/context7), which integrates with all the major LLMs, tools and editors, and even has an API for creating your own servers.

With that, you can enrich the context in a more efficient and customized way, while keeping the prompt in more natural language most of the time.

> Create a Next.js middleware that checks for a valid JWT in cookies and redirects unauthenticated users to `/login`. use context7

> Configure a Cloudflare Worker script to cache JSON API responses for five minutes. use context7

In this scenario, Context7 fetches code examples and documentation straight into the LLM's context.

Awesome, right?

### Example 1: Generating Code with Detailed Specifications

You need a JavaScript function to validate an email address. A simple request might even work, but it doesn't guarantee the accuracy or the format of the code.

**Simple Prompt** (low quality)

> Write a JavaScript function to validate an email address.

**Prompt with Context** (good quality)

> "As a senior JavaScript developer specializing in front-end performance, your task is to create a function to validate email addresses.
>
>The function, named 'validateEmail', should accept a single string parameter 'email'. It must use a minimal regular expression for validation to ensure maximum performance and avoid unnecessary complexity. The function should return a boolean value and include comprehensive JSDoc comments describing its purpose, parameters, and return value
>
> After the function, please write unit tests using Jest to cover the following cases:
>
> - A valid email address.
> - An invalid email address (e.g., missing '@').
> - An empty string.
> - A null or undefined value.
> 
> Finally, provide a clear usage example with one valid email and one invalid email"

This prompt doesn't just ask for the code. It also defines the function signature, the method to use (regex), the output format (boolean), the need for documentation (JSDoc) and a usage example. That removes ambiguity and makes sure the generated code meets specific requirements.

### Example 2: Debugging Errors and Optimizing Code

You have a piece of JavaScript code that's failing, but the error message isn't clear.

```js
const data = null;
const evenNumbers = data.filter(num => num % 2 === 0);
console.log(evenNumbers);
```

**Simple Prompt** (low quality)

> Why is this JavaScript code not working? [code snippet]

In this scenario, the LLM will tell you that data is null, something the error message itself already points out. The result is a generic, not very useful answer.

**Prompt with Context** (good quality)

> Analyze the following JavaScript code. It's supposed to iterate over an array of numbers and return only the even values. However, it's throwing a 'TypeError: Cannot read properties of undefined' error. Identify the root cause of the error, provide the corrected code, and explain the bug. Also, suggest how the code can be refactored for better readability and performance.

In this scenario, you're giving the LLM the task (identify and fix an error), the context (the goal of the code), the exact error message and an additional request for optimization.

This guides the model toward a deeper analysis and a more complete answer.

### Example 3: Refactoring and Adding Comments

You have a messy, undocumented piece of code that needs to be improved.

```js
function process(a, b, c, d){
	if(c === 'sum'){
		return a + b
	} else if(c === 'subtract'){
		return a - b
	} else {
		return 'Error: Invalid operation'
	}
}
```

**Simple Prompt** (low quality)

> Improve this code. [code]

The AI can certainly improve the code, but without specific instructions the result will be generic and might not meet your expectations.

**Prompt with Context** (good quality)

> As an experienced software engineer specializing in clean and maintainable code, your task is to refactor the following JavaScript function.
>
> The refactored code should use descriptive variable names, apply modern coding practices like const and switch statements, and have proper indentation. Add JSDoc comments to document the function's purpose, parameters, and return value. The original functionality must be preserved.
>
> After the refactored code, provide a brief explanation of the key changes you made and why they improve the code's readability and maintainability.

This way the prompt spells out what needs to be done (refactor), the goal (improve readability), the guidelines (rename variables, formatting) and the constraints (don't change the functionality).

This turns the task of "improving" into a set of clear, contextual instructions for the LLM.

### To sum up

By providing the right information (the purpose, the persona, the constraints, the desired format, and so on), you turn the LLM into a smart programming partner, capable of generating code that's more accurate, documented and useful. 

If you really want to maximize the power of LLMs in your workflow, context engineering is not just a useful skill, it's a necessity.

I used this approach to try to get the most out of LLMs while spending fewer resources and less effort. And the difference in quality when the context is properly tied together is absurd.

And now I'll talk about that experience.

## ➡️ Phase 1: Scaffolding and Architecture  

This is where I faced the biggest challenge.  

Even with well-thought-out prompts and context, the model still didn't have enough examples to generate good outputs.  
Result: **generic code that didn't fit the project**.  

The way out was to create an initial volume of examples and files for the LLM to lean on. That takes time and patience.

My tip here is to use Thinking LLMs like Claude Opus 4.1, which are more expensive and slower but deliver much better results in the early stages, when the context is weaker.

At this point, Chat mode can be great for brainstorming architecture and project organization decisions.

And without a solid architecture foundation, this stage can simply kill scalability before the application even comes to life.  

## ➡️ Phase 2: Implementation  

With the scaffolding ready, we can start implementing features, and this is where we get to see the full potential LLMs deliver day to day.

Features that would easily take an entire sprint to build can now be shipped in a few hours, already optimized, tested and performant (if you have the knowledge to steer the LLM, of course!).

Tasks like writing tests, documentation, etc. get done in minutes.

There's an exponential gap between what's possible with LLMs and what's possible with a human dev.

### The problem: CSS, UI and UX

This is where things get complicated.  

LLMs seem to have a **weird, toxic passion for flexbox**, creating needlessly complex layouts.  

So, many times, writing CSS by hand, like we did in the hunter-gatherer days, was faster.  

But once the project had well-defined patterns and examples, the results improved a lot too.  

---

## ➡️ Software development has changed  

The game has changed and there's no going back.  

I'm seeing the term **"Prompt Engineer"** getting more and more popular. We're going to be responsible for creating optimized prompts, structuring smart workflows and carefully reviewing every output.  

But there are no miracles: 

Without technical knowledge and accumulated experience, all you do is speed up your own mistakes. 

Context Engineering makes you stop treating AIs as a simple support tool. With this approach, they become an essential part of your day to day.

You get code that's more accurate, documented and useful, reaching a feature development speed that would be impossible if you were writing handcrafted code like the hunter-gatherers used to.

If you want to get the most out of the tools and be more efficient in your day to day, this is no longer optional.
