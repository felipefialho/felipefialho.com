## Começando do começo

Acabei de chegar da 9ª edição do [Meetup CSS](http://www.meetup.com/pt/CSS-SP/) que teve como tema **Media Queries**, a talk foi muito bem apresentada pelo [Matheus Marsiglio](https://twitter.com/matmarsiglio) e em seguida tivemos um ótimo debate técnico sobre o assunto.

Fiquei feliz em saber que muita gente já está utilizando a abordagem de componentização de Media Queries, assunto que já abordei [>nessa postagem](http://www.felipefialho.com/blog/2014/css-modular-com-mobile-first/) e mais recentemente teve [um artigo](http://www.raphaelfabeni.com.br/componentes-responsivos/) do [Raphael Fabeni](https://twitter.com/raphaelfabeni) sobre isso.

Apesar de já ter falado sobre isso, o assunto é tão interessante e importante que vale um novo artigo.

## "Transforma esse site em mobile ai?"

Alguns anos atrás, quando as pessoas começaram a perceber a importância de ter um site mobile e notaram que não havia sentido em ter duas versões para o mesmo site, começamos a aplicar o principio da responsividade nos nossos projetos.

Porém, nem nós, nem os clientes estávamos muito preparados para lidar com isso. E usávamos as armas que tínhamos para resolver essa questão, e essas armas podem ser resumidas em: muito display: none e muita propriedade resetada.

O normal naquele momento era ter uma folha de estilo separada, ou um espaço no final do arquivo, onde adaptávamos o projeto para a tal sonhada versão mobile.

Essa técnica tinha vários problemas. O site não era necessariamente pensado para dispositivos menores, ganhava somente uma adaptação. Fora todos os problemas de usabilidade, tínhamos outra grave questão: **Manutenção**.

Por mais que o código fosse organizado, era muito difícil e chato dar manutenção, e caso, por exemplo, alguma classe fosse retirada do CSS, nem sempre lembrávamos que ela estava duplicada em outro arquivo ou no fim do CSS, com isso o código ficava cheio de coisas desnecessárias que nem estavam sendo usadas.

Caso ainda esteja usando essa abordagem, talvez seja a hora de tentar utilizar outros conceitos.

### E então o Mobile First ganhou força!

Após algum tempo, com as pessoas usando smartphones de forma frenética, começamos a dar mais importância para o acesso mobile. E isso foi crescendo de tal forma, que concluímos que fazia mais sentido começar a concepção do projeto, e também o código, por dispositivos com telas menores e ir crescendo progressivamente, essa técnica ficou conhecida como **Mobile First**.

## O meu estilo de Mobile First :)

Como disse no inicio do artigo, quando se trata de otimizar o código para essa metodologia a minha principal regra é: Evitar ao **máximo** resetar propriedades.

É bom avisar, que o IE7 e IE8 ignora Media Queries, portanto caso tenha que fornecer suporte para esses navegadores recomendo o Respond.js (https://github.com/scottjehl/Respond). Assim tudo vai funcionar perfeitamente (até parece...) nesses navegadores.

O primeiro ponto, é que crio algumas variáveis de breakpoints e replico elas conforme a necessidade. Peguei esse costume no tempo em que usava o Bootstrap e mantive até hoje, eu acho que faz todo sentido e torna o fluxo mais fluido.

````
//
// Media Queries
// --------------------------------------------------

$screen-xs = 480px // Extra small screen
$screen-sm = 768px // Small screen
$screen-md = 992px // Medium screen
$screen-lg = 1200px // Large screen
$screen-xlg = 1600px // Extra Large screen
$screen-xxlg = 1900px // Extra Large screen

$screen-xs-max = ($screen-sm - 1)
$screen-sm-max = ($screen-md - 1)
$screen-md-max = ($screen-lg - 1)
$screen-lg-max = ($screen-xlg - 1)
$screen-xlg-max = ($screen-xxlg - 1)
````

O segundo ponto é que eu uso Stylus e SEMPRE adiciono as linhas de Media Querie aninhadas dentro do elemento. E não no final do arquivo do componente, e muito menos em um arquivo separado.

````
.header
    @media (min-width $screen-sm)
       ...
````

O terceiro ponto, é que nos exemplos desse artigo não vou levar em consideração propriedades muito especificas de cada dispositivo, resoluções em retina, nem nada do tipo, mas o conceito é exatamente o mesmo.

## Situação real

Vamos pensar na seguinte situação, que alias é muito comum: Você tem um menu, e a versão "mobile" e "desktop" são completamente diferentes uma da outra.

- Na versão mobile ele deve ser fixo, com um botão hambúrguer e o menu só ficará visível após clicar no botão. Quando os itens estiverem visíveis, eles devem estar em blocos um abaixo do outro

Seria exatamente assim:

See the Pen [Menu - Mobile Example](http://codepen.io/LFeh/pen/jPvdgp/) by Luiz Felipe Tartarotti Fialho ([@LFeh](http://codepen.io/LFeh)) on [CodePen](http://codepen.io).

- Já na versão desktop, ele deve estar sempre visível, não deve estar fixo e os itens devem ser posicionados um ao lado do outro

Então ele ficaria dessa forma:

See the Pen [Menu - Desktop Example](http://codepen.io/LFeh/pen/LVJaEG/) by Luiz Felipe Tartarotti Fialho ([@LFeh](http://codepen.io/LFeh)) on [CodePen](http://codepen.io).

Observem que utilizo o mesmo HTML (Jade) em ambos os exemplos.

### Agora vamos juntar os dois códigos seguindo a minha metodologia

O resultado será esse! (pode dar resize para ver as mudanças)

See the Pen [Menu - Responsive Example](http://codepen.io/LFeh/pen/GJXeJv/) by Luiz Felipe Tartarotti Fialho ([@LFeh](http://codepen.io/LFeh)) on [CodePen](http://codepen.io).

Observem bem o código.

Como foi feito?

- Tudo que é padrão para ambas as resoluções fica fora das Media Queries
- Propriedades especificas, que só devem funcionar em determinada resolução, ficam dentro da Media Querie relacionada

Eu não zerei **nenhuma** propriedade e evitei que código desnecessário fosse renderizado em resoluções que não deveriam funcionar.

### "Mas se eu adicionar um monte de breakpoints aninhados dentro dos elementos não vou adicionar muito código extra?"

NÃO! :D

Por sorte, temos plugins [para o Grunt](https://github.com/buildingblocks/grunt-combine-media-queries) e [para o Gulp](https://www.npmjs.com/package/gulp-combine-media-queries) que resolvem esse problema.

Eles vão fazer uma analise em todo o seu CSS, unificar as Media Queries iguais e jogar no fim do arquivo. Da mesma forma que era feito antes, mas sem precisar ter contato com esse código bagunçado.

Ficou claro? Gostaram do post? Aguardo feedbacks ;)
