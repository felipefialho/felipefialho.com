---
title: 'AI First and the agentic loop: the harness that makes the agent prove it got it right'
date: 2026-11-06 00:00:01
description: 'An agent without guard rails confidently ships something nobody can prove is correct. This is the harness I use to solve that: guard rails, a red/green loop, subagents and documentation as context 🚀'
tags: ['ai', 'agents', 'workflow', 'programming']
translationOf: ai-first-e-loop-agentico-o-harness-que-faz-o-agent-provar-que-acertou
---

These days I write a lot less code and a lot more rules

The code that comes out of a well-guided agent is almost always better than what I'd write by hand, that was never the problem. The problem is that an agent without guard rails confidently ships something nobody can prove is correct

This post is about the workflow I use to solve that: the guard rails, the phases of the loop, who does what, the documentation that comes out of each round and where I come in

The examples come from front-end, where I spend most of my time, but the idea works for any stack. Swap the browser for a contract suite and the component for an endpoint, and the reasoning is the same

And my harness is built on [Claude Code](https://claude.com/claude-code), so the names you see here (skills, hooks, subagents, Opus and Sonnet) come from there. But the concepts aren't exclusive to it: Cursor, Codex, Copilot and other tools have equivalents for rules, agents, MCP and hooks, and the workflow adapts by swapping the pieces

## AI First is not using AI, it's designing for it

Using AI is opening a chat, asking for a piece of code and pasting it into the editor. It helps, but the process stays the same as before, just with a better autocomplete

AI First flips the question. Every engineering decision gets one more criterion: **can an agent iterate here on its own, and can it prove it got it right?** That applies to choosing a stack, to folder structure, to how you write a test and to where a convention lives

In practice, the repository becomes the agent's onboarding

Think about a new dev joining the team. In the first week they ask where everything is, what the testing pattern is, why that module is built that way. Whoever sits next to them answers, and every answer that only exists in someone's head becomes friction: they wait, they guess, or they do it the way they did at their last company

An agent is that new dev, joining again in every session. Except that, without guidance, it doesn't stop to ask: it guesses with confidence, and tomorrow it won't remember what it learned today. Whatever only exists in my head or in an old chat doesn't exist for it

So I reduce the friction the same way I would in a good onboarding, just taken to the extreme: everything it needs to know is written down, versioned and easy to find. A convention becomes a rule, a procedure becomes a skill, a decision becomes an ADR. And the side effect is great: the next human dev who joins the team reads exactly the same material

This is where the **harness** comes in: everything around the model that decides how it works. Context files, rules, skills, subagents, hooks, MCP servers, tool permissions and the gates that say when it's done. The model is the engine, the harness is the whole car. Two devs with the same model and different harnesses ship completely different things

And building that harness has a name: **context engineering**. It's not writing a better prompt, it's deciding what goes into the context window, when it goes in and what stays out. Too much context costs tokens and dilutes the model's attention, too little makes it guess

And my role changes with it. I now take care of three things an agent can't decide on its own: **what correct means, where the truth comes from and what each agent is allowed to touch**

## Guard rails beat prompts

A prompt is a request. A guard rail is an impossibility

If a rule only lives in a prompt, the agent will break it at the first chance it gets, with the best of intentions, it's part of how LLMs work. It wants to deliver, and the shortest path to delivery almost always runs over some rule

So everything that really matters leaves the text and moves to a place that blocks on its own:

- **End-to-end types:** strict TypeScript and a schema (**zod**, for example) at the boundary with anything external. A wrong contract breaks at parse time, not in production
- **Architecture in the linter:** import direction between layers and naming conventions enforced by lint rules, not by a polite request
- **One single gate:** one command runs typecheck, lint, format and unit tests, returns exit 0 or 1 and prints only what failed. An exit code leaves no room for "I think it passed", and lean output means fewer tokens
- **Quality inside the loop:** visual regression against `main`, accessibility audit, Lighthouse and Web Vitals run on every round, not in a pipeline someone looks at later (or never)
- **Tool allowlist per role:** each agent declares in its frontmatter the tools it can use. An agent that should only report gets no editing tool, so "only reports" stops being a request and becomes a technical limitation
- **Forbidden files:** whoever implements never touches the tests. The shortest path to a green test is editing the test, and the harness blocks that
- **Hooks:** scripts that run in the agent's lifecycle, before or after each tool call, at session start. They block a dangerous command, inject context or run a check without depending on the agent remembering
- **Budget:** caps on review rounds, on parallel subagents and on effort level per task. Without a cap, "one more round and we're done" becomes a token sinkhole

Layer direction is the best example

Routes compose features, features use entities, entities never import features. Written only as text, an agent breaks that the first time it's in a hurry. With the linter blocking the import, the rule no longer depends on anyone remembering it

None of this is exclusive to people who use AI, it's just good engineering. The difference is the price: before, a loose convention cost a bit of friction on the team, now it costs an agent being confidently wrong at scale

## First I define what correct means

A loop only runs on its own if the agent can tell, without asking me, whether what it did is correct. So the first thing I write is not a prompt, it's the definition of correct

It comes from an explicit source of truth: the product spec, the contract with the services, the design system. And it becomes a **behavior matrix**, with one row per observable thing: every state, every validation message, every external call, every analytics event, with the literal copy

With the matrix written down, "correct" stops being an opinion and becomes something you can check mechanically. The rest of the workflow exists to turn each row into something an agent verifies on its own

And when the matrix doesn't say, the agent doesn't decide. Tests only check the decisions someone made, they can't find the decision nobody made. That gap comes back to me as a question

## The phases and what makes each one end

An **agentic loop** is the cycle where the agent acts, observes the result and corrects itself until it hits a stop condition. Without an objective stop condition, it stops when it thinks it's done, and "thinks" is the problem word

So every task goes through the same phases, and every phase has a written exit condition. Nothing moves forward because it "looks done"

### 0. Context research

Before opening any code, research agents read what's around it, through MCP servers when the source lives outside the repo: documents, tickets, ADRs and the history of decisions. Everything is read-only by default, writing is a permission given on purpose

In a front-end project, for example, the most valuable part is the **contract with the backend**. Instead of trusting API docs that may be outdated, a specialist agent reads the service's own repo with [Octocode](https://github.com/bgauryy/octocode-mcp), an MCP server for code research: it finds the endpoint's controller, follows it to the DTO, the validation and the business rules, and comes back with the real shape of the request and the response, the fields that can be `null`, the enum values and the possible errors

All of it with the file and line it came from

That's faster and more accurate than cloning the repo and grepping around, or worse, letting the agent infer the contract from a field name. And the answer feeds straight into the work: the **zod** schema at the boundary, the error and enum variants in the fixtures and the matrix rows come from there, never from a made-up shape

But **research is context, never a source of truth on its own**. A claim about the backend only goes into a document with the code evidence attached. When a document says one thing and the code in production does another, the code wins, and the mismatch becomes a question

Who decides? Me

### 1. Spec

The spec brings together the behavior matrix, the decisions that already exist and what's still open. The exit is a reviewer that gets only the spec and the original request and lists what was left out or is ambiguous

Zero findings, phase closed

### 2. Decisions backed by evidence

Every relevant technical decision gets a row: what changes, why and what evidence proves it's safe. Running two calls in parallel looks obvious until one of them writes what the other one reads. **No evidence, no decision**: the row stays marked as unknown, and the safe path wins

### 3. Specs that start red

Tests are written before the code, from the matrix. They need to be red for the right reason: the feature doesn't exist, not because the harness broke

### 4. Build in slices until green

The build is split into slices, each one with the tests it needs to turn green without breaking the ones that already were. The red/green loop always has two layers: a **soft loop**, fast and isolated, that runs on every change, and a **deep loop**, slower and closer to reality, that catches what the isolated one can't see

What changes from one stack to another are the tools in each layer

**On the front-end**, the soft loop is the e2e suite with Playwright running against the production build and a mock server, until everything is green and stays stable on repeat. The deep loop is an agent driving a real browser through Playwright MCP in a real environment, scenario by scenario, checking structure, layout, network, analytics and console against the matrix

**On the back-end**, the soft loop is unit and integration tests against real dependencies in containers, like the database and the queue, plus contract tests that lock the shape of what the service receives and returns. And the deep loop can be **mutation testing**, with [Stryker](https://stryker-mutator.io/) for example: it changes the code on purpose (swaps a `>` for `>=`, deletes a condition, flips a return value) and checks whether any test fails. A mutant that survives is a test that tests nothing

That fits agents really well. The classic risk of AI-written tests is the tautological test, the one that's green because it doesn't assert anything relevant. Coverage doesn't catch that, mutation score does, and it becomes one more objective exit condition: surviving mutants go back into the loop as red tests

In any stack, the deep loop has the toughest exit: **two full rounds in a row with no real findings**. One clean round can be luck, two in a row actually say something

### 5. Wrap-up

Updated docs, the full gate and a review with reviewers in parallel, each with one focus (security, test coverage, framework, quality) and a clean context. Critical or high findings get fixed, medium or low get fixed or dismissed with a written reason

That review doesn't replace the human, it changes where the human looks. I wrote more about that in [manual code review does not scale anymore (and what to do instead)](/en/blog/manual-code-review-does-not-scale-anymore-and-what-to-do-instead/)

## Who does what

One agent doing everything works until the context fills up. Then it forgets old decisions and starts "improving" what was already right. So every agent has a fixed role, and work that touches many independent files goes to subagents, each with a clean context window

- **Orchestrator (Opus or Fable):** owns the plan, the spec, the decisions and the integration. And it barely touches code. It breaks down the work, writes the briefs, dispatches and checks what comes back
- **Test writer (Sonnet, effort `high`):** writes the red tests from the matrix, and it's the only one that touches `e2e/**` and the fixtures. It's a different agent on purpose: whoever isn't going to implement has no bias toward writing a test that's easy to pass
- **Devs (Sonnet, effort `medium` or `low`):** each gets one slice with an exact brief, and turns it green without touching the tests. A mechanical slice, like a rename or a config tweak, drops to `low`
- **QA (Sonnet):** only reports. Runs the deep loop scenarios and classifies each finding
- **Specialists (Sonnet or Opus, effort `high`):** hard debugging, architecture, UX. They analyze and propose, but never edit
- **Reviewers (Sonnet):** run at the end, in parallel, each with one focus and a clean context

Every agent is a versioned file with its model, effort level and **the tools it's allowed to use**. Opus orchestrates and decides, Sonnet executes: judgment is expensive, well-specified execution doesn't need to be. And no subagent goes above `high`, because maximum effort on a well-specified task just burns tokens thinking about what the brief already answered

The orchestrator touching little is what keeps it useful. If it writes the tests, implements and reviews by itself, its context window fills up with implementation details and it loses exactly what only it has: the view of the whole plan

Subagents are also a context engineering tool. Each one starts with a clean window, spends its own context reading files and running tests, and sends only the result back to the orchestrator. The orchestrator's window is saved for what matters: the plan and the decisions. A reviewer with fewer declared tools also starts the session much lighter, because every tool definition costs tokens

A dev's brief is what makes a slice come back right the first time. It always has the same shape:

```md
Slice: <slice-name>
Turn green: e2e/specs/<feature>/<flow>.spec.ts
Keep green: e2e/specs/<feature>/**
Never touch: e2e/**, fixtures, mock-server/**
Read first: docs/<feature>/spec.md (matrix rows, decisions)
Layer: <where the code lives and what it may import>
Verify: npm run gate + the spec above against the production build
Report: changed files, specs run and result, open questions
```

If the dev thinks a test is wrong, that comes back as a question to the orchestrator, which checks the source of truth and, if needed, dispatches the test writer to fix it. Nobody "adjusts" a test to make it pass

QA puts each finding into a bucket:

- **BUG:** the app differs from the matrix in behavior, content, call or event. Becomes a red test and a fix
- **INTENDED:** a difference a document already decided, and it has to cite which one. INTENDED without a citation is a BUG
- **SPEC:** behavior that exists and was missing from the matrix. Becomes a new row and a new test
- **UPSTREAM:** the cause is in an external service, and it becomes a ticket for whoever owns it

These buckets end the "is this a bug or not" discussion: every finding has a known destination

## One round of the loop

```txt
┌─► QA runs the deep loop scenarios
│     ▼
│   report with each finding in a bucket
│     ▼   (INTENDED, UPSTREAM: logged, no code)
│   BUG and SPEC: orchestrator checks the source of truth
│     ▼
│   test writer writes the red test, orchestrator closes the brief
│     ▼
│   dev turns it green without touching the test and runs the gate
│     ▼
│   orchestrator integrates and runs the suite on the production build
│     │
└─────┤  new finding? one more round
      ▼  two clean rounds in a row
   wrap-up
```

Each round's report is saved, so the next one knows what's new and what's already been solved. That's what makes "two clean rounds" a verifiable fact, and not a feeling

## A test that locks the behavior

The mock server uses real captured responses, validated by the service's schema, and it compares the request body. A wrong payload doesn't get a right response

That unlocks one of the most useful tests I know: **checking the exact sequence of calls**. Order, count and payload:

```ts
test('adding an item writes once, then recalculates the total once', async ({ page, mockServer }) => {
  await page.goto('/orders/new')
  await page.getByRole('button', { name: 'Add item' }).first().click()
  await expect(page.getByTestId('order-total')).toBeVisible()

  // Order defined in the spec: the write first, then a single recalculation
  expect(mockServer.calls().map((call) => `${call.method} ${call.path}`)).toEqual([
    'POST /orders/items',
    'GET /orders/total',
  ])
})
```

An "optimization" that skips or duplicates a call breaks this test right away. And notice the `getByRole`: testing through the accessibility tree is the same way the agent sees the page when it drives the browser, so semantic HTML helps the user, the test and the agent at the same time

See how everything you learned before still matters?

## Documentation is the system's knowledge

Documentation has always had a problem: nobody reads it and nobody updates it

On the other hand, in an AI First process it gets a guaranteed reader and needs to be constantly updated. **Every agent that picks up this code later will read what was written, and act on it**

That completely changes its weight

Outdated docs used to be just useless, now they're dangerous: the agent confidently follows something that's no longer true

Every phase produces a document that is the input for another one:

- **Specs:** what the feature does, the decisions and a table linking each matrix row to a test
- **ADRs:** the decisions that are expensive to reverse, with the why. That's what stops an agent from undoing in 5 minutes a choice that took a week of discussion
- **Scope log:** what was left out on purpose, who decided and when. Without it, months later, an agent "fixes" an absence that was a decision
- **Loop reports**, round by round, for anyone who wants to follow what happened and refine the process
- **Handover notes**, so the next session or the next person can pick it up cold

And documentation follows rules as strict as the code:

- **Everything has exactly one place.** "Always X" and "never Y" go into rules. A decision with a lasting trade-off goes into an ADR. A summary of what was done and a list of changed files never become an ADR: that's the commit and the PR, read once at review time
- **ADRs only at key moments:** adopting or dropping a dependency, changing an architecture pattern, recording a constraint someone would break without knowing. A decision that reverses another one rewrites the old ADR, instead of stacking a second one that contradicts the first. Two conflicting ADRs confuse an agent much more than a person
- **A new convention changes the rule in the same PR.** A convention that only exists in the agent's memory or in the chat history doesn't exist for the next one

Documentation stops being end-of-project bureaucracy and becomes the system's long-term memory

## Design system as the shared foundation

All of this applies to a place I think is still underrated: the design system

With agents, the design system stops being just a component library and becomes **the foundation that designers and agents build from**. Written tokens, components and usage rules become context, the same way the spec becomes context for the code

In [Claude Design](https://claude.ai/design) I built a design system and, on top of it, a prototype of a complete flow. With the same loop: one agent built, another checked the screenshots against the design system, round after round, until there were no differences left

What interests me here isn't the tool itself, it's who gets to prototype

Product, design and business validate an idea without getting in the dev queue, and they come to the conversation with something clickable, built from the same pieces that exist in the code. The conversation moves from "what should this look like" to "what's missing for this to go to production"

And the role of whoever designs changes just like mine did. Instead of drawing every screen from scratch, they take care of the system and validate what comes out of it

But it only works with the same discipline as everything else: a poorly documented design system produces inconsistent prototypes with the same confidence an agent without guard rails produces wrong code

## Agents, skills and rules: a system I refine every day

None of this lives in a prompt I paste every time. It lives in a layered system, and it's never finished

- **Global:** guidelines that apply to any project
- **Team:** a shared plugin with agents, skills and rules per stack. Each dev installs the one for their stack and gets updates like any other dependency
- **Project:** what only applies there, versioned in the repo
- **Memory:** only what the repo doesn't record, always with the why, so the agent applies it to similar cases and not just identical ones

**Skills** are versioned procedures: phases, checklists, exit conditions and a list of phrases that signal a gate is about to be skipped ("this case is rare", "that can wait", "the test is too strict"). They use **progressive disclosure**: only the description sits in the context window, and the body loads when the task calls for it

The catch is that a skill depends on the model deciding to load it, and sometimes it doesn't. That's why a mandatory code pattern never lives only in a skill

**Rules** are small and mandatory. There's only one test for a rule to exist: **is it mandatory, and would a competent dev get it wrong without being told?** If the linter already catches it, or it's the obvious default, it goes. Every line of a rule costs tokens on every task, forever

That's where **conditional rules** help. Each one declares a precise condition, like the file extension, a pattern in the content and a library in `package.json`, and a hook injects the rule at most once per session, only when the task touches that subject. The form rule only comes in when the agent opens a form that uses that library. Rules by folder path are better than nothing, but they load too much and waste tokens

The rule that's worth gold is the one that protects the code from the agent's good intentions. In TanStack Query, the first-load skeleton uses `isPending` and not `isLoading`, because on a disabled query `isLoading` is `false`:

```tsx
const { data, isPending } = useQuery(totalQueryOptions(customerId))

// Disabled until the session fills customerId: isLoading stays false, isPending does not
if (isPending) return <TotalSkeleton />
```

Every agent that passes through there wants to "fix" it to the pattern it knows, so the rule is written with the reason right next to it

And the refining is simple:

- **Corrected an agent twice for the same thing?** It becomes a rule, a line in a skill or a memory
- **A gate got skipped with a new excuse?** The excuse goes into the red flags list
- **A rule never made a difference again, the model got updated or the linter started catching it?** It goes
- **An agent did something outside its role?** It loses the tool that allowed it

Skills get tested like code too: I run a subagent doing the task without the skill, see where it fails, write the skill aimed at that failure and run it again. A skill that doesn't change behavior is just text burning tokens

## Token cost is an architecture decision

An agentic loop without cost control is a credit card with no limit

And almost all the cost comes from context, not from generated code: every round rereads files, runs tests, gets logs and loads rules and tool definitions again

So cost goes into the harness design from the start:

- **Model routing:** the strongest model plans, orchestrates and decides. Well-specified execution goes to a smaller model, and mechanical tasks that only return counts go to the smallest one
- **Effort per call:** every agent and every dispatch declares its effort level. Renaming a file doesn't need long reasoning, debugging a race condition does
- **Minimal context per role:** a reviewer with only the tools it uses starts the session with a fraction of the context of an agent with every tool. Multiply that by every reviewer in parallel, on every round
- **Prompt caching:** what stays fixed at the start of the context (instructions, global rules, tool definitions) gets cached and is much cheaper on the following calls. What changes all the time goes at the end, so it doesn't invalidate the cache
- **Lean output:** a gate that prints only what failed, an agent that sends back only the result and not the whole log. A green test doesn't need 400 lines of output in anyone's window
- **Context compaction with state in files:** a long session summarizes its own history, and summaries lose detail. Since the loop's state lives in the documents, the next round rereads what matters instead of trusting the summary
- **Caps:** a review round with several agents in parallel and no limit burns millions of tokens. That's why review got a cap on rounds, and whatever is left after it comes to me as a list

And most importantly: **cost is a metric, not a feeling**

Tokens and time per task, per phase and per agent show where the loop is expensive. A deep loop round that costs a lot and finds little is a sign the spec was weak, not that the deep loop needs to run more

## Sizing the loop

Not every change deserves the full loop. Running spec, decisions and deep loop to change a piece of copy is burning tokens and patience, and disproportionate process teaches the team to skip process

The yardstick is risk, not size:

- **Trivial:** changes nothing anyone can observe. The gate is enough
- **Light:** changes behavior within contracts that already exist. Needs a written definition of done and a test that fails first, without the ceremony
- **Full:** touches what's expensive to undo. A new contract, a performance decision, a whole feature

Moving up a level midway is judgment, not a planning failure. What I don't accept is the opposite: moving down a level because the deadline got tight

## Where I come in

With phases, roles and guard rails defined, the loop runs on its own for quite a while. I come in on what's strategic:

- **Scope:** what goes in and what's left behind. Only I remove a row from the matrix
- **Prioritization:** what's essential for the product and what can stay in the backlog for now. I decide what's worth spending tokens on now and what's worth saving for later
- **Architecture:** if an agent thinks the structure is wrong, it proposes and waits. A big refactor never rides along on a task
- **Risk:** what can be written in each environment. And no agent ever types a credential
- **Budget:** how many agents, how many rounds, which model
- **Review:** the final PR goes through me, but not line by line. I read the docs and spec diffs, the decisions and what the reviewers dismissed. It's the same idea as [manual code review does not scale anymore](/en/blog/manual-code-review-does-not-scale-anymore-and-what-to-do-instead/): human review goes where the decision was made

Course corrections come as short messages along the way, and the loop absorbs them without starting over, because the state lives in the documents and not in an agent's memory. If the correction holds forever, it doesn't stay in the conversation: it becomes a rule, a skill or a memory before the session ends

## It's not all roses

- **Setting it up takes work.** Spec and tests before code feel slow, and they pay off when a difference is discussed with evidence instead of opinion
- **Tokens cost money.** Routing, caching and caps hold the spend, but they don't zero it. A full loop on a big feature is expensive, and it needs to be worth what it costs
- **The system needs maintenance.** An outdated skill is worse than no skill at all
- **A green can lie.** A test running against the dev server, or against a build without the change, passes without proving anything

## Conclusion

AI First, for me, is this: guard rails that make sure what comes out of the loop is reliable, and documentation that makes sure what comes out of the loop is understandable and stays as knowledge for the next people and the next agents

It only works with the author by its side: me, a mere human dev who, even at peak inadequacy, still has to make decisions and own them

After all, none of this moves the responsibility anywhere else

The one responsible for every delivery is still **YOU**

## Worth reading too

- [Manual code review does not scale anymore (and what to do instead)](/en/blog/manual-code-review-does-not-scale-anymore-and-what-to-do-instead/)
- [AI stack that will level up your work as a dev](/en/blog/ai-stack-that-will-level-up-your-work-as-a-dev/)
