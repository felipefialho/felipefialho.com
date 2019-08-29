---
title: "Um conto sobre componentização e quebra de paradigmas"
date: 2013-07-29 00:00:01
description: "Melhorar processos é parte essencial do nosso trabalho, mas em algum momento percebemos que só melhorar pode não ser o suficiente, as vezes é preciso quebrar paradigmas"
tags: ["workflow"]
---

Não, você não é apenas um "mero desenvolvedor", você está no centro de mudanças importantes no nosso mercado e pode influenciar positivamente esse cenário.

## O processo padrão

Na maioria das vezes, essas são as etapas resumidas de um projeto...

1. São criados Wireframes (geralmente pelo Diretor de Arte ou por alguém focado nessa parte)
2. Em seguida o Diretor de Arte cria PSD's para TODAS as páginas, não é incomum uns 40 PSD's serem criados.
3. O desenvolvedor Front-End cria HTML's e os estilos para todas as páginas e interações.
4. Então o desenvolvedor Back-End coloca "vida" no projeto.

Inclusive em alguns casos praticamente não existe contato entre os integrantes do projeto.

Mas... será que não é hora de mudar os conceitos?

## Os tempos são outros...

Em algum momento, observei que receber 40 PSD's simplesmente não fazia sentido, tanto para mim quanto para o Diretor de Arte. Um projeto bem diagramado mantém caracteristicas praticamente iguais entre as páginas e na maioria dos casos apresentam os mesmos **componentes**.

Cheguei a conclusão que seria muito mais lógico trabalhar os **componentes** de forma isolada, e usar eles nas páginas de acordo com a necessidade.

## A importância do trabalho em equipe

De nada adianta ter idéias para melhorar o processo e não tentar coloca-las em prática e ouvir sugestões do resto da equipe.

Uma mudança como essa impacta diretamente nas outras áreas, afinal o Diretor de Arte vai precisar se adaptar a nova forma de trabalhar e o pessoal do Back-End terá que programar os componentes "separadamente".

Portanto é extremamente necessário debater as idéias para chegar em um processo que fique bom para todos. Todas as áreas querem a mesma coisa: entregar projetos cada vez melhores. Uma troca de idéias para deixar as coisas alinhadas é muito importante para garantir uma boa entrega.

Trabalho com pessoas muito competentes e inovadoras do meu lado, então as coisas fluiram naturalmente.

## A criação de um Framework

A estrutura HTML/CSS/JS dos componentes geralmente seguem linhas de código parecidas, mesmo quando são visualmente muito diferentes de um projeto para outro, então a criação de um Framework otimizaria muito o trabalho.

Após alguns meses e bastante teste, cheguei em um modelo estrutural e organizacional que considero o ideal por enquanto, podem ver nesse artigo: [Sobre organização de componentes com pré-processadores](/blog/sobre-organizacao-de-componentes-com-pre-processadores)

### Como trabalho nesse momento

É um resumo do resumo do processo que estamos seguindo (e que está sempre em estado 'beta')...

1. Todos os envolvidos participam com o Diretor de Arte no desenvolvimento dos Wireframes.
2. Fazemos um levantamento dos componentes que serão utilizados no projeto.
3. Diretor de Arte cria layouts base (home e algumas internas) para aprovação e em paralelo trabalha nos componentes.
4. Desenvolvo a estrutura base do site (header, footer...).
5. Agora já tenho todo o aparato para trabalhar os componentes e pensar em escalabilidade.
6. Com a estrutura básica e os componentes prontos, montar prótotipos funcionais passa a ser um "quebra-cabeça", basta juntar as peças e a página está criada!
7. Nessa etapa o Diretor de Arte, na maioria dos casos, trabalha apenas nos Wireframes ou rascunhos.
8. Faço validações com o Diretor de Arte e com o Back-End após cada página desenvolvida.
9. Nas etapas mais avançadas do projeto, o programador Back-End já consegue sozinho criar páginas com os componentes necessários sem precisar alterar nada no HTML/CSS.

## Atomic Design

Esse ano descobrimos que o [Brad Frost](https://twitter.com/brad_frost) escreveu sobre algo que chamou de [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design), que tem uma idéia muito parecida com a que estavamos usando, e ela vai ainda mais a fundo, trabalhando com:

- **Átomos**: Elementos mínimos
- **Moléculas**: Junção desses elementos
- **Organismos**: Agrupamento dessas móleculas

Existem dois ótimos artigos em português, um do [Fabricio Teixeira](http://arquiteturadeinformacao.com/2013/06/16/atomic-design-redesenhando-os-entregaveis-de-designers-e-desenvolvedores) e outro da [Dani Guerrato](http://tableless.com.br/o-que-e-design-atomic/#.UfLPotK1zIg). Recomendo a leitura.

## Dicas para trabalhar os componentes

### OOCSS

**OOCSS** (Object Oriented CSS) casa perfeitamente com a idéia de componentes, você passa a criar classes baseadas na função, e pode reutilizar em vários lugares. Tem um post muito bacana do [William Bruno falando sobre isso](http://wbruno.com.br/css/object-oriented-css-a-teoria-das-classes-reutilizaveis-oocss).

Mas CUIDADO, é preciso usar essa técnica com prudência, algo como `"box full side"` faz sentido, mas `"box big float-left font18 red border"` engessa o código.

### Pense na manutenção (sem esquecer da performance!)

Performance é fundamental, mas não se esqueça que um código que não tem foco em manutenção e escalabilidade pode gerar gambiarras que automaticamente vão interferir na performance.

Então, pense sempre um passo a frente, especialmente em grandes projetos.

### Evite seletores complexos

Um seletor `.header .nav li a` é ruim para performance e te deixa travado.

Colocar uma classe `.nav-link` no `a` e referenciar diretamente no CSS faz mais sentido.

Esse é o principio básico para componentização, usar a classe de forma mais genérica possível. Se você tiver uma busca no site, comece a usar `.search` ao invés de `.header .search`, assim pode usar o **componente** em qualquer lugar, não apenas dentro do `header`.

### Aproveite a cascata

**CSS** significa Cascading Style Sheets e podemos (e devemos) fazer uso disso.

Se por exemplo, a cor dos h4 dentro de determinado local precise ser azul, é interessante adicionar uma classe na div pai, e sobrescrever as regras (reparem que uso a classe blue de exemplo, analise antes e veja o nome que faz mais sentido): `.box.blue h4{color: #4A8CF7}`

## No fim tudo depende do projeto e da equipe

São apenas sugestões de um método que estamos usando e que está dando certo. Mas como tudo no mundo dev, depende muito do tipo de projeto e com quem você trabalha. Espero que ajude de alguma forma.

Abraços galera!
