---
layout: post
date: '2019-09-04 06:46:38'
image: /assets/gatsby.jpg
title: Como foi desenvolver meu novo blog usando o GatsbyJS
description: >-
  Além de também usar GraphQL, Styled Components, Algolia, Netlify CMS e mais um
  monte de coisa.
tags:
  - javascript
  - css
---
4 anos depois da última atualização meu site está de cara nova, chegando assim na sua terceira versão desde a sua concepção em 2013.

## Falando em 2013...

Para quem tem curiosidade, essa era a cara desse site nessa época:

![Imagem do meu primeiro site](/assets/first-site.png)

Nada mal né? Esse projeto foi desenvolvido no começo de 2013, queria aprender novas tecnologias, principalmente relacionadas a geração estática de HTML. Para desenvolver essa versão utilizei coisas como:

\- [Docpad](https://docpad.bevry.me/)

\- [Less](http://lesscss.org/)

\- [Bootstrap](https://getbootstrap.com/)

\- [GruntJS](https://gruntjs.com/)

Pouco tempo depois, começou o boom de libs baseadas em JavaScript, muita coisa boa surgia, uma atrás da outra. 

## Então chegamos em 2015...

Em 2015, comecei a [trabalhar remoto](/blog/sobre-trabalhar-remoto/) e novamente me senti na necessidade de estudar novas stacks de desenvolvimento. E qual a melhor forma de estudar? Sim, [na prática](/blog/aproximando-seus-estudos-de-cenarios-reais/). 

Então trabalhei na segunda versão do meu site, que ficou com essa carinha aqui:

![Imagem do meu segundo site](/assets/second-site.png)

Nessa altura já tínhamos stacks mais legais disponíveis, então as escolhas dessa vez foram:

\- [Harp](http://harpjs.com/)

\- [Jade](http://jade-lang.com/)

\- [Stylus](http://stylus-lang.com/) 

\- [BEM](http://getbem.com/introduction/)

\- [Gulp](https://gulpjs.com/)

A maior vantagem dessa stack, era a possibilidade de criar novos artigos usando markdown, o que dava muita fluidez. Foram escolhas muito boas, e ainda hoje acredito que são tecnologias legais para trabalhar.

## Mas tudo passa, e o novo sempre chega

Dito isso, estamos em 2019. Por bastante tempo [concentrei meus artigos no Medium](https://medium.com/@felipefialho). Porém nos últimos meses não estava satisfeito com [algumas mudanças que aconteceram](https://willianjusten.com.br/diga-nao-ao-medium-tenha-sua-propria-plataforma/) por lá.

E como sempre, surgiram milhares de formas novas para trabalhar e achei que chegou o momento de voltar a escrever aqui e principalmente aproveitar o embalo para criar uma nova versão, usando algumas tecnologias bem _hypes_, como:

* Gatsby
* Gatsby Images
* GraphQL
* Styled Components
* Styled Media Query
* Algolia
* Netlify CMS
* Netlify

Vamos a elas.

## Gatsby

![Gatsby](/assets/gatsby-png.png)

Gatsby é mais um SSG (Static Site Generator), mas tem como diferencial ser totalmente baseado em React e utilizar o poder do GraphQL para consumir conteúdos e assets.

Ou seja, Gatsby é um framework poderoso. Uma das suas principais vantagens é gerar arquivos estáticos (olá SEO) no build, enquanto usamos React em tempo de desenvolvimento. 

Além disso, o Gatsby [possuí milhares de plugins](https://www.gatsbyjs.org/plugins/). Eles elevam a DevXP (Dev Experience) para outro patamar, porque fornecem soluções performáticas para problemas triviais, fazendo com que a pessoa que está desenvolvendo o projeto, foque em coisas essenciais  para o produto.

Por gerar arquivos estáticos e ter sistemas de cache, a performance é simplesmente espetacular.

Por cima acredito que o Gatsby só se torna desinteressante em projetos com grande volume de conteúdo dinâmico, nesse caso o [NextJS](https://nextjs.org/) pode funcionar melhor, por utilizar SSR (Server Side Render).
