---
title: "Do Zero a Herói Front-End (Parte 2)"
date: 2016-06-14 00:00:01
description: "Um guia completo para aprender desenvolvimento Front-End"
image: /assets/2016-06-14-do-zero-a-heroi-do-front-end-parte-2.png
tags: ["carreira", "estudos", "css", "html", "javascript"]
---

Este artigo é a segunda parte da série "Do Zero a Herói Front-End". Na primeira parte, você aprendeu a criar layouts com HTML e CSS, usando algumas das melhores práticas. Na parte dois, vamos nos focar em aprender JavaScript como uma linguagem independente, adicionar interatividade a interfaces, design JavaScript, padrões de arquitetura e como construir aplicações web.

Assim como com HTML e CSS, existem milhares de tutoriais JavaScript por aí. No entanto, especialmente para alguém novo no mundo Front-End, é difícil descobrir quais tutoriais usar e qual a ordem para fazê-las. O principal objetivo desta série é fornecer um roteiro para ajudar a aprender Front-End.

Se você ainda não leu a [primeira parte, faça isso antes de continuar a leitura](/blog/do-zero-a-heroi-do-front-end-parte-1).

## O básico do JavaScript

JavaScript é uma linguagem de programação multi-plataforma que pode ser usada para praticamente qualquer coisa atualmente, mas vamos voltar nisso mais tarde, depois que você compreender as noções básicas de como os desenvolvedores usam JavaScript para a web.

### Linguagem

Antes de aprender como aplicar o JavaScript na web, você deve aprender sobre a própria linguagem. Para começar, leia o curso básico da Mozilla Developer Network’s [Language basics crash course](https://developer.mozilla.org/en-US/Learn/Getting_started_with_the_web/JavaScript_basics). Este tutorial vai te ensinar coisas básicas da linguagem como variáveis, condicionais e funções.

Depois, leia as seguintes sessões no MDN [JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide):

- [Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
- [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Loops and iterations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

Não se preocupe muito em memorizar a sintaxe, você sempre pode procurar isso. Em vez disso, concentre-se na compreensão de conceitos importantes como instanciação de variáveis, loops e funções. Se o material for muito denso, tudo bem. Você pode continuar mais depois. Quando colocar esses conceitos na prática, eles se tornarão muito mais claros.

Para quebrar a monotonia da aprendizagem baseada em texto, confira o curso de [JavaScript da Codecademy](https://www.codecademy.com/learn/JavaScript). É prático e divertido. Além disso, se você tiver tempo, para cada conceito listado acima, leia o capítulo correspondente em [Eloquent JavaScript](http://eloquentJavaScript.net) para reforçar a sua aprendizagem. _Eloquent JavaScript_ é um livro online gratuito que todo desenvolvedor Front-End aspirante deve ler.

### Interatividade

![Uso de JavaScript para animar layouts](https://d262ilb51hltx0.cloudfront.net/max/800/1*V4UtSyfCN9DDpl70IxXSHA.gif)

Agora que você tem um conhecimento básico de JavaScript, o próximo passo é para aplicá-lo à web. Para entender como o JavaScript interage com websites, você primeiro tem que entender sobre o [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)'.

O DOM é uma estrutura representacional dos documentos HTML. É uma árvore estrutural composta de objeto que correspondem aos nós do HTML. Para ler mais sobre o DOM, leia [What is the DOM](https://css-tricks.com/dom) do CSSTricks. Ele fornece uma explicação simples e direta sobre o assunto.

![Inspecionando o DOM](https://d262ilb51hltx0.cloudfront.net/max/800/1*o1lGaXpnKYgp2r9CFOI_9A.png)

JavaScript interage com o DOM para mudar e atualizar ele. Aqui está um exemplo onde podemos selecionar um elemento HTML e alterar o seu conteúdo:

```js
var container = document.getElementById('container');
container.innerHTML = 'New Content!';
```

Não se preocupe, foi só um exemplo simples. Você pode fazer muito mais do que isso manipulando o DOM com JavaScript. Para saber mais sobre como usar JavaScript para interagir com o DOM, leia as seguintes sessões do MDN, [The Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

- [Events](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)
- [Examples of web and XML development using the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Examples)
- [How to create a DOM tree](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/How_to_create_a_DOM_tree)
- [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [Locating DOM elements using selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)

Mais uma vez, concentre-se nos conceitos e não na sintaxe. Seja capaz de responder às seguintes perguntas:

- O que é o DOM?
- Como você consulta elementos?
- Como adicionar _event listeners_?
- Como você mudar propriedades do DOM?

Para obter uma lista de interações comuns de JavaScript no DOM, Confira as [JavaScript Functions and Helpers](https://plainjs.com/JavaScript) do PlainJS. Este site fornece exemplos de como fazer coisas como definir [estilos nos elementos HTML](https://plainjs.com/JavaScript/styles/set-and-get-css-styles-of-elements-53) e adicionar [_event listeners_ no teclado](https://plainjs.com/JavaScript/events/getting-the-keycode-from-keyboard-events-17). E se você quiser ir mais fundo, você pode ler a seção sobre o DOM no [Eloquent JavaScript](http://eloquentJavaScript.net/13_dom.html).

### Inspector

Para _debugar_ JavaScript do lado do cliente, utilizamos ferramentas para o desenvolvedor construídas nos navegadores. O painel de inspeção está disponível na maioria dos navegadores e permite que você veja o código fonte das páginas web. Você pode verificar quando o JavaScript é executado, mostrar estados de debug no console e ver coisas como solicitações de rede e outros recursos.

Aqui tem um [tutorial](https://developer.chrome.com/devtools) usando o _developer tool_ do Chrome. Se você está usando Firefox, você pode ver [esse tutorial](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector).

![Chrome developer tools](https://d262ilb51hltx0.cloudfront.net/max/800/1*wW-FbgJhP0R_id-XPOSKpg.jpeg)

## Práticando o básico

Neste ponto, você ainda não aprendeu muito sobre JavaScript. No entanto, a última seção tinha uma grande quantidade de informações. Acho que é um bom momento para a gente fazer uma pausa e fazer algumas pequenas experiências. Elas devem ajudar a solidificar alguns dos conceitos que você acabou de aprender.

Experimento 1

Para o experimento 1, vá até o [AirBnB](https://www.airbnb.com), abra o _inspector tools_ do seu navegador e clique na [guia console](https://developer.chrome.com/devtools/docs/console). Aqui você pode executar o JavaScript na página. O que vamos fazer é nos divertir com a manipulação de alguns dos elementos na página. Veja se você consegue fazer todas as manipulações de DOM a seguir.

![Airbnb.com](https://d262ilb51hltx0.cloudfront.net/max/800/1*5L17hFKIMTsBFQOLCy8tCQ.png)

Eu escolhi o site do AirBnB porque os nomes de classe CSS são relativamente simples e não são ofuscadas por um compilador. Porém, você pode fazer isso em qualquer página que quiser.

- Selecione uma tag de cabeçalho com um nome de classe única e altere o texto
- Selecione qualquer elemento na página e remova ele
- Selecione qualquer elemento e altere uma das suas propriedades CSS
- Selecione uma seção específica e mova ela 250 pixels para baixo
- Selecione qualquer componente, como um painel e ajuste a sua visibilidade
- Defina uma função chamada `doSomething` com um alerta de "Hello world" e em seguida execute
- Selecione um parágrafo, adicione um _ event listener_ de clique nele e execute algo cada vez que o evento é clicado

Se você ficar preso, use o guia [JavaScript Functions and Helpers](https://plainjs.com/JavaScript) como referência. Eu baseei a maioria dessas tarefas fora dele, abaixo está um exemplo de como completar o primeiro bullet:

```js
var header = document.querySelector('.text-branding')
header.innerText = ‘Boop'
```

O principal objetivo deste experimento é fazer algumas das coisas que você aprendeu sobre JavaScript e manipulação de DOM.

### Experimento 2

![JavaScript permite que os desenvolvedores criem interfaces interativas](https://d262ilb51hltx0.cloudfront.net/max/800/1*7365CToqHiLkXf16Di8xRw.gif)

Usando CodePen, escreva um JavaScript básico que usa manipulação do DOM e requer alguma lógica de programação para funcionar. O foco deste experimento é pegar algumas das coisas que você aprendeu no [Do Zero a Herói Front-End](/blog/do-zero-a-heroi-do-front-end-parte-1) e combinar com JavaScript. Aqui estão alguns exemplos para referência que podem servir de inspiração.

http://codepen.io/mecarter/pen/RNomVo

http://codepen.io/nodws/pen/heILd

http://codepen.io/jasonchan/pen/wMaEwN

http://codepen.io/jeffibacache/pen/bzBsp

### Mais JavaScript

Agora que você sabe e teve um pouco de prática com JavaScript, vamos avançar para conceitos mais avançados. Os conceitos abaixo não estão diretamente relacionados um ao outro. Agrupei eles nesta seção porque são necessários para compreensão de como construir sistemas mais complexos de Front-End. Você entenderá melhor como colocá-los em uso quando você chegar na seção de experiências e Frameworks.

## Linguagem

Quando você fazer mais projetos com JavaScript, você encontrará alguns conceitos _higher level_. Esta é uma lista de alguns deles. Quando você tiver tempo, passe por todos. O [Eloquent JavaScript](http://eloquentJavaScript.net) também abrange muito deste material, caso você queira completar a sua aprendizagem.

- [Prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Scoping](https://spin.atomicobject.com/2014/10/20/JavaScript-scope-closures)
- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Event bubbling](http://JavaScript.info/tutorial/bubbling-and-capturing)
- [Apply, call, and bind](http://JavaScriptissexy.com/JavaScript-apply-call-and-bind-methods-are-essential-for-JavaScript-professionals)
- [Callbacks and promises](https://www.quora.com/Whats-the-difference-between-a-promise-and-a-callback-in-JavaScript)
- [Variable and function hoisting](http://adripofJavaScript.com/blog/drips/variable-and-function-hoisting)
- [Currying](http://www.sitepoint.com/currying-in-functional-JavaScript)

### Imperativo vs. Declarativo

Existem dois tipos de abordagens de como o JavaScript interage com o DOM: imperativa e declarativa. De um lado, a programação declarativa foca no _o que_ acontece. Do outro lado, programação imperativa foca no _o que_ e também em _como_.

```js
var hero = document.querySelector('.hero')
hero.addEventListener(‘click’, function() {
  var newChild = document.createElement(‘p’)
  newChild.appendChild(document.createTextNode(‘Hello world!’))
  newChild.setAttribute(‘class’, ‘text’)
  newChild.setAttribute(‘data-info’, ‘header’)
  hero.appendChild(newChild)
})
}
```

Este é um exemplo de programação imperativa em que nós consultamos manualmente um elemento e guardamos o estado dele no DOM. Em outras palavras, estamos focando em _como_ conseguir alguma coisa. O maior problema com este código é que ele é frágil. Se alguém mudar o nome da classe no HTML de `hero` para `villain`, o _event listener_ não va funcionar mais, já que não vai existir a classe `hero` no DOM.

A programação declarativa resolve esse problema. Em vez de selecionar elementos, você deixa isso com o Framework ou a Biblioteca que você está usando. Esta função permite que você se concentre sobre _o que_, em vez do _como_. Para ler mais, confira [The State Of JavaScript — A Shift From Imperative To Declarative](http://www.tysoncadenhead.com/blog/the-state-of-JavaScript-a-shift-from-imperative-to-declarative#.Vz0WEZMrIUE) e [Three D’s of Web Development #1: Declarative vs. Imperative](http://developer.telerik.com/featured/three-ds-of-web-development-1-declarative-vs-imperative).

Este guia ensina primeiro a abordagem imperativa antes de introduzir a abordagem declarativa com frameworks como [Angular](https://angular.io) e bibliotecas como [React](https://facebook.github.io/react). Eu recomendo o aprendizado nesta ordem porque ele permite que você veja o problema que a abordagem declarativa resolve.

### Ajax

Ao longo destes artigos e tutoriais, você provavelmente viu o termo [Ajax](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) ser mencionado algumas vezes. Ajax é uma técnica que permite que as páginas da web interajam com o servidor usando JavaScript.

![Ajax é o que faz o conteúdo ser dinâmico](https://d262ilb51hltx0.cloudfront.net/max/800/1*kkezNwUnuEiAztlQRkJ69A.gif)

Por exemplo, quando você enviar um formulário em um site, ele coleta sua entrada e faz uma solicitação HTTP que envia dados para um servidor. Quando você postar um tweet no Twitter, seu cliente do Twitter faz uma solicitação HTTP para o servidor da API do Twitter e atualiza a página com a resposta do servidor.

Para leitura sobre Ajax veja o [What is Ajax](http://www.vandelaydesign.com/what-is-ajax-webdev). Se você ainda não entendeu totalmente o conceito, dê uma olhada no [Explain it like i’m 5, what is Ajax](https://www.reddit.com/r/explainlikeimfive/comments/19gvn9/explain_it_like_im_5_what_is_ajax). Se ainda não for suficiente, você pode ler o [Eloquent JavaScript’s chapter on HTTP](http://eloquentJavaScript.net/17_http.html).

Hoje, o padrão de navegador para fazer solicitações de HTTP é o [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Você pode ler mais sobre o _Fetch_ neste artigo do [Dan Walsh](https://davidwalsh.name/fetch). Ele abrange como o _Fetch_ funciona e como usá-lo. Você também pode encontrar um [polyfill](http://stackoverflow.com/questions/7087331/what-is-the-meaning-of-polyfills-in-html5) do _Fetch_ com a documentação [aqui](https://github.com/github/fetch).

### jQuery

Até agora, você tem feito manipulações de DOM usando apenas JavaScript. Porém existem várias bibliotecas de manipulação do DOM que fornecem APIs para simplificar o código que você escreve.

Uma das bibliotecas mais populares de manipulação do DOM é o [jQuery](https://jquery.com). Tenha em mente que o jQuery é uma biblioteca imperativa. Foi escrita antes de os sistemas Front-End se tornarem tão complexos como são hoje. Atualmente, o gerenciamento de interfaces de usuário complexas são com frameworks declarativos, usando bibliotecas como Angular e React. No entanto, eu ainda recomendo que você aprenda jQuery porque você provavelmente o encontrará muitas vezes durante sua carreira como Front-Ender.

![jQuery é uma abstração em cima de simples manipulação no DOM](https://d262ilb51hltx0.cloudfront.net/max/800/1*4XD5t8AEjQFWeTWEIdhQpw.gif)

Para aprender o básico do jQuery, confira o [jQuery’s Learning Center](http://learn.jquery.com). É um passo-a-passo de conceitos importantes como animações e manipulação de eventos. Se você quer fazer em tutorial interativo, você pode tentar o [Codecademy’s jQuery course](https://www.codecademy.com/learn/jquery).

Tenha em mente, jQuery nem sempre é a solução para a manipulação imperativa do DOM. [PlainJS](https://plainjs.com/JavaScript) e [You Might Not Need jQuery](http://youmightnotneedjquery.com) são dois sites que mostram funções de JavaScript equivalentes a funções usadas com freqüência no jQuery.

### ES5 vs. ES6

Outro conceito importante para entender sobre JavaScript é o [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) e como ele se relaciona com o JavaScript. Existem dois tipos principais de JavaScript que você vai encontrar hoje: ES5 e ES6. Eles são padrões de ECMAScript que o JavaScript usa. Você pode pensar neles como versões do JavaScript. O projeto final do ES5 foi finalizado em 2009 e é o que estávamos usando até agora.

ES6, também conhecido como ES2015, é o novo padrão que traz novas construções de linguagem como modelo [ constants](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) e [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) para o JavaScript. É importante notar que ES6 traz novos recursos de linguagem, mas ainda definimos semanticamente os termos de ES5. Por exemplo, as classes no ES6 são meramente [_syntactical sugar_](https://en.wikipedia.org/wiki/Syntactic_sugar) sobre a [herança prototípica](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) do JavaScript.

É essencial saber tanto ES5 e ES6, já que você verá aplicativos que usam um ou outro. Uma boa introdução ao ES6 é o [ES5, ES6, ES2016, ES.Next: What’s going on with JavaScript versioning](http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-JavaScript-versioning) e o [Getting Started with ES6 — The Next Version of JavaScript](http://weblogs.asp.net/dwahlin/getting-started-with-es6-%E2%80%93-the-next-version-of-JavaScript) do Dan Wahlin. Depois disso, você pode ver uma lista completa de alterações do ES5 para o ES6 no [ES6 Features](http://es6-features.org/#Constants). Se você quiser ainda mais, confira este [repositório no Github sobre recursos do ES6](https://github.com/lukehoban/es6features).

## Mais prática

Se você já chegou a este ponto, parabenize-se. Você já aprendeu muito sobre JavaScript. Vamos colocar em prática o que você aprendeu.

### Experimento 3

![Flipboard.com](https://d262ilb51hltx0.cloudfront.net/max/800/1*vThR7vEzW40OloxGnbmwuA.png)

O experimento 3 vai te ensinar como usar habilidades como manipulação do DOM e jQuery. Para este experimento, vamos adotar uma abordagem mais estruturada e copiar a homepage do Flipboard usando o tutorial do Codecademy, [Flipboard’s home page and add interactivity with JavaScript](https://www.codecademy.com/skills/make-an-interactive-website).

Durante o tutorial, concentre-se na compreensão de como fazer um site interativo, quando torná-lo interativo e como aplicar o jQuery.

### Experimento 4

O experimento 4 combina o que você aprendeu sobre HTML e CSS com seu curso introdutório em JavaScript. Para este experimento, você criará um relógio com seu próprio estilo e vai torná-lo interativo usando JavaScript. Antes de começar, eu recomendo a leitura do [Decoupling Your HTML, CSS, and JavaScript](http://philipwalton.com/articles/decoupling-html-css-and-JavaScript) para aprender o básico da nomenclatura do CSS quando o JavaScript é jogado no projeto. Também preparei uma lista de _pens_ no CodePen para você usar como referência para este experimento. Para obter mais exemplos, busque [clock](http://codepen.io/search/pens?q=clock&limit=all&type=type-pens) no CodePen.

- [Flat Clock](http://codepen.io/stevenfabre/pen/Cyhjb)
- [jQuery Wall Clock](http://codepen.io/mattlitzinger/pen/ruEyz)
- [Fancy Clock](http://codepen.io/rapidrob/pen/IGEhn)
- [Retro Clock](http://codepen.io/OfficialAntarctica/pen/VYzvgj)
- [Simple JavaScript Clock](http://codepen.io/dudleystorey/pen/unEyp)

Você pode fazer esta experiência de duas maneiras:

1. Comece a projetar e criar o layout em HTML e CSS e adicione interatividade com JavaScript.
1. Escrava a lógica JavaScript primeiro e depois passe para o layout.

Você pode usar jQuery, mas sinta-se livre para usar o JavaScript simples.

## Frameworks JavaScript

Com você sabendo o básico de JavaScript, é hora de aprender sobre Frameworks JavaScript.

Frameworks são bibliotecas de JavaScript que vão te ajudar a estruturar e organizar seu código. Eles fornecem aos desenvolvedores soluções repetíveis para problemas complexos de Front-End, como gerenciamento de estado, roteamento e otimização de desempenho. Eles são comumente usados para criar [web apps](http://www.visionmobile.com/blog/07/web-sites-vs-web-apps-what-the-experts-think).

Eu não vou incluir uma descrição de cada estrutura do JavaScript. Mas aqui está uma lista rápida de alguns Frameworks:

- [Angular](https://angularjs.org)
- [React](https://facebook.github.io/react) + [Flux](https://facebook.github.io/react/docs/flux-overview.html)
- [Ember](http://emberjs.com)
- [Aurelia](http://aurelia.io)
- [Vue](http://vuejs.org)
- [Meteor](https://www.meteor.com)

Você não tem que aprender todos os Frameworks. Escolha um e aprenda bastante. Não foque nos Frameworks em sí. Em vez disso, compreenda as filosofias de programação e princípios de construção deles.

## Architectural Patterns

Antes de ver os Frameworks, é importante entender alguns padrões de arquitetura que eles costumam usar: [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), [model-view-viewmodel](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) e [model-view-presenter](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter). Esses padrões são projetados para criar uma clara [separação de conceitos](https://en.wikipedia.org/wiki/Separation_of_concerns) entre as camadas da aplicação.

Separação de conceitos, é um princípio que sugere a divisão da aplicação em camadas específicas. Por exemplo, em vez do HTML manter o estado da aplicação, você pode usar um objeto JavaScript — geralmente chamado `model` — para armazenar o estado.

Para saber mais sobre esses padrões, primeiro leia sobre MVC no [Chrome Developers](https://developer.chrome.com/apps/app_frameworks). Depois, leia [Understanding MVC And MVP (For JavaScript And Backbone Developers)](https://addyosmani.com/blog/understanding-mvc-and-mvp-for-JavaScript-and-backbone-developers). Nesse artigo, não se preocupe em aprender Backbone, veja apenas as partes com explicações de MVC e MVP.

Addy Osman também escreveu sobre MVVM em [Understanding MVVM — A Guide For JavaScript Developers](https://addyosmani.com/blog/understanding-mvvm-a-guide-for-JavaScript-developers). Para saber mais sobre as origens do MVC e porque ele surgiu, leia o ensaio de Martin Fowler chamado [GUI Architectures](http://martinfowler.com/eaaDev/uiArchs.html). Finalmente, leia a seção, [JavaScript MV* Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvcmvp) no [Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book), é um livro fantástico online.

## Design Patterns

Frameworks JavaScript não reinventam a roda. A maioria deles dependem de _design patterns_. Você pode pensar sobre _design patterns_ como modelos para resolver problemas comuns no desenvolvimento de software.

Sabendo que a compreensão dos _design patterns_ no JavaScript não é um pré-requisito para o aprendizado de um Framework, sugiro olhar a lista a seguir em algum momento.

- [Decorator](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternJavaScript)
- [Factory](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternJavaScript)
- [Singleton](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternJavaScript)
- [Revealing module](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternJavaScript)
- [Facade](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternJavaScript)
- [Observer](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternJavaScript)

Compreender e ser capaz de implementar alguns destes _design patterns_ não só vai te fazer um desenvolvedor melhor, mas também vai ajudar você a entender o que alguns Frameworks estão fazendo por trás das cortinas.


### AngularJS

AngularJS é um Framework [MVC](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvc) e às vezes um Framework [MVVM](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvvm). Ele é mantido pelo Google e balançou a comunidade de JavaScript, quando foi lançado em 2010.

![AngularJS](https://d262ilb51hltx0.cloudfront.net/max/800/1*lFZ7nP3KlRtb69abn19xJQ.png)

Angular é um Framework declarativo. A leitura que mais me ajudou a entender a transição da programação imperativa para programação declarativa no JavaScript foi [How is AngularJS different from jQuery](http://stackoverflow.com/questions/13151725/how-is-angularjs-different-from-jquery) no StackOverflow.

Se você quer aprender mais sobre Angular, confira a [documentação](https://docs.angularjs.org/guide). Eles também têm um tutorial chamado [Angular Cat](https://docs.angularjs.org/tutorial/step_00) que permite que você vá para a codificação imediatamente. Um guia mais completo para aprender Angular pode ser encontrado neste [repositório do Github](https://github.com/timjacobi/angular2-education) do Tim Jacobi. Além disso, confira [best practice styleguide](https://github.com/johnpapa/angular-styleguide), escrito pelo John Papa.

### React + Flux

O Angular resolve muitos problemas que os desenvolvedores enfrentam ao construir sistemas complexos de Front-End. Outra ferramenta popular é o [React](https://facebook.github.io/react), que é uma biblioteca para a criação de _user interfaces_. Você pode pensar nele como o V no MVC. Sendo o React apenas uma biblioteca, muitas vezes ele é oferecido com uma arquitetura conhecida como [Flux](https://facebook.github.io/flux).

![React](https://d262ilb51hltx0.cloudfront.net/max/800/1*c0JXNVxVnTlOuQCnDqA6CA.png)

O Facebook desenvolveu o React e o Flux para abordar algumas das deficiências do MVC e seus problemas de escalabilidade. Dê uma olhada na sua apresentação conhecida como [Hacker Way: Rethinking Web App Development at Facebook](https://www.youtube.com/watch?list=PLb0IAmt7-GS188xDYE-u1ShQmFFGbrk0v&v=nYkdrAPrdcw). Fala sobre o futuro e a origem do Flux.

<iframe width="100%" height="415" src="https://www.youtube.com/embed/nYkdrAPrdcw?list=PLb0IAmt7-GS188xDYE-u1ShQmFFGbrk0v" frameborder="0" allowfullscreen></iframe>

Para começar com React + Flux, primeiro aprenda React. Um bom inicio é a [documentação do React](https://facebook.github.io/react/docs/getting-started.html). Depois disso, confira [React.js Introduction For People Who Know Just Enough jQuery To Get By](http://reactfordesigners.com/labs/reactjs-introduction-for-people-who-know-just-enough-jquery-to-get-by) para ajudar você na transição da "mentalidade jQuery".

Depois que você tiver uma compreensão básica de React, comece a aprender Flux. Um bom lugar para começar é a [documentação oficial do Flux](https://facebook.github.io/flux/docs/overview.html). Depois confira [Awesome React](https://github.com/enaqx/awesome-react), que é uma lista de links com curadoria que irá ajudá-lo a avançar ainda mais no seu aprendizado.

## Praticando com Frameworks

Agora que você tem conhecimento básico sobre os Frameworks e padrões de arquitetura, é hora de colocá-los em prática. Durante estes dois experimentos, foque em aplicar os conceitos arquitetônicos que você aprendeu. Mantenha o seu código [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), com uma [clara separação de conceitos](https://en.wikipedia.org/wiki/Separation_of_concerns) e use o [principio de responsabilidade única](https://en.wikipedia.org/wiki/Single_responsibility_principle).

### Experimento 5

Esse experimento é para desmontar e reconstruir o app _Todo MVC_ usando um JavaScript agnóstico. Em outras palavras, mantenha o JavaScript simples, sem um Framework. O objetivo deste experimento é mostrar como MVC funciona sem misturar na sintaxe específica de um Framework.

![](https://d262ilb51hltx0.cloudfront.net/max/800/1*ISCVxjX3_691DLnV3EPZ3w.png)

Para começar, confira o resultado final no [TodoMVC](http://todomvc.com/examples/vanillajs). O primeiro passo é criar um novo projeto local e primeiramente estabelecer os três componentes do MVC. Já que envolve um experimento, referencie o código-fonte completo neste [repositório do Github](https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs). Se você não pode replicar completamente o projeto ou não tem tempo, tudo bem. Baixe o código do repositório e brinque com os diferentes componentes do MVC até você entender como eles se relacionam com o outro.

### Experimento 6

O experimento 6 é um bom exercício de aplicação MVC. Entender o MVC é um passo importante para aprender os Frameworks JavaScript. Temos a seguir um tutorial do Scotch.io para construir um clone do Etsy usando Angular.

![](https://d262ilb51hltx0.cloudfront.net/max/800/1*zOIJ31nV3rDYBidYkPSH_A.png)

[Build an Etsy Clone with Angular and Stamplay](https://scotch.io/tutorials/build-an-etsy-clone-with-angular-and-stamplay-part-1) vai ensinar você a construir um web app usando Angular, interfaces com [APIs](https://en.wikipedia.org/wiki/Application_programming_interface) e como estruturar projetos grandes. Após terminar esse tutorial, você deve ser capaz de responder as seguintes questões:

- O que é um web app?
- Como o MVC/MVVM são aplicados com Angular?
- O que é uma API e o que ela faz?
- Como organizar e estruturar bases de código grandes?
- Quais são as vantagens de adicionar _directive components_ na sua UI?

Se você quiser construir outros web apps usando Angular, tente [Build a Real-Time Status Update App with AngularJS & Firebase](https://www.sitepoint.com/real-time-status-update-app-angularjs-firebase).

### Experimento 7

![React + Flux](https://d262ilb51hltx0.cloudfront.net/max/800/1*3HrnGSbAzIM5Lwu0_eqmjw.png)

Agora que você já entendeu o MVC, É o momento de tentar usar o [Flux](https://facebook.github.io/flux). O experimento 7 vai construir uma _todo list_ usando a arquitetura do React e Flux. Você pode achar o tutorial completo no [Facebook’s Flux documentation site](https://facebook.github.io/flux/docs/todo-list.html). Ele vai te mostrar um passo-a-passo de como usar React para construir interfaces e como o Flux é aplicado para construir web apps.

Após você completar esse tutorial, você pode tentar outros tutoriais relacionados como [How to Build a Todo App Using React, Redux, and Immutable.js](https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js) e [Build a Microblogging App With Flux and React](http://code.tutsplus.com/courses/build-a-microblogging-app-with-flux-and-react).

## Mantenha-se atualizado

Assim como o resto do Front-End, o cenário de JavaScript muda rapidamente. É importante estar sempre um passo a frente.

Abaixo uma lista de websites, blogs, e fóruns que são informativos e agradáveis de ler.

- [Smashing Magazine](https://www.smashingmagazine.com/tag/JavaScript)
- [JavaScript Weekly](http://JavaScriptweekly.com)
- [Ng Weekly](http://www.ng-newsletter.com)
- [Reddit JavaScript](https://www.reddit.com/r/JavaScript)
- [JavaScript Jabber](https://devchat.tv/js-jabber)

## Aprenda pelo exemplo

Como sempre, a melhor maneira de aprender é pelo exemplo.

### Styleguides

Os styleguides de JavaScript são convenções de códigos desenvolvidas para ajudar você a manter seu código legível e com fácil manutenção.

- [AirBnB JavaScript Styleguide](https://github.com/airbnb/JavaScript)
- [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)
- [Node Styleguide](https://github.com/felixge/node-style-guide)
- [MDN Coding Style](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Coding_Style)

### Codebases

Não consigo enfatizar o quanto é útil é ler um bom código. Aprenda como procurar no [Github](https://github.com) repositórios relevantes sempre que buscar algo novo.


- [Lodash](https://github.com/lodash/lodash)
- [Underscore](https://github.com/jashkenas/underscore)
- [Babel](https://github.com/babel/babel)
- [Ghost](https://github.com/TryGhost/Ghost)
- [NodeBB](https://github.com/NodeBB/NodeBB)
- [KeystoneJS](https://github.com/keystonejs/keystone)


## Considerações finais

No final deste guia, você deve ter uma compreensão sólida de fundamentos do JavaScript e como aplicá-los na Web. Lembre-se, este guia te fornece um mapa geral do caminho. Se você quer se tornar um herói Front-End, é importante que você gaste tempo trabalhando em projetos para aplicar estes conceitos. Quanto mais projetos você fazer, e quanto mais se apaixonar por eles, mais você vai aprender.

Este artigo é a segunda parte da série de duas partes. O que está faltando neste guia é uma introdução do [Node](https://nodejs.org/en), que é uma plataforma que permite que o JavaScript rode em servidores. No futuro, posso escrever uma parte três que vai falar sobre o desenvolvimento do lado do servidor com o Node e coisas como bancos de dados [noSQL](https://en.wikipedia.org/wiki/NoSQL).

## Sobre esse artigo

Esse texto foi uma tradução livre do fantástico artigo [From Zero to Front-End Hero (Part 2)](https://medium.freecodecamp.com/from-zero-to-front-end-hero-part-2-adfa4824da9b#.342vpy7aq) publicado no Medium pelo [@jonathanzwhite](https://twitter.com/jonathanzwhite).

Então quero agradece-lo primeiro por ter escrito esse ótimo texto, segundo por ter permitido que eu fizesse essa tradução.

Importante ressaltar que a tradução não é literal, adaptei algumas partes para facilitar a compreensão. Caso encontre erros graves de tradução pode abrir uma [pull-request](https://github.com/felipefialho/felipefialho.github.io) com a correção do problema ou uma [issue informando aonde é o erro](https://github.com/felipefialho/felipefialho.github.io/issues).
