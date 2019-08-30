---
title: "Sobre Data Atributes e JavaScript"
date: 2014-07-08 00:00:01
description: "Nos últimos projetos comecei a testar o uso do [data-*] do HTML5 como seletor no JavaScript. Agora vou listar algumas coisas que observei com essa prática"
tags: ["javascript", "html"]
---

A [W3C](http://www.w3.org/html/wg/drafts/html/master/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes) diz o seguinte:

> A custom Data Atributes is an attribute in no namespace whose name starts with the string "data-", has at least one character after the hyphen, is XML-compatible, and contains no uppercase ASCII letters.

Ou seja, através do atributo data você pode armazenar e recuperar dados. Com isso você guarda pequenas informações de texto e pode manipular através de Javasript.

Como podemos criar qualquer atributo através do prefixo `[data-*]`, esses atributos tem sido utilizados também para iniciar funções.

## Como funciona

Ao invés de acessar o elemento via JavaScript através de `.class` ou `#id`, podemos usar os `[data-attributes]` do HTML5.

Por exemplo (em jQuery) para iniciar uma interação touch em um menu, podemos chamar via `.class`:

```js
$('.nav');
```

Ou via `#id`:

```js
$('#nav');
```

Mas a ideia aqui é fazer a chamada via `[data-*]`:

```js
$('[data-trigger="nav-touch"]');
```

## Por que usar dessa forma?

O principal motivo, é para separar o estilo da funcionalidade JavaScript. Apresento a seguir um cenário real de aplicação.

Imaginem novamente o menu do exemplo acima, ele apresenta uma função para interação em _swipe_ em telas Touch. Então chamamos a função, atribuindo em todas a classes `.nav`:

```js
$('.nav');
```

Porém, em uma das páginas. O menu precisa ter o mesmo estilo, mas não deveria ter essa funcionalidade de _swipe_. Poderíamos atribuir a interação a um #id e adicionar o id nos elementos que devem apresentar esse comportamento.

```js
$('#nav-touch');
```

Para complicar mais, esse menu aparece duas vezes em outra página, porém como sabemos, não podemos repetir um #id na mesma página. E fazer a chamada para cada #id separadamente também não é uma solução adequada.

Poderíamos então usar uma classe sem estilo, que serviria somente para a chamada no JavaScript, algo como:

```js
$('.js-nav-touch');
```

Essa é uma solução viável e funcional, mas manter as classes apenas para estilização no CSS seria mais elegante.

Então finalmente, podemos usar o [data-*] para isso.

```js
$('[data-trigger="nav-touch"]');
```

Dessa forma, basta adicionar [data-trigger="nav-touch"] ao elemento que deve apresentar esse comportamento.


### Através de CSS...

E claro, também é possível manipular os Data Atributes através de CSS, portanto, podemos adicionar animações ou algum estilo específico:

```css
.nav[data-trigger="nav-touch"] {
  ...
}
```

## Na prática!

Imagine o seguinte cenário:

1. Uma página que vai apresentar dois menus idênticos visualmente
2. Um deles servirá como filtro para tags usando um plugin de "tabs"
3. O outro será um menu comum com link para outras páginas

## E a performance?

Fazendo um pequeno teste no [jsPerf](http://jsperf.com/long-selectors-vs-data/17), podemos observar que:

- Seletor `.class` apresenta de longe o melhor resultado, com uma média de **130.000** operações por 0,063 segundos
- Seletores `[data-*]` são até 88% mais lentos do que os de `.class`, com uma média de 'apenas' **18.000** operações por 0,063 segundos

## Conclusão

Usar o `[data-*]` para separar estilização e comportamento é uma solução bastante elegante e funcional. Se bem utilizada, acredito em um ganho importante de escalabilidade nos componentes.

Porém existem problemas com relação a performance. Uma diferença negativa de 88% com relação aos seletores `.class` não é algo que deve ser ignorado.

Como em todos os projetos, vale uma análise prévia. Acredito que apenas em aplicações realmente grandes essa diferença seria notada. Portanto minha indicação seria de usar sem medo em projetos menores, e realizar testes para verificar o impacto na performance de projetos maiores.
