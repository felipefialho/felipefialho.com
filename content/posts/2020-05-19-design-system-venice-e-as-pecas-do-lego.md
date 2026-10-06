---
title: 'Design System, Venice e as peças do Lego'
date: 2020-05-19 00:00:01
description:
  'Contando mais sobre a arquitetura, o desenvolvimento e as tecnologias
  utilizadas no Venice, o Design System da Juntos Somos Mais.'
image: /assets/2020-05-19-cover.jpg
tags: ['design system', 'css', 'typescript', 'react', 'vue']
---

_Esse artigo foi originalmente publicado no Medium da
[Juntos Somos Mais](https://medium.com/juntos-somos-mais) vale seguir e
acompanhar os novos textos_ 😁

Sempre gostei de Lego (e suas variações de outras marcas), eu devia ter uns 5
anos quando tive o primeiro contato com esses blocos, o que mais me impressionou
foi a possibilidade de fazer várias combinações com resultados completamente
diferentes, mas sem modificar as peças originais.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1260986959171854337">
    <p>A primeira experiência que tive com Design System e Componentes foi brincando com LEGO</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1260986959171854337">May 14, 2020</a></figcaption>
</figure>

## Antes: JS+ Tech Talks

No dia 23/04/2020 tivemos a primeira edição da JS+ Tech Talks organizado pelo
time de tecnologia da [Juntos Somos Mais](https://www.juntossomosmais.com.br/).

Tive a honra de fazer uma talk falando sobre toda a concepção do nosso Design
System e quais estratégias estamos utilizando e o conteúdo completo está
disponível no vídeo abaixo.

### JS+ Tech Talk #1 — Design System — 23/04/2020

<iframe width="650" height="400" src="https://www.youtube.com/embed/6uWzv_P_Ui0?t=181" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## O que é e para que serve um Design System

De forma mais resumida possível, Design System é um conjunto de padrões e
componentes, que visam unificar design e código. Na prática, como exemplificou
[Nathan Curtis](https://twitter.com/nathanacurtis).

> É um produto, que deve servir outros produtos.

Design System precisam ser documentos vivos, com documentações sempre
atualizadas e seus componentes modificados ou criados conforme as necessidades
das outras equipes.

Isso porque o foco não é o projeto em si, ele não existe como um propósito
final. O objetivo é servir uma série de outros produtos internos (e até mesmo
externos!), unificando assim toda parte visual e comportamental, em coisas como:

- Paleta de cores
- Espaçamentos
- Tipografia
- Componentes
- Etc

Além da padronização, a escalabilidade e a resiliência dos produtos também são
bastante beneficiados. Isso porque componentes que seriam duplicados (tanto
design, quanto código) são criados apenas uma vez, em um contexto agnóstico e
totalmente desatrelado de específicas regras de negócio. Dessa forma a qualidade
do desenvolvimento tende a melhorar e os testes também são escritos com mais
facilidade.

Dado que os componentes não vão precisar ser desenvolvidos novamente, a
velocidade no desenvolvimento de novas features dentro dos produtos também tem
grande acréscimo.

Outro benefício super relevante é a possibilidade de aos poucos substituir
códigos legados pelos componentes desenvolvidos no Design System, tudo isso sem
colocar em risco a evolução dos produtos a nível de negócio.

Bons exemplos de Design System são:

- [Material Design](https://material.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Primer](https://primer.style/)

É um assunto extremamente extenso com muitas camadas de pensamento.

Uma boa fonte de pesquisa pra se aprofundar nesse tema é o
[Design System Repo](https://designsystemsrepo.com/) que trás milhares de
exemplos de DS funcionais e vários artigos escritos nos últimos anos sobre esse
tema.

## Design System na prática

Comecei a trabalhar na [Juntos Somos Mais](https://www.juntossomosmais.com.br/)
em fevereiro/20, temos projetos em React e Vue, usando tecnologias bem
diferentes entre eles (Styled Components, Stylus, TypeScript, NextJS…)

Um dos desafios que recebi já nos primeiros dias foi justamente pensar em como
poderíamos padronizar nossos produtos, tanto em questões de código, como na
parte visual.

Rapidamente a ideia de criar um Design System surgiu, mas **como**?

## Web Components

![Web Comoponents](assets/2020-05-19-webcomponents.png)

Por conta da pluralidade de stacks*,* Web Components foi a primeira coisa que
-pensamos, justamente por ser completamente agnóstico com relação a tecnologias
e na teoria poder ser usado junto com qualquer (ou sem nenhum) framework.

Fizemos testes utilizando [Svelte](https://svelte.dev/) e
[Stencil](https://stenciljs.com/).

**Svelte** é um framework somente em tempo de desenvolvimento, mas gera o bom e
velho JavaScript Vanilla após o build. Pode ser usado para criação de
componentes (JavaScript ou Web Components) ou aplicações inteiras.

**Stencil** foi criado pelo time do
[Ionic Framework](http://ionicframework.com/), serve justamente e exclusivamente
para o desenvolvimento de Web Components, então tem toda a experiência de uso
bem focada nesse ponto.

Ambos se mostraram promissores, apesar das diferenças entre eles. No cenário que
estávamos e para o que precisávamos, **Stencil** se mostrou uma escolha melhor.

No entanto-entretanto, após alguns testes surgiram problemas, especialmente na
integração com React onde seriam necessárias
[algumas adaptações](https://stenciljs.com/docs/react) para funcionar como
previsto.

Principalmente para componentes mais complexos o prognóstico não foi tão
otimista e apesar de Web Components parecer ser um caminho quase natural, a
considerável imprevisibilidade acabou sendo um fator decisivo, já que o DS iria
crescer e seria complicado voltar atrás de novo.

## O Plano B: Múltiplos Design Systems

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1242798337348247553">
    <p>Tenho trabalhado no Design System da Juntos, usando de stack:<br><br>- Monorepo<br>- Storybook<br>- React/Vue<br>- TypeScript<br>- CSS Modules<br><br>A ideia é compartilhar estilos e deixar configurável com Variáveis CSS, facilitando customização, criação de temas, etc.<br><br>Tá sendo uma experiência foda 😍</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1242798337348247553">March 25, 2020</a></figcaption>
</figure>

Então o jeito foi partir para o plano B, ou seja, diferentes versões para
diferentes frameworks.

Essa ideia não me agradava, especialmente pela necessidade de duplicar códigos
(tanto lógica quanto CSS) e dificuldade que teríamos para padronizar a parte
visual e manter a consistência entre as versões.

Mas com um pouco de planejamento e arquitetura, as coisas mudaram 😜

# E assim nasce o Venice

![Venice](assets/2020-05-19-venice.png)

Venice pode ser uma cidade da Italia (Veneza), uma cidade na Flórida ou também
um distrito de Los Angeles, que foi onde nos inspiramos para definir o nome do
Design System.

O código do projeto está aberto e disponível nos links abaixo.

- Repositório no **Github**:
  [https://github.com/juntossomosmais/venice](https://github.com/juntossomosmais/venice)
- Versão **React**:
  [https://juntossomosmais.github.io/venice/react/](https://juntossomosmais.github.io/venice/react/)
- Versão **Vue**:
  [https://juntossomosmais.github.io/venice/vue/](https://juntossomosmais.github.io/venice/react/)

# A Stack atual

Assim ficou a stack atual:

- [Monorepo](https://github.com/korfuri/awesome-monorepo)
- [Lerna](https://github.com/lerna/lerna)
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [Storybook](https://storybook.js.org/) (MDX)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Variáveis CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS/var)
- [React](https://reactjs.org/)
- [Vue](https://vuejs.org/)

Na sequencia vou falar sobre cada uma dessas escolhas e porque estamos
utilizando elas.

## Monorepo

![Monorepo](assets/2020-05-19-0_ygBMtdWwuYuVDO4W.png)_Crédito da imagem:
[javascript-in-plain-english](https://medium.com/javascript-in-plain-english/javascript-monorepo-with-lerna-5729d6242302)_

Quando uma nova feature ou componente é desenvolvida no **Venice**, ela precisa
estar disponível em todas as libs do Design System (React e Vue), por várias
razões seria inviável manter em repositórios separados, mas a principal delas:

- Reaproveitamento de código

Coisas como documentações, tokens, variáveis e estilos seriam exatamente os
mesmos tanto na versão em React quanto em Vue, portanto faria muito sentido que
ficassem dentro de uma mesma estrutura de repositório.

Monorepo chegou pra ficar, tem sido amplamente utilizado e apesar de não ser
bala de prata (**nada é**), caiu como uma luva no nosso cenário.

## Lerna e Yarn Workspaces

Ainda falando sobre Monorepos, temos uma dupla sensacional: Lerna e Yarn
Workspaces.

Funcionam perfeitamente bem juntos.

**Lerna** cuida do versionamento e publicação dos pacotes, e trás uma série de
comandos úteis para lidar com a execução de comandos entre os projetos
compartilhados.

**Yarn Workspaces** adiciona inteligência e otimiza o gerenciamento das
dependências, evitando por exemplo instalar várias vezes a _node_modules_ com os
mesmos pacotes dentro de cada projeto. Além disse permite a instalação cruzada
de projetos dentro do próprio Monorepo como dependências, ou seja, seu projeto
dentro de um Monorepo pode ser usado como um pacote dentro de outro projeto.

Abaixo dois guias muito bons explicando essas ferramentas:

- [A Beginner’s Guide to Lerna with Yarn Workspaces](https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d)
- [Creating a Monorepo with Lerna & Yarn Workspaces](https://medium.com/hy-vee-engineering/creating-a-monorepo-with-lerna-yarn-workspaces-cf163908965d)

## Storybook (MDX)

![Storybook](assets/2020-05-19-storybook.png)

Storybook foi escolhido para cuidar do gerenciamento das histórias dentro de
cada Design System, sendo também responsável pela apresentação visual dos
componentes e documentações.

Atualmente existem várias ferramentas com essa proposta, mas a escolha do
Storybook se deu por conta da:

- Integração com várias tecnologias
- Possibilidade de escrever em MDX
- Grande oferta de plugins
- Facilidade de uso
- Solidez

## TypeScript

![Typescript](assets/2020-05-19-typescript.png)_Crédito da imagem:
[technotification](https://www.technotification.com/2019/06/typescript-3-5-released.html)_

Faz alguns anos que utilizo e sou apaixonado por TypeScript ❤️

Mas a decisão por usar TypeScript nesse caso, se deu pela possibilidade de criar
interfaces que podem ser compartilhadas entre todos os Design Systems dentro do
**Venice**, garantindo assim uma integridade maior nas _props_ de cada
componente.

Ou seja, não importa se estamos usando a versão do componente em Vue ou React,
as interfaces do TypeScript vão garantir que os nomes e modelos de cada _prop_
sejam exatamente iguais.

Absolutamente necessário.

Como se não bastasse, TypeScript também fica responsável por cuidar da
transpilação e portanto do build das libs, evitando alguns erros bobos nos
códigos que poderiam passar despercebidos.

## Sass, PostCSS e CSS Modules

![CSS Modules](assets/2020-05-19-cssmodules.png)

Partindo de premissa que temos mais de um Design System dentro do **Venice** e
algumas (muitas) coisas são compartilhadas entre eles, chegamos a uma das
questões mais importantes — **Estilos**.

Duplicar estilos poderia trazer inconsistências nos componentes, além de
dificultar a manutenção deles. Dessa forma o cenário ideal, seria que os
componentes, em React ou Vue, compartilhassem entre si uma só versão desses
estilos.

Além disso, tínhamos um outro desafio: Isolamento.

Diante dessas necessidades, o combo Sass, PostCSS e CSS Modules se mostrou
extremamente eficaz.

Isso porque libs de CSS-in-JS como Styled Components, por exemplo, possuem
diferentes versões para React e Vue, ao tempo que CSS Modules é bastante
agnóstico e se adapta bem com qualquer tecnologia.

Para entender melhor a evolução do CSS nos últimos anos e as várias opções que
temos atualmente, vale ler esse artigo:

- [Do Sass e BEM ao CSS-in-JS: A (re)evolução do CSS ao longo da história](https://www.felipefialho.com/blog/do-sass-e-bem-ao-css-in-js-a-evolucao-do-css-ao-longo-da-historia/)

Desse jeito nós criamos apenas um CSS para cada componente e esses estilos são
usados tanto na versão em Vue quanto em React, garantindo consistência visual e
evitando duplicação de códigos.

## Variáveis CSS

Uma outra questão de extrema importância era com relação as variáveis que
precisam ser compartilhadas, não só entre os componentes dentro do **Venice**
como entre todas as aplicações.

Coisas como:

- Cores
- Espaçamento
- Tipografia

Essas coisas garantem a consistência visual, então precisavam ser escaláveis e
disponíveis em um só lugar.

Como disse antes, falando de CSS os projetos usam stacks variadas: Styled
Components, Stylus e Sass. E a única tecnologia comum entre todas elas é o
próprio CSS.

Então as variáveis nativas do CSS resolveram essa questão pra gente, bastando
importar o **Venice** nos projetos e já estão disponíveis. Além de serem
dinâmicas e fáceis de usar, funcionam em qualquer cenário.

## React e Vue

![React e Vue](assets/2020-05-19-reactvue.png)_Crédito da imagem:
[javascript-in-plain-english](https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd)_

Por último, os frameworks.

React e Vue já eram utilizados nos projetos que temos atualmente, portanto os
componentes precisariam servir nesses dois casos.

Portanto, sempre que um novo componente nasce no **Venice**, ele é desenvolvido
com versões funcionais para Vue e React. Porém muito dos códigos que são usados
no desenvolvimento dos componentes são escritas apenas uma vez e compartilhado
entre eles, como estilos, documentações e interfaces.

Com versões especificas pra cada framework conseguimos garantir a estabilidade
deles, e não ter nenhum tipo de surpresas com mal funcionamento por conta de
adaptações.

# Conclusão

Design Systems são fundamentais quando pensamos em produtos escaláveis e com
interfaces consistentes, grandes empresas estão investimento muito nesse
conceito justamente aumentar velocidade no lançamento de novos produtos e também
melhorar a qualidade dos desenvolvimentos.

Talvez alguns de nós tivemos a oportunidade de brincar com Lego quando éramos
crianças e naquele tempo… nos divertindo e sem perceber, já tínhamos aprendido
muito dos conceitos que escrevi nesse texto enorme.

Precisamos brincar mais ❤️
