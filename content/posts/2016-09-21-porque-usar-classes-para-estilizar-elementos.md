---
title: Porquê usar classes para estilizar elementos no CSS
date: 2016-09-21 00:00:01
description:
  E como isso pode evitar muitos dos problemas de escalabilidade no seu código.
image: /assets/2016-09-21-porque-usar-classes-para-estilizar-elementos.png
tags: ['css', 'workflow', 'BEM']
---

## Introdução

Quem conversa comigo sobre o assunto, sabe que sou totalmente favorável ao uso
de classes. Existem algumas razões para isso.

Depois do [último artigo](/blog/sobre-wai-aria-acessibilidade-e-semantica),
algumas pessoas ficaram com dúvidas ou pediram para explicar essa frase:

> [..] Como qualquer propriedade, as roles podem ser alteradas via CSS. Você
> sempre devia usar classes, mas caso você tenha algum problema quanto a isso
> [..]

Como é um assunto complexo, nada melhor do que um artigo explicando meu ponto de
vista.

## Performance

Essa é a ordem dos seletores mais rápidos para o mais lentos:

1. ID, `#header`
1. Classe, `.header`
1. Tipo, `header`
1. Irmão adjacente, `nav + header`
1. Filho, `header > h1`
1. Descendente, `header p`
1. Universal, `*`
1. Atributo, `[type="text"]`
1. Pseudo-class / Pseudo-elemento, `a:hover` `.header:before`

Sim! Acreditem se quiser. O #ID é o seletor mais rápido. Mas antes de sair
substituindo todas as classes dos seus projetos por IDs, saiba que a diferença
entre eles é mínima, praticamente imperceptível.

Quer comprovar?
[Nesse site você pode passar um bom tempo brincando de testar performance CSS](http://stevesouders.com/efws/css-selectors/csscreate.php).

Porém estamos falando de seletores únicos. Você não criaria algo como
`#header-title` usando IDs. É mais provável que faça algo como `#header h1`

![Performance de IDs](assets/performance-id.png)

Ou mesmo...

![Performance de elementos](assets/performance-elemento.png)

Ou se você for maluco...

![Performance de elementos aninhados](assets/performance-aninhados.png)

Sendo que usando uma class, o resultado seria...

![Performance de class](assets/performance-class.png)

### Mas quer saber? Só performance não importa

É isso mesmo, não estou louco. Performance por si só, não importa tanto quanto
parece.

Primeiro porque o impacto do uso indevido de propriedades e transições é muito
maior do que seletores.

Segundo porque é impossível prever o impacto exato. Temos milhões de
dispositivos, navegadores e situações.

O que precisamos nos preocupar é em desenvolver o código **mais escalável
possível**, e a performance torna-se uma consequência.

Uso [Atomic CSS](http://patternlab.io), então aproveito da cascata do CSS para
reaproveitar ao máximo e modificar componentes quando necessário.

Por performance, essa não é a melhor escolha, já que alguns elementos são
aninhados (dica: respeite sempre o limite de três níveis!)

Mas por escalabilidade, considero essa a melhor forma do projeto crescer sem
gambiarras e consequentemente não ter perda na qualidade do código e.... na
performance.

### Referencias

- [CSS performance revisited: selectors, bloat and expensive styles](https://benfrain.com/css-performance-revisited-selectors-bloat-expensive-styles)
- [Writing efficient CSS selectors](http://csswizardry.com/2011/09/writing-efficient-css-selectors)
- [MDN - Writing efficient CSS](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS)

## Evitando conflito na estilização de elementos

Essa é uma vantagem sensacional de usar classes (e que foi parcialmente sanada
com o uso de CSS-in-JS, como escrevo nesse
[artigo do futuro](https://www.felipefialho.com/blog/do-sass-e-bem-ao-css-in-js-a-evolucao-do-css-ao-longo-da-historia/))

#### Disclaimer

[BEM](http://getbem.com/introduction/) foi a nomenclatura usada nos exemplos
abaixo.

### Exemplo

Observem esse componente retirado do site do
[Airbnb](https://www.airbnb.com.br).

![Exemplo Airbnb](assets/exemplo-airbnb.jpg)

Seguindo a lógica do Atomic CSS, os elementos **1** e **2** seriam títulos
pertencentes a um organismo, enquanto os elementos **3**, **4** e **5**
pertenceriam a uma molécula reaproveitável em diversos organismos.

Vamos imaginar que o nome do organismo é `.place` e o nome da molécula é `.card`
na seguinte estrutura HTML.

```html
<section class="place">
  <div class="place__container">
    <h1>Lugares vistos recentemente</h1>
    <p>Continue de onde parou</p>

    <a class="card" href="#">
      <div class="card__main">
        <img src="" alt="" />
        <h2>Hospedado por Luciana</h2>
        <p>Rio de Janeiro</p>
      </div>
      <p class="price">R$395</p>
    </a>

    <a class="card" href="#">
      <div class="card__main">
        <img src="" alt="" />
        <h2>Hospedado por Igor</h2>
        <p>Florianópolis</p>
      </div>
      <p class="price">R$200</p>
    </a>

    <a class="card" href="#">
      <div class="card__main">
        <img src="" alt="" />
        <h2>Hospedado por Loise</h2>
        <p>Florianópolis</p>
      </div>
      <p class="price">R$551</p>
    </a>
  </div>
</section>
```

#### Como eu fazia e dava merda

```stylus
// A molécula
.card
  h2
  ...

  p
  ...

  .price
  ...

  img
  ...


// O organismo
.place
  h1
  ...

  p
  ...
```

##### Por que dava merda?

1. Observem que tanto o `.place`, quanto o `.card`, tem o elemento `<p>`. Sendo
   assim, o elemento `<p>` do `.card`, que estava dentro do organismo `.place`,
   tinha propriedades que eu não queria que fossem herdadas. Muitas vezes era
   necessário dar _reset_ nessas propriedades. Ou seja... gambiarra.
1. Nesse contexto, o `.place` tem um `<h1>` e o `.card` tem um `<h2>`, mas
   contextos mudam, e a semântica muda. Ao atrelar o visual em um elemento,
   jamais poderíamos trocar por outro elemento mais semântico em outra situação.
1. O `.card` tem dois `<p>`, o `.price` tem um estilo completamente diferente,
   mas herdaria o estilo do irmão.

#### O que tentei fazer

Para evitar que as moléculas herdassem o estilo dos organismos, tentei dar
estilos apenas para os filhos diretos.

```stylus
// A mólecula
.card
  > h2
  ...

  > p
  ...

  > img
  ...

  > .price
  ...


// O organismo
.place
  > h1
  ...

  > p
  ...
```

##### Por que dava merda?

Observem que o `.place` tem um `.place__container` e o `.card` tem um
`.card__main`. Automaticamente, os elementos já não são filhos diretos.
Poderíamos fazer com que eles fossem filhos dessas classes intermediarias, mas
vocês percebem o quanto o código fica engessado?

Dependemos que os elementos sejam filhos diretos de outros para que funcionem.

#### Como eu faço agora!

Lembrando que uso Stylus...

```stylus
// A molécula
.card
  // Textos
  &__title

  ...
  &__text
  ...

  &__price
  ...

  &__media
  ...

  // Etc
  &__main
  ...


// O organismo
.place
  // Textos
  &__title
  ...

  &__text
  ...

  // Etc
  &__container
  ...
```

E no HTML fica assim.

```html
<section class="place">
  <div class="place__container">
    <h1 class="place__title">Lugares vistos recentemente</h1>
    <p class="place__text">Continue de onde parou</p>

    <a class="card" href="#">
      <div class="card__main">
        <img class="card__media" src="" alt="" />

        <h2 class="card__title">Hospedado por Luciana</h2>
        <p class="card-text">Rio de Janeiro</p>
      </div>
      <p class="card__price">R$395</p>
    </a>

    <a class="card" href="#">
      <div class="card__main">
        <img class="card__media" src="" alt="" />
        <h2 class="card__title">Hospedado por Igor</h2>
        <p class="card-text">Florianópolis</p>
      </div>
      <p class="card__price">R$200</p>
    </a>

    <a class="card" href="#">
      <div class="card__main">
        <img class="card__media" src="" alt="" />
        <h2 class="card__title">Hospedado por Loise</h2>
        <p class="card-text">Florianópolis</p>
      </div>
      <p class="card__price">R$551</p>
    </a>
  </div>
</section>
```

##### Porque isso da certo

1. Nenhuma classe ou elemento vai sobrescrever outro. Nunca.
1. Se o `<h2>` virar um `<h3>` em outro contexto, tudo bem, poderíamos usar
   `<h3 class="card__title">` e assim por diante.
1. Não importa dentro de qual elemento as classes estão, elas sempre vão
   funcionar.
1. Ajuda a manter a sanidade do código, evita precisar apelar para gambiarras e
   o código fica mais escalável.

### Mas e a redundância?

Um dos argumentos usados para customizar os elementos e não as classes, são
possíveis redundâncias do código, já que que as classes de alguns elementos
acabam ficando exatamente igual ao nome da tag.

```html
<header class="header"></header>
<footer class="footer"></footer>
<main class="main"></main>
```

Não sei porque isso seria um problema, já que o HTML resolve semântica e o CSS
resolve estilo. Mas caso isso incomode, nada te impede de utilizar outros nomes
para as classes.

Mas caso você realmente bata o pé e resolva estilizar diretamente os elementos,
com certeza vão acontecer alguns problemas quando o projeto crescer.

Pode ser que no inicio do projeto, você realmente tenha apenas um `<header>`
previsto, mas todos sabemos que essa tag pode ser utilizada mais vezes. Então
todos os estilos adicionados no primeiro elemento, seriam herdados pelo segundo,
e seria necessário aplicar _resets_, sujando o código e causando diversos
problemas de escalabilidade.

Sinceramente, não tem nenhuma razão para estilizar diretamente um elemento ao
invés de estilizar uma classe adicionada nele.

## Mas sempre existem as exceções

Usar classes para estilizar os elementos funciona muito bem para
**componentes**, mas claro que não funciona para tudo.

Textos de conteúdo ou de blogs, gerados por um CMS por exemplo, de maneira
nenhuma devem ser customizado com classes (a não ser estilos muito específicos).

Nesse caso, seguindo a lógica do Atomic CSS, teríamos uma molécula chamada
`.content`, com as configurações de tipografia.

```stylus
.content
  > h1
  ...


  > h2
  ...


  > h3
  ...


  > h4
  ...


  > h5
  ...


  > p
  ...
```

Dessa forma, é possível escrever o texto livremente, adicionar em qualquer lugar
do projeto e as configurações vão funcionar.

### Plus: Não se esqueça dos data-attributes

Mesmo não sendo os campeões de performance, os _data-attributes_ podem ser
importantes aliados na construção de um código mais escalável.

Em 2014, escrevi um artigo, chamado
[Sobre Data Atributes e JavaScript](/blog/sobre-data-atributes-e-JavaScript), em
que mostrava as vantagens usar _data-atributes_ e não classes ou IDs para
manipulações no JavaScript.

E esse conceito está cada vez mais consolidado.

## Conclusão

### As classes são nossas amigas!

E são essenciais para a construção de um código mais escalável. Não tenha medo
de usa-las, nem de "sujar" o código, isso não vai acontecer se seguir regras de
nomenclaturas.

Existem diversas arquiteturas famosas para ajudar nas suas escolhas, como:

- [OOCSS](http://oocss.org)
- [SMACSS](https://smacss.com)
- [BEM](http://getbem.com/introduction)
- [DRY CSS](http://vanseodesign.com/css/dry-principles)

O [Jean Carlo Emer](https://twitter.com/jcemer) escreveu o artigo
[OOCSS, SMACSS, BEM, DRY CSS: afinal, como escrever CSS?](http://tableless.com.br/oocss-smacss-bem-dry-css-afinal-como-escrever-css)
em meados de 2014 e continua sendo uma ótima introdução desses conceitos.

É uma sopa de letrinhas e cada uma delas trazem vantagens e desvantagens. O
ideal é estuda-las e abstrair os conceitos que mais se adequam ao seu workflow.

Boa sorte nessa jornada ;)
