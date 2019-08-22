---
title: Tutorial - Caixa de compartilhar
date: 2013-09-20 00:00:01
description: Esse artigo é tutorial simples para criar caixas de compartilhar com CSS e um pouco de JavaScript.
tags: []
---

Primeiramente, a falta de novas postagens tem um motivo. Estou trabalhando muito e em vários projetos, portanto meu tempo livre diminuiu.

Após participar do [Front in Sampa](https://twitter.com/frontinsp) no último sábado (14/09), achei que mesmo com pouco tempo é importante arrumar espaço para essas coisas.

## Sobre

Me inspirei no plugin [Classy Social](http://www.class.pm/projects/jquery/classysocial), que é feito totalmente com JavaScript.

Esse tipo de visualização pode ser interessante especialmente para dispositivos com telas menores, onde podemos deixar a caixa de rede social menor, e criar um efeito agradável quando o usuário interagir com ela.

Nível do tutorial: **Básico**

A demo funcional está no [CodePen](http://codepen.io/felipefialho/details/IvmJD).

## Tutorial

### No HTML

A estrutura é muito simples, um botão de "gatilho" para acionar a funcionalidade e uma lista das redes sociais usadas

<div data-height="354" data-theme-id="0" data-slug-hash="IvmJD" data-user="felipefialho" data-default-tab="html" class="codepen">

  <div class="social-media">
    <button class="btn-share"><img src="https://cdn2.iconfinder.com/data/icons/internet/512/Share-128.png"></button>
    <ul class="social-list">
      <li class="item-1"><a href="#" class="social-link" target="_blank"><img src="http://files.softicons.com/download/social-media-icons/free-social-icons-by-icondrawer/png/128x128/facebook.png"></a></li>
      <li class="item-2"><a href="#" class="social-link" target="_blank"><img src="http://files.softicons.com/download/social-media-icons/free-social-icons-by-icondrawer/png/128x128/twitter.png"></a></li>
      <li class="item-3"><a href="#" class="social-link" target="_blank"><img src="http://files.softicons.com/download/social-media-icons/free-social-icons-by-icondrawer/png/128x128/linkedin.png"></a></li>
    </ul>
  </div>

  See the Pen [%= penName %>](http://codepen.io/felipefialho/pen/IvmJD) by Felipe Fialho ([@felipefialho](http://codepen.io/felipefialho)) on [CodePen](http://codepen.io)
</div>

### No CSS

````css
.social-media {
  position: relative;
}
````

Informa que os elementos absolutos vão se basear por aqui.

````css
.btn-share {
  position: absolute; top: 0; left: 0;
  z-index: 10;
}
````

Posiciona o botão de gatilho.

````css
.social-list li {
  margin: 0;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 8px;
  z-index: 5;
  transition: all 0.2s linear 0s;
}
````

Atribui posicionamentos básicos nos itens da lista e informa a transição. O **z-index** precisa ser menor do que do botão.

````css
.social-list.active li {
  opacity: 1;
}
````

Todos os elementos ficaram com opacidade sólida quando estiverem ativos.

````css
.social-list.active li.item-1 {
  left: 170px;
}
.social-list.active li.item-2 {
  left: 310px;
}
.social-list.active li.item-3 {
  left: 450px;
}
````

Posiciona a posição de cada item.

### No JavaScript

````js
$('.btn-share').click(function() {
  $('.social-list').toggleClass('active');
});
````

A única função é acionar o "gatilho" e alternar a classe "active" na lista.

É um tutorial muito simples, mas achei bacana compartilhar com vocês. Espero que tenham gostado...
