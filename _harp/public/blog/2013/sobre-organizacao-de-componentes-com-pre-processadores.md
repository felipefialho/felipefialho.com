## Breve introdução

Na eterna dúvida entre usar SASS ou LESS, acabei optando por LESS. Não tenho uma explicação certa, mas acredito que foi pelo fato do [Bootstrap](http://twitter.github.io/bootstrap) (na qual baseei meu Framework) usar LESS (apesar de ter uma adaptação em SASS). O fato dele ser baseado em javascript também me agradou.

O SASS é mais robusto e tem plugins interessantíssimos como o Compass. O gerador de sprites dele é uma mão na roda e sinto falta disso no LESS.

De qualquer forma vou dar mostrar minha organização baseada nos testes que fiz durante o desenvolvimento do Framework usando LESS, o que não significa que não possa ser adaptado para qualquer outro pré-processador.

## Separação dos arquivos no Framework

Dentro da pasta `css` tenho a pasta `less` e nela separo meus arquivos em mais duas pastas: `bootstrap` e `framework`.

Explico a seguir:

- **bootstrap:** Ficam todos os ".less" do [Bootstrap](http://twitter.github.io/bootstrap). Deixo-os em uma pasta separadas. Não posso modificar os arquivos nesse momento. Me impediria de atualizar o Boostrap para novas versões.
- **framework:** Adiciono novos componentes e "estendo" os componentes do Bootstrap. Qualquer modificação nos módulos padrões do Framework é feita nessa pasta.

## Separação dos arquivos nos projetos

Agora imaginem que chegou um novo projeto e já fizemos toda a avaliação dos componentes que serão usados (vou explicar esse fluxo em outro artigo):

1.  Copio os arquivos base do Framework para meu novo projeto.
2.  Dentro da pasta **less**, crio uma pasta chamada **components**.
3.  Nela adiciono todos os componentes que vou utilizar. Tanto da pasta **bootstrap** quanto da pasta **framework**.
4.  Dentro dessa pasta posso modificar qualquer “.less" (já que não vou atualizar o Bootstrap nos projetos em andamento) e é onde adiciono novos componentes específicos do projeto.
5.  Costumo também “mesclar” as extensões do Framework aos componentes do Bootstrap, além de é claro, limpar qualquer código desnecessário (costumo deixar para o final).

Na raiz da pasta `less` crio mais dois arquivos: `project.less` e `style.less`. Explico na sequencia:

- **project.less:** Coloco tudo que não se encaixa em "componente", detalhes especificos de cada página, entre outras coisas.
- **style.less:** É onde chamo todos os ".less" e peço para gerar um "style.css". Todos os componentes (e também o project.less) que estou utilizando são chamados nesse arquivo.

A estrutura final da pasta `less` fica assim:

![Organização final](/assets/img/blog/organizacao-less.jpg)

Pode ter uma ideia de como organizo os arquivos acessando o [fork do meu site.](https://github.com/LFeh/Website/tree/master/src/files/css/less) Já fiz várias melhorias de lá pra cá, mas o principio segue o mesmo.

## Para gerar o CSS

Hoje uso o [Grunt para fazer essa tarefa](https://github.com/LFeh/Grunt-Base/blob/master/Gruntfile.js).

Escrevi esse artigo, após alguns amigos (@raphaelfabeni foi um deles) perguntarem sobre como costumo organizar os arquivos usando pré-processadores. Espero que contribua de alguma forma.
