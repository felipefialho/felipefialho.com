---
title: 'CSS Grid e Flexbox - Quando utilizar?'
date: 2020-08-11 00:00:01
description:
  'Tem dúvidas sobre quando utilizar CSS Grid e quando utilizar Flexbox? Esse
  artigo (e vídeo!) pode te ajudar 😁'
image: /assets/2020-08-11-cover.png
tags: ['flexbox', 'css', 'css grid']
---

## Antes: Vídeo no Youtube

Esse texto é uma versão do vídeo: "CSS GRID e FLEXBOX - Quando utilizar?"
[que publiquei no meu canal no Youtube](https://youtube.com/FelipeFialhoDev).
Vale a pena assistir! 😊

<iframe width="650" height="400" src="https://www.youtube.com/embed/0mupCznyGqE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Continuando...

Quem trabalhou com desenvolvimento Front-end no passado sabe da dificuldade que
a gente tinha para fazer coisas triviais como um simples alinhamento vertical.

O mesmo acontecia no desenvolvimento de Grids, então passamos por fazer como:
Layouts em tabela, colunas desenvolvidas com `float` (com `clear: both` claro
😱) até a gente chegar em soluções melhores como Jeet, Lost ou mesmo os Grids do
Boostrap.

Mas nenhuma delas é uma solução tão simples e completa como CSS Grid.

## CSS Grid ou Flexbox?

Essa é uma dúvida muito comum.

Ambos ajudam **demais** no alinhamento (horizontal e vertical) e no
desenvolvimento de aplicações modernas, mas justamente por ser possível resolver
problemas parecidos (ou até iguais) com eles, as pessoas acabam tendo dúvidas de
quando utilizar um ou utilizar outro.

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

https://twitter.com/felipefialho_/status/1281207633140224002

Isso porque, **Flexbox** é unidimensional, ou seja, linha OU coluna, então é
perfeito para o desenvolvimento interno de COMPONENTES.

Já **CSS Grid** é multidimensional (ou bidimensional), ou seja, linhas E
colunas, perfeito pra LAYOUTS.

## Na prática

_(Todos os exemplos de código estão escritos em Sass e os gatos das imagens são
meus próprios gatos 😻)_

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
`p`, entre outros já são block, então nem precisamos explicitamente adicionar
isso no CSS.

Então o código acima não tem nem `display: flex` nem `display: grid`.

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

Lembrando que `display: flex` tem `flex-direction: row;` por padrão então não
precisamos escrever isso, mas quando queremos tratar isso em coluna precisamos
explicitamente adicionar `flex-direction: column;`.

O comportamento é parecido com `display: block` mas agora temos a possibilidade
de alinhar verticalmente, utilizando `justify-content` e horizontalmente
utilizando `align-items` (os eixos ficam invertidos em comparação ao
`flex-direction: row;`).

**Comportamento de linha**

Caso a gente queira que o card assuma comportamento de linha, por exemplo, basta
remover `flex-direction: column;`.

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

E nesse caso o `align-items: center;` faz o alinhamento vertical.

### Layouts - CSS Grid

Agora que já entendemos como o Flexbox funciona bem com componentes, vou mostrar
como o CSS Grid é perfeito pra layouts!

Então pra gente adicionar os cards do lado do outro, em três colunas, a gente só
precisa adicionar algumas propriedades do CSS Grid no elemento pai desses cards,
nesse caso `.grid`.

![CSS Grid](assets/2020-08-11-cssgrid.png)

```scss
.grid {
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  grid-template-columns: repeat(3, 1fr);
}
```

Usando `grid-column-gap` e `grid-row-gap` a gente consegue dar espaçamentos
entre os elementos filhos, sem encostar no código deles. Pensem o quão incrível
isso é para separar responsabilidades de componentes de responsabilidades de
grid 😍

Até esse momento (08/2020), Flexbox não tem a propriedade `gap`,
[mas isso está prestes a mudar!](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).

**E acredite! CSS Grid pode criar grids responsivos sem media queries**

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

Por exemplo, se a gente quiser que o grid tenha 3 colunas, 2 colunas ou 1 coluna
de acordo com o número de elementos que cabe na tela é só adicionar `autofit` em
conjunto com `minmax`. `250px` é o tamanho mínimo das colunas na tela e `1fr`
representa uma fração do espaço disponível no grid.

Vale ver funcionando na prática 😜

https://codepen.io/felipefialho/pen/abdKyKP?editors=0100

## Suporte

![CSS Grid - Can I Use](assets/2020-08-11-cssgrid-can-i-use.png)
![Flexbox - Can I Use](assets/2020-08-11-flexbox-can-i-use.png)

Tanto [CSS Grid](https://caniuse.com/#search=css%20grid) quanto
[Flexbox](https://caniuse.com/#feat=flexbox) apresentam suporte completo em
todos os navegadores modernos e suporte parcial desde o IE10!

# Conclusão

Nos últimos anos o CSS ganhou várias features interessantes e que facilitam
demais nosso dia a dia, sem dúvidas CSS Grid e Flexbox estão entre minhas
propriedades favoritas.

Como já estão disponíveis faz alguns anos, conseguimos encontrar milhares de
materiais na internet que facilitam o aprendizado e o uso delas, posso deixar de
exemplo:

- [MDN Flexbox](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Flexbox)
- [MDN CSS Grid](https://developer.mozilla.org/pt-BR/docs/Web/CSS/grid)
- [Flexbox Froggy](https://flexboxfroggy.com/)
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

Espero que tenham gostado do texto (e do vídeo, hahaha) ❤️
