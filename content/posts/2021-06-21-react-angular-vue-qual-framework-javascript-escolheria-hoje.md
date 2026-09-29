---
title: 'React, Angular ou Vue - Qual Framework JavaScript escolheria hoje? 🤔'
date: 2021-06-21 00:00:01
description:
  'Os Frameworks JavaScript mais relevantes do mercado já tem alguns anos de
  vida e hoje podemos dizer que todos eles são muito bons e passaram com
  tranquilidade no filtro do tempo.'
image: /assets/2021-06-21-cover.jpg
tags: ['stack', 'framework', 'javascript']
---

Esse texto é uma versão em texto do vídeo: <strong>REACT, VUE ou ANGULAR - Qual
framework JavaScript escolheria hoje</strong>
[que publiquei no meu canal no Youtube](https://www.youtube.com/@felipefialhovlog).

Vale a pena assistir! 😊

<iframe width="650" height="400" src="https://www.youtube.com/embed/L78ENSEHXLE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

## Introdução

Essa pergunta foi feita pelo Pablo Ferreira pelo LinkedIn e eu não vou fugir
dela... ele perguntou na lata:

> React ou Vue?

E pra eu me justificar 😋

![Pergunta no LinkedIn](assets/2021-06-21-pergunta.png)

Eu poderia facilmente responder essa pergunta dizendo que depende do contexto e
blablabla, mas não vou fazer isso embora de fato essa seja a resposta mais
sensata 😅

## Frameworks (ou libs) JavaScript

Tive a sorte de trabalhar com os 3 Frameworks mais populares do mercado, ou
seja, trabalhei com Angular, Vue e React (e até com um pouquinho de Svelte).

Com o passar do tempo eles foram ficando cada vez mais parecidos com relação a
coisas como performance ou mesmo as funcionalidades que eles trazem.

Acredito que as maiores diferenças hoje em dia estão na forma de escrever o
código, que muda principalmente do React com relação ao Angular e Vue, e pelo
fato do React **não ser um Framework** e sim uma lib.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1313922039204306944">
    <p>Nos últimos tempos trabalhei com Angular, React e Vue.<br><br>Além de terem maturidade parecida, atualmente muitos conceitos são compartilhados entre eles, isso ajuda muito na curva de aprendizado.<br><br>Com prós e contras, temos três opções sensacionais.<br><br>Quem ganha com isso é a gente 😁</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1313922039204306944">October 7, 2020</a></figcaption>
</figure>

Dessas 3 opções prefiro a forma de escrever código e resolução de paradigmas do
React porque é a mais próxima do JavaScript e considero mais legível além de não
precisar aprender tantas coisas quanto na forma de escrever componentes
especialmente quando se trata do Angular, por exemplo.

Mas ao mesmo tempo tem a parte de arquitetura e aqui é onde tenho algumas
ressalvas com relação ao React.

### Svelte

Mas antes quero dizer que temos outros Frameworks de JavaScript bem
interessantes no mercado.

Entre eles o Svelte que é um dos que tem a abordagem mais diferente atualmente,
já que embora seja um Framework em tempo de desenvolvimento, ele _transpila_
código em JavaScript puro após o build, se aproveitando ao máximo das
funcionalidades mais recentes do EcmaScript, o que faz com que ele seja
extremamente rápido e muito próximo de JavaScript _vanilla_.

Mas mesmo assim, apesar do Svelte já ter uns aninhos de estrada, não
consideraria ele pra um cenário de ser _core_ no produto principal de uma
empresa por exemplo.

Principalmente levando em consideração o fato dele ter uma comunidade muito
menor, menos opções de libs complementares e com certeza também daria muito mais
trabalho para achar profissionais no mercado interessados em trabalhar com ele.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1301943110256164867">
    <p>➡️ Sobre Svelte<br><br>Faz anos que acompanho, mas tô brincando bastante ultimamente.<br><br>O diferencial é ser um framework durante o desenvolvimento mas compilar pra pequenos módulos em Vanilla JS no build, sem Virtual DOM e sem código extra.<br><br>É super performático e tem uma DevXP foda 😜</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1301943110256164867">September 4, 2020</a></figcaption>
</figure>

### React

Voltando a falar dos 3 Frameworks principais que temos atualmente, como disse
antes React não é um Framework e sim uma lib, então ele dá liberdade total pra
que as próprias pessoas que vão atuar no projeto escolham quais outras libs vão
utilizar e qual arquitetura o projeto vai ter.

Apesar de parecer positivo, e realmente isso seja em alguns cenários, é
justamente isso que sempre me fez ter um pé atrás em escolher React em
determinados projetos.

São muitas decisões para tomar, muitas formas diferentes de fazer a mesma coisa
e muitas dessas decisões são subjetiva e muitas vezes baseadas em gostos
pessoais e não costumo gostar muito quando decisões são tomadas baseadas em
gostos pessoais e de forma subjetiva.

> Não costumo gostar muito quando decisões são tomadas baseadas em gostos
> pessoais e de forma subjetiva.

Isso pode ser ruim, porque conforme as pessoas que tomaram essas decisões
iniciais vão saindo do projeto, vai abrir margem grandes alterações na
arquitetura e na estrutura do código, que muitas vezes também vão ser baseadas
em gostos pessoais, sejam colocadas em prática.

Além disso nem sempre o projeto vai contar com uma documentação robusta
explicando detalhadamente as abordagens e padrões que foram utilizadas e quais
foram as motivações para as escolhas delas.

Por isso é bem comum que até mesmo dentro de uma mesma empresa, a arquitetura de
projetos que utilizam React sejam bem diferentes entre si, mesmo que sejam
projetos com escopos muito parecidos.

### Angular e Vue

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1172513256986087424">
    <p>A data de modificação de alguns arquivos do core do <a href="https://x.com/angular">@angular</a> é a data da Viagem no Tempo feita em um DeLorean  no &quot;De Volta para o Futuro (Back to the Future)&quot; 🚀  <br><br>- 26 de outubro de 1985<br><br>Sensacional 😁 <a href="https://t.co/scTaLluQiL">pic.twitter.com/scTaLluQiL</a></p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1172513256986087424">September 13, 2019</a></figcaption>
</figure>

Já Angular possui um escopo muito mais fechado, com boa parte das definições
sendo mais limitadas e não sendo muito recomendadas de se alterar.

Isso garante que os projetos sigam padrões e arquiteturas mais parecidas entre
si, além disso possui um monte de funcionalidades que auxiliam durante o
desenvolvimento.

Minha experiencia com Angular foi extremamente positiva, trabalhei mais de dois
anos (quase três na verdade) com esse Framework e além da parte de arquitetura e
padrões que já elogiei antes, também tem o TypeScript muito bem integrado, o que
ajuda demais na escalabilidade de projetos (quem usa TypeScript em projetos
grandes sabe do que estou falando).

Enquanto isso Vue faz um meio termo muito interessante entre o React e o
Angular, dando sugestões de como devemos seguir com relação a padrões de código
e arquitetura mas dando bastante flexibilidade pra alterar caso a gente queira

Além do Vue também ter várias funcionalidades acopladas que podemos utilizar
caso faça sentido dentro de determinado projeto.

### Os Frameworks de React - Next.js e Gatsby

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1322170844790087682">
    <p>O ecossistema de React amadureceu demais com a consolidação de frameworks como Gatsby e Next.js.<br><br>Ajudaram a definir bons padrões de configurações, arquitetura e desenvolvimento, melhorando muito a DX (Dev Experience) e escalabilidade dos projetos.<br><br>O Next.js 10 tá espetacular ❤️</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1322170844790087682">October 30, 2020</a></figcaption>
</figure>

Mas até aqui estou falando de React, Angular e Vue em suas versões "puras", tudo
isso mudou quando Frameworks baseados em React surgiram e então dois deles se
destacaram mais:

- O Gatsby
  ([conto nesse post como foi a experiência de criar a versão atual do meu site usando o Gatsby](/blog/como-foi-desenvolver-meu-novo-blog-usando-o-gatsbyjs/))
- E o Next.js

E é justamente o Next.js que pra mim levou o ecossistema de React pra outro
patamar.

Estabelecendo padrões nos projetos, definindo arquitetura, trazendo um monte de
funcionalidades extremamente úteis, conta com uma documentação maravilhosa,
possui Server Side Render e Static Site Generator nativos que resolve vários
problemas de SEO, tem ótimos indices de performance, conta com uma comunidade
bastante ativa, possui atualizações frequentes e é desenvolvido por uma empresa
cada vez mais maior e confiável que é a Vercel.

Tudo isso se aproveitando de toda a confiabilidade, estabilidade e a forma de
desenvolver componentes do React que já elogiei anteriormente.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1359128693898153988">
    <p>Um conceito que ganhou força nos últimos anos e deve impactar cada vez mais o mercado tech:<br><br>- Dev Experience (DevX)<br><br>Ou seja, melhorar a experiência de desenvolvimento, inclusive automatizando tarefas chatas e repetitivas pra aumentar produtividade nas coisas mais importantes.</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1359128693898153988">February 9, 2021</a></figcaption>
</figure>

Além disso tanto o Gatsby quanto o Next.js apresentam uma dev experience
sensacional e quem trabalha com produtos sabe a diferente que isso faz no nosso
dia a adia.

Apesar de o Vue também contar com o Nuxt.js que é uma espeecie de Next.js pro
Vue e dele também ser um Framework com muitas funcionalidades e bastante
interessante, o React com o Next.js leva mais uma vantagem que faz muita
diferença:

> Existe uma disponibilidade muito maior de profissionais e a adesão desse
> Framework é muito maior no mercado

Isso faz toda diferença porque uma das maiores dificuldades de escalar um
projeto ou um produto está exatamente na contratação de pessoas e apesar do
mercado de Vue também ser bem aquecido, React e seu ecossistema ainda tem larga
vantagem nesse sentido e acho muito improvável que isso mude nos próximos anos.

## Se apegue aos conceitos, não as tecnologias

Importante ressaltar que acho a curva de aprendizado entre os Frameworks
JavaScript que citei muito tranquila.

Dificilmente uma pessoa que trabalha com React vai ter dificuldades pra
trabalhar com Vue (ou Angular) e vice versa, inclusive considero importante que
pessoas que trabalham com desenvolvimento se apeguem muito menos ao Framework em
si e muito mais ao conceito que eles trazem e os problemas que eles resolvem,
afinal de contas frameworks quase sempre são passageiros e vamos trabalhar com
muitos deles no decorrer da carreira.

> Frameworks quase sempre são passageiros e vamos trabalhar com muitos deles no
> decorrer da carreira.

Alias falo desse tema no vídeo sobre **O que Front-end Developers precisam
saber**:

<iframe width="650" height="400" src="https://www.youtube.com/embed/GRStdYGAmrQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

E também cheguei a rascunhar um pouco sobre assunto no vídeo sobre **10 coisas
que faria se estivesse iniciando minha carreira como desenvolvedor
(Front-end)**:

<iframe width="650" height="400" src="https://www.youtube.com/embed/7yar-WWOifI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Mas ao mesmo tempo existe toda uma questão de demanda de mercado e isso pode
influenciar com que pessoas achem melhor trabalhar e se "especializar" em
determinados Frameworks ao invés de outros e o interesse em React acaba sendo
maior nesse momento.

## Respondendo de forma objetiva

Bom, dito tudo isso percebemos que os 3 Frameworks passaram com tranquilidade no
filtro do tempo ou seja, foram se tornando cada vez mais **confiáveis e
estáveis** com o passar do tempo.

Mas para finalizar vou responder essa pergunta de forma objetiva:

Em suas versões puras, entre Angular, Vue e React acho o Vue o mais equilibrado
de todos e seria minha escolha padrão na maioria dos casos.

> Nas versões puras desses frameworks **acho o Vue o mais equilibrado** de todos
> e seria minha escolha padrão na maioria dos casos

Deixando o Angular como alternativa para projetos que contam com um time
composto por profissionais Fullstack com mais foco em Back-end ou mesmo em
sistemas mais corporativos.

Mas considerando o cenário atual, com esses Frameworks de React que surgiram nos
últimos anos, que como disse antes trouxeram funcionalidades incríveis além da
consolidação de padrões e arquiteturas super bem definidas, atualmente eu
provavelmente escolheria React rodando com Next.JS e TypeScript na grande
maioria dos projetos 😁

> Hoje escolheria **React rodando com Next.JS e TypeScript** na grande maioria
> dos projetos
