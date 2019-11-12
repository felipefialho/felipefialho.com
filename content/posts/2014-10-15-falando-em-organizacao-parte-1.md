---
title: "Falando em organização de código"
date: 2014-10-15 00:00:01
description: "O Universo, é um lugar desconcertantemente grande, um fato que, para continuar levando uma vida tranquila, a maioria das pessoas tende a ignorar"
tags: ["workflow"]
---

Já escrevi alguns artigos que mostram um pouco da metodologia que eu estava utilizando, são eles:

- [Sobre organização de componentes com pré-processadores](/blog/sobre-organizacao-de-componentes-com-pre-processadores)
- [Um conto sobre componentização e quebra de paradigmas](/blog/um-conto-sobre-componentizacao-e-quebra-de-paradigmas)
- [Utilizando o Bootstrap de forma consistente](/blog/utilizando-o-bootstrap-de-forma-consistente)

O fluxo de trabalho atual funcionou muito bem nos últimos 3 semestres (1 ano e meio), durante esse período fiz diversas modificações pontuais. Mas através da experiência adquirida nesse período, constatei possibilidade de melhorias profundas que poderiam trazer algumas vantagens no dia-a-dia:

- Velocidade de desenvolvimento
- Qualidade do código
- Escalabilidade
- Componentização
- Performance

## Mas... calma!

É impressionante o número de ferramentas que surgem todo dia nesse louco mundo front-end. Portanto, precisamos ter cautela.

A palavra equilíbrio funciona muito bem aqui. Não saia rejeitando todas as novidades ou você vai ter dificuldades para acompanhar a evolução do mercado, mas também não mude seu fluxo de trabalho toda vez que surgir uma ferramenta que você achou interessante.

Teste e estude bem todas as ferramentas que você considera que podem agregar no seu dia-a-dia, mas seja cauteloso antes de aplica-las em um projeto real.

## Automatizador de Tarefas

### Qual automatizador de tarefas utilizar? Grunt ou Gulp?

O Gulp se saiu muito bem nos testes que realizei, a diferença de velocidade com relação ao Grunt é absurda.

Mas ainda acho o Grunt mais adequado aos projetos que desenvolvo, portanto continuo usando o Grunt de forma "oficial", o que não impede a utilização do Gulp em algum projeto específico.

## Gerenciador de Dependências

### O uso de um gerenciador de dependências poderia facilitar a atualização e manutenção dos plugins?

Após alguns testes observei que o Bower se tornaria um importante aliado.

Todas as dependências externas utilizadas ficam registradas em um arquivo .json, dessa forma fica mais fácil ver quais estão sendo utilizadas no projeto. E facilita a atualização, exclusão e inclusão de novas dependências no seu projeto.

O Bower se mostrou uma importante ferramenta na busca de organização e escalabilidade.

## Organização dos arquivos JavaScript

Ao usar o Bower, uma pasta chamada `bower_dependencies` é adicionada na raiz do projeto, e lá ficam todas as dependências externas.

### Sobre as pastas

- Os arquivos de dependências externas, são chamados diretamente da pasta `bower_dependencies` que está na raiz.
- Scripts desenvolvidos para suprir as necessidades do projeto, ficam dentro de uma pasta de desenvolvimento, por exemplo, `assets/js`

### Sobre o 'Gruntfile'

- O plugin [Concat](https://github.com/gruntjs/grunt-contrib-concat) é usado para concatenar os scripts de dependencias externas, afinal, a ideia é que eles fiquem inalterados.
- Esse arquivo concatenado é injetado dentro da pasta de desenvolvimento do JavaScript (ex, `assets/js`) e não deve ser alterado.
- Os scripts de desenvolvimento que estão dentro desta pasta podem ser alterados a qualquer momento. Portanto observo através do [Watch](https://github.com/gruntjs/grunt-contrib-watch) qualquer alteração feita neles.
- E então todos os scripts serão minificados em tempo real pelo [Uglify](https://github.com/gruntjs/grunt-contrib-uglify),

### Integração com o Bower

Lembram das dependências externas que serão concatenadas?

Também coloco o [Watch](https://github.com/gruntjs/grunt-contrib-watch) para observar meu Gruntfile, portanto toda vez que adiciono ou removo alguma dependência no array do [Concat](https://github.com/gruntjs/grunt-contrib-concat) e salvo o Gruntfile, é gerado um novo arquivo com as dependências atualizadas.

Esse é um ponto importante. O arquivo de 'vendor' com as dependências concatenadas não vai ser gerado o tempo todo, isso causaria sérios problemas de lentidão no Grunt. Ele só vai ser criado quando a gente adicionar (ou modificar/remover) um novo plugin no array do Concat, pois ao salvar o Gruntfile, tenho uma tarefa configurada no Watch para iniciar a tarefa de criação do 'vendor.js'.

O scripts que modificamos o tempo todo vão ser concatenados com esse arquivo de 'vendor.js' e em seguida minificado através do Uglify. Isso aumenta consideravelmente o desempenho do Grunt no tempo para gerar o novo arquivo.

### Exemplo de uso:

```js
// Task: Concat
// ---------------------------------
concat: {
  vendor: {
    src: [
      // Vendor Plugins
      'bower_components/jquery/dist/jquery.min.js',    // jQuery
      'bower_components/bootstrap/js/transition.js',   // Bootstrap - Animation
      'bower_components/bootstrap/js/alert.js',        // Bootstrap - Alert
      'bower_components/bootstrap/js/carousel.js',     // Bootstrap - Carousel
      'bower_components/bootstrap/js/tab.js',          // Bootstrap - Tabs
      'bower_components/bootstrap/js/modal.js',        // Bootstrap - Modal
    ],
    dest: 'dev/assets/js/_vendor.js'
  }
},

// Task: Uglify
// ---------------------------------
uglify: {
  dev: {
    files : {
      'public/assets/js/scripts.min.js': [
      'dev/assets/js/_vendor.js',    // Vendor Scripts
      'dev/assets/js/functions.js',  // Functions
      'dev/assets/js/main.js'        // General
      ]
    }
  }
},

// Task: Watch
// ---------------------------------
watch: {
  build: {
    files: [
      'Gruntfile.js'
    ],
    tasks: ['concat', 'uglify']
  }
}
```

Observem que gero um arquivo JavaScript chamado `_vendor.js` através do [Concat](https://github.com/gruntjs/grunt-contrib-concat), e nesse arquivo estão as dependências externas do bower. O `_vendor.js` só vai ser alterado caso seja necessário modificar essas dependências.

Os JavaScripts de chamadas e que são modificados frequentemente ficam dentro de uma pasta `/js` e são concatenados com o `_vendor.js` e minificados através do [Uglify](https://github.com/gruntjs/grunt-contrib-uglify).

E o segredo para essa integração funcionar é colocar o [Watch](https://github.com/gruntjs/grunt-contrib-watch) para rodar o [Concat](https://github.com/gruntjs/grunt-contrib-concat) e o [Uglify](https://github.com/gruntjs/grunt-contrib-uglify) toda vez que fizer alguma alteração e salvar o Gruntfile.

## O polêmico Boostrap

O Bootstrap está cada vez mais mamilos e no centro de discussões. Continuo achando que se [utilizado de forma consciente](/blog/utilizando-o-bootstrap-de-forma-consistente), pode ajudar bastante, especialmente no início do desenvolvimento.

Passei a deixar nos projetos apenas o que utilizo de fato:

- Os mixins
- Sistema de grid
- Componentes JavaScript (Carrossel, Collapse, Modal...) conforme necessário.

Os mixins acabo utilizando sempre (com mais alguns que criei baseados nas necessidades dos projetos que desenvolvo).

O sistema de grid e os componentes JavaScript, eu posso optar por utilizar ou não. A ideia é que as dependências se adaptem à minha necessidade, e não ao contrário.

Lembrando que na versão 3+ do Boostrap ficou muito fácil de utilizar os grids de forma semântica e sem precisar colocar classes para sujar o HTML, tudo é feito diretamente no CSS.

Quanto aos componentes JavaScript, é muito fácil customiza-los e alterar seu comportamento padrão, acho que trazem boa integração com outras bibliotecas e funcionam muito bem.

Atualmente essa é a participação do Boostrap nos meus projetos.

## Organização do CSS

Me aproximei de vez do [Atomic CSS](http://patternlab.io). Não sei se estou usando a metodologia da forma que ela foi pensada, mas me senti muito confortável com a organização atual.

E é disso que vou falar na ['Parte II' desse artigo](/blog/falando-em-organizacao-css). Vou desconstruir a organização e metodologia do CSS que estou utilizando.

;)
