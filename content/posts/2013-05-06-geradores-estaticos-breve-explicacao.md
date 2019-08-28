---
title: "O que são Geradores estáticos?"
date: 2013-05-06 00:00:01
description: "Quando escutamos falar pela primeira vez em geradores estáticos, normalmente não compreendemos quais as vantagens"
tags: ["javascript"]
---

Falando de forma resumida, geradores estáticos usam de várias funcionalidades que estamos acostumados a utilizar nas linguagens de programação, como includes, loopings, templates, entre outras coisas legais. Mas... gera um HTML estático, sem banco de dados, sem dependências server-side, tudo é gerado em um HTML puro e simples.

Ou seja, você não precisa preparar nenhum ambiente, basta jogar o projeto no servidor e ele já está funcionando. Rápido e ágil, pois tudo é estático, mas com a manutenção muito mais simples, afinal você não vai precisar replicar 40 vezes o mesmo template e alterar o conteúdo das páginas.

Geradores estáticos como o [Jekyll](https://github.com/mojombo/jekyll) eram mais usados para blogs, pois facilitam muito o desenvolvimento deles, o Jekyll por exemplo, é extremamente simples, basicamente você instala e já pode sair postando.

Mas a criatividade dos desenvolvedores não tem limites, e rapidamente começaram a surgir geradores estáticos mais robustos, na qual você pode construir qualquer tipo de site, basta usar a imaginação. Entre eles destaco o [Docpad](http://docpad.org), feito em [NodeJS](http://nodejs.org) e é o que estou usando nesse [site](https://github.com/felipefialho/Website).

Como falei no outro post, não tenho formação como programador, mas o [Docpad](http://docpad.org) é tão simples que consegui rapidamente pegar o jeito, a documentação na página oficial é bem intuitiva e existem vários plugins no Github que facilitam e adicionam funcionalidades, tornando-o ainda mais completo.

Caso queira começar a brincar, indico entender primeiro o funcionamento do [NodeJS](http://nodejs.org) e seu gerenciador de pacotes, o [NPM](https://npmjs.org), caso nunca tenha tido contato, pode achar confuso no inicio, especialmente por precisar usar o terminal (famoso CMD), mas acredite, é mais fácil do que imagina.

Geradores estáticos não vão substituir gerenciadores de conteúdo, cada um no seu quadrado, mas dão uma alternativa muito interessante para quando for desenvolver algum projeto estático, mas que necessite de conteúdo atualizado.

Cada projeto merece um estudo aprofundado antes de escrever a primeira linha de código, mas ai está mais uma alternativa legal, para quem não conhecia, passar a estudar.

**UPDATE:** Segue [projeto no Github](https://github.com/pinceladasdaweb/Static-Site-Generators) do Pedro Rogério (Pinceladas da Web) com MUITAS opções de geradores estáticos.
