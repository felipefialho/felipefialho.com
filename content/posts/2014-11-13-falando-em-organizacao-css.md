---
title: "Falando em organização CSS..."
date: 2014-11-13 00:00:01
description: "Durante anos escrevemos CSS como se não houvesse amanhã e tínhamos como maiores problemas as diferenças de renderização no IE(ca)..."
tags: ["css"]
---

Dando continuidade a série [sobre minha organização e fluxo de trabalho atual](/blog/sobre-organizacao-de-componentes-com-pre-processadores), vou contar um pouco sobre como tenho trabalhado o CSS.

## "CSS é muito fácil"... Será?

Durante anos escrevemos CSS como se não houvesse amanhã e tínhamos como maiores problemas as diferenças de renderização no IE(ca). E já não era simples.

Mas nos últimos tempos tivemos que começar a fazer projetos que funcionassem em diferentes resoluções, diferentes navegadores, diferentes dispositivos e que tivessem performance, acessibilidade, fossem bonitos e escaláveis.

Além disso o CSS começou a ser usado para animações (inclusive em SVG), controlar estados e até mesmo criar [comportamentos que só eram feitos através de JavaScript](http://www.felipefialho.com/css-components/ "CSS Components").

Um CSS sem planejamento e mal construido pode arruinar um projeto, que a longo prazo vai virar um monstro, [cheio de !important e "janelas quebradas"](https://medium.com/@shankarcabus/css-escalavel-parte-1-41e7e863799e "Artigo do Shankar Cabus - CSS escalável").

## O tal do Atomic Design

Junto com a necessidade de organizar o CSS, surgiram vários termos e metodologias que visam melhorar nosso controle sobre o código.

No último [Meetup CSS](http://www.meetup.com/CSS-SP) o [Rafael Rinaldi](https://twitter.com/rafaelrinaldi) deu uma verdadeira aula sobre diferentes tipos de Arquitetura CSS, vocês podem [assistir o vídeo](https://www.youtube.com/watch?v=q8pqDytjlVc) e dar uma [estudada nos slides](https://speakerdeck.com/rafaelrinaldi/arquitetura-css).

Dentro dessas metodologias, a que mais me agradou foi o conceito de [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design), proposta pelo Brad Frost, que deu origem ao [Pattern Lab](http://patternlab.io).

Essa metodologia me agradou de cara, e ia de encontro com tudo que pensava sobre o desenvolvimento de CSS, em 2013 eu já estava [usando um conceito parecido](/blog/sobre-organizacao-de-componentes-com-pre-processadores) e incorporei várias idéias no meu workflow.

Mas foi apenas no segundo semestre de 2014 que me aproximei de vez do Atomic Design e cheguei a uma estrutura muito parecida com a que foi proposta inicialmente.

Metodologias não precisam ser seguidas a risca e servem mais para nortear o trabalho. Portanto considerem o que vou explicar abaixo, uma livre interpretação do conceito original.

## Organização dos arquivos CSS

Segue um esquema de organização com alguns **exemplos** de arquivos, são apenas exemplos e podem variar conforme o projeto.

Como sempre explico, estou dando um exemplo de estrutura em LESS, mas ela serve para QUALQUER pré-processador.

Dentro das (), adicionei uma pequena descrição de cada pasta principal.

```bash
less/
├── _core/ (Configurações básicas do projeto)
│   ├── mixins/
│   |── colors
│   ├── fonts
│   ├── grid
│   ├── margins
│   ├── media-queries
│   ├── mixins
│   ├── normalize
│   ├── type
|
├── atoms/ (Classes individuais e elementos pequenos e reutilizáveis)
│   ├── global/
│   |   ├── scaffolding (html, body)
│   |   ├── utilies (.hidden, .show, .sr-only)
|   |
│   ├── buttons/
│   |   ├── btn
│   |   ├── btn-link
|   |
│   ├── text/
│   |   ├── headings (h1, h1, h3, h4, h5, h6)
│   |   ├── paragraph (p)
│   |   ├── blockquote
│   |   ├── code
│   |   ├── link (a)
│   |   ├── hr
│   |   ├── date (.date)
│   |   ├── inline (b, i, strong, em, u, stroke, cite ...)
|   |
│   ├── list/
│   |   ├── unordered
│   |   ├── ordered
│   |   ├── definition
|   |
│   ├── images/
│   |   ├── icons
│   |   ├── img
│   |   ├── logo
|   |
│   ├── forms/
│   |   ├── label
│   |   ├── input
│   |   ├── input-file
│   |   ├── select
│   |   ├── radio
│   |   ├── checkbox
|   |
│   ├── tables/
│       ├── tables
|
├── molecules/ (Cria um elemento 'pai' para modificar os atomos)
│   ├── blocks/
│   |   ├── toolbar
│   |   ├── filterbar
|   |
│   ├── media/
│   |   ├── banner
│   |   ├── media
|   |
│   ├── forms/
│   |   ├── search
│   |   ├── form-group
|   |
│   ├── navigation/
│   |   ├── navbar
│   |   ├── breadcrumbs
│   |   ├── pagination
│   |   ├── tabs
|   |
│   ├── text/
│   |   ├── address
│   |   ├── wellness
│   |   ├── author
│   |   ├── article-text
│   |   ├── captions
|   |
│   ├── components/ (Componentes que usam JavaScript)
│       ├── carousel
│       ├── collapse
│       ├── tooltip
│       ├── popover
│       ├── modal
|
├── organisms/ (Estruturas maiores do projeto, que podem modificar átomos e móleculas)
│   ├── header
│   ├── footer
│   ├── main
│   ├── wrap
│   ├── content
│   ├── comments
|
├── templates/ (Sistemas de grids e alinhamentos de templates)
│   ├── grids
│   ├── container
│   ├── thumbnails
|
├── pages/ (Estiliza páginas individualmente)
│   ├── home
|
├── vendor/ (Estiliza dependencias externas)
```

## Exemplos Práticos

### Core

_core/margins:

```stylus
//
// Margins
// --------------------------------

@space:    20px; // Regular space margin

@space-xs: (@space / 4); // Extra small space margin
@space-sm: (@space / 2); // Small space margin
@space-md: (@space * 2); // Medium space margin
@space-lg: (@space * 3); // Large space margin
```

_core/type:

```stylus
//
// Typography
// --------------------------------

#type {

  // Headings
  // --------------------------------

  .h1() {
    .font(36, 700);
    margin-bottom: @space;
  }

  // Paragraphs
  // --------------------------------

  .p1() {
    .font(16);
  }
}
```

Observem que defino alguns mixins e configurações reaproveitáveis em todo o projeto.

### Atoms

atoms/headings:

```stylus
//
// Headings
// --------------------------------

h1 {
  margin: 0;
}

h1 {
  #type > .h1();
}
```

atoms/paragraph:

```stylus
//
// Paragraph
// --------------------------------

p {
  #type > .p1();
  margin: 0 0 @space;

  &:last-child {
    margin: 0;
  }
}
```

São definidas classes ou elementos bases, que serão utilizadas e modificadas conforme a necessidade das 'molecules', 'organisms' ou 'pages'.

Os elementos devem ser únicos, nunca aninhados.

### Molecules

### molecules/wellness:

```stylus
//
// Wellness
// --------------------------------

.wellness {
  text-align: center;

  h1 {
    border-bottom: @gray-lighter solid 1px;
    color: @gray-light;
    padding-bottom: @space-sm;
  }

  p {
    color: @gray;
  }
}
```

Modifica os átomos para a criação de um componente especifico.

### Organisms

organisms/header:

```stylus
//
// Header
// --------------------------------

.header {

  // Wellness
  // --------------------------------------------------
  .wellness {
    text-align: center;
  }
}
```

Modifica os átomos e moléculas para a criação de uma sessão do projeto.

### Pages

pages/home:

```stylus
//
// Home
// --------------------------------

.home {

  // Header
  // --------------------------------------------------
  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }

  // Wellness
  // --------------------------------------------------
  .wellness {
    padding: @space @space-lg;
  }

}
```

Modifica os átomos, moléculas e organismos para a criação de uma página específica do projeto.

### Dicas rápidas

* Não se prenda na metodologia, abra espaço para implementar mudanças que vão melhorar a utilização, seja para uso próprio ou para um escopo especifico.
* A organização das pastas é muito importante. Você precisa se sentir confortável com a estrutura para não ficar pensando aonde está determinado arquivo.
* Não faça aninhamentos maiores do que três níveis, geralmente você não vai precisar passar do segundo nível, quando chegar no terceiro ligue o sinal de alerta e confirme se realmente faz sentido.
* Lembre-se que seu workflow não é definitivo. Sempre surgirão ideias e ferramentas para agregar no seu trabalho, esteja de cabeça aberta para mudanças. Porém não faça alterações drásticas antes de amadurecer a idéia.

### Um plus sobre 'Media Queries'

No começo do ano eu escrevi um post sobre [CSS Modular com Mobile First](/blog/css-modular-com-mobile-first) e agora essa idéia fica ainda mais aplicável.

Não precisa mais ter um arquivo específico para ajustar media-queries. Nessa organização de CSS, cada elemento pode ter sua própria customização aplicada seguindo a idéia do Mobile First.

### Como

Vamos imaginar que o `.header` precise ser absoluto em resoluções médias, fixo em resoluções grandes e tenha o background branco em telas menores:

organisms/header:

```stylus
//
// Header
// --------------------------------

.header {
  padding: @space; // Padrão para todas as resoluções

  @media (max-width: @screen-xs-max) {
    background: #fff;
  }

  @media (min-width: @screen-sm-min) {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  @media (min-width: @screen-lg-min) {
    position: fixed;
    // O top, right e left está escalando na resolução 'sm', não precisa repetir :)
  }
}
```

Se tiverem alguma dúvida ou quiserem debater sobre o assunto, saiba que o Disqus escala e podem usar os comentários sem medo :p. Abraços!
