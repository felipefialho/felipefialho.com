## O que é?

A [W3C](http://www.w3.org/html/wg/drafts/html/master/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes) diz o seguinte:

<blockquote>
  <cite>A custom Data Atributes is an attribute in no namespace whose name starts with the string "data-", has at least one character after the hyphen, is XML-compatible, and contains no uppercase ASCII letters.</cite>
</blockquote>

Ou seja, através do atributo data você pode armazenar e recuperar dados. Com isso você guarda pequenas informações de texto e pode manipular através de Javasript.

Como podemos criar qualquer atributo através do prefixo `[data-*]`, esses atributos tem sido utilizados também para iniciar funções.

## Como funciona?

Ao invés de acessar o elemento via Javascript através de `.classe` ou `#id`, podemos usar os `[data-attributes]` do HTML5.

Por exemplo (em jQuery) para iniciar uma interação touch em um menu, podemos chamar via `.classe`:

````
$('.nav-aside');
````

Ou via `#id`:

````
$('#nav-aside');
````

Mas a ideia aqui é fazer a chamada via `[data-*]`:

$('[data-toggle="nav-touch"]');

## Por que usar dessa forma?

O principal motivo, é para separar o estilo da funcionalidade Javascript. Apresento a seguir um cenário real de aplicação.

1.  Imaginem novamente o menu do exemplo acima, ele apresenta uma função para interação em “swipe” em telas Touch. Então chamamos a função, atribuindo em todas a classes `.nav-aside`:

    ````
    $('.nav-aside');
    ````

2.  Porém, em uma das páginas. O menu apresenta o mesmo estilo, mas não deveria ter essa funcionalidade de swipe. Poderíamos atribuir a interação a um #id e adicionar o id nos elementos que devem apresentar esse comportamento.

    ````
    $('#nav-touch');
    ````

3.  Para complicar mais, esse menu aparece duas vezes em outra página, porém como sabemos, não podemos repetir um #id na mesma página. E fazer a chamada para cada #id separadamente também não é uma solução adequada.

    Poderíamos então usar uma classe sem estilo, que serviria somente para a chamada no Javascript, algo como:

    ````
    $('.js.nav-touch');
    ````

    Essa é uma solução viável e funcional, mas manter as classes apenas para estilização no CSS seria mais elegante.

4.  Então finalmente, podemos usar o [data-*] para isso.

    ````
    $('[data-toggle="nav-touch"]');
    ````

    Dessa forma, basta adicionar [data-toggle="nav-touch"] ao elemento que deve apresentar esse comportamento.


### Através de CSS...

E claro, também é possível manipular os Data Atributes através de CSS, portanto, podemos adicionar animações ou algum estilo específico:

````
.nav-aside[data-toggle="nav-touch"] {
  ...
}
````

## Na prática!

Para mostrar em funcionamento, criei uma base de código bem rápida (peço que desconsiderem a qualidade do mesmo :p) e imaginei o seguinte cenário:

1.  Uma página que vai apresentar dois menus idênticos visualmente
2.  Um deles servirá como filtro para tags usando um plugin de "tabs"
3.  O outro será um menu comum com link para outras páginas

### Em funcionamento:

<iframe width="100%" height="500" src="http://jsfiddle.net/LFeh/5Qr7b/2/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Ou seja, para ativar o plugin de "tabs", simplesmente usei `[data-toggle="tab"]`, evitando assim atrelar o plugin na classe de estilo `.nav` ou adicionar uma classe extra apenas para chamar a função.

## E a performance?

Fazendo um pequeno teste no [jsPerf](http://jsperf.com/long-selectors-vs-data/17), podemos observar que:

- Seletor `.classe` apresenta de longe o melhor resultado, com uma média de **130.000** operações por 0,063 segundos
- Seletores `[data-*]` são até 88% mais lentos do que os de `.classe`, com uma média de 'apenas' **18.000** operações por 0,063 segundos

## Conclusão

Usar o `[data-*]` para separar estilização e comportamento é uma solução bastante elegante e funcional. Se bem utilizada, acredito em um ganho importante de escalabilidade nos componentes.

Porém existem problemas com relação a performance. Uma diferença negativa de 88% com relação aos seletores `.classe` não é algo que deve ser ignorado.

Como em todos os projetos, vale uma análise prévia. Acredito que apenas em aplicações realmente grandes essa diferença seria notada. Portanto minha indicação seria de usar sem medo em projetos menores, e realizar testes para verificar o impacto na performance de projetos maiores.
