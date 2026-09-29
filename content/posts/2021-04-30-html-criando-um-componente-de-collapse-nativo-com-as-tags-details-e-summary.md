---
title: 'Collapse em 5 minutos sem JavaScript!'
date: 2021-04-30 00:00:01
description:
  'Criando um componente de Collapse completamente funcional em menos de 5
  minutos usando apenas HTML e CSS 🥳'
image: /assets/2021-04-30-cover_v2.jpg
tags: ['css', 'html', 'summary', 'details']
---

Esse texto é uma versão em texto do vídeo: <strong>SEM JAVASCRIPT - Collapse com
HTML e CSS em 5min!</strong>
[que publiquei no meu canal no Youtube](https://www.youtube.com/@felipefialhovlog).

Vale a pena assistir! 😊

<iframe width="650" height="400" src="https://www.youtube.com/embed/j5VcN8A_zqQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Introdução

Em 2014 criei um projeto chamado
[CSS Components](https://css-components.felipefialho.com/) que tinha como
objetivo recriar os componentes do Bootstrap usando **só HTML e CSS** sem nada
de **JavaScript**.

Naquela época imaginava que no futuro seria muito fácil desenvolver uma série de
componentes nativos usando só CSS e HTML, mas não foi exatamente o que aconteceu
nos anos seguintes.

Muito pelo contrário,
[a dependência do JavaScript só aumentou](/blog/que-front-end-developers-precisam-saber).

Até pouco tempo atrás para criar esses componentes sem JavaScript, na maioria
das vezes a gente precisava utilizar técnicas que se aproveitavam principalmente
do estado de checado e não checado de elementos como `checkbox` e `radio` e é
justamente essa abordagem que utilizei na maioria dos componentes do CSS
Components

[O projeto está disponível no GitHub caso queiram estudar o código](https://github.com/felipefialho/css-components)
😁

Isso funcionava bem em muitos casos mas não fazia sentido na maioria dos
projetos.

Mas apesar da evolução no HTML e CSS não serem tão rápidas quanto normalmente
acontece no JavaScript já tivemos alguns avanços bem legais nesse sentido.

Algumas dessas novidades são tags como por exemplo `<details>` e `<summary>` que
permitem criar um componente de collapse nativo usando só HTML e é isso que vou
explicar aqui.

## Os fodões `<details>` e `<summary>`

Tudo que precisamos são de duas tags, o `<details>` e `<summary>` e já podíamos
terminar por aqui já que o efeito de abrir e fechar já está completamente
funcional.

```html
<details class="collapse">
  <summary class="title">Titulo</summary>
  <div class="description">Texto</div>
</details>
```

Mas também adicionei um pouco de CSS pra deixar exemplo mais legal e comecei
adicionando algumas Variáveis de CSS que
[são as mesmas que já tinha utilizado no artigo que expliquei como elas funcionam](/blog/os-superpoderes-das-variaveis-nativas-do-css)
e também já aproveitei pra adicionar alguns estilos no `body`.

```scss
:root {
  --space-xxs: 4px;
  --space-xs: 8px;
  --space-sm: 16px;
  --space: 24px;
  --space-md: 32px;
  --space-lg: 48px;
  --space-xlg: 64px;

  --screen-sm: 768px;

  --gray: #555;
  --gray-dark: #333;
  --gray-darker: #111;
  --gray-light: #f1f1f1;
  --gray-lighter: #fafafa;
  --blue: #187888;
  --yellow: #e6af05;
  --white: #fff;
  --black: #000;

  --brand-primary: var(--blue);
  --background: var(--white);
  --text-color: var(--gray-darker);
}

body {
  background-color: var(--background);
  color: var(--text-color);
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
}
```

Então vou remover as setas padrão que apesar de serem funcionais são muito feias
e começar a estilizar esse componente.

```scss
details {
  summary {
    list-style: none;
  }
}
```

Como podem ver estou utilizando SCSS como pré-processador de CSS e vou começar
editando o elemento `<details>` que tá usando a classe `.collapse` e adicionar
propriedades pra posicionar no centro e definir um tamanho máximo.

Também adicionei estilos de borda e sombra pra deixar o elemento mais agradável
visualmente e com o seletor `:first-child` consigo fazer com que a margem seja
adicionada apenas quando ele for o primeiro elemento, assim descolando do topo.

Também adicionei `margin-bottom` apenas quando não for o último elemento, isso
evita vazar margem para outros elementos.
[Uns anos atrás escrevi um artigo explicando o pseudo-seletor not()](/blog/css-o-fodastico-not).

Também adicionei alguns efeitos de transição no `background-color` do elemento
`<details>` e usei `will-change` que é uma propriedade que serve pra otimizar a
performance de algumas propriedades durante a transição CSS.

Por fim alterei a propriedade `background-color`quando o elemento estiver no
estado de `:hover` e com isso temos um efeito bem aceitável no hover.

```scss
.collapse {
  border: solid 1px var(--gray-lighter);
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  transition: background-color 0.25s;
  will-change: background-color;

  &:first-child {
    margin-top: var(--space);
  }

  &:not(:last-child) {
    margin-bottom: var(--space-sm);
  }

  &:hover {
    background-color: var(--gray-lighter);
  }
}
```

O próximo passo é estilizar o elemento `<summary>` que chamei pela classe
`.title` adicionando `padding` para melhorar os espaçamentos internos e
`cursor: pointer` que não vem por padrão nesse elemento.

```scss
.title {
  cursor: pointer;
  font-weight: 600;
  padding: var(--space-sm);
  position: relative;
```

E por último vamos estilizar a classe `.description` que vai ficar visível
apenas após clicar no elemento `<summary>` e também adicionar borda além de
adicionar algumas mudanças na fonte e também deixar o padding igual ao usado no
`.title`.

```scss
.description {
  border-top: var(--gray-light) solid 1px;
  font-size: 14px;
  line-height: 21px;
  padding: var(--space-sm);
}
```

Agora já temos um componente muito mais elegante visualmente e completamente
funcional e novamente o vídeo podia acabar aqui mas ainda podemos deixar algumas
coisas ainda mais legais, como adicionar mudanças de comportamentos quando o
elemento está aberto ou fechado e também adicionar algumas transições.

Então dentro do elemento `<summary>` que está usando a classe `.title` vou
utilizar o pseudo-elemento `:after` do CSS com posição absoluta e ao invés de um
ícone de seta vou usar um simpático e sempre útil emoji pra me ajudar nesse
exemplo 😅

Como o pseudo elemento `:after` é absoluto, para conseguir posicionar ele no
centro vou utilizar uma técnica bem conhecida que usa o
`transform: translateX(-50%)` e o `top: 50%` e por fim também vou posicionar ele
na direita com `right: var(--space-sm)`.

```scss
.title {
  &:after {
    content: '😴';
    position: absolute;
    right: var(--space-sm);
    transform: translatey(-50%);
    top: 50%;
  }
}
```

Mas isso pode fica ainda mais legal e dessa vez vou alterar o nosso emoji dentro
do `:after` na classe `.title` toda vez que o elemento `<details>` estiver com o
estado de hover.

E por último vou usar o seletor `[open]` que está nativamente atrelado ao
elemento `<details>` pra alternar o emoji caso o elemento esteja aberto ou
fechado, pensem que a gente teria outras várias possibilidades de brincar a
partir disso.

```scss
.collapse {
    .title:after {
      content: "🙂";
    }
  }

  &[open] {
    .title:after {
      content: "😍";
    }
  }
}
```

Dá pra brincar bastante com isso e fazer coisas bem legais usando CSS para
deixar ainda mais foda essas transições de estado.

### Acessibilidade

E como são tags nativas do HTML `<details>` e `<summary>` são automaticamente
acessíveis e semânticas, você já ganha isso de graça sem precisar fazer nenhuma
implementação a mais.

### Markdown

E uma dica extra:

Além de tudo funciona em markdown, ou seja, você pode adicionar tranquilamente
essa funcionalidade para deixar os READMEs dos projetos ainda mais legais.

### Resultado

Componente finalizado e como podem ver não precisei adicionar nenhuma linha de
JavaScript 😜

<figure class="embed embed-codepen">
  <iframe src="https://codepen.io/felipefialho/embed/yLgxdzR?default-tab=result" title="Pen de @felipefialho no CodePen" loading="lazy" height="400"></iframe>
  <figcaption><a href="https://codepen.io/felipefialho/pen/yLgxdzR">Ver pen de @felipefialho no CodePen</a></figcaption>
</figure>

No
[Can I Use podemos ver que essa é uma funcionalidade completamente estável](https://caniuse.com/?search=details)
atualmente e funciona em todos os navegadores.

Sensacional né? 💙

## Conclusão

Além da semântica o HTML parece avançar na direção de acoplar cada vez mais
funcionalidades nativas, o que tende a nos fazer economizar muitas linhas de
código e muito tempo de desenvolvimento.

A gente agradece.
