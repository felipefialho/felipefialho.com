---
title: 'Como foi reconstruir meu blog em 2026 usando Astro e componentes nativos'
date: 2026-10-07 00:00:01
description: 'Lighthouse 100, uns 5 KB de JS na home e zero framework no navegador, sem React e sem bundle pra renderizar texto 🚀'
tags: ['performance', 'html', 'css', 'front-end', 'ai']
---

7 anos depois da [última grande atualização](/blog/como-foi-desenvolver-meu-novo-blog-usando-o-gatsbyjs), esse site tá de cara nova, chegando na **quarta versão** desde 2013

A regra que guiou tudo foi simples: se o navegador já faz, eu não reimplemento. Esse post conta o que isso virou na prática, os números que saíram dela, como foi construir tudo com AI, o que deu errado e o piano que voltou de brinde

## Um pouco de história

A linha do tempo desse site é mais ou menos essa:

- **2013:** [Docpad](https://docpad.bevry.me/), Less, Bootstrap e Grunt
- **2015:** [Harp](http://harpjs.com/), Jade, Stylus, BEM e Gulp
- **2019:** [Gatsby](https://www.gatsbyjs.com/), React, GraphQL, Styled Components e Algolia
- **2026:** o que você tá vendo agora

Em 2019 eu disse que a performance do Gatsby era "simplesmente espetacular". E pra época era mesmo!

Só que software parado não fica parado, vai morrendo aos poucos...

Quando finalmente abri o projeto com calma, encontrei Gatsby 2 e React 16 com metade dos plugins `deprecated`, uma caralhada de bundles JavaScript pra renderizar... texto, e um Google Tag Manager injetado **fora do repositório** disparando um Universal Analytics que parou de coletar dados em julho de 2023

Isso mesmo: **não tava medindo nada** fazia anos e eu nem sabia 😅

## Por que performance importa (ainda mais) em 2026

Performance virou aquele assunto que todo mundo concorda que é importante, mas que sempre fica pra depois. E em 2026 eu acho que isso é um erro cada vez mais caro

**A web é mobile, e o mobile do mundo real é modesto.** Às vezes a gente desenvolve num MacBook com fibra, mas muita gente tá num Android intermediário, no 4G, com franquia de dados. Cada KB que eu mando é pago por essa pessoa, em tempo e às vezes em dinheiro

**JavaScript é o byte mais caro da página.** Uma imagem de 100 KB é baixada e desenhada. 100 KB de JavaScript são baixados, parseados e compilados (em parte fora da main thread) e executados na main thread, a mesma que precisa responder quando você toca na tela. Num aparelho modesto, essa diferença é gritante

**O Google mede isso.** As Core Web Vitals entraram como sinal de ranking em 2021, um entre vários, e desde março de 2024 o INP mede se a página responde rápido a cada interação, não só no primeiro clique. Página lenta pode aparecer menos

**E o clique ficou mais raro.** Com buscadores respondendo direto com AI, menos gente chega até o site. Quem chega merece uma página que abre na hora, não um spinner

Então a meta aqui foi clara: **chegar no Lighthouse 100**

## A cara nova: um terminal

O visual partiu de uma ideia simples: esse é o blog de alguém que passa o dia num terminal, então por que não parecer um?

- **Escuro por padrão**, com um tema claro derivado dos mesmos tokens de cor
- **[Geist](https://vercel.com/font) e Geist Mono**, a mono pra tudo que é "máquina": datas, tags, caminhos e comandos
- **Ciano como luz de tela** pros links e destaques, e um amarelo pra citações e notas
- **O logo é um caminho:** `~/felipefialho`. Dentro de um post ele continua, tipo `~/felipefialho/blog/nome-do-post`
- **A foto** ganhou uma máscara ciano com scanlines, que some no hover e mostra a foto em cor

E o 404 virou um terminal de verdade

Mostra o caminho que você tentou acessar, tem comandos pra clicar (`cd blog`, `cd labs`, `sudo`) e, se o endereço for parecido com o de algum post, sugere o link certo com um "você quis dizer...?". Quem responde é o saudoso Cartman que desenhei [só com CSS em 2012](https://codepen.io/felipefialho/details/qzDCJ), o projeto que começou toda minha caminhada nos open source da vida

## Componentes nativos, na prática

Depois de escrever um post inteiro sobre [componentes nativos em 2026](/blog/componentes-nativos-em-2026-o-que-o-html-e-o-css-ja-fazem-sozinhos), eu tinha que usar isso aqui também, né?

### A busca é um `<dialog>`

O botão de busca do topo não tem nenhum JavaScript pra abrir o modal. É só invoker command, que é Baseline newly available desde dezembro de 2025:

```html
<button type="button" commandfor="search" command="show-modal" aria-label="Buscar">
  ...
</button>

<dialog id="search" closedby="any">
  ...
</dialog>
```

Foco, `Esc`, backdrop e top layer vêm de fábrica. O `closedby="any"` só acrescenta o fechar ao clicar fora, e ainda não é Baseline: Chrome, Edge e Firefox suportam, o Safari não. Onde ele é ignorado, o `Esc` continua fechando o modal. O único JavaScript é o atalho `⌘K`, em poucas linhas. E o índice de busca do [Pagefind](https://pagefind.app/) só é baixado quando você abre o diálogo. Quem não busca não paga nada por ela

### Os cookies são `popover` e `<dialog>`

O aviso de cookies é um `popover="manual"`. Por viver no top layer, ele não empurra nada da página: layout shift zero

Já as preferências abrem num `<dialog>` modal, com switches que são checkboxes nativos:

```html
<button type="button" commandfor="consent-prefs" command="show-modal">Preferências de cookies</button>

<dialog id="consent-prefs" closedby="any">
  <input type="checkbox" switch name="analytics" />
</dialog>
```

O link do rodapé reabre as preferências sem nenhuma linha de JavaScript. Só o Safari desenha o `switch` como interruptor, nos outros navegadores aparece um checkbox comum, que funciona igual. E recusar é tão fácil quanto aceitar, já na primeira tela

### O progresso de leitura é CSS

A linha ciano no topo dos posts acompanha a leitura com scroll-driven animations. E o "34% lido · faltam 7 min" do cabeçalho também é CSS: um `@property` do tipo inteiro animado pelo scroll, virando texto com `counter()`:

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
  content: counter(pct) '% lido · faltam ' counter(left) ' min';
}

/* Numa regra separada, você vai entender o porquê lá embaixo */
.read-live {
  animation-timeline: scroll(root);
}

@keyframes read-progress {
  to {
    --read: 100;
  }
}
```

Sem listener de scroll, sem `requestAnimationFrame`. Fica tudo dentro de um `@supports`, então quem não suporta vê só o tempo de leitura. Isso inclui o Firefox, onde scroll-driven animations ainda ficam atrás de uma flag. No Chrome e no Safari 26 funcionam por padrão

### E mais um monte de coisa

- O índice dos posts é um `<details>` no mobile e vira sticky no desktop
- A navegação entre páginas tem cross-document view transitions, com uma linha de CSS: `@view-transition { navigation: auto; }`. O título do post na home vira o título da página do post. Funciona no Chrome, no Edge e no Safari, e o Firefox só navega normal
- O prefetch das páginas usa speculation rules, um JSON dentro de um `<script type="speculationrules">`. Só os navegadores Chromium entendem, nos outros o script é ignorado sem erro
- O tema claro e escuro usa `light-dark()` nos tokens de cor

### Embeds que só carregam no clique

Esse foi o detalhe que eu mais curti

Os posts antigos têm dezenas de vídeos do YouTube e CodePens. Cada um desses iframes carrega centenas de KB e faz requisição pra terceiros assim que aparece na tela

Agora todos viram um `<iframe>` com `srcdoc`: um HTML mínimo com um botão de play. O vídeo de verdade só carrega quando você clica:

```html
<iframe
  src="https://www.youtube-nocookie.com/embed/ID?autoplay=1"
  srcdoc="<a href='https://www.youtube-nocookie.com/embed/ID?autoplay=1'>▶ Assistir vídeo</a>"
  loading="lazy"
  title="Vídeo do YouTube"
></iframe>
```

O `srcdoc` tem prioridade sobre o `src`, então nada é baixado até o clique navegar o iframe. Zero JavaScript, zero requisição pra terceiros antes da hora

## Os números

Medindo com o Lighthouse, no preview local e no site em produção. A nota oscila um ou dois pontos de uma execução pra outra:

- **Home, Labs e posts:** 100 em performance, acessibilidade, boas práticas e SEO, no mobile e no desktop
- **Em todas as páginas:** CLS 0 e Total Blocking Time de 0 a poucas dezenas de milissegundos
- **LCP:** entre 1,2 s e 1,8 s no mobile e menos de meio segundo no desktop

E o que fez diferença pra chegar lá:

- **Zero framework no navegador.** O [Astro](https://astro.build/) gera HTML estático e só manda JavaScript quando você pede. Todo o JavaScript da página inicial soma uns **5 KB** (tema, consentimento e o atalho da busca), e o HTML inteiro tem 15 KB com gzip
- **Fontes enxutas.** Geist e Geist Mono com subset pro latin somam 52 KB. Duas famílias, e ainda menos do que a única fonte da versão anterior
- **CSS inline.** São poucos KB por página, então ir direto no HTML elimina uma requisição que bloqueava a renderização
- **Imagens antigas sem mexer nelas.** O blog tem 82 MB de imagens desde 2013, incluindo um PNG de 17 MB (!!). Nenhuma foi renomeada ou convertida: em produção elas passam pelo Image CDN do Netlify, que entrega AVIF ou WebP no tamanho certo, com `width` e `height` pra não ter layout shift
- **Nada de terceiros antes da hora.** Nenhuma requisição externa acontece antes de você interagir com a página

Também tirei as capas dos posts. Elas eram o maior elemento da tela no mobile, empurravam o texto pra baixo e cada uma tinha uma proporção diferente. No lugar, cada post ganha um card social gerado no build com o [Satori](https://github.com/vercel/satori), com título, data, tempo de leitura e tags

## Analytics sem destruir performance

Esse era desafiador

A solução foi carregar **no momento certo**: o Google Analytics 4 só carrega **depois** que você aceita os cookies, e o Google Tag Manager saiu. Menos script antes do consentimento é menos peso na página e menos dado coletado antes da hora, e as duas coisas andam juntas

## O resto da mudança

- **Stack:** Astro + TypeScript + CSS puro, sem pré-processador e sem CSS-in-JS. Em 2019 eu passei um post inteiro explicando Styled Components. Em 2026 o CSS nativo tem aninhamento, `light-dark()` e container queries, e eu não precisei de nada daquilo
- **Inglês:** 23 posts foram traduzidos pro inglês, todos de 2024 pra cá mais alguns clássicos. Eles ficam em [/en/](/en/)
- **URLs:** os 73 posts continuam nos mesmos endereços, e os redirects de 2013 seguem funcionando

## 100% vibe coding, obviamente

Igual no CSS Components: **não escrevi nenhuma linha de código desse projeto na mão**

Mas vibe coding não é pedir "faz um blog bonito" e torcer. Como falei no post sobre [engenharia de contexto](/blog/ai-e-engenharia-de-contexto-em-um-projeto-do-zero-com-vibe-coding), o trabalho é dar pra AI **a informação certa, no formato certo e na hora certa**

### 1. UI e UX resolvidas antes de tudo

Antes de qualquer código, as decisões de UI e UX foram resolvidas no Claude Design: o visual, as páginas, os estados de cada interação e até o favicon. Quando a implementação começou, o "como deve ficar" já tava respondido, e a AI não precisou adivinhar nada

### 2. Decisões antes do código

O design não respondia tudo. Então, no modo plan, as perguntas que só eu podia responder vieram antes de qualquer linha:

- O design é só escuro, mas tem botão de tema. E o tema claro? Derivar dos mesmos tokens
- O que acontece se o navegador não suporta scroll-driven animations? Mostrar só o tempo de leitura
- O que acontece se o navegador não suporta speculation rules? Ignorar o script sem erro

E assim vai, cada decisão de trade-off, cada regra de projeto, cada escolha de tecnologia foi feita antes do código

É o mesmo princípio [que falei nesse post sobre stack AI](/blog/stack-com-ai-que-vai-elevar-seu-trampo-como-dev): nada avança com decisão em aberto. Se alguma coisa fica pra depois, isso precisa estar escrito

### 3. Uma spec pra todo mundo

Tudo isso virou um único arquivo de especificação: a tabela de tokens nos dois temas, as regras do projeto (performance primeiro, componentes nativos, acessibilidade, bilíngue) e uma seção por página apontando pra referência do design. Todos os agentes partiam do mesmo contexto, então ninguém inventava uma versão própria do que era pra fazer

### 4. Opus orquestra, Sonnet executa

A execução seguiu a divisão que já uso no dia a dia: Opus planejando e orquestrando, Sonnet escrevendo código

Primeiro, **uma** fundação sequencial: fontes, tokens, header e footer, porque todo o resto depende disso. Depois, cinco subagents em paralelo, cada um dono dos seus arquivos: home, post, Labs e 404, cookies e busca, e marca (favicon e cards de share)

Rodar agentes em paralelo no mesmo repositório exige regra de convivência. Cada um tinha sua porta de servidor, ninguém rodava o build completo (um apagaria o do outro) e os arquivos compartilhados, como os dados do Labs, eu mudei **antes** de disparar os agentes, pra ninguém brigar pelo mesmo arquivo

### 5. Loop visual até bater com o design

Cada agente tirava screenshot da sua página com o Playwright e comparava com o design: primeiro no desktop, depois no celular e no tema claro. E repetia até bater

Ainda assim, o olho humano pegou coisas que a comparação não pegou

O hover das linhas de posts empurrava o texto 16 px pro lado. Isso vinha do próprio design, mas na prática incomodava. Virou um `box-shadow` que pinta o fundo sem mover nada

### 6. Testes em loop e self-review

Os testes e2e rodaram em loop, cada um três vezes seguidas pra caçar teste instável, até ficar tudo verde. E seguindo as minhas `rules` de e2e: page objects, locators por papel acessível (`getByRole`) e nada de `waitForTimeout`

As `rules`, aliás, fazem metade do trabalho. Coisas como regras de arqitetura, padrões de código e tudo que preciso garantir para ter qualidade são escritas uma vez e valem pra todos os agentes, como falei no post sobre [skills e rules](/blog/stack-com-ai-que-vai-elevar-seu-trampo-como-dev)

## Bônus: o piano também voltou

Enquanto eu revivia o CSS Components, peguei embalo e ajustei outro projeto: o [Piano](https://piano.felipefialho.com), um piano que dá pra tocar direto no navegador

Ele tava na UTI: webpack 5 + Pug + Stylus + Babel, **113 vulnerabilidades** no `npm audit` e sem deploy desde outubro de 2023, porque a publicação automática do Netlify tava travada

Virou Vite + TypeScript + CSS puro, com testes no Vitest e uma verificação num navegador de verdade conferindo que cada uma das **24 notas** toca o sample certo. O visual virou o estojo do instrumento: laca branca no modo claro, ébano no escuro e uma faixa de feltro vermelho acima das teclas

E finalmente arrumei o teclado. O mapeamento antigo começava no **Caps Lock**, que no macOS liga e desliga em vez de ficar pressionado 😂 Agora segue o layout de tracker, o mesmo do FL Studio, e usa a **posição física da tecla** em vez do caractere, então funciona em qualquer layout de teclado:

```ts
const key = document.querySelector<HTMLElement>(`[data-code='${event.code}']`);
```

E sim, o Piano usa JavaScript. Áudio no navegador precisa de JS, não tem mágica de CSS que resolva isso. Componente nativo não é dogma, é usar cada ferramenta pro que ela faz bem

## Conclusão

Em 2019 eu terminei o post dizendo que ele ficou longo e mesmo assim ficou curto. Continua valendo 😅

Se eu tivesse que resumir esse projeto numa frase seria essa: **foca em performance**

E performance não é luxo. É respeito por quem tá do outro lado da tela, no celular modesto, no 4G instável, com pouco tempo e pouca paciência

- [Código do blog no GitHub](https://github.com/felipefialho/felipefialho.com)
- [Piano](https://piano.felipefialho.com) ([código](https://github.com/felipefialho/piano))
- [O post de 2019 sobre o Gatsby](/blog/como-foi-desenvolver-meu-novo-blog-usando-o-gatsbyjs)
- [Componentes nativos em 2026](/blog/componentes-nativos-em-2026-o-que-o-html-e-o-css-ja-fazem-sozinhos)

Até a próxima versão, lá por 2033 🥳
