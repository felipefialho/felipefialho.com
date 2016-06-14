## Sobre esse artigo

O texto a seguir é uma tradução livre do fantástico artigo [From Zero to Front-End Hero (Part 2)](https://medium.freecodecamp.com/from-zero-to-front-end-hero-part-2-adfa4824da9b#.342vpy7aq) publicado no Medium pelo [@jonathanzwhite](https://twitter.com/jonathanzwhite).

Então quero agradece-lo primeiro por ter escrito esse ótimo texto, segundo por ter permitido que eu fizesse essa tradução.

Importante ressaltar que a tradução não é literal, adaptei algumas partes para facilitar a compreensão. Caso encontre erros graves de tradução pode abrir uma [pull-request](https://github.com/LFeh/lfeh.github.io) com a correção do problema ou uma [issue informando aonde é o erro](https://github.com/LFeh/lfeh.github.io/issues).

______

Este artigo é a segunda parte da série "Do Zero a Herói do Front-End". Na primeira parte, você aprendeu a criar layouts com HTML e CSS, usando algumas das melhores práticas. Na parte dois, vamos nos focar em aprender JavaScript como uma linguagem independente, adicionar interatividade a interfaces, design JavaScript, padrões de arquitetura e como construir aplicações web.

Assim como com HTML e CSS, existem milhares de tutoriais JavaScript por aí. No entanto, especialmente para alguém novo no mundo Front-End, é difícil descobrir quais tutoriais usar e qual a ordem para fazê-las. O principal objetivo desta série é fornecer-lhe com um roteiro para ajudar a aprender a ser um Front-Ender.

Se você ainda não a [primeira parte, faça isso antes de continuar a leitura](/blog/2016/do-zero-a-heroi-do-front-end-parte-1).

## O básico do JavaScript

JavaScript é uma linguagem de programação multi-plataforma que pode ser usada para praticamente qualquer coisa atualmente, mas vamos voltar nisso mais tarde, depois que você compreender as noções básicas de como os desenvolvedores usam JavaScript para a web.

### Linguagem

Antes de aprender como aplicar o JavaScript na web, você deve aprender sobre a própria linguagem. Para começar, leia o curso básico da Mozilla Developer Network’s [Language basics crash course](https://developer.mozilla.org/en-US/Learn/Getting_started_with_the_web/JavaScript_basics). Este tutorial vai te ensinar coisas básicas da linguagem como variáveis, condicionais e funções.

Depois, leia as seguintes sessões no MDN [JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide):

- [Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
- [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Loops and iterations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

Não se preocupe muito com a memorização da sintaxe. Você pode procurar isso sempre. Em vez disso, concentre-se na compreensão de conceitos importantes como instanciação de variáveis, loops e funções. Se o material é muito denso, tudo bem. Você pode sempre voltar mais tarde. E quando colocar esses conceitos na prática, eles se tornarão muito mais claros.

Para quebrar a monotonia da aprendizagem baseada em texto, confira o curso de [JavaScript da Codecademy](https://www.codecademy.com/learn/javascript). É prático e divertido. Além disso, se você tiver tempo, para cada conceito listado acima, leia o capítulo correspondente em [Eloquent JavaScript](http://eloquentjavascript.net/) para reforçar a sua aprendizagem. _Eloquent JavaScript_ é um ótimo livro on-line gratuito que todo desenvolvedor front-end aspirante deve ler.

### Interatividade

![Uso de JavaScript para animar layouts](https://d262ilb51hltx0.cloudfront.net/max/800/1*V4UtSyfCN9DDpl70IxXSHA.gif)

Agora que você tem um conhecimento básico de JavaScript como linguagem, o próximo passo é para aplicá-la à web. Para entender como o JavaScript interage com websites, você primeiro tem que saber sobre o [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)'.

O DOM é uma estrutura representacional dos documentos HTML. É uma árvore estrutural composta de objetos JavaScript que correspondem aos nós de HTML. Para ler mais sobre o DOM, leia [What is the DOM](https://css-tricks.com/dom/) do CSSTricks. Ele fornece uma explicação simples e direta sobre o DOM.

![Inspecionando o DOM](https://d262ilb51hltx0.cloudfront.net/max/800/1*o1lGaXpnKYgp2r9CFOI_9A.png)

JavaScript interage com o DOM para mudar e atualizar ele. Aqui está um exemplo onde podemos selecionar um elemento HTML e alterar o seu conteúdo:

````
var container = document.getElementById('container');
container.innerHTML = 'New Content!';
````

Não se preocupe, foi só um exemplo simples. Você pode fazer muito mais do que isso manipulando o DOM com JavaScript. Para saber mais sobre como usar JavaScript para interagir com o DOM, leia as seguintes sessões do MDN, [The Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

- [Events](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)
- [Examples of web and XML development using the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Examples)
- [How to create a DOM tree](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/How_to_create_a_DOM_tree)
- [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [Locating DOM elements using selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)

Mais uma vez, concentre-se nos conceitos sobre à sintaxe. Seja capaz de responder às seguintes perguntas:

- O que é o DOM?
- Como você consulta elementos?
- Como adicionar _event listeners_?
- Como você mudar propriedades do DOM?

Para obter uma lista de interações comuns de JavaScript no DOM, Confira as  [JavaScript Functions and Helpers](https://plainjs.com/javascript/) do PlainJS. Este site fornece exemplos de como fazer coisas como definir [estilos nos elementos HTML](https://plainjs.com/javascript/styles/set-and-get-css-styles-of-elements-53/) e adicionar [_event listeners_ no teclado](https://plainjs.com/javascript/events/getting-the-keycode-from-keyboard-events-17/). E se você quiser ir mais fundo, você sempre pode ler a seção sobre o DOM no [Eloquent JavaScript](http://eloquentjavascript.net/13_dom.html).

### Inspector

Para _debugar_ JavaScript do lado do cliente, utilizamos ferramentas para o desenvolvedor, construídas nos navegadores. O painel de inspeção está disponível na maioria dos navegadores e permite que você veja o código fonte das páginas web. Você pode rastrear quando o JavaScript é executado, mostrar estados de debug no console e ver coisas como as solicitações de rede e outros recursos.

Aqui tem um [tutorial](https://developer.chrome.com/devtools) usando o _developer tool_ do Chrome. Se você está usando Firefox, você pode ver [esse tutorial](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector).

![Chrome developer tools](https://d262ilb51hltx0.cloudfront.net/max/800/1*wW-FbgJhP0R_id-XPOSKpg.jpeg)

## Práticando o básico

Neste ponto, ainda há muito para aprender sobre JavaScript. No entanto, a última seção continha uma grande quantidade de informações. Acho que um bom momento para a gente fazer uma pausa e fazer algumas pequenas experiências. Elas devem ajudar a solidificar alguns dos conceitos que você acabou de aprender.

Experimento 1

Para o experimento 1, vá até o [AirBnB](https://www.airbnb.com/), abra o _inspector tools_ do seu navegador e clique na [guia console](https://developer.chrome.com/devtools/docs/console). Aqui você pode executar o JavaScript na página. O que vamos fazer é nos divertir com a manipulação de alguns dos elementos na página. Veja se você consegue fazer todas as manipulações de DOM a seguir.

![Airbnb.com](https://d262ilb51hltx0.cloudfront.net/max/800/1*5L17hFKIMTsBFQOLCy8tCQ.png)

Eu escolhi o site do AirBnB porque os nomes de classe CSS são relativamente simples e não são ofuscados por um compilador. Porém, você pode optar por fazer isso em qualquer página que quiser.

- Selecione uma tag de cabeçalho com um nome de classe única e altere o texto
- Selecione qualquer elemento na página e removê-lo
- Selecione qualquer elemento e altere uma das suas propriedades CSS
- Selecione uma seção específica e mova ela 250 pixels para baixo
- Selecione qualquer componente, como um painel e ajuste a sua visibilidade
- Defina uma função chamada `doSomething` com um alerta de "Hello world" e em seguida execute
- Selecione um parágrafo específico, adicione um _ event listener_ de clique a ele e execute algo cada vez que o evento é clicado

Se você ficar preso, use o guia [JavaScript Functions and Helpers](https://plainjs.com/javascript/) como referência. Eu baseei a maioria dessas tarefas fora dele, abaixo está um exemplo de como completar o primeiro bullet:

````
var header = document.querySelector('.text-branding')
header.innerText = ‘Boop'
````

O principal objetivo deste experimento é fazer algumas das coisas que você aprendeu sobre JavaScript e a manipulação de DOM vê-los funcionar.

### Experimento 2

![JavaScript permite que os desenvolvedores criem interfaces interativas](https://d262ilb51hltx0.cloudfront.net/max/800/1*7365CToqHiLkXf16Di8xRw.gif)

Usando CodePen, escreva uma pesada experiência básica de JavaScript que usa manipulação do DOM e requer alguma lógica de programação para funcionar. O foco deste experimento é pegar algumas das coisas que você aprendeu no [Do Zero a Herói do Front-End](/blog/2016/do-zero-a-heroi-do-front-end-parte-1) e combinar com JavaScript. Aqui estão alguns exemplos de referência que podem servir de inspiração.

- [Periodic Table](http://codepen.io/tony_the_coder/pen/GZdNQY)
- [Mood Color Generator](http://codepen.io/mecarter/pen/RNomVo)
- [Calculator](http://codepen.io/nodws/pen/heILd)
- [JavaScript Quiz](http://codepen.io/jasonchan/pen/wMaEwN)
- [Playable Canvas Asteroids](http://codepen.io/jeffibacache/pen/bzBsp)

### Mais JavaScript

Agora que você sabe e teve um pouco de prática com JavaScript, vamos avançar para conceitos mais avançados. Os conceitos abaixo não são diretamente relacionados um ao outro. Agrupei eles nesta seção porque são necessários para compreensão de como construir sistemas mais complexos de front-end. Você entenderá melhor como colocá-los em uso quando você chegar na seção de experiências e frameworks.

## Linguagem

Quando você fazer mais projetos com JavaScript, você encontrará alguns conceitos de nível superiores. Esta é uma lista de alguns desses conceitos. Quando você tiver tempo, passe por cada ponto de bala. O [Eloquent JavaScript](http://eloquentjavascript.net/) também abrange muito deste material, caso você queira completar a sua aprendizagem.

- [Prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Scoping](https://spin.atomicobject.com/2014/10/20/javascript-scope-closures/)
- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Event bubbling](http://javascript.info/tutorial/bubbling-and-capturing)
- [Apply, call, and bind](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/)
- [Callbacks and promises](https://www.quora.com/Whats-the-difference-between-a-promise-and-a-callback-in-Javascript)
- [Variable and function hoisting](http://adripofjavascript.com/blog/drips/variable-and-function-hoisting)
- [Currying](http://www.sitepoint.com/currying-in-functional-javascript/)

### Imperativo vs. Declarativo

Existem dois tipos de abordagens de como o JavaScript interage com o DOM: imperativa e declarativa. De um lado, a programação declarativa foca no _o que_ acontece. Do outro lado, programação imperativa foca no _o que_ e também em _como_.

````
var hero = document.querySelector('.hero')
hero.addEventListener(‘click’, function() {
  var newChild = document.createElement(‘p’)
  newChild.appendChild(document.createTextNode(‘Hello world!’))
    newChild.setAttribute(‘class’, ‘text’)
    newChild.setAttribute(‘data-info’, ‘header’)
    hero.appendChild(newChild)
 })
}
````

Este é um exemplo de programação imperativa em que nós consultamos manualmente um elemento e guardamos o estado dele no DOM. Em outras palavras, estamos focando em _como_ conseguir alguma coisa. O maior problema com este código é que ele é frágil. Se alguém que trabalhar no código mudar o nome da classe em HTML de `hero` para `villain`, o _event listener_ não vai mais funcionar já que não há classe `hero` no DOM.

Programação declarativa resolve esse problema. Em vez de selecionar elementos, você deixa isso com o framework ou biblioteca que você está usando. Esta função permite que você se concentre sobre _o que_, em vez do _como_. Para ler mais, confira [The State Of JavaScript — A Shift From Imperative To Declarative](http://www.tysoncadenhead.com/blog/the-state-of-javascript-a-shift-from-imperative-to-declarative#.Vz0WEZMrIUE) e [Three D’s of Web Development #1: Declarative vs. Imperative](http://developer.telerik.com/featured/three-ds-of-web-development-1-declarative-vs-imperative/).

Este guia ensina primeiro a abordagem imperativa antes de introduzir a abordagem declarativa com frameworks como [Angular](https://angular.io/) e bibliotecas como [React](https://facebook.github.io/react/). Eu recomendo o aprendizado nesta ordem porque ele permite que você veja o problema que a abordagem declarativa resolve.

### Ajax

Ao longo destes artigos e tutoriais, você provavelmente viu o termo [Ajax](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) ser mencionado algumas vezes. Ajax é uma técnica que permite que as páginas da web interajam com o servidor usando JavaScript.

![Ajax é o que faz o conteúdo ser dinâmico](https://d262ilb51hltx0.cloudfront.net/max/800/1*kkezNwUnuEiAztlQRkJ69A.gif)

Por exemplo, quando você enviar um formulário em um site, ele coleta sua entrada e faz uma solicitação HTTP que envia dados para um servidor. Quando você postar um tweet no Twitter, seu cliente do Twitter faz uma solicitação HTTP para o servidor da API do Twitter e atualiza a página com a resposta do servidor.

Para leitura em Ajax veja o [What is Ajax](http://www.vandelaydesign.com/what-is-ajax-webdev/). Se você ainda não entendeu totalmente o conceito de AJAX, dê uma olhada no [Explain it like i’m 5, what is Ajax](https://www.reddit.com/r/explainlikeimfive/comments/19gvn9/explain_it_like_im_5_what_is_ajax/). E se ainda não for suficiente, você pode ler o [Eloquent JavaScript’s chapter on HTTP](http://eloquentjavascript.net/17_http.html).

Hoje, o padrão de navegador para fazer solicitações de HTTP é o [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Você pode ler mais sobre o _Fetch_ neste artigo do [Dan Walsh](https://davidwalsh.name/fetch). Ele abrange como o _Fetch_ funciona e como usá-lo. Você também pode encontrar um [polyfill](http://stackoverflow.com/questions/7087331/what-is-the-meaning-of-polyfills-in-html5) do _Fetch_ com documentação [aqui](https://github.com/github/fetch).

### jQuery

Até agora, você tem feito manipulações de DOM usando apenas JavaScript. A verdade é que há um monte de bibliotecas de manipulação DOM que fornecem APIs para simplificar o código que você escreve.

Uma das bibliotecas mais populares de manipulação DOM é o [jQuery](https://jquery.com/). Tenha em mente, o jQuery é uma biblioteca de imperativa. Foi escrita antes de sistemas front-end se tornarem tão complexos como são hoje. Hoje, o gerenciamento de interfaces de usuário complexas são com frameworks declarativos, como bibliotecas como Angular e React. No entanto, eu ainda recomendo que você aprenda jQuery porque você provavelmente o encontrará muitas vezes durante sua carreira como Front-Ender.

![jQuery é uma abstração em cima de simples manipulação no DOM](https://d262ilb51hltx0.cloudfront.net/max/800/1*4XD5t8AEjQFWeTWEIdhQpw.gif)

Para aprender o básico do jQuery, confira o [jQuery’s Learning Center](http://learn.jquery.com/). É um passo-a-passo passa de conceitos importantes como animações e manipulação de eventos. Se você quer fazer em tutorial interativo, você pode tentar o [Codecademy’s jQuery course](https://www.codecademy.com/learn/jquery).

Tenha em mente, jQuery nem sempre é a solução para a manipulação imperativa do DOM. [PlainJS](https://plainjs.com/javascript/) e [You Might Not Need jQuery](http://youmightnotneedjquery.com/) são dois bons recursos que mostram funções de JavaScript equivalentes a funções usadas com freqüência no jQuery.

### ES5 vs. ES6

Outro conceito importante para entender sobre JavaScript é o [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) e como ele se relaciona com o Javascript. Existem dois tipos principais de JavaScript que você vai encontrar hoje: ES5 e ES6. ES5 e ES6 são padrões de ECMAScript que o JavaScript usa. Você pode pensar neles como versões de JavaScript. O projecto final do ES5 foi finalizado em 2009 e é o que temos usado até agora.

ES6, também conhecido como ES2015, é o novo padrão que traz novas construções de linguagem como modelo [ constants](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) e [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) para o JavaScript. É importante notar que ES6 traz novos recursos de linguagem, mas ainda definimos os termos de ES5 semanticamente. Por exemplo, classes ES6 são meramente [_syntactical sugar_](https://en.wikipedia.org/wiki/Syntactic_sugar) sobre [herança prototípica](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) do JavaScript.

É essencial saber tanto ES5 e ES6, já que você verá aplicativos hoje  em dia que usam um ou outro. Uma boa introdução ao ES6 é o [ES5, ES6, ES2016, ES.Next: What’s going on with JavaScript versioning](http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/) e o [Getting Started with ES6 — The Next Version of JavaScript](http://weblogs.asp.net/dwahlin/getting-started-with-es6-%E2%80%93-the-next-version-of-javascript) do Dan Wahlin. Depois disso, você pode ver uma lista completa de alterações do ES5 para o ES6 no [ES6 Features](http://es6-features.org/#Constants). Se você quiser ainda mais, confira este [repositório no Github sobre recursos do ES6](https://github.com/lukehoban/es6features).
