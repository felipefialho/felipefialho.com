---
title: "Meu dia-a-dia como desenvolvedor em 2018"
date: 2018-01-15 00:00:01
description: "Bora contar um pouco sobre como anda meu workflow!"
image: /assets/2018-01-15-meu-dia-a-dia-como-desenvolvedor-em-2018.jpg
tags: ["workflow", "front-end", "misc"]
---

Escrevi meu dia-a-dia como desenvolvedor em [2015](/blog/meu-dia-a-dia-como-dev-frontend) e [2017](https://medium.com/@lfeh/my-day-to-day-as-front-end-developer-in-2017-6d68b5ac2055) (em inglês). Como em 1 ano, muita coisa muda, bora atualizar.

## Rotina

Não trabalho mais remoto desde abril do ano passado, quando comecei a trabalhar no Cubo ([podem ver como foram os primeiros seis meses nesse artigo](/blog/como-foi-trabalhar-no-meu-primeiro-produto-e-a-sensacao-de-entregar-o-mvp)).

Existem [vantagens e desvantagens em trabalhar remoto](/blog/sobre-trabalhar-remoto), porém a maior vantagem e o fator mais determinante nessa modalidade é a qualidade de vida: Não se preocupar mais com deslocamento, trânsito, caos na cidade e consequentemente [aumento do valor hora](/blog/uma-reflexao-sobre-salarios-valor-hora-e-qualidade-de-vida).

Sendo assim, a primeira atitude que tomei quando entrei no Cubo foi procurar um apartamento próximo do trabalho. E esse é o melhor investimento que pode ser feito para melhorar qualidade de vida no dia-a-dia.

![E de quebra a vista do terraço é fodastica](1_I8d8DO-0Pctlg6-F6ImUwQ.jpeg)*E de quebra a vista do terraço é fodastica*

## Workplace

O [Cubo](https://cubo.network/) é um lugar realmente legal. O fato de trabalhar lado-a-lado com várias Startups fornece uma ótima oportunidade de aprendizado e torna o ambiente bastante divertido.

Um ambiente leve faz muita diferença. Passamos mais de 8 horas por dia no trabalho e você ter prazer de estar naquele local, ajuda a produzir muito mais (e produzo mais de bermuda e chinelo 😹) do que você produziria em um ambiente ruim.

![E tem vários happy hour! 😆](1_K6PjReqqgsoiPW85JC_rqg.jpeg)*E tem vários happy hour! 😆*

Basicamente rodamos metodologia [Scrum](https://www.google.com.br/aclk?sa=l&ai=DChcSEwiR4dvBiNrYAhWDDZEKHY8OAyQYABAFGgJjZQ&sig=AOD64_2IHLrDf-w-tGaiJMe9Iofu5_PZSw&q=&ved=0ahUKEwiFwtfBiNrYAhXJF5AKHRCkDwsQ0QwILg&adurl=). E todos participam em todas as etapas do projeto, o time de produto trabalha junto e misturado com o time de desenvolvimento e vice-versa.

## Infraestrutura

![MacBook Pro](1_V794-BrBfo8gdgElT4WRIw.jpeg)*MacBook Pro*

Atualmente estou usando um MacBook Pro com [macOS Sierra](https://www.apple.com/macos/sierra/):

* Tela: 15.4 inches

* Resolução: 2880x1800

* Processador Intel Core i7 de 2,9 GHz

* 16 GB DDR3 SDRAM

* SSD 512MB

* Radeon Pro 560 de 4GB

É uma configuração incrível e me permite desempenhar qualquer tarefa sem travamentos. Tem ainda a polemica Touch Bar, que demorei um pouco para acostumar, mas agora acho interessante.

Continuo não utilizando mouse, nem teclado externos. Acho o trackpad fantástico.

Como monitor secundário estou usando um [Dell UltraSharp 24](http://www.dell.com/pt/p/dell-u2415/pd).

## Workflow

Vou listar a base das tecnologias que mais uso atualmente, porém dentro dessa lista, existem vários outras libs que utilizo no dia-a-dia, seria inviável listar todas.

### JavaScript: [Angular](https://angular.io/)

![](assets/1_-PswmeK78oWOOjuvX0QLMQ.png)

Comecei a usar assim que entrei no Cubo, e agora na versão 5, penso que atingiu um bom nível de maturidade. O foco da equipe de desenvolvimento do Angular tem sido em: PWA e Performance.

Atualmente os SPAs são muito parecidos, com features próximas e performance equivalente. Não entre nessa de amar um e odiar o outro.

### CSS: [Stylus](http://learnboost.github.io/stylus/) e [PostCSS](https://github.com/postcss)

![](assets/1_psa-ZKW_iJNL5M7-67USfg.png)

Sou fã desse combo. Leve e poderoso. Uso em conjunto com algumas libs como [cssnano](http://cssnano.co/), [Font Magician](https://github.com/jonathantneal/postcss-font-magician/), [Lost](https://github.com/peterramsing/lost), [Rupture](https://github.com/jescalan/rupture) e [Rucksack](http://simplaio.github.io/rucksack/).

O Angular tem uma feature chamada [Component Styles](https://angular.io/guide/component-styles) que permite isolar o CSS como as melhores libs de [CSS in JS](https://github.com/MicheleBertoli/css-in-js) fazem, e ao mesmo tempo usar técnicas mais tradicionais para escrever CSS.

### Back-End: [Serverless Framework](https://serverless.com/) e [NodeJS](https://nodejs.org/en/)

![](assets/1_Ar1zkHFDb2cTqfwAZalCrQ.png)

Somos malucos aqui no Cubo e caímos de cabeça em uma metodologia ainda pouco usada no mundo real (mas que cresce a cada dia): Serverless.

Para quem ainda não conhece, o [xhamps](undefined) escreveu um [artigo fazendo uma introdução](https://medium.com/cubo-digital/introdu%C3%A7%C3%A3o-ao-serverless-38a3b4eb082d) e para quem mora em São Paulo, estamos organizando o [Serverless SP](https://www.meetup.com/Serverless-SP/).

### Controle de versão: [Git](http://git-scm.com/)

![](assets/1_NayGR2rZDaYyt4XsZ2_SBg.png)

Unanimidade no mundo inteiro. Dispensa apresentações.

### Package manager: [NPM](https://www.npmjs.com/)

![](assets/1_cDx5NIRCGxxc04JecbKuww.png)

E sim, tentei usar o [Yarn](https://github.com/yarnpkg/yarn). Continuo não vendo motivos para mudar.

### Task Builder: [NPM Scripts](https://docs.npmjs.com/misc/scripts)

![](assets/1_XFFhSO9l9waHG_FsOZGDXA.png)

Abandonei de vez task-runners como o [GulpJS](http://gulpjs.com/). NPM Scripts são simples o suficiente para configurar e rodar sem dependências extras.

### Projetos pessoais: [Kratos Boilerplate](https://github.com/LFeh/kratos-boilerplate)

![](assets/1_9L--wr90lM7mS4aoN7N1lg.png)

Uso para projetos estáticos, é simples, rápido e cumpre bem seu papel.

## Apps

Assim

### Text editor: [VSCode](https://code.visualstudio.com/)

![](assets/1_EU6f3fRsM81AN62KQm1oNA.png)

Comecei a usar o [VSCode](https://code.visualstudio.com/) quando entrei no Cubo, pela ótima integração com o Angular e TypeScript. Mas foi amor a primeira vista.

É [open source](https://github.com/Microsoft/vscode), rápido, leve, com vários e vários plugins disponíveis (quase impossível não achar algum) e ainda tem uma ótima integração com git e de quebra tem um terminal integrado.

### Navegador pessoal: [Google Chrome](https://www.google.com.br/chrome/browser/desktop/index.html)

![](assets/1_st6O_91q_5ZCw2f7jDapTQ.png)

Gosto do [Chrome](https://www.google.com.br/chrome/browser/desktop/index.html), dizem ser lento, mas nunca tive problemas nesse sentido. Tudo fica sincronizado e não tenho problemas com compatibilidade com a maioria das páginas na web.

### Debugger: [Chrome Canary + DevTools](https://www.google.com.br/chrome/browser/canary.html)

![](assets/1_dFAIAKk-OPR7AfIlKOQFrQ.png)

Várias features de debug ficam disponíveis primeiro no [Canary](https://www.google.com.br/chrome/browser/canary.html). No passado existia uma diferença grande entre o Chrome padrão e o Canary, sendo complicado para atestar compatibilidade no desenvolvimento, mas não sinto mais essa diferença hoje.

### Terminal: [Hyper](https://hyper.is/)

![](assets/1_i-i-ELyV66s-vkHIebsx6g.png)

Gosto do [Hyper.](https://hyper.is/) Apesar de algumas pessoas contestarem sua velocidade, funciona muito bem pra mim. Além disso é [open source](https://github.com/zeit/hyper) e você pode usar HTML, CSS e JavaScript para customiza-lo.

### Editor de imagens: [Gimp](https://www.gimp.org/)

![](assets/1_JfQW5aFK1fm24tTboriqvg.png)

É open source e bastante completo. Ele não tem muitas features presentes em editores como o Photoshop, mas para as coisas que preciso no dia-a-dia ele cumpre muito bem seu papel.

### Issues e tasks: [Jira](https://br.atlassian.com/software/jira)

![](assets/1_lE5tWOJA4n5b77HxJkLUFg.png)

O [Jira](https://br.atlassian.com/software/jira) é um canhão, e muitas vezes você só precisava matar uma formiga. Mesmo assim é o mais completo gerenciador de tarefas do mercado.

### Comunicação: [Slack](https://slack.com/)

![](assets/1_3l8tcGI7C0xNm-tAeh6FNA.png)

Unanimidade. Acho o [Slack](https://slack.com/) um grande come-come de memória, mas é a melhor ferramenta de comunicação que existe hoje em dia.

### Cloud storage: [Dropbox](https://www.dropbox.com/h)

![](assets/1__gKCBFhPmNKzjjVGGaPUyA.png)

Apesar de usar o Drive para documentos e planilhas. É o [Dropbox](https://www.dropbox.com/h) que uso para armazenamento dos meus arquivos pessoais.

### Organização pessoal: [Google Calendar](https://calendar.google.com/calendar/r?pli=1)

![](assets/1_BolaEa-OYb8bNb0ZHJQabw.png)

Rolou uma [issue bacana no Front-End BR ](https://github.com/frontendbr/forum/issues/679)sobre ferramentas para organização. Mas continuo no bom e velho [Calendar](https://calendar.google.com/calendar/r?pli=1). Me perco quando uso muitas ferramentas e o Calendar tem tudo que preciso para controlar meu dia.

### Password manager: [1Password](https://1password.com/)

![](assets/1_j4WTdRCsDfgtIhR4KCO3SQ.png)

Acho o [1Password](https://1password.com/) fácil de usar, e integra muito bem com qualquer navegador e com o celular.

### Notas: [iA Writer](https://ia.net/writer/)

![](assets/1_e9XAspotSPeYZ1eFs5txlg.png)

Bom, com o [iA Writer](https://ia.net/writer/) tenho um aplicativo leve (bem leve) que me permite escrever em markdown. Awesome.

### Leitores: [Feedly](https://feedly.com/) e [Medium](https://medium.com)

![](assets/1_NgRkkDG2YPJ3odJreHJ9vQ.png)

Uso o Feedly para receber os artigos dos blogs e sites que acompanho e o Medium para descobrir textos legais.

Também devem ter percebido que estou usando bastante o Medium como publicador de texto. Isso porque além de achar a experiência de escrever muito fluida, gosto da divulgação orgânica que naturalmente acontece.

### Rede Social: [Twitter](https://twitter.com/LFeh), [Github](https://github.com/) e [Instagram](https://www.instagram.com/?hl=pt-br)

![](assets/1_M3Icf6qej5wirg5i1l1uUA.png)

[O Twitter é a rede social que developers deveriam usar](https://medium.com/@lfeh/sou-um-entusiasta-do-twitter-e-fico-muito-feliz-de-sido-citado-como-front-ender-nessa-lista-bab3a533f077). É rápida, focada, você escolhe as pessoas que deseja acompanhar (e receber conteúdo) e apesar do número máximo de carácter ter subido pra 280. Não tem textão.

Fico o dia todo com o Github aberto e curto navegar no feed para ver novidades e projetos legais, além de ter uma noção de para onde o mercado está indo.

Uso o Instagram simplesmente porque o Facebook morreu como rede social 😇

### Fórum de discussão: [FrontEndBR](https://github.com/frontendbr/forum)

![](assets/1_z3H6zLnMBw-qWIA-RBhRBQ.png)

O FrontEnd BR surgiu em um lapso e é o projeto open source que mais me orgulho. Discussões fodas, vagas de emprego, eventos... tem tudo lá.

### Música: [Spotify](https://www.spotify.com/br/)

![](assets/1_p7kumcQmveN6I6bveG3iWA.png)

Dispensa apresentações.

### Entretenimento: [Netflix](https://www.netflix.com/br/)

![](assets/1_eC7cOUj8sngxw10yfG87KQ.png)

Dispensa apresentações [2]

### Controle Financeiro: [Guia Bolso](https://www.guiabolso.com.br/)

![](assets/1_TB0msmKHv4V0lal6FTcQ0A.png)

Descobri o Guia Bolso ano passado e virei fã. Apesar da interface web ainda não ser boa, o aplicativo funciona muito bem e realmente facilita saber como e com o que estamos gastando.

Sempre digo e não custa reforçar, todas essas coisas são apenas ferramentas, e quase sempre vão ser passageiras, aprenda técnicas, conceitos e as linguagens básicas na web: HTML, CSS e JavaScript.

Vamo que vamo em 2018! 👊
