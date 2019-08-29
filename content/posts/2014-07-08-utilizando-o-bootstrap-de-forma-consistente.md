---
title: "Utilizando o Bootstrap de forma consistente"
date: 2014-09-01 00:00:01
description: "Parte do sucesso do Bootstrap está ligado a facilidade de uso, responsividade e soluções interessantes prontas para usar. Mas será que podemos aperfeiçoar essa utilização?"
tags: ["workflow"]
---

Não é segredo que gosto muito do Bootstrap, faz parte do meu workflow e fiquei muito feliz quando minha [primeira contribuição](https://github.com/twbs/bootstrap/pull/11162/files#r7084342) foi aprovada. Dessa forma vou detalhar para vocês como costumo utilizar esse Framework.

## O Grunt é seu amigo

Para essa técnica, indico fortemente o uso do Grunt ou qualquer outro automatizador. Facilitar compilar o pré-processador CSS, concatenar o JavaScript e otimizar todo o processo.

Se não conhece essas ferramentas, já escrevi sobre o [Grunt](/blog/grunt-voce-deveria-estar-usando), mas sugiro ler o excelente [artigo do Vitor Britto](http://www.vitorbritto.com.br/blog/automacao-de-tarefas-com-gruntjs-parte-1).

## Baixando o Bootstrap

A sessão [customize](http://getbootstrap.com/customize) do site oficial fornece diversas opções de personalização, é bem útil especialmente para desenvolvedores iniciantes ou pessoas que desejam criar um projeto rápidamente.

Mas faremos diferente...

Entre no repositório do projeto no [Github](https://github.com/twbs/bootstrap) e utilize sua conta para dar fork no projeto ou baixe diretamente pelo "Download Zip".

Um detalhe importante é que o Bootstrap original utiliza LESS, caso utilize SASS ou outro pré-processador, procure arquivos fontes do Bootstrap para eles. Sei que existe um repositório oficial que [utiliza SASS](https://github.com/twbs/bootstrap-sass).

## Separando os arquivos

Após baixar o arquivo, copie as pastas **less** e **js** para o seu projeto seguindo sua organização. Caso ainda não tenha nada muito definido, pode dar uma lida no artigo [Sobre organização de componentes com pré-processadores](/blog/sobre-organizacao-de-componentes-com-pre-processadores).

Pode copiar também a pasta **fonts** caso queira utilizar os icons fonts do Bootstrap. Eu prefiro criar minhas coleções no [Icomoon](icomoon.io/app), assim seleciono exatamente quais ícones vão ser usados. Mas faça como achar melhor.

## Selecionando os componentes

Adoro componentes, e inclusive escrevi um artigo abordando [Componentização e Atomic Design](/blog/um-conto-sobre-componentizacao-e-quebra-de-paradigmas). Eles são a chave para um projeto consistente.

Lembra da sessão **customize** no site do Bootstrap? Vamos fazer a mesma coisa, mas de forma manual...

O Bootstrap usa o arquivo **bootstrap.less** para carregar os componentes. Eu sugiro criar um arquivo diferente, como **style.less** e nele carregar todos os componentes que for utilizar.

Faça o mesmo com os JavaScripts, selecione apenas o que vai usar no projeto.

## Otimize, otimize, otimize...

Boa parte do que escuto sobre o problema da utilização do Bootstrap, é seu código final gigante e pouco otimizado. Afinal, dificilmente você utilizará em um projeto todos os componentes que foram carregados e mesmo nos componentes que vai usar, algumas coisas são desnecessárias.

Agora que tem os arquivos fontes, simplesmente limpe TUDO que não vai utilizar. Vai usar a **tab** mas não quer usar a navegação em baixo? Limpe. Vai usar o **button** mas não precisa de tamanho grande nem pequeno? Limpe... e faça isso em todos os componentes que escolher.

Não tem problema você modificar os arquivos originais, já que esses componentes servirão apenas para esse projeto e quando começar um novo é só utilizar os arquivos originais do Bootstrap novamente.

Costumo fazer essa otimização no fim, assim tenho uma ideia melhor do que realmente vou utilizar ou não.

Raramente uso por exemplo os menus do Bootstrap, prefiro criar meus proprios menus. E faço o mesmo para qualquer componente que considero mais interessante desenvolver do zero.

Nem precisa falar que pode ainda modificar cada detalhe visual e não seguir o padrão do Bootstrap né? Assim ele se torna diferente para cada projeto.

## Considerações finais

Frameworks de desenvolvimento são ferramentas que podem contribuir muito no nosso dia-a-dia. Além do Bootstrap, uso ainda um Framework próprio.

Crie workflows que te deixe confortável para trabalhar em projetos de pequeno, médio e grande porte. Sugiro que todo desenvolvedor construa ferramentas e processos para melhorar a qualidade e velocidade do seu trabalho.

Espero que esse artigo ajude quem já utiliza o Bootstrap a melhorar seus processos e quem não utiliza ter mais uma solução caso seja necessário em algum momento. Abração amigos!
