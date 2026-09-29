---
title: 'Variáveis CSS: Os superpoderes das variáveis nativas do CSS'
date: 2020-09-03 00:00:01
description:
  'Nesse artigo (e vídeo) vou mostrar um pouco das poderosas variáveis nativas
  do CSS (aka Custom Properties) ❤️, que talvez sejam uma das coisas
  (infelizmente) mais sub utilizadas no CSS.'
image: /assets/2020-09-03-cover.jpg
tags: ['css', 'variaveis', 'javascript']
---

Esse texto é uma versão em texto do vídeo: "Variáveis CSS - Os superpoderes das
variáveis nativas do CSS"
[que publiquei no meu canal no Youtube](https://www.youtube.com/@felipefialhodev).

Vale a pena assistir! 😊

<iframe width="650" height="400" src="https://www.youtube.com/embed/A_3Tm8iOxtA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Evolução do CSS nos últimos anos

Nos últimos anos tivemos uma série de melhorias importantes no CSS, como
[CSS Grid e Flexbox](/blog/css-grid-e-flexbox-quando-utilizar) e as Variáveis
CSS, que na minha visão estão misteriosamente entre as coisas mais sub
utilizadas do CSS.

O motivo disso talvez seja o fato das variáveis já estarem presentes faz anos e
anos nos pré-processadores de CSS ou mesmo nas soluções de CSS-in-JS.

Então percebo que as pessoas acabam utilizando essas variáveis e não se
interessam tanto em utilizar as variáveis nativas do CSS. Outro motivo talvez
seja a própria sintaxe que é um pouco verbosa e desagrada algumas pessoas (já vi
muita gente falar isso hahaha 😂).

Motivações a parte, essa é uma feature super poderosa e extremamente útil pra
gente utilizar no dia a dia.

## Variáveis de pré-processadores

As variáveis de pré-processadores (como Sass, Stylus ou mesmo CSS-in-JS) são
**estáticas**, ou seja, são convertidas em valores fixos logo após o build.

Por exemplo o código (em SCSS) a seguir:

```scss
$gray: #555;
$gray-dark: #333;
$gray-darker: #111;
$gray-light: #f1f1f1;
$gray-lighter: #fafafa;
$blue: #187888;
$yellow: #e6af05;
$white: #fff;
$black: #000;

body {
  background-color: $white;
  color: $gray-darker;
}

.header {
  background-color: $gray-light;
  color: $gray-darker;
}
```

Vai ser compilado nesse CSS:

```css
body {
  background-color: #fff;
  color: #111;
}

.header {
  background-color: #f1f1f1;
  color: #111;
}
```

Se a gente quiser, por exemplo, alterar o tema depois de clicar num botão, vai
ser necessário usar estratégias como adicionar uma classe no `body` para
sobrescrever o valor inicial.

```scss
$gray-dark: #333;
$gray-darker: #111;
$gray-light: #f1f1f1;
$gray-lighter: #fafafa;
$white: #fff;
$black: #000;

body {
  background-color: $white;
  color: $blue;

  &.theme-dark {
    background-color: $black;
    color: $gray-lighter;
  }
}

header {
  background-color: $gray-light;
  color: $gray-darker;

  .theme-dark & {
    background-color: $gray-darker;
    color: $gray-lighter;
  }
}
```

Que vai gerar esse CSS:

```css
body {
  background-color: #ffffff;
  color: #187888;
}

body.theme-dark {
  background-color: #000000;
  color: #fafafa;
}

.header {
  background-color: #f1f1f1;
  color: #111;
}

.theme-dark .header {
  background-color: #111111;
  color: #fafafa;
}
```

Ou seja, precisaríamos alterar as cores de todos os elementos que precisassem
ter os valores substituídos quando o `body` tiver a classe `theme-dark`, o que
eventualmente pode ser complicado de mapear e escalar.

Outro ponto é que essas variáveis estão presas a sintaxe da tecnologia em que
elas foram criadas, ou seja, compartilhar variáveis criadas no Sass para CSS
nativo ou para CSS-in-JS, só é possível utilizando plugins.

## CSS Variables (aka Custom Properties)

Já as variáveis nativas do CSS são sempre **dinâmicas**, ou seja, elas continuam
disponíveis como variáveis sempre que a gente precisar acessar o valor delas.

Observem esse código em puro CSS.

```css
:root {
  --gray-dark: #333;
  --gray-darker: #111;
  --gray-light: #f1f1f1;
  --gray-lighter: #fafafa;
  --white: #fff;
  --black: #000;
}

body {
  background-color: var(--white);
  color: var(--gray-darker);
}
```

O código acima vai ser sempre o mesmo código, isso porque as Variáveis CSS não
dependem de nenhuma tecnologia extra pra funcionarem (como pré-processadores ou
CSS-in-JS) e nem são compiladas.

Elas são simplesmente interpretadas pelo browser!

### Variáveis nativas respeitam a cascata do CSS

A pseudo-classe `:root` representa o elemento `<html>` e é idêntico ao seletor
`html`, exceto que sua especificidade é mais alta. O motivo de quase todos os
elementos de uso dessas variáveis atrelarem ao `:root` é justamente por ter a
maior a especificidade entre os elementos acessíveis no CSS.

Pode ler mais sobre essa pseudo-classe na
[documentação do MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/:root).

Dito isso, uma grande vantagem das Variáveis CSS é o fato delas estarem
disponíveis (e podem ser alteradas) usando a cascata do CSS.

Ou seja, conseguimos alterar o valor de uma variável como nesse exemplo:

```scss
:root {
  --gray: #555;
}

body {
  --gray: #111;
  color: var(--gray); //#111
}
```

E isso abre uma série de possibilidades bem legais 😁

### Criando temas facilmente

Sabendo que as variáveis nativas do CSS são **dinâmicas** e respeitam a cascata
do próprio CSS, podemos usar uma estratégia diferente para criar temas.

Pensando no exemplo abaixo (o mesmo que usamos no exemplo de troca de tema
usando as variáveis de pré-processador):

```scss
$gray-dark: #333;
$gray-darker: #111;
$gray-light: #f1f1f1;
$gray-lighter: #fafafa;
$white: #fff;
$black: #000;

body {
  background-color: $white;
  color: $blue;

  &.theme-dark {
    background-color: $black;
    color: $gray-lighter;
  }
}

header {
  background-color: $gray-light;
  color: $gray-darker;

  .theme-dark & {
    background-color: $gray-darker;
    color: $gray-lighter;
  }
}
```

Podemos ter o mesmo resultado utilizando as Variáveis CSS:

```scss
:root {
  --gray-dark: #333;
  --gray-darker: #111;
  --gray-light: #f1f1f1;
  --gray-lighter: #fafafa;
  --white: #fff;
  --black: #000;

  --background: var(--white);
  --background-header: var(--gray-light);
  --text-color: var(--gray-darker);
}

body {
  background-color: var(--background);
  color: var(--text-color);

  &.theme-dark {
    --background: var(--black);
    --background-header: var(--gray-darker);
    --text-color: var(--gray-lighter);
  }
}

.header {
  background-color: var(--background-header);
  color: var(--text-color);
}
```

Quando utilizamos as variáveis nativas não precisamos mais sobrescrever os
valores em todos os elementos, podemos simplesmente aproveitar da cascata do CSS
para sobrescrever o valor **das variáveis** dentro na classe `.theme-dark`.

Com isso utilizamos muito menos código e temos muito mais escalabilidade dentro
da aplicação.

Sensacional né? 😍

### Manipuláveis com JavaScript

Como as Variáveis CSS são dinâmicas, temos outra possibilidade interessante:

> Manipular os valores com Javascript

Podemos por exemplo mudar a posição de determinado item na tela de acordo com a
posição do cursor, apenas alterando os valores das Variáveis CSS.

```css
:root {
  --move-x: var(0);
  --move-y: var(0);
}

.logo {
  left: var(--move-x);
  position: fixed;
  top: var(--move-y);
}
```

Então é só alterar o valor das variáveis no JavaScript conforme a posição do
cursor:

```js
const $body = document.body

document.addEventListener('mousemove', e => {
  $body.style.setProperty('--move-x', `${e.clientX}px`)
  $body.style.setProperty('--move-y', `${e.clientY}px`)
})
```

![Gif de exemplo da manipulação com JavaScript](assets/2020-09-03-js.gif)

Isso é totalmente demais 🤯

Recomendo que assistam no
[video a parte que demonstro a manipulação com JavaScript](https://youtu.be/A_3Tm8iOxtA?t=527)
e também podem testar no exemplo que deixei no Codepen:

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/felipefialho/embed/ExKaOQr?default-tab=result" title="CSS Variables" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/felipefialho/pen/ExKaOQr">CSS Variables</a> por Felipe Fialho no CodePen</figcaption>
</figure>

### São agnósticas sobre a stack de CSS utilizada

Outra vantagem das Variáveis CSS é que elas são agnósticas com relação as
tecnologias de CSS utilizadas no projeto.

Precisei fazer uso disso no
[Venice, o Design System da Juntos Somos Mais](/blog/design-system-venice-e-as-pecas-do-lego).

A gente precisava que coisas como cores, espaçamento e tipografia fossem
compartilhadas entre todos os projetos da empresa. Mas os projetos usam stacks
variadas de CSS, como: Styled Components, Stylus e Sass, a única tecnologia
comum entre todas elas é o próprio CSS.

Então as variáveis nativas do CSS resolveram essa questão pra gente, bastando
importar a lib do [Venice](https://github.com/juntossomosmais/venice) nos
projetos e as variáveis já estão disponíveis no projeto.

Além de serem dinâmicas e fáceis de usar, elas funcionam em qualquer cenário.

### Desvantagens: Media Queries

Não sei exatamente se é uma desvantagem, mas com certeza uma limitação,
infelizmente não conseguimos usar Variáveis CSS como valores das media queries

Ou seja, isso não funciona:

```scss
:root {
  --screen-sm: 768px;
}

body {
  @media (min-width: var(--screen-sm)) {
    ...
  }
}
```

Nesse caso ainda precisamos usar variáveis de pré-processadores para funcionar
como esperado.

Por outro lado, conseguimos alterar o valor de variáveis dentro dos media
queries, aproveitando da cascata que mostrei anteriormente.

```scss
body {
  @media (min-width: 768px) {
    --background: var(--black);
    --text-color: var(--white);
  }
}
```

## Suporte

![CSS Variables - Can I Use](assets/2020-09-03-can-i-use.png)

Como podem ver, as Variáveis CSS tem suporte total em todos os navegadores
modernos.

E existem uma série de plugins (alguns que rodam no PostCSS), como o
[css-vars-ponyfill](https://github.com/jhildenbiddle/css-vars-ponyfill) que
basicamente transformam as Variáveis CSS em valores estáticos, dando assim
suporte para navegadores antigos.

# Conclusão

As Variáveis CSS ainda estão entre as coisas mais sub valorizadas do chamado CSS
módulo 4, mas são muito poderosas e podem ajudar demais no dia a dia.

- [MDN Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Can I Use CSS Variables (Custom Properties)](https://caniuse.com/#feat=css-variables)
- [Everything you need to know about CSS Variables](https://www.freecodecamp.org/news/everything-you-need-to-know-about-css-variables-c74d922ea855)

Espero que tenham gostado do texto (e do vídeo) ❤️
