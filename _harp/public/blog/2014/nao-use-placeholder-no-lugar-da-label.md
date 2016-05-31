## Label x Placeholder

O `<label>` deve ser utilizado como rótulo de um campo de formulário e deve ser sempre utilizado. Já o `<placeholder>` passa informações complementares sobre o campo antes do usuário digitar e seu uso é opcional.

O problema é que tem sido muito comum encontrar formulários que utilizam apenas o `<placeholder>`.

Essa prática é muito ruim, pois além de não ser semântico, já que o `<placeholder>` não funciona como rótulo, ainda trás problemas de acessibilidade. Leitores de tela, por exemplo, podem não ser capazes de passar a informação corretamente.

Além disso, em um formulário grande, o usuário pode ficar confuso, já que o comportamento padrão do `<placeholder>` é sumir após o usuário clicar.

Uma boa forma de contornar esse problema, é adicionar uma `<label>`, fora do campo. Mas muitas vezes nos deparamos com projetos que necessitam de um texto dentro do campo, e nesse caso vou passar uma boa solução para vocês.

## A Solução

<p data-height="400" data-theme-id="light" data-slug-hash="ijBDF" data-default-tab="result" data-user="LFeh" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/LFeh/pen/ijBDF/">Table Responsive</a> by Luiz Felipe Tartarotti Fialho (<a href="http://codepen.io/LFeh">@LFeh</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Observem, que ao clicar sobre o campo, a `<label>` muda de posição e permanece sempre visível. Essa solução usa apenas CSS e é muito simples de ser implementada:

### HTML

````
<div class="form-item">
  <input class="form-control" id="name" name="name" type="text" required>
  <label class="label-float" for="name">Nome</label>
</div>
````

Uma marcação básica, apenas adicionei a `<label>` logo após o campo relacionado.

### CSS

````
.form-item {
  position: relative;
}
````

Deixo o `.form-item` como relativo, para os filhos absolutos se posicionarem a partir dele.

````
.form-control {
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid @gray-light;
  color: @gray;
  font-size: 16px;
  display: block;
  height: (@space * 1.5);
  padding: (@space / 2) (@space / 2) 0;
  width: 100%;

  &:valid {
    border-color: @green;
  }

  &:focus  {
    border-color: @blue;
  }
}
````

Uma estilização bem simples de um campo de formulário.

````
.label-float {
  color: @gray-light;
  position: absolute;
  top: 0;
  line-height: (@space * 1.5);
  padding: 0 (@space / 2);
  .transition(line-height linear .2s);
  cursor: text;

  .form-control:focus + &,
  .form-control:valid + & {
    color: @gray-light;
    font-size: 12px;
    line-height: 1.5;
  }
}
````

E aqui a mágica acontece.

Primeiramente deixamos o elemento `absolute` e `top: 0` para ficar posicionado em cima do campo e no topo como base.

Em seguida definimos o `line-height` igual ao do campo de formulário para que fique centralizado. Adicionamos ainda um `transition` no `line-height` para que faça uma transição animada.

Agora definimos que quando o `.form-control` irmão for `:valid` ou `:focus` ele terá uma cor mais clara, uma tamanho de fonte menor e ai o `line-height` alterado, assim ele ficará posicionado próximo do topo e não mais centralizado.

## Uso real

Utilizei essa abordagem em um projeto recente, e vocês podem ver o [resultado aqui](http://trendi.com.br/contato/).

Mostrei apenas uma abordagem padrão de uso, partindo do mesmo conceito é possível criar vários tipos interação, use de acordo com a necessidade do projeto.

## Referencias

A seguir algumas referencias sobre o mesmo assunto / abordagem:

- [http://www.pardot.com/faqs/best-practices/placeholders-and-labels/](http://www.pardot.com/faqs/best-practices/placeholders-and-labels/)
- [http://css-tricks.com/float-labels-css/](http://css-tricks.com/float-labels-css/)
- [http://bradfrostweb.com/blog/post/float-label-pattern/](http://bradfrostweb.com/blog/post/float-label-pattern/)
- [http://mozmonkey.com/2013/12/good-ux-for-placeholders-as-field-labels/](http://mozmonkey.com/2013/12/good-ux-for-placeholders-as-field-labels/)

Até mais!
