---
title: Sobre WAI-ARIA, acessibilidade e semântica
date: 2016-09-14 00:00:01
description:
  WAI-ARIA já é um assunto bem antigo. Porém, observo que muitas pessoas
  desconhecem sua existência ou não sabem como utilizar nos projetos.
image: /assets/2016-09-14-sobre-wai-aria-acessibilidade-e-semantica.png
tags: ['acessibilidade', 'html']
---

Vou demonstrar que é simples, não machuca, não vai aumentar o tempo de
desenvolvimento e ainda vai melhorar a semântica e consequentemente a
acessibilidade do projeto.

# O que é WAI-ARIA

WAI-ARIA é dividido em duas categorias: roles e states / properties.

## Roles

A maioria das [roles](https://www.w3.org/WAI/PF/HTML/wiki/RoleAttribute) foram
definidas no ARIA 1.0, e acabaram sendo adicionadas no HTML5 mais tarde.

Elas servem para dar significado (ou mais significado) aos elementos, já que nem
sempre a tag HTML fornece por sí só o comportamento esperado.

Vamos ver exemplos de uso prático para você começar a usar AGORA. :)

### button

Quantas vezes você já criou um link que não levava para lugar nenhum,
simplesmente colocando um `[href='#'` e mudando o comportamento via JavaScript?

Na maioria das vezes o correto seria utilizar a tag `<button>`, mas por alguma
limitação ou caracteristica do projeto, você pode ter utilizado a tag `<a>`

Então, bora dar um significado para esse botão!

```html
<a href="#" data-modal="#modal-1" role="button">Abre o modal!</a>
```

### logo

Antigamente era comum utilizarmos a tag `<h1>` e adicionar a imagem e esconder o
texto via CSS.

```html
<h1 class="logo">
  <a href="#">
    Empresa foda!
  </a>
</h1>
```

```css
.logo {
  background: url
  height: 80px
  text-indent: -999em
  width: 160px
}
```

Pare de fazer isso o quanto antes!

A imagem do logo é uma das informações mais importantes do projeto, e pode ter
certeza que o cliente espera que ela (e não um texto) esteja sempre disponível.

O WAI-ARIA nos ajuda a fornecer significado.

```html
<a class="logo" role="logo">
  <img src="/img/logo.svg" alt="Empresa foda!" />
</a>
```

### banner

É possível ter vários `<header>` no projeto, então essa `role` ajuda a informar
aonde está o header principal, geralmente o do topo.

```html
<header class="header" role="banner"></header>
```

### contentinfo

Também é possível que um projeto tenha vários `<footer>`, com essa `role`
podemos marcar o rodapé da página.

```html
<footer class="footer" role="contentinfo"></footer>
```

### search

Ainda não temos um elemento `search` no HTML. Mas podemos dar uma mãozinha.

```html
<form class="search" role="search">
  <input
    type="search"
    class="search--control"
    placeholder="Faça uma busca :)"
  />
  <button class="search--btn">Buscar!</button>
</form>
```

### dialog

Normalmente usado para elementos como modal. Que só estarão ativos após a ação
do usuário.

```html
<div class="modal" role="dialog" tabindex="-1"></div>
```

## Vamos falar sobre redundância

Os exemplos a seguir, são redundantes, e sempre vejo discussões sobre a
utilização ou não dessas `roles`.

[Pode acompanhar uma discussão sobre o tema no nosso fórum](https://github.com/frontendbr/forum/issues/302).

E um
[ótimo artigo sobre o tema aqui](http://html5doctor.com/on-html-belts-and-aria-braces).

### main

Essa `role` também deve ser única na página, normalmente utilizada em conjunto
com a tag `<main>`.

```html
<main class="main" role="main"></main>
```

### navigation

Essa `role` auxilia elementos de navegação.

```html
<nav class="navbar" role="navigation"></nav>
```

### complementary

Sabe aqueles conteúdos e informações que não são as mais importante da página,
mas são complementares, onde você geralmente usa o `<aside>`?

Podemos usar essa `role` para informar tal função.

```html
<aside class="content__complementary" role="complementary"></aside>
```

### !important

Como qualquer propriedade, as roles podem ser alteradas via CSS. Você sempre
devia usar classes, mas caso você tenha algum problema quanto a isso, também é
possível usar assim.

```html
<a role="logo">
  <img src="/img/logo.svg" alt="Empresa foda!" />
</a>
```

```css
a[role='logo'] {
  margin: 2rem;
}
```

Existem MUITAS roles, que cobrem praticamente qualquer situação, você pode ver a
[lista completa aqui](https://www.w3.org/WAI/PF/HTML/wiki/RoleAttribute).

## Status / Properties

Você consegue usar essas propriedades para informar se determinado elemento está
escondido ou visível para o usuário, fornecer informações de texto ou mesmo,
esconder elementos visuais desnecessários.

### aria-hidden

```html
<a href="#" title="Acessar o Facebook">
  Facebook
  <svg aria-hidden="true" class="icon">
    <use xlink:href="/assets/svg/icons.svg#facebook"></use>
  </svg>
</a>
```

No exemplo acima, o link tem um ícone com um significado apenas visual, já que a
informação importante está no texto. Sendo assim, o
[aria-hidden="true"](https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden)
faz com que leitores de tela ignorem esse elemento.

### aria-label

É usado para fornecer informações sobre o elemento caso o texto não esteja
disponível na tela.

De novo um exemplo com ícone.

```html
<svg aria-label="Facebook" class="icon">
  <use xlink:href="/assets/svg/icons.svg#facebook"></use>
</svg>
```

Ao contrário do outro exemplo, dessa vez não tínhamos um texto ao lado, tornando
o ícone um elemento importante na navegação. Então ao invés de usar o
`aria-hidden="true"`, usamos o `aria-label` para informar o significado do
ícone.

### Super exemplo!

O [Deivid Marques](https://twitter.com/deividmarques) adicionou no CSS
Components,
[um dos melhores exemplos que já vi de aria-label](http://www.felipefialho.com/css-components/#component-tooltip).
Aqui é possível ver CSS e HTML trabalhando juntos para melhorar semanântica e
acessibilidade.

```html
<div class="tooltip" aria-label="Informações em tooltip"></div>
```

```css
.tooltip:after
  content: attr(aria-label)
```

## Conclusão

Acredito que na maioria dos casos, os exemplos acima serão os mais utilizados no
dia a dia.

Mas tenha em mente que o assunto é **extremamente** extenso e existem milhares
de propriedades WAI-ARIA, englobando várias situações para te ajudar a fornecer
mais significado e semântica ao seu projeto.

Portanto, vou deixar alguns links que costumo acessar quando tenho dúvidas ou
quero procurar alguma propriedade.

- [W3C - Accessible Rich Internet Applications (WAI-ARIA) 1.1](https://www.w3.org/TR/wai-aria-1.1)
- [W3C - RoleAttribute](https://www.w3.org/WAI/PF/HTML/wiki/RoleAttribute)
- [Notes on Using ARIA in HTML](http://w3c.github.io/aria-in-html)
- [MDN - ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
