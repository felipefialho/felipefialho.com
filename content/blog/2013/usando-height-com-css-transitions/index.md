---
title: Usando height com CSS Transitions
date: "2013-11-18"
description: Hoje me deparei com um problema que alguns de vocês já devem ter passado, e coloco aqui a resolução da limitação do uso de height com CSS Transitions.
---

Hoje me deparei com um problema que alguns de vocês já devem ter passado, e coloco aqui a resolução: A limitação do uso de "height: auto" em CSS Transitions.

## Atualização - 20/09/2016

Esse post é bem antigo, escrevi em meados de 2013. Ano passado desenvolvi uma solução mais moderna, utilizando `transform scaleY()` para simular o efeito.

O resultado pode ser visto no Codepen.

<p data-height="650" data-theme-id="0" data-slug-hash="LkOXBA" data-user="felipefialho" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/felipefialho/pen/LkOXBA'>Animate height with CSS transitions using scale()</a> by Felipe Fialho (<a href='http://codepen.io/felipefialho'>@felipefialho</a>) on <a href='http://codepen.io'>CodePen</a>
<script async src="//codepen.io/assets/embed/ei.js"></script>

## O problema

Você precisa expandir a altura de algum elemento que está escondido e ao invés de um simples "display: none/block", resolve usar CSS Transitions para o movimento ficar mais interessante e emular um "slide-down".

Então você faz algo desse tipo:

````css
.accordion-content{
  transition: height 1s;
  overflow: hidden;
  height: 0;
}

.accordion-content.active{
  height: auto;
}
````

Estranhamente isso não funciona e você se pergunta o motivo.

## A explicação

A explicação é simples. O CSS não consegue fazer a animação a partir do "height: auto", ele precisa de algum tamanho definido para se basear.

Só que você também não pode simplesmente setar uma altura fixa, já que isso traria problemas para trabalhar responsivamente.

## A resolução

A boa notícia é que a resolução dessa limitação é simples!

Usaremos "max-height" para contornar isso.

````css
.accordion-content{
  transition: max-height 1s;
  overflow: hidden;
  max-height: 0;
}

.accordion-content.active{
  max-height: 300px;
}
````

Adicione uma altura próxima ao tamanho máximo do elemento.

Ou seja, na versão ativa do elemento, ele terá uma altura máxima setada, e assim o CSS tem uma base para calcular a transição.

O maior problema é caso o conteúdo seja dinamico e ultrapasse o tamanho máximo que você setou. Nesse caso pode usar JavaScript para calcular a altura.

Deixei um exemplo funcional no <a href="http://codepen.io/felipefialho/pen/ICkwe">CodePen</a> para demonstrar melhor o funcionamento.

<p data-height="368" data-theme-id="0" data-slug-hash="ICkwe" data-user="felipefialho" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/felipefialho/pen/ICkwe'>Animate "height" with CSS Transitions</a> by Felipe Fialho (<a href='http://codepen.io/felipefialho'>@felipefialho</a>) on <a href='http://codepen.io'>CodePen</a>
<script async src="//codepen.io/assets/embed/ei.js"></script>
