---
title: "Apresento o Rucksack"
date: 2015-10-21 00:00:01
description: "Nesse artigo vou mostrar para vocês o Rucksack, um pacote de features desenvolvido em PostCSS que pode ser de grande ajuda no seu workflow"
image: /assets/2015-10-21-apresento-o-rucksack.jpg
tags: ["css"]
---

## Introdução

Tenho certeza absoluta que o [PostCSS](https://github.com/postcss/postcss) vai estar cada vez mais presente no nosso dia a dia, já que é absolutamente fantástico e pode ser usado de várias formas, inclusive junto com o pré-processador da sua preferencia, ou seja, a escalabilidade é total.

Muitas ferramentas já estão utilizando o PostCSS, um exemplo é o grid-system [Lost](https://github.com/corysimmons/lost), desenvolvido pelo mesmo criador do super conhecido [Jeet](http://jeet.gs).

Porém o foco desse artigo é o [Rucksack](http://simplaio.github.io/rucksack).

## O que é?

Quem me mostrou essa ferramenta foi o [Milson Junior](https://github.com/mjnr) e desde então fiquei fascinado com algumas coisas que ela oferece.

[Rucksack](http://simplaio.github.io/rucksack) é um pacote de funcionalidades que pode ser usado em qualquer pré-processador, com o PostCSS ou até mesmo ser injetado diretamente no Stylus.

Um detalhe importante, é que seu CSS gerado não terá **nenhum** código extra.

## Instalação

Vou mostrar uma configuração utilizando o Grunt + Stylus, mas é possível ver todas as configurações [aqui](http://simplaio.github.io/rucksack/docs/#usage).

Baixe o [PostStylus](https://github.com/seaneking/poststylus) e o Rucksack.

```bash
$ npm install --save poststylus rucksack-css
```

Em seguida crie uma função para utilizar o PostCSS na sua configuração do Stylus no Grunt:

```js
var rucksack = require('rucksack-css');

var postcss = function(){
  return require('poststylus')(['rucksack-css']);
}
```

Caso queira utilizar outra ferramenta em PostCSS, como o Lost, também deve chamar dessa forma, por exemplo:

```js
var postcss = function(){
  return require('poststylus')(['rucksack-css', 'lost']);
}
```

Depois é só chamar no `use` do Stylus dentro do seu Gruntfile:

```js
stylus: {
  dev: {
    options: {
      use: [postcss],
    }
  }
}
```

### Opções

É possível habilitar ou desabilitar algumas opções do Rucksack. Por padrão apenas as opções de _autoprefixer_ e _fallbacks_ ficam desabilitadas.

#### Fallbacks

Adiciona compatibilidade de algumas propriedades para navegadores antigos.

Por exemplo:

```stylus
.foo
  opacity 0.8
```

Vai gerar:

```css
foo {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  opacity: 0.8;
}
```

#### Autoprefixer

Faz a mágica de adicionar prefixos automaticamente para você, e sempre se baseando na tabela mais atualizada do [CanIUSe](http://caniuse.com).

Por exemplo:

```css
.foo
  display flex
```

Vai gerar:

```css
.foo {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex
}
```

Como acho essas funções importantes, deixei ambas habilitadas.

```js
var postcss = function() {
  return require('poststylus')([rucksack({
    autoprefixer: true,
    fallbacks: true
  })]);
}
```

## Features

Agora vou fazer um breve resumo das funcionalidades que achei mais relevantes.

### Responsive Typography

De longe é o que mais me impressionou. É simplesmente incrível!

Suas fontes ficarão responsivas automaticamente, não é magia nem JavaScript, é apenas CSS.

Pode ler toda a documentação [aqui](http://simplaio.github.io/rucksack/docs/#responsive-type), mas estou usando da seguinte forma:

Como utilizo REM, defino no HTML um range entre 7px e 10px.

```stylus
html
  font-size responsive 7px 10px
```

E pronto!

O motivo de ser entre 7px e 10px, é que assim posso usar o REM como se fosse pixel, ou seja, 1.6rem = 16px. Então consigo ter mais controle na fidelidade das fontes.

Travando o minimo em 7px, garanto que as tipografias vão diminuir no máximo 3px, então elas vão ficar em um tamanho adequado para dispositivos menores.

### Shorthand Positioning

Outra mão na roda, sabe quando a gente precisa deixar um elemento absoluto ou fixo e quer que ele ocupe todo o espaço?

Basta fazer isso:

```stylus
.foo
  position absolute 0
```

E você terá isso:

```css
.foo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

### Property Aliases

Tem preguiça de escrever o nome completo de alguma propriedade?

Crie um alias!

```stylus
@alias
  fs font-size

.foo
  fs 16px
```

Para ter isso:

```css
.foo {
  font-size: 16px;
}
```

### Font Src Expansion

Sabe aquelas funções que criamos no pré-processador para gerar nosso font-face mais facilmente? É coisa do passado, agora podemos usar "nativamente".

```stylus
@font-face
  font-family 'My Font'
  font-path '/my/font/file'
  font-weight normal
  font-style normal
```

E vai gerar o código completo:

```css
@font-face {
  font-family: 'My Font';
  src: url("/my/font/file.eot");
  src: url("/my/font/file.eot?#iefix") format('embedded-opentype'),
       url("/my/font/file.woff") format('woff'),
       url("/my/font/file.ttf") format('truetype'),
       url("/my/font/file.svg") format('svg');
  font-weight: normal;
  font-style: normal;
}
```

### All The Easings

Um pacote completo com transições incríveis.

Escreva:

```stylus
.foo
  transition all 250ms ease-in-cubic
```

E terá:

```css
.foo {
  transition: all 250ms cubic-bezier(0.55, 0.055, 0.675, 0.19);}
```

Chega de perder tempo entrando em sites para gerar o código pra você :)

Pode ver todas as transições [aqui](http://simplaio.github.io/rucksack/docs/#easings).

## Conclusão

O Rucksack oferece features interessantes que podem agilizar muito nosso dia a dia.

Funcionalidades como a de _Responsive Typography_ ou _All The Easings_ são motivos mais do que suficientes para começar a usar o quanto antes.

E ai gostaram do artigo? Alguma consideração? Mandem ver nos comentários!
