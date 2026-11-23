---
title: 'O gargalo mudou de lugar: hora de rever produto, processo e decisão'
date: 2026-11-06 00:00:01
description: 'Escrever código ficou rápido, mas manter e escalar um produto continua caro. E quando qualidade e velocidade param de competir, o maior risco passa a ser perder o timing ⏱️'
tags: ['arquitetura', 'produto', 'ai', 'design system', 'front-end']
---

Escrever código nunca foi tão rápido. Uma tela, um fluxo, uma feature inteira sai em uma fração do tempo que saía há dois anos

Só que o custo de um produto nunca esteve só no código. **Manter, evoluir e escalar continua caro**, e em alguns casos ficou até mais caro, porque agora dá pra criar muito mais coisa pra manter

Essa diferença muda o peso das decisões. Quando construir era caro, o próprio custo de construir freava as decisões ruins. Agora que esse custo despencou, o freio sumiu, e quem precisa fazer essa conta é justamente quem decide o caminho

Então esse post é sobre isso: por que decisão de arquitetura virou cada vez mais decisão de produto, por que o maior risco hoje é perder o timing, e um exemplo que eu conheço bem: design system em time pequeno

## O que deixou de ser gargalo e o que continua caro

Vale separar as duas coisas, porque é fácil misturar

**Deixou de ser gargalo:**

- Escrever um componente, uma tela, um endpoint
- Duplicar e atualizar código seguindo padrões
- Prototipar uma ideia até ela ficar funcional
- Refatorar algo que tem teste cobrindo
- Criar o MVP de produto novo

**Continua caro:**

- Perder o timing da entrega
- Coordenar times, versões e releases
- Desfazer uma decisão que já se espalhou pelo produto
- Manter uma abstração compartilhada entre vários consumidores
- Construir a coisa errada, colocar em produção e só depois descobrir

Repara que a segunda lista é quase toda sobre decisão, não sobre código. O LLM escreve a abstração em minutos, mas não paga o custo de manter ela viva por anos, especialmente quando essa abstração é fortemente acoplada e simplesmente jogar fora nem sempre é simples

## Qualidade e velocidade pararam de competir

Durante muito tempo a conversa foi um cabo de guerra: ou entrega rápido, ou entrega bem feito. Arquitetura servia muito mais pra proteger a qualidade de um time que precisava correr e a direção que o produto deveria escalar

Isso mudou

Hoje dá pra montar mecanismos que garantem qualidade sem travar a esteira: spec antes do código, testes que o próprio agent precisa fazer passar, regressão visual, reviewers automáticos. Escrevi sobre isso no [harness que faz o agent provar que acertou](/blog/ai-first-e-loop-agentico-o-harness-que-faz-o-agent-provar-que-acertou) e no [code review artesanal não escala mais](/blog/code-review-artesanal-nao-escala-mais-e-o-que-fazer-no-lugar)

Quando a qualidade é garantida por um processo mecânico, ela deixa de ser o argumento pra ir devagar

E aí fica a uma nova pergunta que importa demais: **o que a gente perde esperando?**

### O risco agora é o timing

Se o seu concorrente constrói tão rápido quanto você, a vantagem não tá mais em quem escreve código melhor. Tá em quem valida mais rápido, ajusta mais rápido e chega primeiro com a coisa certa

Uma decisão de arquitetura que adiciona duas semanas de setup, um ciclo de release a mais ou uma dependência entre times custa exatamente isso: semanas em que o produto não tá na mão do usuário. Antes esse custo se diluía no tempo que tudo levava. Hoje ele aparece, porque todo o resto ficou rápido

Não é sobre fazer gambiarra pra chegar antes. É sobre **não pagar por estrutura que o produto ainda não precisa**, justamente porque agora dá pra manter qualidade sem ela

### O processo também precisa acompanhar

E não é só arquitetura. A mesma conta vale pro jeito como o time trabalha

Scrum, modelo Spotify e bla bla bla: muito do que a indústria tech adotou como receita pronta já pedia revisão bem antes da AI. Planning que dura a manhã inteira, refinamento que não refina, retro que não muda nada, squad, tribo e guilda copiados sem contexto (num cenário que nem a própria Spotify funcionava daquele jeito, [como contou quem trabalhou lá](https://www.jeremiahlee.com/posts/failed-squad-goals/))

Muita energia indo pra ritos e pouca sobrando pra evolução do produto

Enquanto uma feature levava semanas, o custo desses ritos se diluía no tempo de construir. Agora que ela sai em horas, ele aparece: o planejamento pode levar mais tempo do que a própria entrega

E parte da complexidade que saiu do código foi parar justamente nas etapas de decisão e validação. Rito que ajuda a decidir e validar mais rápido continua valendo. Rito que só existe porque sempre existiu e ninguém parou pra pensar porque, vira gargalo

O curioso é que o lean startup sempre foi sobre isso: colocar a ideia na mão do usuário cedo, aprender com ela e ajustar

Em algum momento a indústria transformou a ideia em camadas e camadas de burocracia, e agora o cenário ajuda a voltar pra ela. Só que isso exige coragem pra rever conceitos e desapegar de práticas que não funcionam mais

**Processo que não ajuda o produto a chegar no usuário nem protege quem usa é só dinheiro indo pelo ralo**

## Dev pensando como alguém de produto

Isso empurra o dev pra um lugar que antes era mais de produto

Já comentei no post sobre [o front-end em 2025](/blog/como-esta-o-desenvolvimento-frontend-em-2025-e-o-que-esperar-do-futuro) que entender o impacto das decisões no negócio e a relação de custo e retorno do que é desenvolvido ia pesar cada vez mais

E realmente pesou, até mais do que eu previa

Na prática, antes de qualquer decisão estrutural eu tento responder algumas perguntas:

- **Quem paga a manutenção disso daqui a dois anos?** Não quem constrói, quem mantém
- **Quanto tempo isso adiciona até o usuário ver alguma coisa?**
- **Dá pra desfazer?** Decisão reversível pode ser tomada rápido, irreversível ou com alto custo de correção, merece mais cuidado
- **O problema que isso resolve ainda é caro hoje?** Muita solução clássica existe pra um custo que AI já derrubou
- **Dá pra chegar no mesmo resultado gastando menos?**

A quarta pergunta é a que mais tem me feito rever conceitos. E o melhor exemplo que eu tenho é design system

## Exemplo: design system em time pequeno

Já ajudei a criar design system mais de uma vez, e os dois seguiram o mesmo modelo: lib de componentes versionada, com documentação no Storybook (embora já existissem caminhos mais decentralizados, também custam muito caro pra manter, inclusive a nível de infra)
 
Nos dois casos a lib era consumida por cerca de 3 ou 4 aplicações e mantida pelo próprio time que entregava produto. Não existia um time de design system, existia o mesmo time de sempre cuidando da lib entre uma feature e outra

### Essa decisão já era arriscada antes

No [post de 2020](/blog/design-system-venice-e-as-pecas-do-lego) eu citei uma frase que continuo concordando tantos anos depois:

> design system é um produto que deve servir outros produtos

E é justamente ela que explica o custo

Se é um produto, precisa do que qualquer produto precisa: alguém dono, roadmap, suporte, documentação e gente cuidando em tempo integral

Numa empresa grande, com muitos times e muitos produtos em cima da mesma base, um time dedicado de design system se paga com folga. O custo se divide entre todos os consumidores, cada time de produto deixa de reinventar o próprio Button e a consistência entre marcas e produtos vira um problema real que alguém precisa resolver

Agora numa empresa com 3 ou 4 aplicações e nenhum time dedicado, a conta sempre foi apertada

Isso não é novidade de AI

A lib vira trampo paralelo competindo com o que coloca dinheiro na mesa, e quando a prioridade aperta, e ela sempre aperta, a lib fica pra depois

### O custo que não aparece no código

Escrever o componente nunca foi o problema, já era assim antes

O caro é **manter a lib viva**

Toda lib publicada precisa de versão, e toda versão precisa de cuidado. Mudou o espaçamento interno do Input? É patch, minor ou major? Quem tá na versão antiga vai quebrar? E cada projeto consumidor fica numa versão diferente: um na 3.2, outro travado na 2.8 porque a 3.0 mudou a API do Modal, e o terceiro nem lembra por que fixou a versão

Aí vem o custo de timing. O projeto precisa de um ajuste pequeno, tipo um estado de loading no Button. Só que o Button mora na lib. Então o fluxo vira: abrir PR na lib, esperar review, publicar versão nova, atualizar a dependência no projeto e só aí seguir com a task. Um detalhe de 10 minutos atravessa dois repositórios e às vezes dois times

E quando a lib é mantida pelo mesmo time que entrega produto, a release da lib compete com a entrega do produto. Adivinha quem perde 😅

Pra fugir desse ciclo, a lib começa a aceitar tudo. Cada projeto pede uma variação, cada variação vira uma prop, e surge aquele Button com mais props do que o formulário inteiro:

```ts
// The component every shared lib ends up with
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  loadingText?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  iconOnly?: boolean
  fullWidth?: boolean
  rounded?: boolean
  uppercase?: boolean
  as?: 'button' | 'a' | 'div'
  href?: string
  tooltip?: string
  // and the one prop only a single project uses
  legacyCheckoutStyle?: boolean
}
```

Cada prop é uma combinação a mais pra testar, documentar e manter compatível

Já falei disso no post sobre [abstrações que matam a escalabilidade do código](/blog/abstracoes-tao-matando-a-escalabilidade-do-seu-codigo): abstração mal feita é pior que duplicação

### O que mudou: resolver os mesmos problemas custa menos

A lib nunca foi o objetivo. Ela era a melhor forma que a gente tinha de resolver alguns problemas:

- **Duplicação:** dez telas com o mesmo botão eram dez lugares pra corrigir o mesmo bug
- **Consistência:** design e código precisavam falar a mesma língua
- **Velocidade:** não reescrever cada componente em cada projeto

O que mudou é que hoje dá pra resolver boa parte disso por um custo bem menor, e isso precisa entrar na conta

**Duplicação deixou de ser o problema que era.** Com padrão escrito e teste em cada projeto, um LLM atualiza as cópias de um componente em minutos, e os testes de cada projeto garantem que nada quebrou. O argumento que sustentava a lib em empresa pequena era o custo da duplicação, e esse custo despencou

**Consistência pode vir de uma base, não de um pacote.** Em vez de uma lib, uma base de conhecimento única com tokens, componentes, exemplos de composição e regras de uso, escrita pra gente e pra AI conseguirem seguir. Hoje já dá pra juntar isso numa ferramenta como o [Claude Design](https://claude.ai/design), e uma skill do Claude Code sincroniza a base com cada projeto:

```css
/* Tokens synced from the shared base */
:root {
  --color-primary: oklch(55% 0.2 260);
  --color-danger: oklch(58% 0.22 25);
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --radius-control: 0.5rem;
}
```

E as regras ficam escritas do jeito que um agent consegue seguir:

```md
## Button

- One primary button per screen section
- Destructive actions use the danger variant and always ask for confirmation
- Icon-only buttons require an accessible label
- Never use a button for navigation, use a link
```

O componente mora no projeto, do jeito que ele precisa ser ali, sem Button genérico tentando atender todo mundo e sem release pra ajustar um detalhe. A consistência vem da base, e a regressão visual pega quando algo sai do padrão. **A mesma fonte, não o mesmo pacote**

**E a base serve mais gente do que a lib servia.** A lib atendia os projetos de front-end. A base atende também produto e design, que conseguem prototipar com AI a partir das mesmas peças que existem no código, validar com usuário e só mandar pra fila de dev o que já fez sentido

É o tipo de coisa que reduz o custo mais caro da lista lá de cima: construir a coisa errada

### A decisão continua sendo de contexto

Nada disso quer dizer que lib de design system morreu

Empresa grande com time dedicado, várias marcas em cima da mesma base ou design system público consumido por gente de fora continuam sendo cenários onde a lib se paga

O ponto é outro: numa empresa menor, a lib já era uma aposta arriscada, e agora existe uma alternativa que resolve boa parte dos mesmos problemas, custa menos pra manter e não coloca uma release no caminho de cada ajuste

Ignorar isso é tomar a decisão arriscada

## E tem outra coisa

Construir rápido não é construir de graça, então vale olhar os custos do outro lado também

- **Fácil de criar vira caro de manter.** Quando qualquer coisa sai em minutos, é fácil encher o produto de feature, tela e variação que alguém vai ter que manter. A pergunta "quem mantém isso?" vale ainda mais quando criar é fácil
- **Velocidade não é desculpa pra pular o processo.** O ganho de timing só existe se os mecanismos de qualidade estão lá. Sem teste, sem spec e sem guard rails bem estruturados, o que parece velocidade é só dívida chegando mais rápido
- **Base mal documentada gera erro com confiança.** No exemplo do design system, regra vaga faz a AI preencher a lacuna no chute, e o resultado sai bonito mas fora do padrão, isso vira débito depois
- **Alguém ainda precisa ser dono.** O trampo fica menor, mas não zera. Base sem dono desatualiza do mesmo jeito que a lib desatualizava
- **Protótipo não é produção.** Um fluxo clicável que parece pronto cria pressão pra ir pro ar do jeito que tá. Ele valida a ideia, quem entrega o código continua sendo o dev
- **Depender de uma ferramenta tem custo.** Se a base mora numa ferramenta que você não controla, vale garantir que tokens e regras também existam como arquivo versionado no repositório

## Conclusão

O gargalo saiu do código e foi pra decisão. Manter, escalar e decidir errado continuam caros

Com mecanismos que garantem qualidade sem sacrificar velocidade, o argumento pra montar estrutura "por precaução" perde força, e o que passa a pesar é o tempo até o produto chegar no usuário. Perder o timing virou um dos erros mais caros que dá pra cometer

Por isso decisão de arquitetura não dá mais pra ser só técnica. Ela precisa considerar quem paga a manutenção, quanto tempo adiciona até a entrega e se o problema que ela resolve ainda custa o que custava

Menos camadas e menos abstração fora de hora: um bom código precisa estar pronto pra escalar quando a ideia dá certo e ser fácil de jogar fora quando não dá. E o processo em volta dele precisa ser leve o suficiente pra deixar isso acontecer

Design system em time pequeno é só um exemplo. Vale olhar com os mesmos olhos pra monorepo, micro-frontend, abstração compartilhada, aquela camada de infraestrutura que "vai ser útil no futuro"

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1678790896651739140">
    <p>Times inteiros focados na evolução de frameworks com milhões em investimento e suporte de comunidades<br><br>Mas o dev no auge da sua vaidade conclui que é melhor ele mesmo criar um framework artesanal pra usar no core do produto<br><br>Sem testes, nem documentação e que já vai nascer legado</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1678790896651739140">July 11, 2023</a></figcaption>
</figure>

Então antes de criar qualquer coisa que alguém vai precisar manter, responde quem vai continuar cuidando dela daqui a dois anos

Se a resposta for "a gente vê depois", você já sabe a resposta 😁
