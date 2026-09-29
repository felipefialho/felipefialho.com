---
title: 'Como melhorar performance em aplicações web 📈'
date: 2024-07-16 00:00:01
description: 'Nesse artigo bora ver algumas técnicas pra melhorar o tempo de carregamento focando em métricas de performance.'
image: /assets/2024-07-16-cover.jpg
tags: ['javascript', 'css', 'performance', 'web vitals']
---

## Introdução

Performance é um dos fatores mais críticos para o sucesso de uma aplicação web. Uma aplicação lenta pode afetar a experiência do usuário e diminuir a taxa de conversão. Por isso, é importante que os desenvolvedores estejam sempre atentos à performance de suas aplicações e adotem boas práticas para garantir que elas sejam carregadas rapidamente e funcionem de forma eficiente.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1719320239731577255">
    <p>Sobre performance no Front-end é importante cuidar de coisas como:<br><br>- minificação/otimização<br>- tamanho de imagens<br>- code splitting<br>- lazy load<br>- cache<br>- etc<br><br>Também observe &quot;third-party scripts&quot;, principalmente injetados com GTM e afins. Podem estar silenciosamente drenando…</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1719320239731577255">October 31, 2023</a></figcaption>
</figure>

Performance é um assunto bastante abrangente e envolve diversos aspectos, como tempo de carregamento, tempo de resposta, uso de recursos, entre outros. Neste artigo, vamos abordar algumas práticas comuns para melhorar especialmente o tempo de carregamento de uma aplicação web.

## Métricas de performance

Antes de começar a otimizar uma aplicação, é importante entender quais são as métricas de performance mais relevantes. Existem diversas ferramentas que podem ajudar a medir a performance de uma aplicação web, como o Lighthouse, que é uma ferramenta de código aberto desenvolvida pelo Google que analisa a performance de uma página web e fornece sugestões de otimização.

Algumas das métricas mais importantes que o Lighthouse analisa são:

- **First Contentful Paint (FCP)**: tempo que leva para o primeiro conteúdo ser exibido na tela
- **Speed Index**: mede a rapidez com que o conteúdo acima da dobra é exibido
- **Time to Interactive (TTI)**: tempo que leva para a página se tornar interativa
- **Total Blocking Time (TBT)**: tempo total em que a página está bloqueada e não responde a interações do usuário
- **Cumulative Layout Shift (CLS)**: mede a estabilidade visual da página

Elas são importantes para entender como a aplicação está performando e identificar possíveis gargalos que podem estar afetando a experiência do usuário.

O Lighthouse fornece uma pontuação geral de performance com base nessas métricas, tanto pra desktop quanto pra mobile, embora métricas de mobile sejam mais relevantes para usar como referência.

Esse é um exemplo de métricas desse próprio site que você está lendo esse artigo:

![Métricas de felipefialho.com](./assets/lighthouse-devtools.webp)

Podemos notar que a pontuação de performance é bastante alta, mas ainda há espaço para melhorias especialmente no First Contentful Paint (FCP), que poderia ser otimizado para carregar mais rapidamente.

### INP (Interaction to Next Paint)

Uma métrica que tem ganhado destaque é o Interaction to Next Paint (INP), que mede o tempo que leva para a página responder a uma interação do usuário e exibir o próximo conteúdo na tela.

Ela passou a ser estável a partir de março de 2024, entrando no pacote do [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals?hl=pt-br), que são um conjunto de métricas de performance que o Google considera essenciais para uma boa experiência do usuário.

A principal mudança foi que First Input Delay (FID) deixa de existir sendo substituído pelo Interaction to Next Paint (INP), que é uma métrica mais abrangente e que considera não apenas o tempo de resposta da página, mas também o tempo que leva para exibir o próximo conteúdo.

INP avalia tempo de resposta em algumas situações, como:

- Adicionar itens num carrinho de compras
- Tempo de resposta ao clicar em um botão
- Tempo de resposta ao preencher um formulário, como num login

Importante observar que parte dessas situações dependem do tempo de resposta das APIs e do back-end, então é importante garantir que esses recursos estejam otimizados também.

### DevTools

Além de métricas geradas pelo Lighthouse, a aba "performance" dentro do DevTools fornece bons insumos, mostrando o impacto de cada script no carregamento e uso da aplicação. Além disso checar o "waterfall" dentro da aba "network" também pode ajudar a entender impactos de requisições e downloads de recursos.

![Aba network de felipefialho.com](./assets/network-devtools.webp)

Isso é especialmente útil para entender a ordem de carregamento das coisas e se há requisições que estão bloqueando o carregamento de outros recursos.

### Monitoria contínua

Além de medir a performance da aplicação de forma pontual, é importante monitorar a performance de forma contínua, ferramentas de monitoria como o [Sentry](https://sentry.io/) e o [New Relic](https://newrelic.com/) podem ajudar a identificar problemas de performance em tempo real e fornecer insights sobre o desempenho da aplicação, além de alertar sobre possíveis problemas antes que afetem os usuários.

Outra vantagem é que essas ferramentas baseiam as métricas em dados reais de usuários, o que pode fornecer uma visão mais precisa do desempenho da aplicação em diferentes cenários e condições.

## Melhorando a performance da aplicação

### Minificação/otimização

Minificar e otimizar arquivos CSS e JavaScript é uma prática fundamental que hoje está presente em todos os bundlers, então parte do trabalho já é feito automaticamente.

Mas lembre-se: boa parte do trampo ainda é responsabilidade do desenvolvedor. Evite imports desnecessários e remova código morto para reduzir o tamanho dos bundles e garantir que apenas o código essencial seja enviado para o cliente.

## Recursos bloqueantes

Evite recursos bloqueantes, como scripts que impedem a renderização da página enquanto são carregados.

Scripts não críticos podem ser carregados de forma assíncrona ou adiada, liberando o navegador para renderizar o conteúdo principal rapidamente. Uma prática comum é carregar scripts no final do body, mas isso pode não ser suficiente. Considere adotar técnicas como "defer" e "async" para scripts não críticos, ou até mesmo carregar scripts de forma dinâmica apenas quando necessário.

Também observe "third-party scripts", principalmente aqueles injetados através do Google Tag Manager e afins, que podem estar drenando silenciosamente a performance da sua aplicação.

Uma possibilidade é fazer o carregamento desses scripts através de web workers, que são threads que rodam em background e não bloqueiam a thread principal, permitindo que a aplicação continue respondendo enquanto os scripts são carregados.

A lib [partytown](https://partytown.builder.io/) pode facilitar bastante esse processo, bastando carregar o script dela e configurar o carregamento dos scripts de terceiros dessa forma:

```html
<script type="text/partytown" src="https://example.com/analytics.js"></script>

<script type="text/partytown">
  /* Inlined Third-Party Script */
</script>
```

### Tamanho de imagens

Imagens são um dos maiores vilões de performance.

Sempre que possível, prefira formatos mais leves como WebP ou mesmo JPG otimizado. Além disso, evite carregar imagens em resoluções maiores do que o necessário (isso é absolutamente essencial!) e utilizar lazy loading em imagens fora do viewport.

De nada adianta otimizar toda a parte de CSS e JS se as imagens estão pesadas e demorando para carregar, especialmente porque elas competem com o carregamento de outros recursos em paralelo.

Se o site é estático, considere utilizar ferramentas como o [ImageResizer](https://imageresizer.com/image-compressor) para otimizar as imagens manualmente antes de subir para o servidor, ou automatize esse processo com um plugins de otimização de imagens que podem ser integrados ao seu processo de build.

Frameworks como o Next.js e Gatsby.js já possuem otimização de imagens embutida, facilitando bastante o processo.

Se as imagens são adicionadas através de um CMS, considere adicionar um processo de otimização automática, como o uso de um plugin que otimize as imagens automaticamente ao serem enviadas para o servidor. Algumas ferramentas de CDN e plataforma de nuvem como a [Akamai](https://www.akamai.com/) e a [Cloudinary](https://cloudinary.com/) também oferecem soluções de otimização de imagens automáticas.

E claro que o bom e velho bom senso é parte essencial do processo. Se a imagem está dentro de um card de 100x100 pixels, não faz sentido carregar uma imagem de 2000x2000 pixels, certo? Otimização nenhuma vai resolver isso.

![Gato numa caixa](./assets/gato-numa-caixa.webp) *até cabe mas não é o ideal*

#### Preload

Imagens criticas, utilizadas no primeiro carregamento da página como dentro de um `Hero` ou `Banner`, podem ser pre-carregadas utilizando o atributo `preload`:

```html
<link rel="preload" fetchpriority="high" as="image" href="hero.jpg" type="image/jpeg">
```

Isso vai fazer com que a imagem seja carregada com prioridade antes de ser exibida na tela, melhorando o tempo de carregamento da página e diminuindo o LCP (Large Contentful Paint).

### Latência, cache e CDN (Content Delivery Network)

Usar CDN para servir conteúdo estático é uma prática comum para reduzir a latência e melhorar o tempo de carregamento da aplicação. CDNs são redes de servidores distribuídos geograficamente que armazenam cópias de conteúdo estático, como imagens, vídeos e arquivos CSS e JS, e servem esses conteúdos a partir do servidor mais próximo do usuário, reduzindo a latência e melhorando o tempo de carregamento da aplicação.

Além disso, é importante configurar corretamente (e com todo cuidado!!) o cache dos recursos estáticos para que o navegador possa armazenar cópias locais dos arquivos e evitar fazer requisições desnecessárias ao servidor.

Também é possível configurar funcionalidades como service workers para armazenar recursos em cache e permitir que a aplicação funcione offline, o que pode melhorar significativamente a experiência do usuário.

Lembrando que cache mal configurado pode ser pior do que não ter cache nenhum. Se o cache está muito agressivo, o usuário pode não ver as atualizações mais recentes da aplicação, o que pode ser frustrante, falei disso nesse artigo sobre [as armadilhas do cache](/blog/2024-03-07-evitando-as-armadilhas-do-cache).

### Critical path

O critical path é o caminho que o navegador precisa percorrer para renderizar a página.

Quanto mais eficiente for a disponibilidade dos recursos críticos, mais rápido a página será renderizada. Isso inclui o HTML, CSS e JavaScript necessários para renderizar o conteúdo visivel no viewport.

Uma alternativa interessante (mas que deve ser usado com cuidado) é o uso de "critical CSS", que é o CSS necessário para renderizar o conteúdo visível na tela. Isso pode ser feito de forma manual ou automatizada com ferramentas como o [Critical](https://www.npmjs.com/package/critical).

Dessa forma esse CSS crítico é adicionado de forma inline no HTML, enquanto o restante do CSS é carregado de forma assíncrona, melhorando o tempo de renderização da página.

Isso afeta diretamente o First Contentful Paint (FCP) e o Speed Index, que são métricas importantes para a experiência do usuário.

### Tree shaking

Tree shaking é uma técnica que quebra os chunks (blocos de código) em partes menores e remove o código que não é utilizado, reduzindo o tamanho dos bundles e melhorando o tempo de carregamento da aplicação.

É uma prática comum em bundlers modernos como Webpack e Rollup, mas é importante que o código seja escrito de forma modular para que o tree shaking funcione corretamente.

Um dos principais vilões do tree shaking é o uso de imports de módulos inteiros, que podem importar mais código do que o necessário. Prefira imports específicos para reduzir o tamanho dos bundles e melhorar a eficiência do tree shaking.

Ou seja, [pare de usar barrel files](https://dev.to/tassiofront/barrel-files-and-why-you-should-stop-using-them-now-bc4) dentro dos projetos e prefira imports específicos.

Em vez de criar um arquivo `index.js` com todos os exports:

```js
// components/index.js
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Select } from './Select';
```

E chamar usando

```js
// App.js
import { Button, Input, Select } from 'components';
```

Prefira importar diretamente o que você precisa:

```js
// App.js
import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
```

Parece uma solução menos elegante, mas é muito mais eficiente e ajuda o tree shaking a funcionar corretamente.

Mantenha barrel files apenas para pacotes externos que podem ser configurados corretamente para exportar de forma mais granular, garantindo que o tree shaking funcione corretamente.

### Lazy loading

Lazy loading é uma técnica que adia o carregamento de recursos como scripts e imagens até que sejam necessários.

Dessa forma apenas recursos essenciais para a visualização inicial da página são carregados e o restante é carregado de forma assíncrona conforme o usuário interage com a página.

Se usado com bundles que passaram por tree shaking, o lazy loading vai melhorar significativamente o tempo de carregamento da aplicação, especialmente em páginas com muito conteúdo e recursos, já que esses pequenos chunks vão ser carregados apenas quando necessário. Também pode ser usado em conjunto com o [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) para carregar recursos conforme eles entram no viewport.

Tanto tree shaking quanto lazy loading afetam diretamente as métricas de Large Contentful Paint (LCP) e First Contentful Paint (FCP), ambas com bastante peso na pontuação de performance do Lighthouse.

## Conclusão

O foco desse artigo foi mostrar algumas técnicas pra melhorar o carregamento de uma aplicação web, mas é importante lembrar que performance é um assunto complexo e que envolve outros diversos aspectos, inclusive em tempo de execução, ou seja o que acontece depois que a página já foi carregada.

Quem sabe não vem uma Parte 2 falando sobre isso no futuro? 😁

Por hoje é isso, espero que tenha sido útil.

TMJ!
