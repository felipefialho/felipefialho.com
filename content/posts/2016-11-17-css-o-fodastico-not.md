---
title: "O fodástico :not()"
date: 2016-11-17 00:00:01
description: "Quando se trata de evitar resetar propriedades, o :not() é o cara"
image: /assets/2016-11-17-cover.png
tags: ["css"]
---

## As lindas pseudo-class

Fui desenvolvedor em uma época terrível, tempos em que era necessário usar PNGs transparentes para emular `box-shadow` e `border-radius`, tempos em que precisávamos usar hacks para IE6 e IE7, tempos em que tudo era lento e de difícil manutenção.

Felizmente o CSS evoluiu, e uma das novidades que mais gostei nos últimos anos foram as [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes).

Provavelmente as pseudo-class mais conhecidas sejam as `:nth-child()`, `:last-child` e `:first-child`.

Só para contextualizar, no passado para fazer uma tabela com cores alternadas era preciso fazer isso aqui.

```html
<table>
  <tr class="even"> </tr>
  <tr class="odd"> </tr>
</table>
```

E agora basta fazer isso.

```css
tr { background: #fff; }
tr:nth-child(odd) { background: #eee; }
```

Sem classe extra, sem porra nenhuma. Limpo e bonito. :)

Mas tenho certeza que vocês já viram milhares de artigos falando dessas pseudo-class mais conhecidas. E mesmo que muita gente também conheça e use o `:not()`, achei que ele merecia um artigo falando só dele.

## O fodástico :not() [2]

Poucas coisas me deixam tão agoniado no CSS do que propriedades sendo resetadas, é tão frustrante que bolei um jeito de usar as [Media Queries evitando que isso acontecesse](/blog/otimizando-e-organizando-as-media-queries), muito antes dessa técnica ficar famosa.

Sério, não faz sentido nenhum resetar propriedades, se você precisou resetar, ela simplesmente não deveria existir dentro daquele escopo.

E o `:not()` torna-se um aliado sensacional para nos ajudar nessa missão.

### Exemplos

Sabe aquela `li` cheia de bordas e margens que deixa o layout feio no último elemento?

Muita gente faz algo assim.

```scss
li {
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
  padding-bottom: 2rem;

  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
}
```

Olhem essas três propriedades sendo resetadas, muito feio né?

Agora observem a elegância com que o `:not()` resolve isso.

```scss
li {
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }
}
```

Quer que determinado estilo seja adicionado em todos os elementos, mas não em uma classe especifica?

```scss
p:not(.foo) {
  font-size: 2rem;
}
```

Ou o inverso disso... que o estilo seja adicionado em uma classe, mas não em um elemento especifico.

```scss
.title:not(h2) {
  color: $brand-primary;
}
```

## E tem mais

Também é possível usar o `:not()` combinado com outras pseudo-class.

Quer que o elemento tenha um comportamento caso ele seja o último filho, mas não se ele for ao mesmo tempo o primeiro?

```scss
.btn:last-child:not(:first-child) {
  align-self: flex-end;
}
```

Quer negar dois elementos?

```scss
.title:not(h2):not(h3) {
  color: $brand-primary;
}
```

Quer que o `:hover` e o `:focus` só funcionem se o elemento não tiver a classe `.active`?

```scss
.btn:hover:not(.active),
.btn:focus:not(.active)
  ...
```

Quer que o elemento tenha determinadas propriedades apenas Se não estiver vazio?

```scss
.foo:not(:empty)
  ...
```

### Quer combinar com pseudo-selectors?

Bora pegar a classe `.title` apenas se ela não for um `h2` e o `.header` não estiver ativo?

```scss
.header:not(.active) + .main .title:not(h2)
  ...
```

O céu é o limite.

Abraços!
