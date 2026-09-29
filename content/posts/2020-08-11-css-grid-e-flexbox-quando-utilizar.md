---
title: 'CSS Grid e Flexbox - Quando utilizar?'
date: 2020-08-11 00:00:01
description:
  'Tem dúvidas sobre quando utilizar CSS Grid e quando utilizar Flexbox? Esse
  artigo (e vídeo!) pode te ajudar 😁'
image: /assets/2020-08-11-cover.jpg
tags: ['flexbox', 'css', 'css grid']
---

Esse texto é uma versão em texto do vídeo: "CSS GRID e Flexbox - Quando
utilizar?"
[que publiquei no meu canal no Youtube](https://www.youtube.com/@felipefialhovlog).

Vale a pena assistir! 😊

<iframe width="650" height="400" src="https://www.youtube.com/embed/0mupCznyGqE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## No passado

Quem trabalhou com desenvolvimento Front-end no passado sabe da dificuldade que
a gente tinha pra fazer coisas triviais como um simples alinhamento vertical.

O mesmo acontecia no desenvolvimento de Grids, então passamos por fazer como:
Layouts em tabela, colunas desenvolvidas com `float` (com `clear: both` claro
😱) até a gente chegar em soluções melhores como: Jeet, Lost ou mesmo os Grids
do Boostrap.

Mas nenhuma delas é uma solução tão simples e completa como CSS Grid.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1270449211520270336">
    <p>Sobre grids:<br><br>CSS Grid + Flexbox resolvem basicamente todas as dores que tínhamos com relação a grids na Web.<br><br>Faz bastante tempo que não uso outras soluções.<br><br>O melhor de tudo? <br>Tem bom suporte até mesmo no IE11. <a href="https://t.co/AVZ59QWQCJ">https://t.co/AVZ59QWQCJ</a></p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1270449211520270336">June 9, 2020</a></figcaption>
</figure>

## CSS Grid ou Flexbox?

Essa é uma dúvida muito comum.

Ambos ajudam **demais** no alinhamento (horizontal e vertical) e no
desenvolvimento de grids dentro de aplicações modernas, mas justamente por ser
possível resolver problemas parecidos (ou até iguais) com eles, as pessoas
acabam tendo dúvidas de quando utilizar um e quando utilizar outro.

O fato é que eles podem e devem ser utilizados juntos!

![Imagem mostrando a diferença entre CSS Grid e Flexbox](https://pbs.twimg.com/media/EcgI56IWsAAnQrB?format=jpg&name=900x900)

A
[imagem acima foi compartilhada](https://twitter.com/diogomoretti_/status/1281283890951446528)
pelo [Diogo Moretti](https://twitter.com/diogomoretti_) e ilustra muito bem a
diferença entre os dois.

Se a gente imaginar uma casa:

- **CSS Grid**: Seria responsável pela estrutura dos cômodos
- **Flexbox**: Seria responsável pela disposição dos móveis dentro desses
  cômodos

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1281207633140224002">
    <p>Dica sobre Flexbox e CSS Grid:<br><br>◻️ Flexbox é unidimensional, ou seja, linha OU coluna. Perfeito pra COMPONENTES.<br><br>🔳 CSS Grid é multidimensional, ou seja, linhas E colunas. Perfeito pra LAYOUTS.<br><br>Então podemos criar componentes com Flexbox e usar dentro de layouts em CSS Grid 😁 <a href="https://t.co/0WKHchJZUX">pic.twitter.com/0WKHchJZUX</a></p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1281207633140224002">July 9, 2020</a></figcaption>
</figure>

Isso porque, **Flexbox** é unidimensional, ou seja, linha OU coluna, então é
perfeito para o desenvolvimento interno de COMPONENTES.

Já **CSS Grid** é multidimensional (ou bidimensional), ou seja, linhas E
colunas, perfeito pra LAYOUTS.

## Na prática

_Disclaimer 1: Todos os exemplos de código estão escritos em Sass_ _Disclaimer
2: Os gatos das imagens são meus próprios gatos 😻_

### Card em bloco

![Card em bloco](assets/2020-08-11-display-block.png)

```scss
.card {
  background-color: #fff;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 24px;
}
```

A primeira coisa é que nem sempre precisamos utilizar `display: flex` e
`display: grid`, em casos em que queremos por exemplo, um card em formato bloco,
ou seja, uma coisa em baixo da outra, podemos simplesmente utilizar
`display: block`.

Lembrando que vários elementos do HTML, como `div`, `section`, `article`, `h1`,
`p`, entre outros já são block, então muitas vezes nem precisamos explicitamente
adicionar isso no CSS.

Sendo assim, para atingir o resultado da imagem acima, o código não precisou nem
de `display: flex` nem de `display: grid`.

### Componentes - Flexbox

**Comportamento de coluna**

Mas eventualmente vamos precisar, por exemplo, centralizar um card na vertical.
Então `display: flex` se torna extremamente útil:

![Alinhamento vertical](assets/2020-08-11-flexdirection-column.png)

```scss
.card {
  background-color: #fff;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
}
```

Lembrando que `display: flex` tem `flex-direction: row` por padrão então não
precisamos escrever isso, mas quando queremos tratar isso em coluna precisamos
explicitamente adicionar `flex-direction: column`.

O comportamento é parecido com `display: block` mas agora temos a possibilidade
de alinhar verticalmente, utilizando `justify-content` e horizontalmente
utilizando `align-items` (os eixos ficam invertidos em comparação ao
`flex-direction: row`).

**Comportamento de linha**

Caso a gente queira que o card assuma comportamento de linha, basta remover
`flex-direction: column`, isso porque como disse anteriormente `display: flex`
tem `flex-direction: row` como padrão.

![Alinhamento vertical](assets/2020-08-11-flexdirection-row.png)

```scss
.card {
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  padding: 24px;
}
```

E nesse caso o `align-items: center` faz o alinhamento vertical e
`justify-content` o alinhamento horizontal.

Nesses exemplos é possível ver como fica simples e rápido manipular componentes
com **Flexbox**, conseguimos ótimos resultados de uma maneira bem simples e com
poucas linhas de código.

### Layouts - CSS Grid

Agora que já entendemos como o **Flexbox** funciona bem com componentes, vou
mostrar como o CSS Grid é perfeito pra layouts!

Se a gente quiser, por exemplo, adicionar os cards do lado do outro, em três
colunas, precisamos somente adicionar algumas propriedades do CSS Grid no
elemento pai.

Nesse caso criei um elemento `.grid` que fica responsável por organizar os
grids, enquanto o componente card fica responsável pela exibição do card.

![CSS Grid](assets/2020-08-11-cssgrid.png)

```scss
.grid {
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  grid-template-columns: repeat(3, 1fr);
}
```

Usando `grid-column-gap` e `grid-row-gap` a gente consegue adicionar
espaçamentos entre os elementos filhos (vertical e horizontal!), sem encostar no
código deles. Sensacional né?

Pensem o quão incrível **CSS Grid** é para cuidar dos grids das nossas
aplicações 😍

Importante falar que até esse momento (08/2020), o **Flexbox** não tem a
propriedade `gap`,
[mas isso está prestes a mudar!](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).

**E acredite! Com CSS Grid a gente consegue grids responsivos sem media
queries**

Preciso mostrar o quão espetacular é isso.

![CSS Grid - Autofit 2 colunas](assets/2020-08-11-cssgrid-autofit-1.png)
![CSS Grid - Autofit 1 colunas](assets/2020-08-11-cssgrid-autofit-2.png)

```scss
.grid {
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

Se a gente quiser, por exemplo, que o grid tenha 3 colunas no Desktop, 2 colunas
em Tablets e 1 coluna no Mobile, de acordo com o número de elementos que cabe na
tela, é só adicionar `autofit` junto `minmax`.

`250px` é o tamanho mínimo das colunas na tela e `1fr` representa uma fração do
espaço disponível no grid.

Nesse artigo
[publicado no CSS Tricks](https://css-tricks.com/introduction-fr-css-unit/) em
2017, é possível entender melhor como a unidade `fr` funciona e porque ela é tão
utilizada com **CSS Grid**.

Vale ver todos esses exemplos funcionando na prática 😜

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/felipefialho/embed/abdKyKP?default-tab=result" title="Pen de @felipefialho no CodePen" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/felipefialho/pen/abdKyKP">Ver pen de @felipefialho no CodePen</a></figcaption>
</figure>

Abrindo esse exemplo e redimensionando a tela, é possível ver que os grids se
adaptam a resolução, tudo isso sem nenhuma linha de media queries 😁

## Suporte

![CSS Grid - Can I Use](assets/2020-08-11-cssgrid-can-i-use.png)
![Flexbox - Can I Use](assets/2020-08-11-flexbox-can-i-use.png)

Tanto [CSS Grid](https://caniuse.com/#search=css%20grid) quanto
[Flexbox](https://caniuse.com/#feat=flexbox) apresentam suporte completo em
todos os navegadores modernos e suporte parcial desde o IE10!

# Conclusão

Nos últimos anos o CSS ganhou várias features interessantes e que facilitam
demais nosso dia a dia, sem dúvidas **CSS Grid** e **Flexbox** estão entre
minhas propriedades favoritas.

Como já estão disponíveis faz alguns anos, conseguimos encontrar milhares de
materiais que facilitam o aprendizado e o uso delas, posso deixar de exemplo:

- [MDN Flexbox](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Flexbox)
- [MDN CSS Grid](https://developer.mozilla.org/pt-BR/docs/Web/CSS/grid)
- [Flexbox Froggy](https://flexboxfroggy.com/)
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

Espero que tenham gostado do texto (e do vídeo, hahaha) ❤️
