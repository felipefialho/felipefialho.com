---
title: Tutorial - Botão de Progresso
date: 2013-10-12 00:00:01
description: Nesse artigo, vou mostrar mais um tutorial simples... o desenvolvimento de um botão de progresso, que pode fornecer um feedback importante para o usuário.
---

Continuo trabalhando em diversos projetos paralelos, em razão disso estou um pouco desaparecido das comunidades que participo.

Mas durante esses projetos, estou pensando e aplicando algumas soluções interessantes, uma delas foi a [caixa de compartilhar](/blog/2013/tutorial-caixa-de-compartilhar-em-puro-css), agora vou mostrar um "botão de progresso".

## Sobre

É sempre importante fornecer algum feedback para o usuário. É muito desconfortável quando você clica em um botão e ele não apresenta nenhuma ação informando que alguma coisa está sendo feita.

Nível do tutorial: **Básico**

A demo funcional está no [CodePen](http://codepen.io/felipefialho/pen/KviDw).

## Tutorial

### No HTML

Apenas um botão.

<p data-height="400" data-theme-id="light" data-slug-hash="KviDw" data-default-tab="result" data-user="felipefialho" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/felipefialho/pen/KviDw/">Button Progress</a> by Felipe Fialho (<a href="http://codepen.io/felipefialho">@felipefialho</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### No CSS

````css
.btn{
  -webkit-transition: opacity linear .2s;
  -o-transition: opacity linear .2s;
  transition: opacity linear .2s;
  background: #4A8CF6;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  min-width: 120px;
  padding: 0 20px;
  text-align: center;
}

.btn:hover{
  opacity: .8;
}
````

Informações básicas do estilo do botão.

````css
.btn-progress{
  cursor: default;
  overflow: hidden;
  position: relative;
}

.btn-progress:hover{
  opacity: 1;
}
````

Quando o botão estiver no estado "processando", vai ter posição relativa, e será zerada qualquer interação que o usuário possa ter, por exemplo "cursor" e "hover".

````css
.btn-progress:after{

  content: "Processing";

  position: absolute; left: 0; top: 0;
  width: 100%;
  height: 100%;

  background-color: #0b4986;
  background-image: -moz-linear-gradient(top, #123b6e, #005dab);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#123b6e), to(#005dab));
  background-image: -webkit-linear-gradient(top, #123b6e, #005dab);
  background-image: -o-linear-gradient(top, #123b6e, #005dab);
  background-image: linear-gradient(to bottom, #123b6e, #005dab);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff123b6e', endColorstr='#ff005dab', GradientType=0);
  background-color: #005dab;
  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  -webkit-background-size: 40px 40px;
  -moz-background-size: 40px 40px;
  -o-background-size: 40px 40px;
  background-size: 40px 40px;

  -webkit-animation: progress-bar-stripes 0.5s linear infinite;
  -moz-animation: progress-bar-stripes 0.5s linear infinite;
  -ms-animation: progress-bar-stripes 0.5s linear infinite;
  -o-animation: progress-bar-stripes 0.5s linear infinite;
  animation: progress-bar-stripes 0.5s linear infinite;

}
````

Use **:after** para adicionar os estilos.

1.  Em **content** adicione o texto que esse estado do botão terá.
2.  Ao definir a posição absoluta, width e height como 100%, ele ficará exatamente em cima do botão (definimos como relativo).
3.  Em seguida use "background-gradients" para criar listras diagonais.
4.  E por último, as chamadas da animação.

````css
/* Webkit */
@-webkit-keyframes progress-bar-stripes {
  to  { background-position: 40px 0; }
  from    { background-position: 0 0; }
}

/* Firefox */
@-moz-keyframes progress-bar-stripes {
  to  { background-position: 40px 0; }
  from    { background-position: 0 0; }
}

/* IE9 */
@-ms-keyframes progress-bar-stripes {
  from  { background-position: 40px 0; }
  to    { background-position: 0 0; }
}

/* Opera */
@-o-keyframes progress-bar-stripes {
  to  { background-position: 40px 0; }
  from    { background-position: 0 0; }
}

/* Spec */
@keyframes progress-bar-stripes {
  to  { background-position: 40px 0; }
  from    { background-position: 0 0; }
}
````

Agora criamos a animação apenas invertendo a posição do gradiente, dando o efeito desejado.

### No JavaScript

````js
$(".btn").click( function(){
  $(this).toggleClass("btn-progress");
});
````

Apenas um "gatilho" para conseguirem ver o efeito funcionando.

Mais um tutorial rápido que espero ser útil para algumas pessoas. Dias produtivos para todos vocês! :D
