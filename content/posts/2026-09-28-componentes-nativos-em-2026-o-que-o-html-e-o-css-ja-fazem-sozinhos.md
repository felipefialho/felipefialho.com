---
title: 'Componentes nativos em 2026: o que o HTML e o CSS já fazem sozinhos'
date: 2026-09-28 00:00:01
description: 'Modal, dropdown, tooltip, carrossel e muito mais sem nenhuma linha de JavaScript, lado a lado com as gambiarras de 2014 😁'
image: /assets/2026-09-28-cover.jpg
tags: ['css', 'html', 'componentes', 'front-end', 'performance']
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

Em 2014 escrevi um post aqui no blog perguntando se
[é possível utilizar componentes desenvolvidos apenas com CSS](/blog/e-possivel-utilizar-componentes-desenvolvidos-apenas-com-css).

Na conclusão eu disse que **SIM** e soltei essa frase:

> Não duvido que isso possa ser uma tendência daqui para frente.

12 anos depois voltei nesse projeto e posso dizer que passei no filtro do tempo. Tanto o combo CSS + HTML quanto o navegador evoluíram e agora conseguimos fazer tudo isso (e muito mais!) **nativamente**, de forma extremamente performática, acessível e com animações de brinde.

Então esse post é sobre isso: o que o HTML e o CSS já fazem sozinhos em 2026, usando o projeto de 2014 como prova, componente por componente.

## Um pouco de história

Tudo começou lá em 2012 com um [Cartman feito só com CSS](https://codepen.io/felipefialho/pen/qzDCJ). Brincadeira boba, mas foi ali que comecei a buscar no CSS soluções que dessem pra usar de verdade em projetos.

Em 2014 isso virou o [Pure CSS Components](https://css-components.felipefialho.com): 6 componentes de interface sem nenhuma linha de JavaScript.

- Carrossel
- Collapse/Accordion
- Dropdown
- Modal
- Tab
- Tooltip

Tudo feito com `checkbox` e `radio` escondidos (e no começo também com o pseudo-seletor `:target`). O estado de checado e não checado era o nosso "state management" da época.

E o melhor (!!): muita gente **realmente** usou isso em produção em projetos reais. No GitHub ele chegou a quase 700 estrelas, o que era muita coisa pra um projeto que nasceu de uma brincadeira e da curiosidade de um dev ainda no começo de carreira explorando as possibilidades.

Agora o projeto foi reconstruído do zero com uma ideia bem simples: cada componente de 2014 foi preservado exatamente como era e aparece **lado a lado com a sua versão nativa de 2026**. É tipo um "antes e depois" de como os navegadores e o CSS evoluíram.

## Hack de 2014 vs. nativo de 2026

### Collapse

Em 2014 era um `<input type="checkbox" hidden>` com um `<label>` e o seletor de irmão `~` pra mostrar o conteúdo. Se quisesse accordion, trocava pra `type="radio"` com o mesmo `name`.

[Em 2021 já tinha falado aqui sobre os fodões `<details>` e `<summary>`](/blog/html-criando-um-componente-de-collapse-nativo-com-as-tags-details-e-summary), mas de lá pra cá eles ficaram ainda mais poderosos.

Agora o accordion exclusivo (onde só um fica aberto por vez) é só colocar o mesmo `name` em todos os `<details>`:

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

Percebam que é literalmente o mesmo truque do `radio` com `name` de 2014, só que agora o próprio HTML faz isso por você 😁

E a animação de abrir e fechar, que sempre foi o calcanhar de Aquiles do `<details>`, agora dá pra fazer com o pseudo-elemento `::details-content`:

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

O `interpolate-size: allow-keywords` é o que permite animar até `auto`, coisa que a gente sonhou por anos. E percebam o `@supports`: se o navegador não conhecer o `::details-content`, o collapse continua funcionando, só que sem animação. Mesma coisa pra quem prefere menos movimento, graças ao `prefers-reduced-motion`.

### Modal

No [primeiro post de 2014](/blog/e-possivel-utilizar-componentes-desenvolvidos-apenas-com-css) o modal usava o `:target`, mas a versão que ficou preservada no site é a com `checkbox` escondido e um monte de `<label>` apontando pra ele:

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

O botão que abre é um `<label>`, o fundo escuro que fecha é um `<label>`, o "×" é um `<label>`... tudo pra marcar e desmarcar um único `checkbox` 😅

Funcionava, mas foco, `Esc` e leitor de tela ficavam por conta da sorte.

Agora temos o `<dialog>` com **invoker commands**:

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

O `commandfor` aponta pro `id` do `<dialog>` e o `command="show-modal"` diz o que fazer. O `closedby="any"` faz o modal fechar clicando fora ou apertando `Esc`. Foco, backdrop, top layer, tudo de graça.

E pra animar usamos o `@starting-style`, que define o estado inicial do elemento no momento em que ele aparece:

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

O `display` e o `overlay` com `allow-discrete` fazem o `<dialog>` continuar no top layer até o fade de saída terminar. Coisa que em 2014 a gente nem sonhava 😁

### Dropdown

Em 2014 era mais um `checkbox` escondido. Agora é a **Popover API** com `popovertarget` e o posicionamento fica por conta do **CSS anchor positioning**, que prende o menu no botão sem precisar calcular nada.

E a variante de hover, que antes era um `:hover` no CSS, agora usa o `interestfor`.

### Tooltip

O tooltip usa `popover="hint"` junto com `interestfor` e anchor positioning. É o tipo de coisa que por anos a gente instalava uma biblioteca inteira só pra fazer.

### Tab

A versão nativa usa `<details name>` exclusivos organizados visualmente como abas.

Mas aqui preciso ser honesto: sem JavaScript não dá pra implementar o padrão de tabs com navegação pelas setas do teclado. Funciona e é acessível como um grupo de `<details>`, mas não é o padrão completo de tabs.

### Carrossel

O carrossel de 2014 era o mais "criativo" (leia-se: gambiarra). Um `radio` antes de cada item, três pares de `<label>` pras setas e aquele seletor monstruoso com `nth-child` pros indicadores.

Agora é `scroll-snap` pra travar os itens, `::scroll-button()` pras setas e `::scroll-marker` pros indicadores. Tudo gerado pelo próprio navegador.

## Nascidos nativos

Além dos 6 componentes originais, criei uma seção nova chamada **Born native** com 10 componentes que nem tinham versão em 2014, porque simplesmente não dava pra fazer só com CSS:

- **Custom select** com `appearance: base-select` e `::picker(select)`. Sim, finalmente dá pra estilizar o `<select>` 🥳
- **Switch** e **segmented control** usando `:has()`
- **Formulários** com `field-sizing: content` e `:user-invalid`
- **File tree** com `<details>` aninhados
- **Drawer de filtros** com `<dialog>`
- **Header sticky** com scroll-state container queries
- **Índice com scroll-spy** usando `scroll-target-group` e `:target-current`
- **Barra de progresso de leitura** com scroll-driven animations
- **Menu radial** com `sibling-index()`, `sibling-count()`, `cos()` e `sin()`
- **Galeria** com cross-document view transitions

E um detalhe que decidi manter: o botão de tema claro/escuro do site ("lights") usa justamente o truque de 2014, um `checkbox` escondido junto com o `:has()`:

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

Uma homenagem pro projeto original 😁

## E a performance?

A grande questão de usar esse tipo de componente é **performance**. Então rodei o Lighthouse na home do site (build de produção, preview local):

- **Mobile:** Performance 90, LCP 2,9 s, Total Blocking Time 0 ms e CLS 0
- **Desktop:** Performance 100, LCP 0,6 s, Total Blocking Time 0 ms e CLS 0,008
- **Nos dois:** Accessibility 97, Best Practices 100 e SEO 100

E o que vai pro navegador:

- JavaScript: **0 arquivos, 0 KB**
- CSS: dois arquivos, uns 2,3 KB e 1,4 KB com gzip
- Peso total da página: 301 KiB, a maior parte fontes self-hosted e imagens

Pra comparar: só o jQuery 3.7.1 tem 87 KB minificado (uns 30 KB com gzip), e isso antes de qualquer plugin. E a stack típica de 2014 era exatamente essa, jQuery + um plugin pra cada componente.

Mas o ganho não é só de peso. Quando o navegador faz o trabalho:

- Não tem JavaScript pra baixar, fazer parse e executar
- Nada roda na main thread pra controlar estado, abrir e fechar é com o próprio navegador
- `<dialog>` e popover vivem no top layer, então acabou a guerra de `z-index`
- Scroll-driven animations e scroll snapping podem rodar fora da main thread
- Não tem hidratação
- Funciona com o JavaScript desabilitado (e sim, testei)
- Menos código significa menos lugar pra bug se esconder
- Acessibilidade vem de fábrica: foco, `Esc` e light dismiss

Por isso também decidi tirar o Google Tag Manager e os anúncios que o site tinha antes. O site não tem analytics, não tem nada te rastreando, e foi isso que deixou ele **zero JavaScript de verdade**. Se quiser apoiar o projeto, tem o [GitHub Sponsors](https://github.com/sponsors/felipefialho).

Agora, sendo honesto: o HTML da home é grandão, uns 1,37 MB cru (76 KB com gzip). Isso porque o código de cada demo já vem com syntax highlight e fica embutido na página, mesmo com os painéis de "ver código" fechados. O 90 no mobile vem basicamente da primeira pintura de uma página muito longa, não de interatividade. Tá na lista de melhorias, tipo carregar esse código só quando alguém pedir.

## Nem tudo são flores

Vários desses recursos hoje só funcionam em navegadores baseados em Chromium.

Por isso o site lista o suporte de cada funcionalidade e **todo componente tem um fallback utilizável**. Se o navegador não suportar, você não fica com um componente quebrado, só com uma versão mais simples.

Isso não é um "pode usar tudo em produção amanhã". É um retrato de pra onde os navegadores tão indo.

## Zero JavaScript, mas 100% vibe coding

Tem uma ironia bem divertida nessa história toda:

> um projeto que tem como regra **não ter nenhuma linha de JavaScript** só voltou à vida porque eu fiz totalmente no vibe coding

Mas antes preciso fazer uma confissão: eu enrolei **anos (décadas!)** pra mexer nesse projeto hahaha

Software abandonado não fica parado, ele apodrece. Passei quase 10 anos sem fazer nenhuma grande melhoria e, quando finalmente fui olhar com calma, encontrei imagens de placeholder mortas, CDN do rawgit que não existe mais, instruções de instalação via Bower e 39 vulnerabilidades no `npm audit`, sendo 1 crítica. Aquela sensação de abrir uma gaveta que você não mexe faz 10 anos.

Não era só atualizar dependência, era refazer o projeto inteiro, e isso na minha cabeça era coisa de semanas de trabalho que nunca cabiam na minha vida de agora. A semana que vem durou bons anos 😅

Em 2026 fazer esse tipo de projeto é praticamente trivial usando LLMs. Então finalmente refiz **o projeto inteiro, design incluído, em algumas horas** usando meu fiel escudeiro Claudinho Code, naquele rolê de planning, skills, roles e subagents que já abordei em n posts [aqui](/blog/stack-com-ai-que-vai-elevar-seu-trampo-como-dev) e nas redes por aí.

E quero ser 100% transparente aqui: **eu não escrevi nenhuma linha de código desse projeto na mão**. Nem HTML, nem CSS, nem config. Tudo saiu de conversa com o [Claude Code](https://claude.ai/code), numa sessão longa de algumas horas. Meu trabalho foi direcionar, revisar e decidir.

### Como foi na prática

Começou no modo plan: análise da stack antiga e um plano escrito que eu li, ajustei e aprovei antes de qualquer linha de código. Nada de sair vibe codando no escuro.

Depois veio a execução em commits atômicos e PRs, com subagents em paralelo: Opus pra design, pesquisa e partes mais complexas, Sonnet pras tarefas mais mecânicas.

Pra decidir quais componentes "Born native" dava pra fazer sem JavaScript, um subagent usou o MCP do octocode pra vasculhar MDN, web-features e specs, e conferiu o suporte real dos navegadores no [webstatus.dev](https://webstatus.dev). Isso é [engenharia de contexto](/blog/ai-e-engenharia-de-contexto-em-um-projeto-do-zero-com-vibe-coding) na prática: a LLM não chuta, ela vai atrás da fonte.

E cada mudança foi testada num navegador de verdade com Playwright: modo claro e escuro, desktop e mobile, teclado e mouse, e até uma rodada com o JavaScript desabilitado pra provar que o zero JS era real. Somando isso com lint, type-check, build e agents de self-review antes de cada PR.

### A AI errou (e também pegou erro)

Nem tudo foi lindo, e é justamente por isso que esse processo todo existe:

- O CSS de 2014 portado saiu **60% maior**, porque os `rem` eram baseados no velho `font-size: 62.5%` na raiz. Uma rodada de review pegou.
- Um agent cravou uma versão de suporte de navegador que o webstatus.dev provou estar errada
- A cor dos links falhou no teste de contraste e teve que ser corrigida

Nada de outro mundo, dev humano faria merdas muito maiores. A diferença é ter um processo que pega antes de ir pra produção, e ficar de olho continua sendo trabalho meu.

E teve uma que ninguém lembrava: o deploy de produção no Netlify tava **travado desde outubro de 2023**, com a publicação automática desligada. Ou seja, nada ia pro ar fazia anos. O Claude achou isso e destravou pelo CLI/MCP do Netlify. De quebra, as 7 URLs antigas de download de zip agora redirecionam pra uma release no GitHub, pra ninguém cair num link quebrado.

### O que foi decisão minha

No fim quem continua decidindo sou eu, então:

- Astro + pnpm + CSS puro (cheguei a considerar SCSS, mas CSS puro em 2026 dá conta de tudo)
- Manter os componentes de 2014 intactos
- A ideia do "Then vs Now" lado a lado
- Tipografia em minúsculo
- O favicon com emoji de quebra-cabeça 🧩
- Tirar Google Tag Manager e qualquer linha de JS
- Pedir este post e a capa, que também foi gerada na mesma sessão (o texto eu reescrevi quase tudo, claro 😅)

Ou seja, meu trampo aqui **foi exatamente o que se espera de um software engineer em 2026**: sustentar o próprio ecossistema de AI (skills, rules, MCPs e subagents bem configurados), planejar e aprovar o plano antes de qualquer código, decidir arquitetura e stack, revisar cada output desconfiando de tudo que não foi verificado e dizer não quando a sugestão não faz sentido.

Como falei no post sobre [o que esperar de 2026](/blog/desenvolvimento-front-end-e-programacao-em-2026-o-que-esperar-do-futuro), não vamos mais escrever código na unha, mas cada vez mais orientar, revisar e orquestrar. E como sempre digo, independentemente do ferramental que você usa, o responsável por cada entrega segue sendo VOCÊ.

## Conclusão

Em 2014 a gente usava `checkbox` escondido porque era o único jeito. Em 2026 o HTML e o CSS fazem isso nativamente, com acessibilidade, foco e animação de brinde, e sem mandar 1 KB de JavaScript pro usuário.

Aquela "tendência" que eu previ aconteceu, só que o navegador chegou lá antes de mim.

E depois de anos adiando, bastaram algumas horas com uma AI do lado pra esse projeto voltar à vida. Fica a lição pra aquele side project que tá largado aí na sua gaveta também 😉

- [Pure CSS Components](https://css-components.felipefialho.com)
- [Código no GitHub](https://github.com/felipefialho/css-components)
- [O post original de 2014](/blog/e-possivel-utilizar-componentes-desenvolvidos-apenas-com-css)
