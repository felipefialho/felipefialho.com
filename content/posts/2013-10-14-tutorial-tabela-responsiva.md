---
title: "Tutorial - Tabela Responsiva"
date: 2013-10-14 00:00:01
description: "Em layouts responsivos, um dos componentes que sempre me incomodava eram as tabelas. Nesse artigo vamos tentar contornar esse problema"
tags: ["css"]
---

Por algum tempo usei (e até contribui) com um ótimo plugin chamado [Footable](http://bit.ly/17CGaeG), ele adiciona funcionalidades bem legais nas tabelas e ajuda a resolver um pouco desse problema.

Mas nunca considerei uma solução definitiva, não gostava de depender de JavaScript para resolver essa questão e comecei a vasculhar outras soluções.

## Primeira técnica

### Sobre

Cheguei nessa solução através [desse artigo](http://elvery.net), que mostra algumas demos de tabelas funcionais e responsiva. Após aplicar e comprovar a eficácia dessa técnica, descobri que a [Globo.com](http://www.globo.com) também está usando.

Ela consiste em inverter a posição do `thead` e posicionar o `tbody` na sua direita.

A demo funcional está no Codepen(redimensione o navegador para visualizar o efeito).

https://codepen.io/felipefialho/pen/hsreD

### No HTML

Observem que adiciono duas classes. A classe responsável pelo efeito é `table-responsive`, gosto de separar dessa forma e não deixar "genérico", pois consigo definir quais tabelas vão ter esse comportamento.

### No CSS

A primeira parte do bloco, trata apenas de estilos, vou pular diretamente para o efeito.

```css
@media (max-width: 767px) {

```

Adiciono essas configurações apenas para resoluções de até 767px.

```css
.table-responsive {
  display: block;
  position: relative;
  width: 100%;
}

.table-responsive thead,
.table-responsive tbody,
.table-responsive th,
.table-responsive td,
.table-responsive tr {
  display: block;
}
```

Tabela funcionando como um bloco.

```css
.table-responsive td,
.table-responsive th {
  height: 35px;
}
```

Defino um tamanho para as células.

```css
.table-responsive thead {
  float: left;
}
```

A "mágica" é feita aqui, o `thead` é “flotado” para esquerda.

```css
.table-responsive tbody {
  width: auto;
  position: relative;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
}
```

Assim como definimos que o `tbody` terá um scroll horizontal quando não comportar todo o conteúdo. Além disso, é importante colocar `-webkit-overflow-scrolling: touch` para pleno funcionamento em alguns dispositivos touch.

```css
.table-responsive tbody tr {
  display: inline-block;
}
```

Por último, posicionamos as linhas lado-a-lado, isso causa o efeito que desejamos.

## Segunda técnica

Essa solução foi inspirada no funcionamento do [Gmail](http://www.gmail.com) para dispositivos menores.

Funciona bem para tabelas que exigem por exemplo, um check. Ele agrupa as informações.

Pode ser útil principalmente em CMS ou Gerenciadores.

A demo funcional está no [CodePen](http://codepen.io/felipefialho/pen/beEoG) (redimensione o navegador para visualizar o efeito).

https://codepen.io/felipefialho/pen/beEoG

### No HTML
 
Assim como no exemplo anterior, uso uma classe apenas para aplicar o efeito, no caso `.table-action`.

### No CSS

```css
@media (max-width: 480px) {

```

Adiciono essas configurações apenas para resoluções de até 480px.

```css
.table-action thead {
  display: none;
}
```

Retiro o head ta tabela.

```css
.table-action tr {
  border-bottom: 1px solid #dddddd;
}
.table-action td {
  border: 0;
}
```

Mudo o posicionamento das bordas, para causar o efeito que necessito.

```css
.table-action td:not(:first-child) {
  display: block;
}
```

Por último... aviso que todas as `td`, com exceção da primeira, será um bloco, dessa forma vão se alinhar uma embaixo da outra.

É isso pessoal, espero que ajude vocês com algum projeto responsivo que necessite de tabelas. Grande abraço!
