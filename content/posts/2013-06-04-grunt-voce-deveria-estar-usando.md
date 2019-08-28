---
title: "Grunt - Você deveria estar usando"
date: 2013-06-04 00:00:01
description: "Dessa vez vou explicar as tarefas que atualmente estou utilizando para automatizar meu trabalho"
image: /assets/2013-06-04-grunt-voce-deveria-estar-usando.jpg
tags: ["javascript"]
---

### O projeto

Como sempre, deixei a base que estou utilizando no [Github](https://github.com/felipefialho/Grunt-Base), forka lá se quiser usar.

### As tarefas

#### [Clean](https://github.com/gruntjs/grunt-contrib-clean)

```js
clean: {
  dist: {
    src: ["dist/"]
  }
},
```

Limpo a pasta de distribuição.

#### [Copy](https://github.com/gruntjs/grunt-contrib-copy)

```js
copy: {
  dist: {
    files: [
      {
        expand: true,
        cwd: 'dev/',
        src: [
          '**',
          '*.{md,txt,htaccess}',
          '!assets/css/less/**',
          '!assets/js/site/**'
        ],
        dest: 'dist/',
        dot: true
      }
    ]
  }
},
```

Copio os arquivos necessários para rodar o projeto para a pasta de distribuição, observem que excluo `!` alguns arquivos (less, plugins, etc...) pois são desnecessários na versão final, já que ficarão concatenados e minificados depois.

#### [Uglify](https://github.com/gruntjs/grunt-contrib-uglify)

```js
uglify: {
  options: {
    mangle : false
  },
  dist: {
    files : {
      'dist/assets/js/scripts.min.js' : [

      ]
    }
  },
  dev: {
    options: {
      beautify : true
    },
    files : {
      'dev/assets/js/scripts.min.js' : [

      ]
    }
  }
},
```

Aqui concateno/minifico os scripts. Reparem que crio duas versões, **dist** e **dev**, isso porque na versão de desenvolvimento deixo o debug ativado através da opção `beautify`. Adiciono todos os plugins que vou usar no projeto.

#### [Less](https://github.com/gruntjs/grunt-contrib-less)

```js
less: {
  dist: {
    options: {
      paths: ["dev/assets/css/less"],
      yuicompress: true,
      compress: true
    },
    files: {
      "dist/assets/css/style.css": "dev/assets/css/less/style.less"
    }
  },
  dev: {
    options: {
      paths: ["dev/assets/css/less"]
    },
    files: {
      "dev/assets/css/style.css": "dev/assets/css/less/style.less"
    }
  }
},
```

Transformo os arquivos LESS em CSS. O mesmo caso da tarefa anterior, crio duas versões, pois na versão **dev** não minifico o CSS. Reparem que aponto para o **style.less**, porque é nele que chamo todos os componentes.

#### [HTMLMin](https://github.com/gruntjs/grunt-contrib-htmlmin)

```js
htmlmin: {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: [{
        expand: true,
        cwd: 'dev/',
        src: '*.html',
        dest: 'dist/',
    }],
  }
},
```

Minifico o HTML.

#### [ImageMin](https://github.com/gruntjs/grunt-contrib-imagemin)

```js
imagemin: {
  dist: {
    options: {
      optimizationLevel: 3
    },
    files: [{
        expand: true,
        cwd: 'dev/',
        src: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
        dest: 'dist/',
    }],
  }
},
```

Um dos plugins mais interessantes. Aqui comprimimos as imagens, sem perder qualidade. Fundamental para qualquer projeto.

#### [Watch](https://github.com/gruntjs/grunt-contrib-watch)

```js
watch: {
  dev : {
    files : [
      'dev/**/*.{less,js}',
      'Gruntfile.js'
    ],
    tasks : [ 'uglify:dev', 'less:dev']
  }
}
```

Pedimos para o Grunt "olhar" as modificações e iniciar determinada tarefa. No caso peço para ele observar qualquer alteração nos arquivos .less, .js e no arquivo base do Grunt. Dessa forma ele realiza as tarefas em tempo real.

#### Comandos para executar

```js
// Dev
grunt.registerTask( 'dev', ['uglify:dev', 'less:dev'] );

// Build
grunt.registerTask( 'build', [ 'clean', 'copy:dist',
'uglify:dist', 'htmlmin:dist', 'imagemin:dist', 'less:dist' ] );

// Watch
grunt.registerTask( 'w', [ 'watch' ] );
```

Uso `grunt dev` para compilar a versão de desenvolvimento e `grunt build` para compilar a versão de distribuição. Observem que algumas ações executo apenas na versão final. Para o Grunt "olhar" o projeto rodo `grunt w`.

### Conclusão

Como viram, você pode adaptar o Grunt exatamente as suas necessidades.

É possível fazer otimizações em todos os níveis. Ou seja, você vai otimizar seu desenvolvimento e ganhar mais produtividade (afinal, não vai precisar repetir tarefas desnecessariamente) e vai otimizar o projeto em sí, já que através de um comando terá CSS, JavaScript, imagens e HTML mais leves.

Uma tarefa, que tentei vários plugins e não consegui achar um que considero ideal é **gerar sprites**, sei que tem o Compass para o Grunt, mas não queria usar SASS apenas para gerar sprites. Se alguém tiver uma solução ou usa algum plugin bacana... sou todo ouvidos.

O objetivo desse artigo é atiçar a criatividade de quem ainda não está familiarizado com o Grunt, e não servir de tutorial. De qualquer forma, espero que tenha sido útil. É nóis.

