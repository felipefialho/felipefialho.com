---
layout: post
date: '2019-09-05 06:46:38'
image: /assets/gatsby.jpg
title: "Como foi desenvolver meu novo blog usando o GatsbyJS"
description: "Nesse artigo vou passar por todas as tecnologias que usei aqui: GraphQL, Styled Components, Algolia, Netlify CMS e mais um monte de coisa 😜"
tags: ['javascript', 'css', 'gatsby']
---

4 anos depois da última atualização meu site está de cara nova, chegando assim na terceira versão desde a sua concepção em 2013.

## Falando em 2013

Para quem tem curiosidade, essa era a cara desse site naquela época:

![Imagem do meu primeiro site](/assets/first-site.png)

Nada mal né? Esse projeto foi desenvolvido no começo de 2013, queria aprender novas tecnologias, principalmente relacionadas a geração estática de HTML. Para desenvolver essa versão utilizei coisas como:

- [Docpad](https://docpad.bevry.me/)
- [Less](http://lesscss.org/)
- [Bootstrap](https://getbootstrap.com/)
- [GruntJS](https://gruntjs.com/)

Pouco tempo depois, começou o boom de libs baseadas em JavaScript, muita coisa boa surgia, uma atrás da outra.

## Então chegamos em 2015

Em 2015, comecei a [trabalhar remoto](/blog/sobre-trabalhar-remoto/) e novamente me senti na necessidade de estudar novas stacks de desenvolvimento.

E qual a melhor forma de estudar? [Praticando](/blog/aproximando-seus-estudos-de-cenarios-reais/).

Então trabalhei na segunda versão desse site, que ficou com essa carinha aqui:

![Imagem do meu segundo site](/assets/second-site.png)

Nessa altura já tínhamos stacks mais legais disponíveis, então as escolhas foram:

- [Harp](http://harpjs.com/)
- [Jade](http://jade-lang.com/)
- [Stylus](http://stylus-lang.com/)
- [BEM](http://getbem.com/introduction/)
- [Gulp](https://gulpjs.com/)

A maior vantagem dessa stack, era a possibilidade de criar novos artigos usando Markdown, o que dava muita fluidez. Foram boas escolhas, e acho que ainda são tecnologias legais para trabalhar.

## Mas tudo passa, e o novo sempre chega

Dito isso, estamos em 2019. Por bastante tempo [concentrei meus artigos no Medium](https://medium.com/@felipefialho). Porém nos últimos meses não estava satisfeito com [algumas mudanças que aconteceram](https://willianjusten.com.br/diga-nao-ao-medium-tenha-sua-propria-plataforma/) por lá.

E como sempre, surgiram milhares de novas tecnologias, então achei que era o momento de estudar desenvolvendo uma nova versão para esse projeto, e de quebra usando algumas tecnologias bem _hypes_, como:

- [Gatsby](https://www.gatsbyjs.org/)
- [Gatsby Image](https://www.gatsbyjs.org/packages/gatsby-image/)
- [GraphQL](https://graphql.org/)
- [Styled Components](https://www.styled-components.com/)
- [styled-media-query](https://github.com/morajabi/styled-media-query)
- [Styled Icons](https://styled-icons.js.org/)
- [Algolia](https://www.algolia.com/products/instantsearch/)
- [Netlify CMS](https://www.netlifycms.org/)
- [Netlify](https://www.netlify.com/)

## Gatsby

![Gatsby](/assets/gatsby-png.png)

Gatsby é um SSG (Static Site Generator), mas tem como diferencial ser totalmente baseado em React e utilizar o poder do GraphQL para consumir conteúdos e assets.

Ou seja, Gatsby é um framework poderoso. Uma das suas principais vantagens é gerar arquivos estáticos (olá SEO) no build, enquanto usamos React em tempo de desenvolvimento.

Além disso, o Gatsby [possuí milhares de plugins](https://www.gatsbyjs.org/plugins/). Eles elevam a DevXP (Dev Experience) para outro patamar, porque fornecem soluções performáticas para várias questões do dia-a-dia, fazendo com que a pessoa que está desenvolvendo perca menos tempo com trivialidades e tenha mais tempo para focar coisas essenciais para o produto.

Por gerar arquivos estáticos e ter sistemas de cache, a performance é simplesmente espetacular.

Por cima acredito que o Gatsby só se torna desinteressante em projetos com grande volume de conteúdo dinâmico, nesse caso o [NextJS](https://nextjs.org/) pode funcionar melhor, por utilizar SSR (Server Side Render).

Ah, a documentação é simplesmente sensacional e dificilmente você precisará fazer consultas fora do próprio site do Gatsby.

## Gatsby Image

Está entre as coisas mais legais que vi nos últimos tempos.

Basicamente é um componente React que serve para interligar as consultas GraphQL com o próprio [processamento de imagens do Gatsby](https://image-processing.gatsbyjs.org/), e o resultado é sensacional.

Você escreve, por exemplo:

```js
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ image }) => (
  <>
    <Img fluid={image.childImageSharp.fluid} />
  </>
)

export const query = graphql`
  query {
    image: file(relativePath: { eq: "profile-pic.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 48, quality: 60) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
```

E vai gerar:

```html
<img sizes="(max-width: 48px) 100vw, 48px" srcset="26e79/profile-pic.jpg 12w, 816c5/profile-pic.jpg 24w, a3a29/profile-pic.jpg 48w, 8c045/profile-pic.jpg 72w, 01945/profile-pic.jpg 96w, a7152/profile-pic.jpg 460w" src="profile-pic.jpg" alt="Felipe Fialho" loading="lazy" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; object-position: center center; opacity: 1; transition: opacity 500ms ease 0s;">
```

Ou seja, um lazyload, com a imagem otimizada e fazendo um crop para todos os tamanhos que você definiu na query, automagicamente!

## GraphQL

![GraphQL](/assets/graphql.jpg)

O GraphQL foi criado pelo Facebook para facilitar a manipulação de dados, a princípio pensando em componentes React. De um jeito bastante simples, você faz consultas descrevendo que tipo de dados você precisa e ele vai retornar exatamente esses valores pra você.

Usando em conjunto com o Gatsby, conseguimos informar por exemplo, quais dados determinado componente vai precisar, e o Gatsby se encarrega de receber esses dados quando esse componente for utilizado no Browser. Simples e performático.

Assim, conseguimos manipular muitas coisas, como as imagens que comentei acima ou mesmo fazer coisas do tipo:

```js
{
  date(
    locale: "pt-br",
    formatString: "DD MMM[,] YYYY"
  ) // 04 Set, 2019
}
```

Da hora né?

## Styled Components

![Styled Components](/assets/styled-components.png)

Especificidade talvez seja o maior problema do CSS, colisão de classes pode literalmente quebrar um projeto.

Então surgiram sopas de letrinhas como OOCSS, SMACSS, BEM, DRY CSS, RCSS. Todas elas buscavam trazer conceitos para evitar colisões e tornar mais lógico o desenvolvimento de CSS.

Essas metodologias são legais, mas não são escaláveis, porque dependem de atuacão humana para funcionar. Sendo assim, começaram a surgir soluções baseadas em JavaScript como [CSS Modules](https://github.com/css-modules/css-modules).

Assim você foca em coisas mais importantes do que nome de classes, invés de escrever:

```css
.menu__item__link { }
```

Você escreve:

```css
.link { }
```

Gerando:

```css
._link_12ie2_1 { }
```

Você pode ver uma implementação de CSS Modules no [Kratos Boilerplate](https://github.com/felipefialho/kratos-boilerplate).

Styled Components é uma dessas soluções CSS-in-JS, mas acaba sendo ainda mais automatizada, porque aproveita métodos atuais de componentização para criar componentes a prova de colisão.

O conceito é o mesmo:

```js
import styled from 'styled-components'

export const Main = styled.div`
  align-items: center;
  display: flex;
`
```

Vai gerar automagicamente:

```css
.styled__Main-sc-11b8j8d-1-bSsuBw {
  align-items: center;
  display: flex;
}
```

Se quiser saber mais, pode ver um [exemplo de implementação no meu site](https://github.com/felipefialho/felipefialho.com/tree/master/src/components/Header).

## styled-media-query

Desde a época que usava Stylus para escrever CSS, uso o [Rupture](https://www.npmjs.com/package/rupture-sass) para facilitar a implementação de media queries.

O [styled-media-query](https://github.com/morajabi/styled-media-query) segue a mesma ideia, e deixa muito mais simples e organizado o tratamento de media queries.

Basta escrever:

```js
import styled from 'styled-components';
import media from 'styled-media-query';

const Box = styled.div`
  background: black;

  ${media.lessThan("medium")`
    background: red;
  `}

  ${media.between("medium", "large")`
    background: green;
  `}

  ${media.greaterThan("large")`
    background: blue;
  `}
`;
```

E automagicamente ele vai gerar:

```css
div {
  background: black;

  @media (max-width: 768px) {
    background: red;
  }

  @media (min-width: 768px) and (max-width: 1170px) {
    background: green;
  }

  @media (min-width: 1170px) {
    background: blue;
  }
}
```

Simples, eficaz e escalável.

## Styled Icons

Aquele tempo que você precisava manualmente baixar icones e criar sprites usando seu task-runner favorito ficou para trás. O [Styled Icons](https://styled-icons.js.org/) torna essa experiência simples e fluida.

```js
import styled from 'styled-components'
import { Zap } from 'styled-icons/octicons/Zap'

const RedZap = styled(Zap)`
  color: red;
`

const App = () => <RedZap />
```

E pronto! Seu ícone estará disponível em SVG, o que significa que você pode, por exemplo alterar facilmente a cor, usando um simples `fill: gray`.

## Algolia

Utilizei o [Algolia](https://www.algolia.com/) para criar o sistema de busca para o blog.

Ele viabiliza APIs com um sistema de busca extremamente poderoso, de acordo com as informações contidas nos textos. E o melhor: Totalmente gratuito para projetos pessoais.

O Algolia ainda possui um componente chamado [InstantSearch](https://www.algolia.com/products/instantsearch/), que tem integração com os principais frameworks do mercado.

Olha esse exemplo de um indice que ele criou automagicamente através de um [plugin do Gatsby](https://www.gatsbyjs.org/docs/adding-search-with-algolia/):

```js
{
  "date": "23 Jul, 2015",
  "description": "Quando o assunto é Mobile First, Media Queries e otimização de código eu tenho uma regra. Evitar ao máximo resetar propriedades",
  "title": "Otimizando e Organizando as Media Queries",
  "tags": [
    "css",
    "workflow"
  ],
  "fields": {
    "slug": "blog/otimizando-e-organizando-as-media-queries/"
  },
  "timeToRead": 4,
  "excerpt": "...",
  "objectID": "fcb60dd0-fa7a-5a7b-a5cc-90d0b330d130"
}
```

## Netlify CMS

Adoro escrever diretamente no Markdown, mas isso pode ser um problema quando estou sem acesso ao computador, especialmente o processo de subir imagens não é simples de fazer diretamente no celular. O [Netlify CMS](https://www.netlifycms.org/) surge para ajudar nisso.

Apesar de ser do Netlify, ele se integra muito bem com outras plataformas, inclusive o ghpages.

Saca só essa tela do meu CMS:

![Netlify CMS](/assets/netlify-cms.png)

Além disso, ele ainda tem sistema de rascunho e upload de imagens.

## Netlify

![Netlify](/assets/netlify.jpg)

E falando em [Netlify](https://www.netlify.com/), essa plataforma foi mais uma grande descoberta durante o desenvolvimento desse projeto.

É uma solução extremamente completa e automatizada para hospedagem de projetos, já que possui _continuous deployment_, _serverless functions_, https integrado e mais um monte de coisa.

O processo de _continuous deployment_ é tão simples que não só deixei meu site lá, como também migrei outros projetos. O mais legal é que cada build realizado pode ser acessado separadamente através de uma URL gerada automaticamente por ele.

Ah, novamente é totalmente gratuito para projetos pessoais.

## Quer aprender tudo isso que falei?

Toda essa stack foi inspirada na stack do site do [Willian Justen](https://twitter.com/Willian_justen), que [inclusive já tinha escrito um post sobre ela](https://willianjusten.com.br/making-of-blog-novo/).

Não satisfeito, ele lançou um [curso muito legal](https://click.linksynergy.com/deeplink?id=16ht5juwidA&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fcourse%2Fgatsby-crie-um-site-pwa-com-react-graphql-e-netlify-cms%2F%3FcouponCode%3DPROMOFIALHO) abordando várias das tecnologias que falei aqui.

Se você se interessou pelo tema, vale muito a [investir nesse curso](https://click.linksynergy.com/deeplink?id=16ht5juwidA&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fcourse%2Fgatsby-crie-um-site-pwa-com-react-graphql-e-netlify-cms%2F%3FcouponCode%3DPROMOFIALHO).

## Conclusão

O post ficou longo e mesmo assim ficou curto.

Cada tópico que abordei poderia ser um artigo individual. Mas espero que tenham curtido.

Até a próxima 🥳
