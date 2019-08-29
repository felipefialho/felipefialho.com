---
title: "CSS Modular com Mobile First"
date: 2014-03-10 00:00:01
description: "Mobile First vai muito além de código, é um pensamento que precisa existir desde o inicio do projeto. Mas nesse artigo vou abordar apenas codificação para tentar deixar o workflow mais agradável"
tags: ["css"]
---

A importância de um CSS modularizado e o Atomic Design foi muito difundido nos últimos tempos, eu mesmo já escrevi um [artigo sobre o assunto](/blog/um-conto-sobre-componentizacao-e-quebra-de-paradigmas). Mas algo ainda me incomodava ao aplicar First Mobile em conjunto com CSS modular... os Media Queries.

## O uso tradicional

Imagino que a maneira na qual os Media Queries são mais utilizados é adicionando as condicionais no fim do CSS, algo como:

```css
@media (max-width: 767px) {
  ...
}
```

Um dos principais motivos para eu utilizar dessa forma, era nosso bom (só que não) e velho amigo IE8\. Ainda forneço suporte mínimo para esse navegador e como ele não aceita Media Queries, eu desenvolvia a versão mais "básica" para desktop, e ia "limpando" conforme a resolução.

Cheguei a pesquisar plugins que ajudariam a contornar esse problema, mas na época não encontrei nada que funcionasse ou me agradasse plenamente.

## Novos tempos

Mês passado iniciei um novo projeto, e adicionar Media Queries no final do CSS já não me deixava confortável mais.

A explicação é simples. Imaginem um componente, é de se esperar que toda a funcionalidade atrelada a ele esteja dentro do seu próprio 'include' (para quem usa pré-processadores). Mas a partir do momento que era necessário "ajustar" o funcionamento dele para outras resoluções no 'include' do media querie, as coisas ficavam esquisitas e eu me sentia desconfortável.

Lembrei então que o [Bootstrap 3](http://getbootstrap.com) já estava trabalhando de uma maneira muito próxima da que eu considerava ideal, e fornecia com a ajuda de plugins, suporte para o IE8\. Então conheci o [Respond.js](https://github.com/scottjehl/Respond) e todos meus problemas com o IE8 se resolveram.

## Modern Workflow...

Não tem segredo. Simplesmente adiciono os Media Queries em sequencia da classe que desejo alterar. Caso use algum pré-processador, isso será ainda mais simples, porque você pode deixar tudo organizado. Usando o LESS como exemplo:

```css
.navbar {
  margin-top: 20px;
  @media (min-width: @screen-sm-min) {
    float: left;
    width: 25%;
  }
  @media (min-width: @screen-lg-min) {
    position: fixed;
    top: 40px; left: 20px;
  }
}
```

Isso vai gerar:

```css
.navbar {
  margin-top: 20px;
}
@media (min-width: 768px) {
  .navbar {
    float: left;
    width: 25%;
  }
}
@media (min-width: 1200px) {
  .navbar {
    position: fixed;
    top: 40px;
    left: 20px;
  }
}
```

Dessa forma conseguimos trabalhar com Mobile First de um jeito realmente interessante, e tudo flui muito naturalmente. Setamos primeiro as propriedades que são comuns para todas as resoluções e _progressivamente_ vamos adicionando as funcionalidades para resoluções maiores.

E além de tudo, os componentes vão ter todas as propriedades deles dentro do próprio 'include'. Caso queira adicionar ou remover determinado componente, não precisa se preocupar em alterar os Media Queries separados para ajustar o projeto.

## Plus: Os imprescindíveis automatizadores

E claro... nossos melhores amigos [Grunt](http://gruntjs.com) ou [Gulp](http://gulpjs.com) vão melhorar ainda mais esse processo.

Existe um pequeno problema quando usamos os Media Queries dessa maneira... código desnecessário. Vamos ter milhares de Media Queries repetidos espalhados pelo projeto.

A boa notícia é que tanto o Grunt quanto o Gulp tem um plugin que resolve esse problema (indicação do [Nícolas Rossett](https://www.facebook.com/nicolas.rossett)): [grunt-combine-media-queries](https://github.com/buildingblocks/grunt-combine-media-queries) ou [gulp-combine-media-queries](https://github.com/konitter/gulp-combine-media-queries).

Esse ótimo plugin vai pegar todos os Media Queries espalhados pelo CSS e juntar tudo no final conforme a resolução. Exatamente da maneira que você sempre fez.

## Conclusão

Quero deixar claro que essa é uma preferência pessoal de uso dos Media Queries, caso não se sinta confortável para trabalhar dessa forma, nada impede que continue usando da maneira tradicional, o importante é estar sempre seguro dentro do seu próprio workflow.

Abraços e até a próxima ;)
