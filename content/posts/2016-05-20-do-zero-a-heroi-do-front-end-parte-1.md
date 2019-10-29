---
title: "Do Zero a Herói Front-End (Parte I)"
date: 2016-05-20 00:00:01
description: "Um guia completo para aprender desenvolvimento Front-End"
image: /assets/2016-05-20-do-zero-a-heroi-do-front-end-parte-1.png
tags: ["carreira", "estudos", "css", "html", "javascript"]
---

Lembro-me quando eu comecei a aprender desenvolvimento Front-End. Encontrei tantos artigos e fiquei tão sobrecarregado pela quantidade de material que seria necessário aprender que não sabia nem por onde começar.

Esse guia vai ajudá-lo a navegar pela aprendizagem de desenvolvimento Front-End. Ele fornece fontes de aprendizado que eu achei eficaz no passado, junto com explicações suplementares.

Para manter esse guia digestível, eu dividi ele em duas partes. A primeira parte vai falar sobre desenvolvimento de interfaces com HTML e CSS. A segunda parte vai falar sobre JavaScript, estruturas e padrões de projeto. Se você estiver familiarizado com HTML e CSS você pode pular para a [segunda parte que cobre todas as coisas de JavaScript](/blog/do-zero-a-heroi-do-front-end-parte-2).

## HTML e CSS básico

No desenvolvimento Front-End, tudo começa com [HTML](https://pt.wikipedia.org/wiki/HTML) e [CSS](https://pt.wikipedia.org/wiki/Cascading_Style_Sheets), eles controlam as coisas que você vê em um website. HTML é dedicado para conteúdo enquanto CSS trata de estilo e layout.

![De código para interface](https://d262ilb51hltx0.cloudfront.net/max/800/1*1msCRn-wDUzuGtI1yPUbAA.gif)

Para começar, leia os tutoriais de [HTML)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Introduction) e [CSS)](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/What_is_CSS) do Mozilla Developer Network(MDN). O MDN fornece explicações passo-a-passo dos conceitos mais importantes de HTML e CSS. E ainda, cada capitulo tem uma página com demonstrações interativas no Codepen e JSFiddle.

Após completar esses tutoriais, dê uma olhada no curso do CodeAcademy: [Make a Website)](https://www.codecademy.com/learn/make-a-website). Esse tutorial leva apenas algumas hora para ser concluído e é um bom começo para a construção de websites com HTML e CSS. Se você quiser mais, [Building web forms](https://www.codecademy.com/courses/web-beginner-en-Vfmnp/0/2?curriculum_id=50b91eda28c2fb212300039e) é outro tutorial do CodeAcademy que leva você a construir o estilo de um formulário web.

Para praticar CSS tente o [CSS Diner](http://flukeout.github.io), é um desafio divertido de CSS. Outro aspecto importante sobre HTML e CSS são os layouts, [LearnLayout](http://learnlayout.com) é um tutorial interativo que vai mostrar como criar layouts usando HTML e CSS.

Também aprenda como usar o [Google Fonts](https://www.google.com/fonts) com o [Basics of Google Font API)](https://css-tricks.com/snippets/css/basics-of-google-font-api) do CSSTricks. Tipografia é fundamental para construir suas interfaces. Quando você tiver tempo, eu recomendo fortemente que você leia o livro online gratuito: [Professional Web Typography](https://prowebtype.com) do Donny Truong, vai te ensinar todas as coisas que você precisa saber sobre tipografia no desenvolvimento Front-End.

Ao longo desse processo não se preocupe tanto em memorizar coisas. Em vez disso concentre-se em aprender como HTML e CSS trabalham juntos.

## Praticando HTML e CSS básicos

Agora que você tem uma compreensão básica de HTML e CSS, vamos ter alguma diversão. Nessa sessão existem duas experiencias para te dar prática na construção de sites e interfaces. Eu uso o termo "experimentos", porque em experimentos você aprende ao máximo, tanto com o fracasso quanto com o sucesso.

### Experimento 1

Em nosso primeiro experimento, nós vamos usar o [CodePen](http://codepen.io). CodePen é um playground de desenvolvimento Front-End, onde você pode codificar em HTML e CSS sem precisar salvar os arquivos localmente, ele também tem preview ao vivo que atualiza assim que você salva seu código.

Ao usar o CodePen, você mata dois coelhos com uma cajadada só. De um lado você pratica HTML e CSS, do outro lado você cria um portfólio básico. Também vamos usar o [Dribbble](https://dribbble.com), que é cheio de inspirações para o design.

Vá para o Dribbble e procure um design que seja simples o bastante para você codificar em poucas horas. Eu selecionei alguns modelos de design para você começar: [1](https://dribbble.com/shots/2262761-Mobile-Blog-App-Interface/attachments/424147), [2](https://dribbble.com/shots/2492038-Task-List-App/attachments/489171), [3](https://dribbble.com/shots/2144170-Day-014-Location-Card/attachments/392323), [4](https://dribbble.com/shots/2639709-Confirm-Reservation/attachments/528798) e [5](https://dribbble.com/shots/2314157-Daily-UI-Day-1/attachments/439137). Eu escolhi modelos com mobile-first porque são menos complexos do que sua versão para desktop. No entanto, sinta-se livre para escolher a versão para desktop também.

![Exemplos de mobile-first](https://d262ilb51hltx0.cloudfront.net/max/800/1*fJ77FSYZ3uadewW0Z8F_ZA.png)

Depois que você tiver escolhido um design, vá em frente e tente codificar no CodePen. Se você ficar travado, lembre-se que o [StackOverflow](http://stackoverflow.com) é seu amigo. Outra prática útil é ir em sites como [Medium](http://medium.com), [AirBnB](http://www.airbnb.com) e [Dropbox](http://www.dropbox.com), usando a ferramenta de inspeção do seu browser, para ver como eles conseguem alcançar diferentes layouts e estilos. Também dê uma olhada em algumas [pens no CodePen](http://codepen.io/pens). Peguei algumas referencias legais:

https://codepen.io/cameronbaney/pen/gfjLJ

https://codepen.io/jonathanzwhite/pen/GZVKmE

Se sua versão ficar diferente da original, não se sinta desencorajado. Continue praticando com diferentes layouts e você vai notar melhorias a cada tentativa.

Se você não tiver um background como designer, é provável que seu olhar de designer seja subdesenvolvido. Um desenvolvedor Front-End com um bom olho de designer será capaz de identificar bons projetos e replica-los perfeitamente. Eu escrevi um artigo há algumas semanas sobre como [desenvolver seu olhar de designer](https://medium.com/@JonathanZWhite/developing-your-eye-for-design-cce944bbeae4#.tsg9204dm).

### Experimento 2

Espero que a primeira experiencia tenha lhe dado alguma confiança com a escrita em HTML e CSS. Para o experimento 2 vamos dar uma olhada em alguns sites, e em seguida, codificar alguns de seus componentes.

Alguns websites usam CSS frameworks ou ofuscam as suas classes no CSS, tornando difícil para você ler o código fonte. Por isso eu selecionei alguns sites bem desenhados e com fácil leitura do código fonte.

- [Dropbox for Business](https://www.dropbox.com/business): Tente replicar a sessão [hero](https://en.wikipedia.org/wiki/Hero_image)
- [AirBnB](https://www.airbnb.com): Tente replicar o footer
- [PayPal](https://www.paypal.com/home): Tente replicar a navegação
- [Invision](http://www.invisionapp.com): Tente replicar a sessão de inscrição na parte inferior da página
- [Stripe](https://stripe.com/us/pricing): Tente replicar a sessão de pagamentos

Mais uma vez, o foco do experimento 2 não é recriar a página inteira. Apesar que certamente não mal! Escolha alguns componentes chaves como a navegação ou uma sessão *hero* para você codificar. Eu forneci sugestões ao lado da lista de sites, mas sinta-se livre para escolher outros componentes.

Você pode codificar esse experimento no [CodePen](http://codepen.io) ou armazenar localmente. Se você escolher armazenar localmente, você pode baixar esse [exemplo de projeto](https://github.com/murtaugh/HTML5-Reset) como um boilerplate ou criar os arquivos a partir do zero. Eu sugiro usar editores como [Atom](https://atom.io) ou [Sublime](https://www.sublimetext.com).

Além disso, tenha em mente que para qualquer site, você sempre pode ver seu HTML e CSS. Basta clicar com o botão direito na página ou em um componente, clicar em inspecionar, e um painel vai aparecer com o HTML a esquerda e o CSS a direita. Assim que estiver pronto, ou ficar preso, use o Inspector para ver como está, e comparar seu HTML e CSS.

## Melhores práticas de HTML e CSS

Até agora o que você está aprendendo são os princípios básicos de HTML e CSS. O próximo passo é aprender as melhores práticas. As melhores práticas são um conjunto informal de regras que melhoram a qualidade do seu código.

### Marcação semântica

Uma das melhores práticas para HTML e CSS é escrever uma marcação semântica. Uma boa semântica web significa usar as tags HTML apropriadas e nome de classes significativas para transmitir um significado estrutural.

Por exemplo, a tag `h1` conta para nós que o texto é um titulo importante. Outro exemplo seria a tag `footer` , que nos diz que o elemento pertence a parte inferior da página. Para saber mais leia [ A Look Into Proper HTML5 Semantics](http://www.hongkiat.com/blog/html-5-semantics) e [ What Makes For a Semantic Class Name](https://css-tricks.com/semantic-class-names) do CSSTricks.

### Convenções de nomenclatura CSS

A próxima boa prática para o CSS é propor uma nomenclatura apropriada. Uma boa nomenclatura, como em marcação semântica, transmite um significado e ajuda a tornar nosso código previsível. Você pode ler sobre as diferentes convenções de nomenclatura no artigo [OOCSS, ACSS, BEM, SMACSS: what are they? What should I use?](http://clubmate.fi/oocss-acss-bem-smacss-what-are-they-what-should-i-use).

Em geral, eu sugiro experimentar convenções de nomenclaturas simples que fazem sentido intuitivo pra você. Com o tempo, você vai descobrir o que funciona melhor. Para ver como empresas, tipo o Medium, utilizam as convenções de nomenclaturas como o BEM, leia [Medium’s CSS is actually pretty f***ing good](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06#.ef81j61eg). Nesse artigo, você também vai aprender que chegar em um conjunto eficaz de convenções CSS é um processo iterativo.

### CSS Reset

Os navegadores tem pequenas inconsistências de estilos para margens até line-heights. Por esse motivo, sempre use um *CSS Reset*. O [MeyerWeb](http://meyerweb.com/eric/tools/css/reset/index.html) é uma solução popular. Se você quiser ir mais fundo, pode ler o [ Create Your Own Simple Reset.css File](http://code.tutsplus.com/tutorials/weekend-quick-tip-create-your-own-resetcss-file--net-206).

### Suporte Cross Browser

Suporte *Cross Browser* significa que seu código suporta a maioria dos navegadores atualizados. Algumas propriedades CSS, como os `transitions`, precisam de
[vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) para funcionar corretamente em diferentes navegadores. Você pode ler mais sobre *vendor prefixes* no artigo, [CSS Vendor Prefixes](http://webdesign.about.com/od/css/a/css-vendor-prefixes.htm). O principal é que você deve testar seu site em vários navegadores, incluindo Chrome, Firefox e Safari.

![Lista de Navegadores](https://d262ilb51hltx0.cloudfront.net/max/800/1*pCAitbJZl5eai2oNdzIphA.png)

### Pré-processadores CSS e Pós-processadores CSS

Desde o inicio do CSS nos anos 1990, um longo caminho já foi percorrido. Como os sistemas de interface do usuário se tornaram cada vez mais complexos, as pessoas desenvolveram ferramentas conhecidas como pré-processadores e pós-processadores para gerenciar a complexidade.

Pré-processadores CSS são extensões da linguagem CSS que adicionam novas features, como variáveis, mixins e heranças. Atualmente os dois principais pré-processadores são [Sass](http://sass-lang.com/guide) e [Less](http://lesscss.org). Em 2016, o Sass é geralmente mais utilizado. Bootstrap, o popular framework-responsivo CSS, está mudando de Less para Sass também. Além disso, quando a maioria das pessoas estão falando sobre Sass, na verdade elas estão falando sobre [SCSS](https://www.sitepoint.com/whats-difference-sass-scss).

![Sass x Less](https://d262ilb51hltx0.cloudfront.net/max/800/1*7Px9Kzaw8-eLCf2D41yauQ.png)

Pós-processadores CSS aplicam as alterações no CSS depois de ter sido escrito ou compilado com um pré-processador. Por exemplo, alguns pós-processadores como PostCSS tem plugins que adicionam *vendor prefixes* para os navegadores automaticamente.

Quando você descobre pela primeira vez pré-processadores e pós-processadores, é tentador usá-los em todos os lugares. No entanto, comece simples e adicione extensões como variáveis e mixins somente quando necessário. O artigo que sugeri anteriormente, [Medium’s CSS is actually pretty f***ing good](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06#.ef81j61eg), também abrange o quanto é demais quando se trata de pré-processadores.

### Grid Systems e Responsividade

*Grid systems* são estruturas CSS que deixam você alinhar elementos horizontalmente e verticalmente.

![Grid Systems](https://d262ilb51hltx0.cloudfront.net/max/800/1*SqbRKZTnd78gsQEOPPAt1g.png)

Frameworks de grids como o [Bootstrap](http://getbootstrap.com), [Skeleton](http://getskeleton.com) e [Foundation](http://foundation.zurb.com) fornecem folhas de estilo que gerenciam linhas e colunas nos layouts. Enquanto *grid systems* são úteis, também é importante compreender como eles funcionam. [ Understanding CSS Grid Systems](http://www.sitepoint.com/understanding-css-grid-systems) e [Don’t Overthink Grids](https://css-tricks.com/dont-overthink-it-grids) são ótimos resumos.

Uma das principais propostas dos *grid systems* são adicionar responsividade no seu site. Responsividade significa que seu site redimensiona de acordo com a largura da janela. Muitas vezes o resultado é alcançado através de [CSS media queries](http://www.w3schools.com/css/css_rwd_mediaqueries.asp), regras de CSS que são aplicadas somente em determinadas larguras de tela.

![Exemplo de responsividade](https://d262ilb51hltx0.cloudfront.net/max/800/1*EERzyzZhHJ5FWXKi2PNxuA.gif)

Você pode ler mais sobre *media queries* em [Intro to Media Queries](https://varvy.com/mobile/media-queries.html). E porque entramos a era do [mobile-first](http://zurb.com/word/mobile-first), leia também [An Introduction to Mobile-First Media Queries](http://www.sitepoint.com/introduction-mobile-first-media-queries).

## Praticando as boas práticas de HTML e CSS

Agora que você já está armado com as melhores práticas, vamos testa-los em batalha. O objetivo dos próximos dois experimentos é a prática de escrever código limpo e observar o efeito a longo prazo das boas práticas, sobre a legibilidade e facilidade de manutenção.


### Experimento 3

Para o experimento 3, escolha um dos experimentos anteriores e refatore seu código usando as boas práticas que você aprendeu. Refatoração significa editar o seu código para que fique com a leitura mais fácil e menos complexo.

Ser capaz de efetivamente refatorar código é uma habilidade importante de um desenvolvedor Front-End. Criar código de qualidade é um processo iterativo. [CSS Architectures: Refactor Your CSS](https://www.sitepoint.com/css-architectures-refactor-your-css) é um bom ponto de partida para você refatorar o seu código.

![Código refatorado](https://d262ilb51hltx0.cloudfront.net/max/800/1*u0dt7ROmLrAV4sm7uqtxWA.png)

A seguir temos algumas coisas para perguntar para você mesmo quando você estiver refatorando seu código.

- O nome das suas classes são ambíguas? Daqui 6 meses você ainda vai ser capaz de entender o que o nome da classe significa?
- O seu HTML e CSS são semânticos? Ao olhar para seu código você é capaz de discernir rapidamente significado estrutural e relacional?
- Você está utilizando o mesmo código de cor hexadecimal mais de uma vez em seu código? Faria mais sentido refatorar e colocar em uma variável do Sass?
- Será que seu trabalho funciona tão bem no Safari quanto funciona no Chrome?
- Você poderia substituir o seu código de layout para algum *grid system* como o [Skeleton](http://getskeleton.com)?
- Você está usando `!important` frequentemente? Como você pode corrigir isso?

### Experimento 4

O último experimento vai usar tudo que você aprendeu sobre boas práticas. No entanto, muitas vezes o resultado de usar boas práticas não são aparentes até que você use em um projeto maior.

Para a última experiencia, você vai construir seu próprio portfólio. Como um desenvolvedor Front-End, o portfólio é um dos seus ativos digitais mais importantes. Portfólio é um site aonde você mostra o seu trabalho. Mais importante ainda, é um registro que te ajuda a acompanhar seu progresso e desenvolvimento. Assim, mesmo que você só tenha 1 ou 2 coisas para mostrar, exiba-os.

![ShiftBrain Studio](https://d262ilb51hltx0.cloudfront.net/max/800/1*0Yyx08kVpfchZodM7DkHZA.jpeg)

Para começar, siga junto com o artigo do Adham Dannaway [My (Simple) Workflow To Design And Develop A Portfolio Website](https://www.smashingmagazine.com/2013/06/workflow-design-develop-modern-portfolio-website).

Se seu primeiro portfólio não ficar perfeito, tudo bem. Portfólios passam por muitas modificações. E o importante é que você o construiu com suas próprias habilidades.

## Mantenha-se atualizado

Como HTML e CSS não vão sair de moda tão cedo, é importante manter-se atualizado com o mercado Front-End.

![O cenário Front-End está em constante mudança](https://d262ilb51hltx0.cloudfront.net/max/800/1*a-UBbU05CgPwMgkFFeDHXg.jpeg)

Abaixo está uma lista de sites, blogs e fóruns que são ao mesmo tempo agradáveis de ler e informativos.

- [CSSTricks](https://css-tricks.com)
- [Smashing Magazine](https://www.smashingmagazine.com)
- [Designer News](https://www.designernews.co)
- [Nettuts+](http://code.tutsplus.com)
- [CSS Wizard](http://csswizardry.com)

## Aprenda pelo exemplo

Finalmente, a melhor maneira de aprender é pelo exemplo. Aqui estão um conjunto de *styleguides* e convenções de códigos que vão te ensinar como ser um desenvolvedor Front-End mais eficaz.

### Styleguides

![Styleguide de tipografia](https://d262ilb51hltx0.cloudfront.net/max/800/1*792UDPCcmauyc7MDehMHYg.png)

*Styleguides* são coleções de componentes e padrões de CSS que podem ser reutilizados no seu site. A principal coisa a se observar nesses *styleguides* é como componentes baseados em HTML e CSS podem ser reutilizados para manter o seu código [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

- [Mapbox](https://www.mapbox.com/base/styling)
- [LonelyPlanet](http://rizzo.lonelyplanet.com/styleguide/design-elements/colours)
- [SalesForce](https://www.lightningdesignsystem.com)
- [MailChimp](http://ux.mailchimp.com/patterns)

### Convenções de código

Convenções de código são projetadas para manter o seu código legível e de fácil manutenção. Alguns desses links como o [CSS Guidelines](http://cssguidelin.es) são *guidelines* para você escrever melhor HTML e CSS, enquanto outros links como [Github internal CSS toolkit and guidelines](https://github.com/primer/primer) são exemplos de códigos com qualidade.

- [CSS Guidelines](http://cssguidelin.es)
- [Github internal CSS toolkit and guidelines](https://github.com/primer/primer)
- [AirBnB’s CSS Styleguide](https://github.com/airbnb/css)

## Considerações finais

Esperamos que no final desse artigo você esteja familiarizado com HTML e CSS e tenha alguns projetos em desenvolvimento. A melhor maneira de aprender desenvolvimento Front-End é através de construção de projetos e experimentação. Lembre-se, todo desenvolvedor Front-End teve que começar de algum lugar. É melhor começar agora do que amanhã!

## Sobre esse artigo

Esse texto é uma tradução livre do fantástico artigo [From Zero to Front-end Hero (Part 1)](https://medium.freecodecamp.com/from-zero-to-front-end-hero-part-1-7d4f7f0bff02#.vg97q5yd8) publicado no Medium pelo [@jonathanzwhite](https://twitter.com/jonathanzwhite).

Então quero agradece-lo primeiro por ter escrito esse ótimo texto, segundo por ter permitido que eu fizesse essa tradução.

Importante ressaltar que a tradução não é literal, adaptei algumas partes para facilitar a compreensão. Caso encontre erros graves de tradução pode abrir uma [pull-request](https://github.com/felipefialho/felipefialho.github.io) com a correção do problema ou uma [issue informando aonde é o erro](https://github.com/felipefialho/felipefialho.github.io/issues).
