---
title: É possível utilizar componentes desenvolvidos apenas com CSS?
date: 2014-04-22 00:00:01
description: Após o lançamento do CSS Components, escrevo as minhas impressões sobre o quanto é possível utilizar componentes desenvolvidos apenas com CSS.
image: /assets/2014-04-22-e-possivel-utilizar-componentes-desenvolvidos-apenas-com-css.jpg
tags: ["css"]
---

## Sobre o projeto

Sou apaixonado por qualquer coisa desenvolvida usando apenas CSS. Isso começou em meados de 2012, quando tive contato com o [Homer](https://jsfiddle.net/bernarddeluna/G7J5D/) do Bernard de Luna, no mesmo dia desenvolvi o [Cartman](http://codepen.io/felipefialho/details/qzDCJ) e não parei mais, fiz [outras brincadeiras com CSS](http://codepen.io/felipefialho), mas principalmente comecei a buscar no CSS, soluções utilizáveis para os projetos.

Após desenvolver alguns componentes separadamente, imaginei que seria muito mais interessante deixar tudo em um local só.

## As possíveis técnicas

Todos os componentes foram desenvolvidos usando duas técnicas: `:target` e `input hidden`.

Isso porque, através dessas técnicas conseguimos de fato fornecer um estado para um elemento alvo. Ou seja, conseguimos saber qual elemento está "ativo" e fornecer qualquer interação que podemos imaginar (e que os navegadores atuais suportem :p).

## Componentes

### Carrossel

[Ver componente](https://css-components.felipefialho.com/#component-carousel).

Vamos observar o HTML:

```html
<!-- Carousel -->
<div class="carousel">
  <div class="carousel-inner">
    <input class="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden checked>
    <div class="carousel-item">
      ...
    </div>
    <input class="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden>
    <div class="carousel-item">
      ...
    </div>
    <input class="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden>
    <div class="carousel-item">
      ...
    </div>
    <label for="carousel-3" class="carousel-control prev control-1">‹</label>
    <label for="carousel-2" class="carousel-control next control-1">›</label>
    <label for="carousel-1" class="carousel-control prev control-2">‹</label>
    <label for="carousel-3" class="carousel-control next control-2">›</label>
    <label for="carousel-2" class="carousel-control prev control-3">‹</label>
    <label for="carousel-1" class="carousel-control next control-3">›</label>
    <ol class="carousel-indicators">
      <li><label for="carousel-1" class="carousel-bullet">•</label></li>
      <li><label for="carousel-2" class="carousel-bullet">•</label></li>
      <li><label for="carousel-3" class="carousel-bullet">•</label></li>
    </ol>
  </div>
</div>
```

Existe um `<input class="carousel-open" type="radio" hidden >` antes de cada item.

Usamos ainda pares de `<label>` com o `for` apontando para o item alvo. Esse é o truque.

Para os bullets de indicadores, também usamos `<label>` com o `for` apotando para o item alvo.

E agora o CSS passo a passo:

```css
.carousel-inner {
  position: relative;
  overflow: hidden;
}
```

O `overflow: hidden` para nada aparecer fora do bloco e o `position: relative` para os filhos ficarem absolutos em relação a ele.

```css
.carousel-item {
  position: absolute;
  .opacity(0);
  .transition(opacity .6s ease-out);
}
```

Deixamos todos os itens invisíveis através da opacidade 0\. É definida uma animação de 6 segundos durante a mudança de opacidade. O `position: absolute` serve para os itens ficarem posicionados sem influenciar no tamanho do container.

```css
.carousel-open:checked + .carousel-item {
  position: static;
  .opacity(100);
}
```

Atribuímos que quando o `.carousel-item` for o irmão imediato `+` do `.carousel-open` (no caso um `<input radio hidden>`) que estiver checkado, ficará visível e vai ficar com o `position: static`, e assim terá um tamanho que vai influenciar o container.

```css
.carousel-control {
  display: none;
}

#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {display: block;}
```

Esse pedaço de código é para que os controles (as setas) funcionem da maneira esperada. Por padrão elas ficam com `display: none` e passam a ter `display: block` quando o irmão `~` especifico estiver checkado.

No HTML, definimos três pares de `label` que servirão como controles (no caso um carrossel com três itens), cada um deles habilita um item, e esses vão habilitar o par de `label` necessária.

```css
.carousel-bullet {
  color: #fff;
}

#carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,
#carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,
#carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet {
  color: @color-primary;
}
```

Aqui ativamos o indicador. Basicamente, quando o item ativo for irmão do par de controle especifico, e esse também for irmão do indicador que desejamos alcançar (exemplo `li:nth-child(x)`)... ele também ficará ativo.

### Collapse

[Ver componente](https://css-components.felipefialho.com/#component-collapse).

O HTML:

```html
<!-- Collapse -->
<div class="collapse">
  <label class="collapse-open" for="collapse-1">Lorem ipsum dolor sit amet</label>
  <input class="collapse-open" type="checkbox" id="collapse-1" aria-hidden="true" hidden />
  <div class="collapse-content">
    <div class="collapse-inner">
      ...
    </div>
  </div>
</div>
```

Também vamos usar `<input hidden />`, mas nesse caso vamos usar um `type="checkbox"`.

E se precisar que o Collapse funcione como um "accordion", basta usar `type="radio"` e o mesmo `name=""` para todos do grupo.

E o CSS:

```css
.collapse-painel {
  display: none;
}

.collapse-open:checked ~ .collapse-painel {
  display: block;
}
```

Esse é bem simples, por padrão todos os `.collapse-painel` vão ser `display: none` e quando o elemento `.collapse-open` estiver checkado, o `.collapse-painel` irmão `~` vai assumir `display: block`.

### Dropdown

[Ver componente](https://css-components.felipefialho.com/#component-dropdown).

O HTML:

```html
<!-- Dropdown -->
<div class="dropdown">
  <label for="dropdown-1" class="btn btn-dropdown">One Dropdown</label>
  <input class="dropdown-open" type="checkbox" id="dropdown-1" aria-hidden="true" hidden />
  <div class="dropdown-inner">
    ...
  </div>
</div>
```

O funcionamento é muito parecido com o Collapse, um `<input hidden />`, com `type="checkbox"`.

E o CSS:

```css
.dropdown-inner {
  position: absolute;
  .opacity(0);
  .transition(opacity .1s);
  visibility: hidden;
}
```

O dropdown terá `position: absolute` e por padrão vai ter `.opacity(0)` e `visibility: hidden` para ficar escondido. O motivo de usar `visibility: hidden` e não `display: none` é porque dessa forma conseguimos adicionar efeito de transição, aplicado com `.transition(opacity .1s);`.

```css
.dropdown-hover:hover .dropdown-inner,
.dropdown-open:checked ~ .dropdown-inner {
  .opacity(100);
  visibility: visible;
}
```

Quando o `.dropdown-hover` ou `.dropdown-open` estiverem com status `:hover ou :checked`, o `.dropdown-inner` irmão `~` vai ficar visível.

### Modal

[Ver componente](https://css-components.felipefialho.com/#component-modal).

O HTML:

```html
<a href="#modal-one" class="btn">Example</a>

<!-- Modal -->
<div class="modal" id="modal-one" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-header">
      ...
      <a class="btn-close" href="#" aria-hidden="true">×</a>
    </div>
    <div class="modal-body">
      ...
    </div>
    <div class="modal-footer">
      ...
    </div>
  </div>
</div>
```

Também poderia ser usado a técnica do `<input hidden />`, mas dessa vez vamos usar o `:target`. Temos portanto uma estrutura padrão de Modal com o botão fazendo referencia ao `id` do modal que desejamos ativar.

O CSS:

```css
.modal {

  // This is modal bg
  &:before {
    content: "";
    display: none;
    background: rgba(0,0,0,.6);
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 1001;
  }

  &:target {

    // Active animate in modal
    &:before {
      display: block;
    }
    .modal-dialog {
      .translate(0, 0);
      top: 20%;
    }

  }

}
```

O `:before` cria o background do modal (o fundo escuro), dessa forma não precisamos criar nenhum elemento adicional, por padrão ele tem `display: none`.

Através do `:target` informamos que o background (`:before`) terá `display: block` e o elemento `.modal-dialog` terá o translate zerado e `top: 20%`.

```css
// Mixin for transition/transform
.transition-transform(@transition) {
  -webkit-transition: -webkit-transform @transition;
     -moz-transition: -moz-transform @transition;
       -o-transition: -o-transform @transition;
          transition: transform @transition;
}

// Modal dialog
.modal-dialog {
  margin-left: -300px;
  position: fixed;
  left: 50%;
  top: -100%;
  .translate(0, -500%);
  .transition-transform(~"0.3s ease-out");
  width: 80%;
  max-width: 600px;
  z-index: 1111;
}
```

Deixamos com `.translate(0, -500%)`, assim ele fica fora da área visível, para a animação usamos `.transition-transform(~"0.3s ease-out")`, que está definido em um mixin. O `top` inicial fica definido com `-100%`.

### Tab

[Ver componente](https://css-components.felipefialho.com/#component-tab).

O HTML:

```html
<!-- Tab -->
<div class="tab">

  <!-- Tab Painel -->
  <div class="tab-painel">
    <input class="tab-open" id="tab-1" name="tab-wrap-1" type="radio" aria-hidden="true" hidden checked>
    <label class="tab-nav" for="tab-1">Tab 1</label>
    <div class="tab-inner">
      ...
    </div>
  </div>

  <div class="tab-painel">
    <input class="tab-open" id="tab-2" name="tab-wrap-1" type="radio" aria-hidden="true" hidden>
    <label class="tab-nav" for="tab-2">Tab 2</label>
    <div class="tab-inner">
      ...
    </div>
  </div>

  <div class="tab-painel">
    <input class="tab-open" id="tab-3" name="tab-wrap-1" type="radio" aria-hidden="true" hidden />
    <label class="tab-nav" for="tab-3">Tab 3</label>
    <div class="tab-inner">
      ...
    </div>
  </div>

</div>
```

Mais um caso de uso do `<input hidden />` do tipo `radio`.

A maior diferença dessa estrutura para a usada normalmente para tabs, é não ter um elemento de agrupamento para o menu. Precisamos utilizar um `<label>` com a classe `.tab-nav`, entre o `<input hidden />` e o `.tab-inner`

O CSS:

```css
.tab{
  position: relative;
}

.tab-painel{
  display: inline-block;
  min-height: 150px;
}
```

Adicionamos `position: relative` na `.tab` para que os elementos absolutos se posicionem a partir dele. No `.tab-painel` colocamos um tamanho minimo e `display: inline-block` para que fique lado-a-lado.

```css
.tab-nav {
  border: @gray-light solid 1px;
  cursor: pointer;
  display: inline-block;
  padding: (@space / 2) @space;
  margin-right: @space;
}

.tab-nav:hover,
.tab-open:checked ~ .tab-nav {
  background-color: @gray-lighter;
}
```

Aqui damos algumas características visuais simples para a `.tab-nav`.

```css
.tab-inner {
  .opacity(0);
  margin-top: @space;
  position: absolute; left: 0;
  .transition(opacity .1s);
  visibility: hidden;
}

.tab-open:checked ~ .tab-inner{
  .opacity(100);
  visibility: visible;
}
```

Definimos que a `.tab-inner` por padrão seja invisível e absoluta. Em seguida definimos que ela ficará visível quando o `.tab-open` irmão estiver como `:checked`.

## Teste real

E a melhor maneira de testar, é aplicando em um projeto real. Para isso escolhi meu site.

Aqui um resultado de teste no [GTMetrix](gtmetrix.com) antes da alteração.

![Resultado com JavaScript](assets/gt-metrix-old.jpg)

Fui radical e removi todo o JavaScript do projeto. Passei a usar o CSS Componentes de Modal e Collapse.

![Resultado sem JavaScript](assets/gt-metrix-new.jpg)

Como plus, otimizei o carregamento dos icones e retirei a imagem de "fork".

![Resultado Otimizado](assets/gt-metrix-plus.jpg)

Como podem observar, o resultado ao usar o CSS Components foi satisfatório. Mas o que trouxe mais resultados foi essa pequena otimização, retirando a imagem de "fork" e melhorando o carregamento dos ícones adicionando direto no CSS, evitando assim mais requisições.

Isso mostra que qualquer ganho de performance é importante, mas alguns ajustes que muitas vezes não lembramos de fazer, podem ser mais decisivos na otimização.

## Conclusão

Afirmo que **SIM**, é possível utilizar componentes apenas em CSS, especialmente em projetos menores. E não duvido que isso possa ser uma tendência daqui para frente.

O JavaScript se consolida cada vez mais para várias funções que não usávamos antigamente, e vejo boas possibilidades do CSS ter um papel cada vez mais importante na manipulação de interações.

Espero que tenham gostado :D
