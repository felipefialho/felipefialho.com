---
title: "Tutorial - Botão de Progresso"
date: 2013-10-12 00:00:01
description: "Nesse artigo, vou mostrar mais um tutorial simples... o desenvolvimento de um botão de progresso, que pode fornecer um feedback importante para o usuário"
tags: ["css"]
---

Continuo trabalhando em diversos projetos paralelos, em razão disso estou um pouco desaparecido das comunidades que participo.

Mas durante esses projetos, estou pensando e aplicando algumas soluções interessantes, uma delas foi a [caixa de compartilhar](/blog/tutorial-caixa-de-compartilhar-em-puro-css), agora vou mostrar um "botão de progresso".

## Sobre

É sempre importante fornecer algum feedback para o usuário. É muito desconfortável quando você clica em um botão e ele não apresenta nenhuma ação informando que alguma coisa está sendo feita.

Nível do tutorial: **Básico**

A demo funcional está no Codepen.

https://codepen.io/felipefialho/pen/KviDw

## Tutorial

### No CSS

```css
.btn {
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
  transition: opacity linear .2s;
}

.btn:hover{
  opacity: .8;
}
```

Informações básicas do estilo do botão.

```css
.btn-progress {
  cursor: default;
  overflow: hidden;
  position: relative;
}

.btn-progress:hover {
  opacity: 1;
}
```

Quando o botão estiver no estado "processando", vai ter posição relativa, e será zerada qualquer interação que o usuário possa ter, por exemplo "cursor" e "hover".

```css
.btn-progress:after {
  animation: progress-bar-stripes 0.5s linear infinite;
  background-color: #0b4986;
  background-image: linear-gradient(to bottom, #123b6e, #005dab);
  background-repeat: repeat-x;
  background-size: 40px 40px;
  content: "Processing";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
```

Use `:after` para adicionar os estilos.

1. Em `content` adicione o texto que esse estado do botão terá.
2. Ao definir a posição absoluta, width e height como 100%, ele ficará exatamente em cima do botão (definimos como relativo).
3. Em seguida use "background-gradients" para criar listras diagonais.
4. E por último, as chamadas da animação.

```css
@keyframes progress-bar-stripes {
  to   { background-position: 40px 0; }
  from { background-position: 0 0; }
}
```

Agora criamos a animação apenas invertendo a posição do gradiente, dando o efeito desejado.

### No JavaScript

```js
$('.btn').click( function(){
  $(this).toggleClass('btn-progress');
});
```

Apenas um "gatilho" para conseguirem ver o efeito funcionando.

Mais um tutorial rápido que espero ser útil para algumas pessoas. Dias produtivos para todos vocês! :D
