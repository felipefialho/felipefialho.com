CSS é uma grande gambiarra, e isso faz parte do seu encanto. Particularmente, desde que me conheço como desenvolvedor, adoro "perder" horas buscando soluções em Pure CSS, quase sempre usando técnicas que inicialmente servem para resolver outros problemas.

## white-space: nowrap?

E uma dessas técnicas é usando o `white-space: nowrap`, inicialmente pensado para [simplesmente remover as quebras de linha no texto](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space), pode se tornar um importante aliado, servindo principalmente de fallbacks ou diminuindo a quantidade de código que usariamos normalmente.

## Como assim?

O `white-space` impede que textos não quebrem certo? Sabendo disso podemos usar ele para tratar qualquer elemento que se comporte como texto...

Através de exemplos é mais legal.

### Carousel

Que atire a primeira pedra quem nunca desenvolveu um carousel. Esse componente é utilizado em muitas e muitas aplicações, e o `white-space: nowrap` pode facilitar bastante nossa vida e ainda fornecer um fallback da hora, caso o JavaScript, por algum motivo não funcione.

Existes milhares de tipos de carousel, e várias técnicas para desenvolve-los. Porém, uma das mais utilizadas consiste em criar uma listagem de elementos, contar o número de itens e o tamanho deles, depois adicionar um `width` no elemento pai. Tudo isso, usando JavaScript é claro.

#### Mas e se pudessemos facilitar esse processo?

A funcionalidade do botão não foi feita, mas... tente fazer um scroll no carousel :)

<p data-height="400" data-theme-id="0" data-slug-hash="rjXbra" data-default-tab="result" data-user="LFeh" data-embed-version="2" data-pen-title="Carousel - Example" class="codepen">See the Pen <a href="http://codepen.io/felipefialho/pen/rjXbra/">Carousel - Example</a> by Felipe Fialho (<a href="http://codepen.io/LFeh">@LFeh</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Esse exemplo é a base de um Carousel simples, com o item ocupando 100% do espaço visível. Mas observem que o scroll termina no lugar correto, respeitando o número de elementos. Tudo isso sem usar uma linha de JavaScript.

Ou seja, a partir desse ponto, é necessário desenvolver apenas a funcionalidade dos botões, pulando o passo anterior.

#### Porque isso acontece?

Porque, como disse anteriormente, o `white-space: nowrap` impede que os textos quebrem, e quando adicionamos essa propriedade em um container, e utilizamos `display: inline-block` nos filhos, eles passam a se comportar como texto. Assim a mágica acontece, faltando apenas setar o `overflow: auto` para o scroll funcionar.

E o mais legal, é que essa técnica fornece um puta fallback caso o JavaScript não funcione.

### Navegação

Outro uso legal dessa técnica consiste em deixar automaticamente responsiva qualquer tipo de navegação.

<p data-height="250" data-theme-id="0" data-slug-hash="LxwoQd" data-default-tab="result" data-user="LFeh" data-embed-version="2" data-pen-title="Navigation - Example" class="codepen">See the Pen <a href="http://codepen.io/felipefialho/pen/LxwoQd/">Navigation - Example</a> by Felipe Fialho (<a href="http://codepen.io/LFeh">@LFeh</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Observem agora que a navegação adiciona um scroll caso os elementos ultrapassem o tamanho do pai. Para testar melhor, recomendo que editem esse pen, e removam alguns items, deixando apenas dois. O scroll simplesmente não vai estar disponível.

Esse exemplo funciona perfeitamente em dispositivos mobile. Evitando que a navegacão quebre ou você tenha que usar soluções mirabolantes em telas menores.

Os mais atentos vão perceber que adicionei ainda um gradiente no lado direito, para informar o usuário que ali tem mais conteúdo e ele pode fazer o scroll.

___

Qualquer dúvida ou sugestão deixe um comentário.

É nóis!



