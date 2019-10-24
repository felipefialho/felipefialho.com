---
title: "Do Sass e BEM ao CSS-in-JS: A (re)evolução do CSS ao longo da história 🚀"
date: 2019-10-02 00:00:01
description: "Um artigo sobre CSS e como foi a evolução das suas metodologias nos últimos anos."
image: /assets/2019-10-02-cover.jpg
tags: ["css", "javascript", "styled-components", "css-in-js"]
---

## Estão escrevendo CSS com JavaScript 😱? Sim 🥳

Se você nunca escutou falar ou nunca usou CSS-in-JS, pode ser estranho escrever CSS dentro do JavaScript. Mas não se assuste!

Nesse artigo vou falar um pouco sobre a evolução do CSS e porque pode ser uma boa ideia escrever CSS dessa forma atualmente.

## Começando do começo, a evolução do CSS

![CSS3](assets/2019-10-02-css.jpg)

CSS foi lançado em 17 de dezembro de 1996, mais de 20 anos atrás. Seu nome completo é Cascading Style Sheets (CSS) e serve para adicionar estilo num documento web.

Existem algumas formas de aplicar CSS:

- Diretamente nos elementos
- Dentro da tag `<style>`
- Link para um arquivo CSS que contém os estilos

Dependendo do seu tempo de carreira, talvez você não saiba, mas menos de 10 anos atrás, quase nenhum navegador dava suporte para coisas básicas como:

- `border-radius`
- `box-shadow`
- `linear-gradient()`
- `opacity`
- `rgba`

Ou seja, era tenso!

Para adicionar uma simples borda arredondada ou sombra nos elementos, precisávamos adicionar imagens com transparência, e em `.gif`, já que o IE6 não aceitava `.png`.

https://twitter.com/felipefialho_/status/1176453466904023041

### Mas as coisas melhoraram

Nos últimos anos aconteceram grandes (re)evoluções no CSS, e não só questões básicas como adicionar transparência e bordas arredondadas foram resolvidas, como já faz um bom tempo que é possível usar propriedades e seletores que facilitam demais no dia a dia, dando alguns exemplos:

- `calc()`
- `filter`
- `display: flex` e `display: grid`
- `position: sticky`
- `vh`, `vw`, `vmin`, `vmax`, `rem` e etc
- `:after` e `:before`
- `:nth-child`, `:first-child`, `:last-child` e etc
- `:not()`

Enfim, a lista é gigantesca e isso criou um mundo de possibilidades.

### Experimentos com CSS

Essas novidades possibilitaram também o surgimento de diversos experimentos usando apenas CSS. Entre 2012 e 2014, tivemos um grande número de desenhos e jogos desenvolvidos sem usar imagens nem JavaScript.

Era uma fase de aprender e entender como trabalhar com as atualizações que estavam surgindo, então também entrei na onda, vou citar três experimentos que fiz nessa época:

- Em 2012 criei esse Cartman:

https://codepen.io/felipefialho/pen/qzDCJ

- Um tempinho depois, em meados de 2013, desenhei esse [piano com gradientes](http://piano.felipefialho.com).

- Até que em 2014, queria criar um framework UI estilo Bootstrap sem nenhuma linha de JavaScript, então lancei o [CSS Components](https://css-components.felipefialho.com/).

Todas essas coisas seriam impossíveis alguns anos antes e isso refletiu na possibilidade de criar interfaces muito mais maduras e escaláveis.

## Pré-processadores e pós-processadores

![Pré-processadores](assets/2019-10-02-preprocessors.png)*Crédito da imagem: [growingwiththeweb](https://www.growingwiththeweb.com/2014/03/css-preprocessors-are-here-to-stay.html)*

No começo da década surgiram muitos pré-processadores, como:

- [Sass](https://sass-lang.com/)
- [Less](http://lesscss.org/) 
- [Stylus](http://stylus-lang.com/)

E um pouco depois disso surgiu o conceito de pós-processadores, como [PostCSS](https://postcss.org/) e suas libs.

Foi incrível, porque a partir desse momento, foi possível fazer coisas nunca antes imaginadas com CSS, como aninhar elementos e criar variáveis e mixins.

Foram determinantes para o CSS começar a ganhar mais solidez durante o desenvolvimento e não só isso, ajudou o próprio CSS _puro_ a se reinventar. 

Desde então até variáveis nativas foram adicionadas, no chamado CSS Módulo 4 possibilitando criar layouts dinâmicos como o _dark mode/light mode_ do blog que estão lendo agora.

E olhando para o futuro, coisas como nesting nativo podem surgir em breve,  removendo assim parte da necessidade do uso de pré-processadores:

https://twitter.com/felipefialho_/status/1104854866395099136

## Especificidade e colisão de estilos

Mas mesmo com toda evolução das propriedades e seletores CSS, alguns problemas seguiram sem solução, como especificidade e colisão de estilos.

### Porque é um problema

Quanto mais aninhado e mais especifico, mais difícil fica para sobrescrever as propriedades. O uso de ID piora ainda mais esse cenário ([não usem ID, sério](/blog/porque-usar-classes-para-estilizar-elementos/)).

Isso também impacta diretamente na performance, elementos aninhados são mais lentos para carregar, você pode testar isso [nesse projeto](https://t.co/yWWbQsMrBI?amp=1).

Colisão de estilos acontece quando você estiliza uma [tag sem o uso de classes](/blog/porque-usar-classes-para-estilizar-elementos/) ou cria classes com os mesmos nomes para estilizar seus elementos.

Esse é um dos motivos que geram o gif mais famoso do mundo sobre CSS.

![GIF clássico sobre CSS](assets/2019-10-02-gif.gif)

Essa bagunça toda, também tende a aumentar o uso de `!important`. E quando usado, a manutenção fica extremamente complexa, sendo necessário aninhar cada vez mais (e usar outro `!important`) para sobrescrever as coisas.

(Pra mim a única exceção para o uso de `!important`, e com cautela, é para sobrescrever propriedades de _third-party_ libs que não temos acesso).

Essa bagunça toda, gera códigos como esse:

https://twitter.com/felipefialho_/status/1103700905575309313

E o CSS sozinho, não possui mecanismos para evitar que isso aconteça.

## As metodologias CSS

![OOCSS + SMACSS + BEM](assets/assets/2019-10-02-organizing.jpg)*Crédito da imagem: [Gainesville Front-end Developers Meetup](https://www.youtube.com/watch?v=IKFq2cSbQ4Q)*

Para ajudar nisso, uma série de metodologias CSS surgiram, você já deve ter escutado falar de siglas como:

- SUITCSS
- DRYCSS
- SMACSS
- OOCSS
- RSCSS
- ITCSS
- BEM

Todas elas foram pensadas para melhorar a arquitetura e criar padrões. Também foram desenvolvidas para evitar especificidade e colisão de estilos no projeto.

## BEM

Essa sopa de letrinhas falada anteriormente não se excluem entre si e algumas podem ser usadas juntas, mas dentre todas essas o [BEM](http://getbem.com/introduction/) sempre me agradou mais.

A premissa é simples: `Block__Element--Modifiers`.

Ou seja, se você vai criar um `menu` para seu projeto, ficaria algo como:

```css
.menu { ... }

.menu__link { ... }

.menu__link--active { ... }
```

E sim, funciona! Por ter um padrão que precisa ser seguido, o código fica mais organizado e como os elementos ficam "escopados" num bloco, o risco de colisão entre classes diminui muito.

Além disso, a idéia é nunca aninhar elementos, então você não escreveria coisas como:

```css
.header .menu .link { ... }
.header .menu .link.active { ... }
```

Assim a especificidade do seu projeto, começa a ficar BEM (não resisti 😂) mais resolvida.

### Mas tem seus problemas

Mas ainda sim, tem seus problemas. Afinal, tudo é manual e ainda é possível você, por exemplo, ter duas classes `.menu` no projeto, o que automaticamente causaria colisão.

Além disso, algumas classes podem ficar enormes e muitas vezes pouco semânticas, sem falar que pensar no nome delas é um saco (`.menu-main-item__link`, quem nunca?).

## CSS Modules

![CSS Modules](assets/2019-10-02-css-modules.jpg)

Diante desse cenário, entre 2015 e 2016, surgiu o [CSS Modules](https://github.com/css-modules), que literalmente passa a oferecer a possibilidade de escrever módulos para o CSS usando um bundler de módulo como o Webpack. 

Assim você pode focar em coisas mais importantes do que pensar em nomes de classes.

Em vez de escrever:

```css
.menu__item__link { }
```

Você escreve:

```css
.link { }
```

Gerando:

```css
._link_12ie2_1 { }
```

Tudo automaticamente e sem riscos de colisão.

Caso tenha curtindo, pode ver uma implementação de CSS Modules com Webpack no [Kratos Boilerplate](https://github.com/felipefialho/kratos-boilerplate).

**CSS Modules nativo?**

Criar escopos nativos no CSS já vem sido discutido faz algum tempo, mas parece ter ganhado corpo nos últimos meses, com discussões acontecendo no [csswg-drafts](https://github.com/w3c/csswg-drafts/issues/4061) e no [WebComponents](https://github.com/w3c/webcomponents/issues/759).

Acredito que existam possibilidades reais de acontecer implementações nesse sentido num futuro próximo.

## E finalmente: CSS-in-JS

![CSS in JS](assets/assets/2019-10-02-css-in-js.jpg)*Crédito da imagem: [ruanyifeng](http://www.ruanyifeng.com/blog/)*

Levando em conta todo o contexto que expliquei anteriormente, soluções CSS-in-JS fazem muito sentido, porque aproveitam métodos atuais de componentização em JavaScript para criar componentes performáticos a prova de colisão, sendo esse processo extremamente automatizado.

Algumas das libs mais populares atualmente são:

- [styled-components](https://www.styled-components.com/)
- [Emotion](https://emotion.sh/docs/introduction)
- [JSS](https://cssinjs.org/)

Minha única experiência até agora foi com Styled Components, então os exemplos serão feitos a partir dele.

## Styled Components

Styled Components foi desenvolvido para melhorar a maneira que lidamos com CSS nos componentes de aplicações React.

Algumas [vantagens](https://www.styled-components.com/docs/basics):

- **Critical CSS Automático:** Os componentes são renderizados e automagicamente injetam apenas seus estilos, nada mais. Combinado com o _code splitting_, ajuda a carregar uma menor quantidade de código para o usuário final.
- **Sem colisão de classes:** Como vimos anteriormente, esse é um dos maiores problemas do CSS, e styled-components fornece nomes de classes a prova de colisão.
- **Remoção de CSS:** Como funciona diretamente nos componentes, ele consegue analisar facilmente quais códigos serão ou não usados, inclusive os que são adicionados após interação do usuário. O que também ajuda a diminuir o código final.
- **Estilo dinâmico simples:** Adaptando os estilos baseando nas `props` recebidas, é possível criar estilos dinâmicos de forma fácil e intuitiva.
- **Manutenção sem dor:** Tudo que você precisa vai estar no próprio contexto do componente, facilitando encontrar tudo o que você precisa para o desenvolvimento.
- **_Vendor prefixing_ automático**: Você escreve seu CSS no melhor padrão do mercado e pronto, os componentes cuidam para fornecer suporte para browsers antigos.

Olha um exemplo:

```js
import styled from 'styled-components'

export const Main = styled.div`
  align-items: center;
  display: flex;
`
```

Vai gerar automagicamente:

```css
.styled__Main-sc-11b8j8d-1-bSsuBw {
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
```

Também é possível passar `props` para criar estilos dinâmicos:

```js
const Button = styled.button`
  background-color: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
`;
render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```

Isso vai gerar:

```css
.sc-fzXfMC {
  background-color: white;
  color: tomato;
}

.sc-fzXfMB {
  background-color: tomato;
  color: white;
}
```

Foda né?

### Melhorando a importação dos estilos

O mais comum é separar os estilos dos componentes, geralmente dentro de um arquivo `styled.js`, com isso é necessário importar cada estilo individualmente, algo como:

```js
import { Header, HeaderMain, HeaderBrand} from './styled'
```

Para facilitar esse processo, considerando que estamos estilizando um componente especifico e todos os estilos vão ser usados, o [Willian Justen](https://willianjusten.com.br) deu uma dica muito legal para facilitar a importação.

```js
import * as S from './styled'

const Header = () => {
  return (
    <S.Header>
      <S.HeaderMain>
        <S.HeaderBrand />
      </S.HeaderMain>
    </S.Header>
  )
}
```

Prático.

### Sensacional! Mas uso Angular, e agora? 😱

Nesse caso tenho uma boa e uma má noticia.

A má noticia é que Styled Componentes foi criado pensando em React (mas funciona [muito bem no Vue](https://dev.to/codestuff2/theme-your-app-with-styled-components-in-vue-28h0), Svelte e etc), não sendo indicado para aplicações Angular.

A boa noticia é que o Angular, desde a versão 2, já carrega um sistema bem completo de tratamento CSS e isolamento de estilos. Esse sistema chama [Component Styles](https://angular.io/guide/component-styles) e funciona muito bem com qualquer pré-processador (e pós processador) do mercado, inclusive funciona nativamente com [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=pt-br).

Ele possui dois modos principais:

- **Shadow DOM:** Usa [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=pt-br) para adicionar estilos ao host do componente e, em seguida, coloca a exibição dos componentes dentro dele.
- **Emulated view encapsulation (padrão):** emula o comportamento de Shadow DOM pré-processando (e renomeando) o código CSS para a exibição do componente, parecido com CSS Modules que vimos antes.

Exemplo:

```css
.title {
  font-size: 2rem:
}
```

Vai gerar:

```css
.title[_ngcontent-pmm-6] {
  font-size: 2rem:
}
```

Ainda implementa sintaxe de _pseudo-classes_ para _Custom Elements_, como `:host`, `:host()` e `:host-context()`, o que facilita uma possível exportação para Web Components.

## Extensões de Styled Components pra facilitar a porra toda 😜

Além das vantagens apresentadas anteriormente, o Styled Componentes ainda tem uma serie de extensões que facilitam demais o dia a dia, vou apresentar duas delas agora.

### styled-media-query

Escrever media query é um saco, ter padrões e consistência é mais chato ainda, então desde a época que codava CSS com Stylus, usava o [Rupture](https://www.npmjs.com/package/rupture-sass) para facilitar a implementação. Depois que adotei o Sass, continuei usando o [rupture-sass](https://www.npmjs.com/package/rupture-sass).

O [styled-media-query](https://github.com/morajabi/styled-media-query) segue a mesma ideia, e deixa muito mais simples e organizado o tratamento das media queries.

Basta escrever:

```js
import styled from 'styled-components';
import media from 'styled-media-query';

const Box = styled.div`
  background: black;

  ${media.lessThan("medium")`
    background: red;
  `}

  ${media.between("medium", "large")`
    background: green;
  `}

  ${media.greaterThan("large")`
    background: blue;
  `}
`;
```

Vai gerar:

```css
div {
  background: black;

  @media (max-width: 768px) {
    background: red;
  }

  @media (min-width: 768px) and (max-width: 1170px) {
    background: green;
  }

  @media (min-width: 1170px) {
    background: blue;
  }
}
```

Simples, eficaz e escalável.

### Styled Icons

Aquele tempo que você precisava baixar ícones manualmente e criar sprites usando seu task-runner favorito ficou para trás. O [Styled Icons](https://styled-icons.js.org/) faz essa experiência ficar simples e fluida.

```js
import styled from 'styled-components'
import { Zap } from 'styled-icons/octicons/Zap'

const RedZap = styled(Zap)`
  color: red;
`

const App = () => <RedZap />
```

E pronto! Seu ícone estará disponível em SVG, o que significa que você pode, por exemplo alterar facilmente a cor, usando um simples `fill: gray`.

## Conclusão

Nos últimos anos o JavaScript assumiu a responsa de várias camadas no Desenvolvimento Web, e impactou positivamente na forma que desenvolvemos, inclusive na maneira que trabalhamos com CSS (Stylus, PostCSS, etc..). Dito isso, usar JavaScript para automatizar cada vez processos que fazíamos manualmente,  acaba sendo natural.

As coisas mudam rapidamente no mundo Front-ender, de tempos em tempos surgem novidades que alteram como lidamos com as tecnologias do mercado, mas sempre vale o aprendizado de novos conceitos em cada etapa dessas mudanças. Caso ainda não utilizou CSS-in-JS, vale testar e tentar implementar na sua stack.

Valeu 🥳
