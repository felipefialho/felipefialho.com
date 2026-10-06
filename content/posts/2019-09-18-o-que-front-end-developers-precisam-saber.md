---
title: 'O que Front-end Developers precisam saber'
date: 2019-09-18 00:00:01
description:
  'Resposta simples: HTML, CSS e JavaScript. Mas simples é uma coisa que o
  Desenvolvimento Front-end deixou de ser faz muito tempo 😄'
image: /assets/2019-o-que-front-enders-precisam-saber-cover.png
tags: ['front-end', 'carreira']
---

### Versão em vídeo

Essa é uma versão em vídeo do conteúdo apresentado nesse artigo
[que publiquei no meu canal no Youtube](https://www.youtube.com/@felipefialhodev).

Vale a pena assistir! 😁

<iframe width="650" height="400" src="https://www.youtube.com/embed/GRStdYGAmrQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Primeiro, alguns dados

Pesquisei no [Google Trends](https://trends.google.com.br), o interesse pelo
termos _Front-end Developer_ (Mundo) e _Desenvolvedor Front-end_ (Brasil), nos
últimos 10 anos.

Os números representam o interesse de pesquisa, relativo ao ponto mais alto no
gráfico de uma determinada região em um dado período. Um valor de 100 representa
o pico de popularidade de um termo. Um valor de 50 significa que o termo teve
metade da popularidade. Uma pontuação de 0 significa que não havia dados
suficientes sobre o termo.

Esse foi o resultado no mundo:

![Google Trends: Front-end Developer](assets/2019-o-que-front-enders-precisam-saber-front-end-developer.png)

No Brasil, apesar de altos e baixos, o cenário não é muito diferente:

![Google Trends: Desenvolvedor Front-end](assets/2019-o-que-front-enders-precisam-saber-desenvolvedor-front-end.png)

Ou seja, Desenvolvimento Front-end segue em alta e deve se manter assim nos
próximos anos. Empresas cada vez mais estão buscando esse perfil profissional e
cada vez mais pessoas se interessam e buscam informações para entrar nessa
profissão.

Algumas coisas que podem fazer sentido nesse momento, podem não fazer sentido no
futuro. O mundo de desenvolvimento se move com extrema velocidade, assim como
minhas opiniões 😂

Dito isso, vou listar algumas habilidades que considero importantes para
trabalhar nessa área. Não trago a verdade absoluta e estou longe de ter
conhecimento para tal, mas trago a visão pessoal de alguém que trabalha com isso
faz 10 anos, no caso eu.

Bora lá! 😜

## O básico de Desenvolvimento Web

Essas são algumas coisas que endereçam desenvolvimento web em geral e são de
extrema importância para uma carreira sólida.

### Configuração de domínio e hospedagem

Não importa o projeto que você faça ou esteja, ele estará hospedado em algum
lugar e precisa ter um domínio configurado.

Cada vez mais temos soluções que automatizam essas etapas, como por exemplo o
[Netlify](https://www.netlify.com/), [Heroku](https://www.heroku.com/) e
produtos da [AWS](https://aws.amazon.com). Mas nem sempre essas possibilidades
estarão disponíveis, por isso é interessante entender como esse processo
funciona e saber configurar manualmente.

### Terminal

![Terminal](assets/2019-o-que-front-enders-precisam-saber-terminal.png)

O terminal segue sendo uma das ferramentas mais usadas no nosso dia a dia. Boa
parte das tecnologias usadas no Desenvolvimento Front-end moderno, precisam ser
utilizadas a partir de um terminal.

A boa notícia, é que atualmente temos várias libs com alguns atalhos que
facilitam o uso desse, muitas vezes assustador, recurso. Além disso, alguns
editores de códigos como o [VSCode](https://code.visualstudio.com/) já possuem
terminal integrado, ajudando demais no dia a dia.

### Como _client-side_ e _server-side_ se comunicam

Também é muito importante entender como é feita a comunicação entre
_client-side_ e _server-side_. Boa parte do trabalho no desenvolvimento
Front-end é integrar e interagir com APIs.

Alguns tópicos legais para estudo:

- Web Services, REST e GraphQL
- Operações: POST, GET, PUT, PATCH, and DELETE
- Protocolo HTTP

O canal do [Akita](https://twitter.com/AkitaOnRails) no Youtube tem um monte de
vídeos explicando muito bem alguns desses tópicos,
[sugiro assistir alguns deles](https://www.youtube.com/user/AkitaOnRails).

### Git e Versionamento

É quase impossível imaginar desenvolvimento de software sem um sistema de
controle de versões. E já faz anos que o [Git](https://git-scm.com/) se tornou o
maior expoente dessa categoria.

![Git](assets/2019-o-que-front-enders-precisam-saber-git-.jpg)

Passar algum tempo estudando Git e seus comandos é muito importante. Todos os
projetos e produtos que você trabalhar devem utilizar essa tecnologia para fazer
versionamento de código e ela é extremamente poderosa.

Importante também dizer que Git e Github são coisas diferentes, assim como Java
e JavaScript.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1172208296213864448">
    <p>java !== javascript<br><br>git !== github</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1172208296213864448">September 12, 2019</a></figcaption>
</figure>

Muitas pessoas ainda fazem essa confusão, mas Git é a tecnologia para controle
de versões. Github, Bitbucket, Gitlab e etc, são sites com interfaces visuais
para navegar e visualizar o resultado desse versionamento. Sendo que o Github
por exemplo, também funciona como uma rede social de desenvolvimento.

## HTML, CSS e JavaScript

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1146852062027767808">
    <p>Desenvolvimento Front-end, por baixo dos panos se resume em: <br><br>- HTML <br>- CSS <br>- JavaScript<br><br>Não ter essa base, seria tipo ser jogador(a) de futebol ⚽️, sem fundamentos básicos ou conhecer as regras do esporte.<br><br>Você pode até fazer uns gols, mas dificilmente vai ganhar os jogos. <a href="https://t.co/VP4URRjuta">https://t.co/VP4URRjuta</a></p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1146852062027767808">July 4, 2019</a></figcaption>
</figure>

Virou clichê, muitas pessoas falam para estudar a base (eu falo o tempo todo). E
como estamos falando de desenvolvimento Web, por de trás do fantástico mundo dos
frameworks, no fim tudo vai gerar HTML, CSS e JavaScript, e exatamente por isso
é tão importante saber bem essas coisas.

### Posso dar um exemplo

Nos últimos anos tenho trabalhado muito com Angular que é um framework
JavaScript. Angular usa TypeScript, um superset de JavaScript. Nos estilos tenho
usado Sass e PostCSS, o primeiro é um pré-processador de CSS e o segundo um
pós-processador de CSS.

Em alguns projetos também uso o
[Kratos como boilerplate](https://github.com/felipefialho/kratos-boilerplate),
entre as tecnologias estão Webpack que é um bundler de módulo JavaScript, CSS
Modules que é um modularizador CSS e Pug, que é um template engine de HTML.

No decorrer da minha (já longa, 10 anos mano 😱😱) carreira, usei tecnologias
como jQuery (JavaScript), Jade (HTML), LESS (CSS), Stylus (CSS), Grunt
(JavaScript), Gulp (JavaScript), Bootstrap (HTML, CSS e JavaScript) e tantas
outras que faziam sentido naquele momento.

Essa sopa de letrinhas tem uma coisa em comum:

> No fim das contas todas elas usam HTML, CSS e JavaScript

### E tem a curva de aprendizado

Não importa a nova lib que bombou no mercado, ou quão complexa parece ser aquela
nova tecnologia que está todo mundo comentando... quanto mais você souber da
santíssima trindade do front-end, mais tranquilo vai ser seu aprendizado em tudo
que derive delas.

Gosto de criar [projetos pessoais para aprender coisas novas](/lab/), então no
desenvolvimento da nova versão desse site, usei
[uma stack](/blog/como-foi-desenvolver-meu-novo-blog-usando-o-gatsbyjs/) com
tecnologias que nunca tinha trabalhado antes. Citando algumas:

- JavaScript (Gatsby / React)
- CSS (Styled Components)

Mesmo trabalhando numa stack completamente nova, com tecnologias que nunca usei
antes, em poucos dias consegui aprender esses novos conceitos e ganhar fluidez
no desenvolvimento.

Isso seria impossível se eu não tivesse um bom conhecimento da base.

### Perfeito! Então só saber essa base basta? 😁

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1045659621820694528">
    <p>“O que sabemos é uma gota, o que ignoramos é um oceano.” <br><br>Isaac Newton, discursando sobre desenvolvimento front-end</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1045659621820694528">September 28, 2018</a></figcaption>
</figure>

Existem outras coisas essenciais, e vou falar sobre algumas delas agora.

## Conceitos e Metodologias

Não adianta muito você dominar qualquer tecnologia se não souber o que fazer com
elas, ou melhor, não souber para que servem elas.

Toda nova lib ou tecnologia de desenvolvimento criada, tem como objetivo
resolver algum problema conceitual, automatizar coisas complicadas que
enfrentamos no dia-a-dia, para melhorar processos e assim gerar mais valor para
o produto final.

Parte dos frameworks JavaScript atuais, por exemplo, servem para resolver
problemas de componentização e alguns são baseados no conceito de programação
reativa. São coisas que nós já tentávamos resolver de outras formas no passado.
Essas tecnologias são as (re)evoluções de várias técnicas que já usávamos antes.

O mundo do desenvolvimento é cíclico.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1164506266712051713">
    <p>Frameworks estão para programação como a calculadora está para a matemática.<br><br>Facilita a vida, agiliza o trabalho e ajuda a evitar erros, mas não servem pra nada se você não souber que problema está resolvendo com eles.</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1164506266712051713">August 22, 2019</a></figcaption>
</figure>

### Outro bom exemplo, as libs de CSS-in-JS

De cara muitas pessoas torceram o nariz (fui uma delas), mas são maravilhosas no
cenário de desenvolvimento atual, já que resolvem com JavaScript, problemas que
o CSS infelizmente não resolve sozinho.

Sempre tivemos problemas de colisão de classes, então criamos metodologias como
BEM para ajudar nisso, libs CSS-in-JS fazem isso de forma automática.

No passado era comum o uso de CSS inline, mas acabou se tornando má pratica
porque apesar de evitar colisões e ser performático, a escalabilidade era
péssima. O que o CSS-in-JS também faz? Quando necessário injeta alguns estilos
inline, mas tudo de forma automática, com código reutilizável e escalável.

Como disse: Cíclico.

## UX e UI

Você não precisa ser designer, mas é ideal ter ótimas noções de diagramação, ser
detalhista-perfeccionista e principalmente que saiba trabalhar muito próximo das
pessoas que cuidam do design e experiência do usuário, explicando possíveis
limitações técnicas e propondo melhorias durante o desenvolvimento.

![A non-designer’s guide to UX design](assets/2019-o-que-front-enders-precisam-saber-ux-ui.jpeg)_Crédito:
[uxdesign.cc](https://uxdesign.cc/a-non-designers-guide-to-ux-design-210bb6662cae)_

Durante o _boom_ do desenvolvimento Front-end alguns anos atrás, era comum dizer
que a área se dividiria entre dois tipos de profissionais: Com foco em
Engenharia (JavaScript) e com foco em Design (CSS). Eu também pensava assim, mas
não acho que a profissão caminhou dessa forma e nem que faça sentido atualmente.

Entendo que existam diferentes perfis, e que naturalmente algumas pessoas vão se
sentir mais a vontade criando algoritmos, enquanto outras vão gostar mais de
criar interfaces. Mas elas caminham juntas, cada vez mais juntas.

Experiência de usuário é o que separa produtos incríveis, que você ama usar
todos os dias, de produtos nem tão legais assim. UX também envolve
acessibilidade e usabilidade, pontos imprescindíveis.

No fim, Desenvolvimento Front-end traduz em código toda experiência pensada pelo
time de UX/UI. E experiência vai desde uma interface bonita, acessível e
agradável de navegar, até um projeto performático, rápido no carregamento e que
não acabe com a bateria ou rede de dados da pessoa que está acessando.

Pouco importa o quão maravilhoso seja um código se ele não entregar uma
experiência foda para o usuário final. Código incrível gerando um produto com
UI/UX ruim, vai servir apenas para afagar o ego de quem desenvolveu.

## Back-end e DevOps

![Fullstack Developer](assets/2019-o-que-front-enders-precisam-saber-fullstack.png)_Crédito:
[@sepandassadi](https://medium.com/@sepandassadi/become-a-full-stack-web-developer-free-resources-8a1c2c0ebd41)_

Antes preciso dizer que acredito sim no mito do Fullstack Developer. Essas
pessoas existem, estão por aí e são mais comuns do que se imagina. E ao
contrário do que dizem, também não acho elas tenham _deficits_ técnicos por não
serem especializadas. Pode ser que sim, mas nem sempre.

Parte dessas pessoas extravasaram ter apenas uma especialização para possuir
várias. Totalmente possível, ao longo de **muitos** anos de carreira.

Além disso, uma pessoa Fullstack numa stack, não necessariamente será Fullstack
em outra stack, e nem vai dominar completamente todas as áreas do
desenvolvimento de um produto. Penso que esse termo diz que a pessoa seria capaz
de participar ativamente de todas as etapas, ou seja:

- Front-end
- Back-end
- DevOps

No mundo Front-end, a possibilidade de ser Fullstack dentro de alguns projetos
aumentou muito com o advento de tecnologias como
[Node.js](https://nodejs.org/en/) anos atrás e o
[Serverless](https://serverless.com/) atualmente.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1135880180029898754">
    <p>É Front-end Developer e quer se aventurar com Back-end? <br>Indico a stack:<br><br>- Node.js + Serverless<br><br>Node é o JavaScript de sempre e com Serverless, você não precisa se preocupar com infraestrutura.<br><br>A curva de aprendizado tende a ser menor e pode dar confiança pra seguir em frente.</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1135880180029898754">June 4, 2019</a></figcaption>
</figure>

**Mas então preciso ser Fullstack?** 😱

Como sempre, depende.

Depende muito da empresa que você trabalha, das empresas que você quer trabalhar
e do plano de carreira que você quer seguir.

Também não me preocuparia muito com isso no inicio de carreira, Front-end já tem
conteúdo suficiente pra te deixar ocupado ou ocupada por alguns anos. De
repente, no inicio vale conhecer de superficialmente como outras etapas do
desenvolvimento funcionam, mas não precisa se aprofundar tanto.

Porém, com o tempo acho importante adquirir mais conhecimento, mesmo que não se
especialize tanto nessas áreas _irmãs_, penso ser cada vez mais importante
aprender sobre elas. A tendência é que esse conhecimento melhore inclusive, suas
qualidades como Front-end Developer.

Algumas das maiores e melhores empresas do mundo, como Google, AWS e várias
outras, buscam profissionais com esse perfil de _Software Engineer_. Além disso,
a própria transição para cargos de liderança também fica facilitada por conta da
visão mais ampla de todas as etapas de desenvolvimento.

## As _soft skills_

Você já deve ter escutado muitas vezes da importância de desenvolver suas _soft
skills_. Mas deveria escutar ainda mais. Sério, elas são essenciais, precisamos
melhorar como pessoas para lidar com outras pessoas.

![Soft skills](assets/2019-o-que-front-enders-precisam-saber-soft-skills.png)_Crédito:
[ied.eu](https://ied.eu/project-updates/1st-transnational-meeting-for-the-project-eva-skills/)_

Entenda como _soft skills_ todas suas habilidades comportamentais, emocionais e
sociais. Ou seja, ao passo que _hard skills_ são habilidades técnicas e fáceis
de avaliar, as _soft skills_ são extremamente subjetivas e de difícil avaliação.

Aquela figura caricata de pessoas da programação com pouca habilidade social faz
cada vez menos sentido no mercado de trabalho. Por mais tímido ou tímida que
você seja, é cada vez mais importante melhorar sua comunicação e desenvolver
suas habilidades interpessoais.

Além disso, você precisa entender o produto na qual está trabalhando.

> E faz muito sentido!

Primeiro porque a visão técnica e raciocínio lógico de desenvolvedoras e
desenvolvedores, podem ajudar demais na concepção de ideias, sua contribuição é
extremamente valiosa.

Segundo porque como disse acima, nós não desenvolvemos código pelo código, nós
desenvolvemos coisas para pessoas usarem. Melhorar sua capacidade de entender as
necessidades do usuário final impacta diretamente a qualidade do
desenvolvimento.

A questão emocional também é muito importante, saber lidar com pressão,
priorizar suas atividades e receber (e também dar) feedbacks são fatores que
precisamos trabalhar dia após dia.

Também precisamos buscar uma vida equilibrada, pela natureza dessa profissão é
muito fácil sermos engolidos pelo código, negligenciando nossa saúde (física e
mental) e também nossa vida pessoal. Saber equilibrar tudo isso também é uma
_soft skill_, e das mais importantes, se você não estiver bem consigo mesmo, não
vai conseguir dar o seu melhor.

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1022092350254968833">
    <p>A vida é tipo um &quot;The Sims&quot;, temos barras de satisfação em:<br><br>- Saúde<br>- Vida pessoal<br>- Vida profissional<br><br>Se uma delas diminuir, as outras duas serão afetadas e também vão diminuir. <br><br>A diferença é que não dá pra começar de novo se der ruim.<br><br>Bora se cuidar 👊</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1022092350254968833">July 25, 2018</a></figcaption>
</figure>

## Roadmap de Desenvolvimento Front-end

Caso queira se aprofundar mais em tópicos do Desenvolvimento Front-end moderno,
uma boa dica é consultar _roadmaps_ e diagramas.

Eles mostram o "caminho das pedras" sobre algumas tecnologias e conceitos que
você fatalmente viu ou vai ver durante a carreira. E mais, eles são
frequentemente atualizados, conforme vão surgindo novas tecnologias ou conceitos
relevantes.

Vou deixar dois deles aqui, ambos em inglês:

- [Step by step guide to becoming a modern frontend developer](https://roadmap.sh/frontend)
- [About Web Development](https://coggle.it/diagram/Vz9LvW8byvN0I38x/t/web-development)

## Conclusão

A gente passa 8 horas por dia trabalhando
[e muitas outras indo até a empresa ou estudando](/blog/2015-09-28-uma-reflexao-sobre-salarios-valor-hora-e-qualidade-de-vida).

Cada aplicação que construímos pode impactar positivamente no dia a dia de
várias pessoas no mundo todo: automatizando as tarefas delas, facilitando e
democratizando acesso a conteúdos ou mesmo levando mobilidade e trazendo mais
qualidade de vida para elas. Tudo isso torna-se possível através da tecnologia.

Nosso trabalho é desafiador e empolgante. Dia após dia somos desafiados com
novas tecnologias e novos paradigmas.

De tempos em tempos precisamos desapegar de ideias e conceitos antigos para
poder construir uma versão profissional (e pessoal), melhor de nós mesmos.

Isso é foda demais! ❤️
