---
title: "Como foi o Desenvolvimento Front-end em 2018 e o que esperar para 2019"
date: 2019-01-07 00:00:01
description: "Este artigo vai recapitular as principais notícias que ocorreram em 2018 e fazer algumas previsões para 2019."
image: /assets/2019-01-07-como-foi-o-desenvolvimento-front-end-em-2018-e-o-que-esperar-para-2019.png
tags: ["front-end", "carreira"]
---

## Sobre esse artigo

O texto a seguir é uma tradução livre do artigo [A Recap of Frontend Development in 2018](https://levelup.gitconnected.com/a-recap-of-frontend-development-in-2018-715724c9441d) publicado pelo [@treyhuffine](https://levelup.gitconnected.com/@treyhuffine).

Primeiro quero agradece-lo por ter escrito esse texto, segundo por permitir que eu fizesse essa tradução.

Importante ressaltar que a tradução não é literal, adaptei algumas partes para facilitar a compreensão. Caso encontre erros me avise que faço a correção 😊

## O WebAssembly faz um grande lançamento com o Core Specification Reaching 1.0

O WebAssembly é frequentemente considerado o futuro da Web. O objetivo é maximizar desempenho, reduzir o tamanho dos arquivos e permitir o Desenvolvimento Web em várias linguagens, oferecendo um formato binário que é executado na Web.

No final de 2017, todos os principais navegadores anunciaram que suportam WebAssembly. Então, em fevereiro de 2018, o WebAssembly teve 3 lançamentos principais:

* [The core specification released 1.0](https://www.w3.org/TR/wasm-core-1/) *(en)*

* [JavaScript interface for WebAssembly](https://www.w3.org/TR/wasm-js-api-1/) *(en)*

* [Web API for WebAssembly](https://www.w3.org/TR/wasm-web-api-1/) *(en)*

## Downloads NPM de algumas libs populares

React, jQuery, Angular e Vue estão entre as 4 libs mais populares. Abaixo, continue lendo para ver os lançamentos mais recentes para algumas destas bibliotecas.

![](assets/1_e036ugWPXTbBzMTSRsXiEw.png)

## React continua o seu reinado enquanto a biblioteca evolui

O React tem dominado o desenvolvimento web há anos e isso não diminuiu em 2018. Ele continua sendo uma das bibliotecas mais amadas de acordo com o [Stackoverflow survey](https://insights.stackoverflow.com/survey/2018/#most-loved-dreaded-and-wanted).

A equipe principal do React é muito ativa nas atualizações da biblioteca e na inclusão de recursos. Ao longo de 2018, vimos muitas adições à versão React v16, incluindo [lifecycle methods](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes), [context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#official-context-api), [pointer events](https://reactjs.org/blog/2018/05/23/react-v-16-4.html), [lazy function](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactlazy-code-splitting-with-suspense), e [React.memo](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactmemo). Mas, os dois recursos que receberam mais atenção são [React Hooks e Suspense API](https://reactjs.org/blog/2018/11/13/react-conf-recap.html).

[React Hooks](https://reactjs.org/docs/hooks-intro.html) foi recebido com ótimos feedbacks de developers que gostaram da atualização. *Hooks* são uma maneira de adicionar estados aos componentes funcionais com a função useState, e também gerenciará o ciclo de vida dos eventos.

No vídeo a seguir, [Ryan Florence]() mostra como o React Hooks fez o seu aplicativo de exemplo ficar 90% mais limpo.

<iframe width="650" height="400" src="https://www.youtube.com/embed/wXLf18DsV-I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

O outro grande lançamento, o *React Suspense*, é uma maneira de gerenciar o *data fetching* dentro dos próprios componentes do React. Ele suspende a renderização de dados enquanto aguarda por uma resposta assíncrona. *Suspense* é o que está por trás da função lazy para gerenciar o *code splitting* dos componentes. A ideia é conseguir gerenciar todo o carregamento assíncrono, como solicitações de API. Ele também permitirá o armazenamento em cache dos resultados de uma solicitação.

Esse exemplo mostra vários *load spinners* na tela enquanto a flag isFetching é true. Com a *Suspense*, você tem um controle refinado da interface do usuário para especificar quais componentes de fallback você vai mostrar enquanto o usuário espera, além de quanto tempo esperar e como gerenciar a navegação. Muitos pensam que o *Suspense* pode remover a necessidade de usar Redux nos projetos.

Veja a talk do [Dan Abramov]() construindo uma aplicação usando a *Suspense API* 🔥.

<iframe width="650" height="400" src="https://www.youtube.com/embed/nLF0n9SACd4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Vue continua crescendo e passa o React em número de estrelas no GitHub

Depois de explodir em 2017, o Vue continuou crescendo em 2018. Inclusive, superou o React no número de estrelas recebidas no GitHub.

Vue é muito amado, mas ainda está atrás de React e Angular no uso real por uma margem alta. No entanto, o Vue tem uma base apaixonada de usuários que está crescendo, e a biblioteca provavelmente será uma força nos próximos anos.

## Evan You (criador do Vue) nos da um gostinho do Vue 3 enquanto o release se aproxima do lançamento

O Vue está se aproximando do seu release 3.0. O criador Evan You nos deu uma visão geral em novembro, tanto na VueConf Toronto quanto no artigo mencionado abaixo. Ele colocou seus slides online e o vídeo estará disponível em breve.

## Angular continua sendo usado constantemente, a v7 foi lançada

Em outubro, o Angular teve outro grande lançamento com a versão 7. O Angular tem tido toneladas de crescimento e melhorias desde a sua arquitetura AngularJS MVC inicial até o seu pacote mais moderno utilizando componentes. Com esse crescimento, ele recebeu novas adoções.

Embora o Angular não tenha os mesmos fãs zelosos que vemos em bibliotecas como React e Vue, ele continua sendo uma escolha popular em projetos profissionais.

Muitos desenvolvedores experimentam cansaço ao usar React, por exigir que o engenheiro tome muitas decisões de dependências e arquitetura, além de gerenciar toda a pipeline de construção do projeto.

Por outro lado, o Angular remove muitas das decisões do desenvolvedor e ajuda a garantir *code patterns* mais consistentes.

O Angular é um framework completo e altamente opinativo, com um CLI gerenciando todas as etapas de desenvolvimento. Outro bônus para uso num ambiente profissional é que o Angular requer TypeScript.

Angular mostrou seu valor no mundo do desenvolvimento web e continua vendo seu uso aumentar.
> NOTA: *@angular/core* representa o novo Angular e *angular* representa o antigo AngularJS

![](assets/1_SXOEH2cmEaC9SBHNp-nvtA.png)

## GraphQL cresce no “desejo de aprender”, mas não ultrapassou REST

GraphQL teve alguma adoção por líderes de tecnologia, como o [GitHub](https://developer.github.com/v4/). Entretanto, não decolou tão rapidamente quanto alguns previram. De acordo com o [State of JS survey](https://2018.stateofjs.com/data-layer/overview/), somente 1/5 frontend developers tem usado GraphQL, mas cerca de 62.5% dos desenvolvedores já ouviram falar e querem usá-lo.

![](assets/1_m6vDkicw6EUt8uc6EhcXAQ.png)

## CSS-in-JS teve aumento no uso

O Desenvolvimento Web parece ter caminhado para unificar tudo com JavaScript, e isso é confirmado com o crescimento do CSS-in-JS, onde estilos são criados usando strings JavaScript. Isso permite compartilhar estilos e dependências usando a sintaxe normal de JavaScript por meio de *import*/*export*. Ele também simplifica estilos dinâmicos, pois componentes CSS-in-JS podem interpolar props em sua string de estilo. Abaixo um exemplo do clássico CSS vs CSS-in-JS.

Para gerenciar estilos dinâmicos com CSS, você precisa gerenciar nomes de classes no componente e atualizá-los com base no *state*/*props*. Você também precisa de uma classe CSS para as variações:

```js
// Component JS file
const MyComp = ({ isActive }) => {
  const className = isActive ? 'active' : 'inactive';

return <div className={className}>HI</div>
}
```

```css
// CSS file
.active { color: green; }
.inactive { color: red; }
```

Com o CSS-in-JS, você não gerencia mais as classes CSS. Você simplesmente passa *props* ao componente estilizado e lida com o estilo dinâmico. O código é muito mais limpo e temos uma separação mais clara entre os estilos e o React, permitindo que o CSS gerencie os estilos dinâmicos baseados em *props*. Tudo é lido como código React e JavaScript normal agora:

```js
const Header = styled.div`
  color: ${({ isActive }) => isActive ? 'green' : 'red'};
`;

const MyComp = ({ isActive }} => (
  <Header isActive={isActive}>HI</Header>
)
```

As duas bibliotecas mais populares de CSS-in-JS são [styled-components](https://www.styled-components.com/) e [emotion](https://emotion.sh/).

Styled-components tem mais tempo de vida e mais adoção, mas o Emotion tem ganhado espaço rapidamente, tornando-se a lib favorita de muitos desenvolvedores. Até mesmo o [Kent C. Dodds]() depreciou o uso de sua biblioteca CSS-in-JS, a Glamorous, em favor da Emotion.

![](assets/1_WfbUcGwcI4hmuD80S9XsCg.png)

Vue também suporta CSS* out of the box* ao usar *Single File Components*. Apenas adicionando a propriedade scoped para a tag style do componente, o Vue vai usar técnicas de CSS-in-JS para criar escopo e não vazar estilos para outros componentes.

Além disso, o Angular suporta escopo de CSS *out of the box *através da “[view encapsulation](https://angular.io/guide/component-styles#view-encapsulation)”. Isso está ativado por padrão.

## Developers encontram alivio após com ferramentas de CLI Tools

Não é segredo que pode ser extremamente exaustivo acompanhar as bibliotecas mais recentes, configurar seu app corretamente e tomar as decisões arquitetônicas corretas. Essa dor gerou a criação de pacotes CLI que gerenciam as ferramentas, permitindo que o desenvolvedor se concentre no aplicativo.

Esse conjunto de ferramentas tornou-se a principal forma de desenvolvedores criarem aplicativos em 2018. Frameworks populares incluem [Next.js](https://nextjs.org/) (SSR para o React), [Create-React-App](https://github.com/facebook/create-react-app) (client-side React), [Nuxt.js](https://nuxtjs.org/) (SSR para o Vue), [Vue CLI](https://cli.vuejs.org/) (client-side Vue), [Expo CLI](https://expo.io/tools#cli) para o React Native, e é padrão no [Angular](https://angular.io/).

## Geração de sites estáticos cresce à medida que tentamos simplificar o Front-end e buscamos desempenho

Todos adoraram aprender as melhores e mais recentes bibliotecas à medida que a revolução do JavaScript acontecia nos últimos anos, mas agora que as coisas estão se estabelecendo, percebemos que nem todo site precisa ser um complexo single-page application (SPA). Isso causou o crescimento de *static generators*. Essas ferramentas permitem que você code em suas bibliotecas favoritas, como React ou Vue, mas gere arquivos HTML estáticos durante o tempo de compilação, o que nos permite servir páginas totalmente prontas para os usuários imediatamente.

Sites estáticos são ótimos porque fornecem uma combinação ideal de desempenho com simplicidade.

Com arquivos HTML renderizados em tempo de compilação, podemos enviar imediatamente ao usuário uma página sem precisar de SSR ou CSR, permitindo que eles carreguem o site quase instantaneamente. Os arquivos JavaScript necessários são baixados no cliente, permitindo uma experiência de *single page*.

São perfeitos para criar sites pessoais ou blogs, mas podem ser ampliados para aplicativos maiores facilmente. Vimos o surgimento de estruturas populares para a criação de websites estáticos, como os aplicativos Gatsby e React Static para React e os aplicativos VuePress para Vue. Na verdade, os sites estáticos se tornaram tão populares que a Gatsby formou uma empresa e recebeu financiamento VC em torno de sua biblioteca open source no ano passado.

## Arquitetura Serverless e JAMStack

Com o crescente popularidade dos sites estáticos, também vimos um crescimento contínuo no backends para acompanha-los.

A arquitetura Serverless tem sido palavra de ordem no desenvolvimento web nos últimos tempos por sua capacidade de desacoplar código do cliente e do servidor, permitindo operações a um custo reduzido.

Uma extensão da filosofia serverless é a [JAMStack ](https://jamstack.org/)(JavaScript, APIs, Markup). A filosofia JAMStack baseia-se no conceito de site estático discutido na seção anterior. Ele permite tempos de carregamento mais rápidos, graças ao *markup* pré-construído, e se torna um SPA dinâmico no cliente, utilizando APIs reutilizáveis para o servidor. Em 2018 vimos a primeira vez o [JAMStack hackathon](https://medium.freecodecamp.org/winners-from-the-2018-freecodecamp-jamstack-hackathon-at-github-2a39bd1db878). [freeCodeCamp](undefined), [Netlify](undefined), e o [GitHub](undefined) se uniram para sediar um hackathon presencial e on-line, permitindo que as pessoas codassem na sede do GitHub ou se conectassem com outros desenvolvedores no mundo todo.

Para entender como um site JAMStack pode ser escalado enquanto mantém o desempenho, [Quincy Larson](undefined) explica como o freecodecamp.org é abastecido pela arquitetura JAM.
[**How freeCodeCamp Serves Millions of Learners Using the JAMstack | freeCodeCamp**
*In this talk, Quincy Larson shares about the history of freeCodeCamp, and how the JAMstack is used for...*www.freecodecamp.org](https://www.freecodecamp.org/news/beaucarnes/freecodecamp-jamstack--i9ZVp23pm)

## TypeScript pode ser o futuro do JavaScript (mas o mesmo não pode ser dito do Flow) e o TS 3.0 foi lançado

JavaScript recebe críticas por não ter variáveis tipadas estaticamente. As duas principais bibliotecas que tentam corrigir isso são [TypeScript](https://www.typescriptlang.org/) e o [Flow](https://flow.org/en/), mas o TypeScript parece ter se tornado favorito. Na verdade, o TypeScript foi classificado como superior ao JavaScript em si na pesquisa do Stack Overflow, com 67% vs 61,9% para a linguagem mais amada. De acordo com a pesquisa do State of JS, mais de 80% dos desenvolvedores querem usar TS ou já estão usando. Para o Flow, apenas 34% dos desenvolvedores estão usando ou querem usar.

Tudo indica que o TypeScript é a solução definitiva para tipagem estática no JS, e muitas pessoas estão optando por isso em relação ao JavaScript normal.

Em 2018, o número de downloads do npm para o TS cresceu substancialmente enquanto o Flow permaneceu muito estável. O TypeScript parece estar se movendo em alta velocidade para adoção generalizada. Além disso, o [TypeScript recebeu sua atualização v3](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html).

![](assets/1_frSWl5Yp4FoIUla7wxPIXA.png)

## Accelerate Mobile Pages (AMP) cresce rapidamente

AMPs são páginas criadas especificamente para dispositivos móveis.

![](assets/1_2A6tPpauW8KI5Pn4MhsG0w.png)

## Webpack 4 chegou em 2018

Apenas 8 meses após o lançamento do Webpack 3, a versão 4 foi lançada.

O Webpack 4 continua focando na simplicidade e build rápido, prometendo uma melhoria de até 98%. Ele opta por *sensible defaults*, lida com mais funcionalidades nativas, sem plugins, e não é mais necessário usar um arquivo de configuração para começar. O Webpack agora também suporta WebAssembly e permite que você importe os arquivos de WebAssembly diretamente.

## Babel 7.0 foi lançado

Depois de quase 3 anos desde o lançamento da versão 6, o Babel 7 foi lançado em 2018.

Babel é a biblioteca que transpila código ES6 + JavaScript para ES5, tornando nosso código JavaScript compatível com vários navegadores. O artigo de lançamento do Babel afirma que as melhorias na v7 são “mais rápida, criação de uma ferramenta de update, JS config, config ‘overrides’, mais opções para minificação, *JSX Fragments*, TypeScript, novas propostas e muito mais!”. O Babel também alterou os seus pacotes para o namespace @babel.

## VS Code domina os Text Editor/IDE

Text editors e IDEs são campos de batalhas para desenvolvedores desde o passado com o Vim vs emacs.

Com a criação do [Electron](https://electronjs.org/), editores open source baseados em plugins explodem com o [Atom](https://atom.io/) tomando parte desse novo mercado. Entretanto, [VS Code](https://code.visualstudio.com/) recentemente provou ser o favorito dos desenvolvedores e o principal editor de uso geral por uma margem significativa em 2018.

![](assets/1_mLBjsSYDWEAdOy8pUjOjOg.png)

## Artigos mais influentes de 2018

Lista completa dos principais artigos de 2018 (todos em inglês):

[**Top Web Development Articles of 2018**
*A list of the best JavaScript, React, Vue, Angular, and frontend stories of 2018. Required reading for all web...*levelup.gitconnected.com](https://levelup.gitconnected.com/top-web-development-articles-of-2018-bd5c3900110b)

Addy Osmani nos mostrou o custo do JavaScript
[**The Cost Of JavaScript In 2018**
*Building interactive sites can involve sending JavaScript to your users. Often, too much of it. Have you been on a...*medium.com](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)

Vimos o futuro do React na React Conf em Novembro
[**React Conf recap: Hooks, Suspense, and Concurrent Rendering — React Blog**
*This year’s React Conf took place on October 25 and 26 in Henderson, Nevada, where more than 600 attendees gathered to...*reactjs.org](https://reactjs.org/blog/2018/11/13/react-conf-recap.html)

Airbnb compartilhou seus 2 anos de experiência com o React Native
[**React Native at Airbnb**
*In 2016, we took a big bet on React Native. Two years later, we’re ready to share our experience with the world and...*medium.com](https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c)

Google nos deixar dar uma espiada no Google Photos Web UI
[**Building the Google Photos Web UI**
*A peek under the hood*medium.com](https://medium.com/google-design/google-photos-45b714dfbed1)

Microsoft está adotando o Chromium para o Edge
[**Microsoft Edge goes Chromium**
*The rumors were true: Microsoft Edge is moving to the open-source Chromium platform, the same platform that powers...*techcrunch.com](https://techcrunch.com/2018/12/06/microsoft-edge-goes-chromium-and-macos/)

GitHub é comprado pela Microsoft
[**Microsoft to acquire GitHub for $7.5 billion — Stories**
*Acquisition will empower developers, accelerate GitHub’s growth and advance Microsoft services with new audiences From...*news.microsoft.com](https://news.microsoft.com/2018/06/04/microsoft-to-acquire-github-for-7-5-billion/)

Ryan Dhal (o criador do Node) nos conta os erros que cometeu com o Node e nos dá um vislumbre do TypeScript *runtime*, o Deno

<iframe width="650" height="400" src="https://www.youtube.com/embed/M3BM9TB-8yA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Previsões para 2019

* Com a base mais sólida e a constante evolução para melhorar a experiência na Web, o WebAssembly começará a ver mais vida.

* React continua no top, mas Vue e o Angular continuam crescendo entre usuários.

* CSS-in-JS pode se tornar o padrão em vez de CSS simples.

* Developers podem começar a olhar para [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) nativos?

* Não surpreendentemente, desempenho continua sendo foco e coisas como PWAs e *code splitting* se tornam o padrão para todo aplicativo.

* Com base na adoção do PWA, a Web se torna mais nativa com recursos off-line e experiências perfeitas entre desktop e dispositivos mobile.

* Continuamos a ver crescimento de ferramentas e estruturas de CLI para abstrair coisas cansativas na criação de apps, permitindo que os desenvolvedores se concentrem na produção de recursos.

* Mais empresas adotam soluções mobile que têm base de código unificada, como [React Native](https://facebook.github.io/react-native/) e [Flutter](https://flutter.io/).

* A influência de conteinerização (ie. Docker, Kubernetes) torna-se mais popular no desenvolvimento frontend.

* GraphQL aumenta adoção e é usado em mais empresas.

* TypeScript começa a se tornar a escolha padrão ao invés do JavaScript normal.

* Realidade virtual avança com o uso de bibliotecas como [A-Frame](https://aframe.io/), [React VR](https://facebook.github.io/react-vr/), e [Google VR](https://developers.google.com/vr/?hl=en).
