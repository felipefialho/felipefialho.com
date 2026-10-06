---
title: 'AI stack that will level up your work as a dev'
date: 2026-02-05 00:00:01
description: 'Let''s make Claude Code work like you have a team of specialists by your side 🚀'
tags: ['ai', 'front-end', 'programming']
translationOf: stack-com-ai-que-vai-elevar-seu-trampo-como-dev
---

Over the last few months, using [Claude Code](https://claude.ai/code) on real projects, I stopped debating whether "AI writes bad code" and went back to the question that really matters: how do I use the current tooling to make my development more efficient and scalable?

The result was a combination that doesn't replace any dev, but lets you develop as if you had a team of specialists next to you.

## Stack (Front-end)

- [TanStack Query](https://tanstack.com/query/latest)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [ShadCN](https://ui.shadcn.com/)
- [React](https://react.dev/)

This combination is no accident. LLMs natively recognize Next.js patterns, understand TypeScript conventions, and know how to work with ShadCN components without needing detailed explanations. They were trained on millions of lines of code from this stack.

Result? Less time fixing generated code and more time focused on architecture and features. Productivity doesn't come from blindly generating code, it comes from generating code you trust and that works.

## Skills vs Rules

### Skills: Your project's DNA

Skills are knowledge specific to your project: your design system rules, the specific Server Components pattern your team uses, the TypeScript naming conventions in your codebase, and your custom folder structure. It's everything that makes your project unique.

The magic of Skills is that they're called on demand. Working on authentication? Claude loads only the auth Skills. Messing with the design system? Only the UI Skills enter the context. This saves a massive amount of tokens and keeps the focus where it matters.

**Auth Skill example:**
- Always use NextAuth.js for authentication
- Sessions must be validated using Next.js middleware
- JWT tokens must expire after 7 days
- Refresh tokens must be stored in httpOnly cookies

### Rules: Universal best practices

Rules are universal and always on: SOLID, clean code, [WCAG](https://www.w3.org/WAI/WCAG21/quickref/) accessibility standards, [Core Web Vitals](https://web.dev/vitals/) optimizations, protection against the [OWASP Top 10](https://owasp.org/www-project-top-ten/). These are the best practices that apply to any project and need to be present all the time.

When you separate them like this, Claude can prioritize: first, it follows your Skills (because they're specific and contextual), then it applies Rules (because they're general). This avoids conflicts and keeps things consistent without wasting tokens.

## MCPs that make a difference

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is Anthropic's standard for connecting Claude with external tools. Here are the essential MCPs:

### Filesystem

The [Filesystem MCP](https://www.npmjs.com/package/@modelcontextprotocol/server-filesystem) lets Claude read, create, and modify your project's files directly. It can do refactors across multiple files, build entire new features, or analyze your whole codebase.

**Use cases:**
- Refactor React components across 10+ files at once
- Create a complete feature structure (components, hooks, types, tests)
- Analyze dependencies between modules

### Context7

Fetches up-to-date, version-specific documentation for libraries and frameworks, injecting it directly into Claude's context. It eliminates answers based on deprecated APIs or methods that no longer exist.

When you ask about the App Router in Next.js 15, [Context7](https://context7.com/) pulls the docs for the exact version you use, not a mix of Pages Router and App Router from old versions.

### Server Memory

It's crucial: it keeps architectural decisions across sessions, remembers project preferences, and stores lessons learned from previous mistakes. Your context doesn't vanish when you close Claude.

The [Server Memory](https://www.npmjs.com/package/@modelcontextprotocol/server-memory) works as long-term memory. If you decided "never use any in TypeScript, always unknown", Claude remembers that in future sessions without you having to repeat it.

### Playwright Extension

Automates end-to-end tests right from the environment, running full scenarios and validating behaviors.

The [Playwright](https://playwright.dev/) integration lets Claude:
- Run e2e tests automatically
- Identify flakiness in tests
- Suggest improvements based on failures

### Sequential Thinking

Structures Claude's reasoning into clear steps, avoiding rushed solutions and ensuring a complete analysis before any implementation.

Instead of jumping straight into implementation, [Sequential Thinking](modelcontextprotocol/server-sequential-thinking) forces Claude to:
1. Fully understand the problem
2. Consider multiple approaches
3. Evaluate trade-offs
4. Only then propose a solution

## Workflow

### Plan mode with Opus

Before coding any feature, I let [Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5) work out the complete strategy: requirements analysis, breaking it into smaller tasks, identifying risks and trade-offs. It thinks about scalability, maintainability, and impact on the rest of the system.

**Example Plan prompt:**
"I need to add a real-time notifications feature. Analyze the current architecture and propose a strategy considering scalability, infra cost, and user experience"

### Agent mode with Sonnet

For fast, efficient implementation. [Sonnet 4.5](https://www.anthropic.com/news/claude-4-5-sonnet) is faster and cheaper while keeping excellent quality. If you have tokens to spare, Opus shines here too, but Sonnet delivers 90% of the quality for a fraction of the cost.

### Committed plans

Each plan only moves forward when it's truly done. No leaving loose ends; if some decision is left for later, that needs to be explicit. Everything documented, everything validated, everything ready to execute.

**Structure of a complete plan:**

```md
- [ ] Requisitos funcionais mapeados
- [ ] Requisitos não-funcionais definidos (performance, segurança)
- [ ] Dependências identificadas
- [ ] Riscos mapeados com mitigações
- [ ] Tasks priorizadas
- [ ] Critérios de aceite claros
```

### ADRs

[Architecture Decision Records](https://adr.github.io/) can be generated with dedicated ADR Skills. Why did we choose Server Components here? Why did we go with React Query instead of SWR? Everything gets recorded, creating institutional memory for the project. This is crucial for keeping consistency and avoiding surprises down the road.

```md
**Exemplo de ADR:**

**Título:** Uso de Server Components para Dashboard

**Contexto:** Dashboard precisa exibir dados de múltiplas APIs com refresh a cada 30s

**Decisão:** Server Components com streaming + React Query para updates

**Consequências:**
- Melhora SEO e tempo de carregamento inicial
- Aumenta complexidade de state management
- Requer Next.js 14+
```

## Specialized subagents

Subagents are focused "personas" that you create manually in Claude Code, via `/agents` or in [configuration files](https://docs.anthropic.com/en/docs/agents/overview). Each one has expertise and context specific to one area. It requires initial setup, but the payoff is worth it.

### Planner

Breaks complex features into executable tasks, identifies dependencies between components, suggests an implementation order that minimizes blockers, and anticipates problems before you start coding.

**Configuration prompt:**
"You are a technical planner specialized in front-end architecture. Your goal is to break features into executable tasks, identify dependencies, and anticipate technical risks"

### Code Review

Goes beyond linting: finds logic problems that tests wouldn't catch, identifies performance trade-offs (that map inside a map that will blow up with real data), and subtle vulnerabilities that would go unnoticed.

The Code Review subagent is configured to focus on:
- Race conditions in async code
- Memory leaks in useEffect
- Hidden N+1 queries
- Security vulnerabilities (XSS, CSRF)

### Refactor

Analyzes existing code with an eye on the future, proposes abstractions that will make upcoming features easier, identifies non-obvious duplication, and suggests patterns that improve testability.

**Refactor agent focus:**
- Identify semantically duplicated code (not just textually)
- Propose abstractions that make extension easier
- Improve testability without breaking functionality

### E2E

Creates complete end-to-end test plans for Playwright, thinks about edge cases you'd forget (what happens if the user hits Enter before the API responds?), coverage of critical flows, and error scenarios.

**Coverage example:**
- Happy paths (sign up → login → main action)
- Edge cases (API timeout, lost connection)
- Error cases (validations, permissions)
- Intermediate states (loading, retry)

### Security

Does a deep analysis of vulnerabilities: SQL injection, XSS, CSRF, sensitive data leaks, insecure configurations, vulnerable dependencies.

The Security agent checks:
- Unsanitized inputs (XSS)
- Direct database queries (SQL injection)
- Tokens exposed on the client side
- Dependencies with known CVEs
- Missing security headers

## Real impact

This structure doesn't remove the need to think, it amplifies your ability to execute. You're still the architect, but now you have a team of specialists on call 24/7 to help.

The generated code has consistent quality. The reviews catch things that would slip through. The refactors follow solid principles. And everything is documented for whoever joins the project later.

Bad code has existed since long before LLMs showed up, there was already monstrous legacy code back when we were still generating bundles with jQuery and script tags. The difference is that now you can use AI to operate at scale on top of a well-thought-out, well-structured stack.

And remember that no matter what tooling you use, the one responsible for each delivery is still YOU.

## Additional resources:
- [Official Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)
- [MCP Server Registry](https://github.com/modelcontextprotocol/servers)
- [ADR Templates](https://github.com/joelparkerhenderson/architecture-decision-record)
