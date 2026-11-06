---
title: 'AI First e loop agêntico: o harness que faz o agent provar que acertou'
date: 2026-11-06 00:00:01
description: 'Agent sem guard rail entrega com muita confiança uma coisa que ninguém consegue provar que tá certa. Esse é o harness que eu uso pra resolver isso: guard rails, loop red/green, subagents e documentação como contexto 🚀'
tags: ['ai', 'agents', 'workflow', 'programação']
---

Hoje eu escrevo bem menos código e bem mais regra

O código que sai de um agent bem orientado quase sempre é melhor do que o que eu escreveria na mão, o problema nunca foi esse. O problema é que um agent sem guard rail entrega com muita confiança uma coisa que ninguém consegue provar que tá certa

Esse post é sobre o workflow que eu uso pra resolver isso: os guard rails, as fases do loop, quem faz o quê, a documentação que sai de cada volta e onde eu entro

Os exemplos vêm do front-end, que é onde eu passo mais tempo, mas a ideia vale pra qualquer stack. Troca o browser por uma suíte de contrato e o componente por um endpoint que o raciocínio é o mesmo

E o meu harness é montado em cima do [Claude Code](https://claude.com/claude-code), então os nomes que aparecem aqui (skills, hooks, subagents, Opus e Sonnet) vêm de lá. Mas os conceitos não são exclusivos dele: Cursor, Codex, Copilot e outras ferramentas têm equivalentes pra rules, agents, MCP e hooks, e o workflow se adapta trocando as peças

## AI First não é usar AI, é desenhar pra ela

Usar AI é abrir um chat, pedir um trecho de código e colar no editor. Dá ganho, mas o processo continua o mesmo de antes, só com um autocomplete melhor

AI First é inverter a pergunta. Toda decisão de engenharia ganha um critério a mais: **um agent consegue iterar aqui sozinho, e consegue provar que acertou?** Isso vale pra escolha de stack, pra estrutura de pastas, pra forma de escrever um teste e pra onde uma convenção mora

Na prática o repositório vira o onboarding do agent

Pensa num dev novo chegando no time. Na primeira semana ele pergunta onde fica cada coisa, qual o padrão de teste, por que aquele módulo é daquele jeito. Quem responde é quem tá do lado, e cada resposta que só existe na cabeça de alguém vira atrito: ele espera, chuta ou faz do jeito que fazia na empresa anterior

Um agent é esse dev novo chegando em toda sessão. Só que, sem orientação, ele não para pra perguntar: ele chuta com confiança, e não lembra amanhã do que aprendeu hoje. O que só existe na minha cabeça ou num chat antigo, pra ele não existe

Então eu reduzo o atrito do mesmo jeito que faria num onboarding bem feito, só que levado ao extremo: tudo que ele precisa saber tá escrito, versionado e fácil de achar. Convenção vira rule, procedimento vira skill, decisão vira ADR. E o efeito colateral é ótimo: o próximo dev humano que entrar no time lê exatamente o mesmo material

É aqui que entra o **harness**: tudo que fica em volta do modelo e decide como ele trabalha. Context files, rules, skills, subagents, hooks, MCP servers, permissões de ferramenta e os gates que dizem se acabou. O modelo é o motor, o harness é o carro inteiro. Dois devs com o mesmo modelo e harnesses diferentes entregam coisas completamente diferentes

E o trabalho de montar esse harness tem nome: **context engineering**. Não é escrever um prompt melhor, é decidir o que entra na janela de contexto, quando entra e o que fica de fora. Contexto demais custa token e dilui a atenção do modelo, contexto de menos faz ele chutar

E o meu papel muda junto. Eu passo a cuidar de três coisas que um agent não consegue decidir sozinho: **o que é certo, de onde vem a verdade e o que cada um pode tocar**

## Guard rails valem mais que prompt

Prompt é pedido. Guard rail é impossibilidade

Se a regra só existe num prompt, o agent vai quebrar ela na primeira oportunidade que aparecer, e com a melhor das intenções, faz parte de como LLMs funcionam. Ele quer entregar, e o caminho mais curto pra entregar quase sempre passa por cima de alguma regra

Então tudo que é importante de verdade sai do texto e vai pra algum lugar que barra sozinho:

- **Tipos de ponta a ponta:** TypeScript estrito e schema (**zod**, por exemplo) na fronteira com qualquer coisa externa. Um contrato errado quebra no parse, não em produção
- **Arquitetura no lint:** direção de import entre camadas e convenção de nome barradas por regra de lint, não por pedido educado
- **Um gate só:** um comando roda typecheck, lint, format e testes unitários, devolve exit 0 ou 1 e imprime só o que falhou. Exit code não deixa margem pra "acho que passou", e saída enxuta é token economizado
- **Qualidade dentro do loop:** visual regression contra a `main`, auditoria de acessibilidade, Lighthouse e Web Vitals rodam a cada volta, não num pipeline que alguém olha depois (ou nem isso)
- **Tool allowlist por papel:** cada agent declara no frontmatter as ferramentas que pode usar. Um agent que só deveria reportar não recebe ferramenta de edição, então "só reporta" deixa de ser pedido e vira limitação técnica
- **Arquivos proibidos:** quem implementa nunca toca nos testes. O caminho mais curto pra deixar um teste green é editar o teste, e o harness bloqueia isso
- **Hooks:** scripts que rodam no ciclo de vida do agent, antes ou depois de cada tool call, no início da sessão. Eles bloqueiam um comando perigoso, injetam contexto ou rodam uma verificação sem depender de o agent lembrar
- **Budget:** teto de rodadas de review, de subagents em paralelo e nível de esforço por tarefa. Sem teto, "mais uma rodada e zera" vira um poço de tokens

A direção entre camadas é o melhor exemplo

Rotas compõem features, features usam entities, entities nunca importam features. Escrito só em texto, um agent quebra isso na primeira pressa. Com o lint barrando o import, a regra deixa de depender de alguém lembrar

Nada disso é exclusivo de quem usa AI, é só boa engenharia. A diferença é o preço: antes uma convenção frouxa custava um pouco de atrito no time, agora ela custa um agent errando com confiança em escala

## Primeiro eu defino o que é certo

Um loop só roda sozinho se o agent consegue saber, sem me perguntar, se o que ele fez tá certo. Então a primeira coisa que eu escrevo não é prompt, é a definição de certo

Ela sai de uma fonte de verdade explícita: a spec de produto, o contrato com os serviços, o design system. E vira uma **matriz de comportamento**, com uma linha por coisa observável: cada estado, cada mensagem de validação, cada chamada externa, cada evento de analytics, com o texto literal

Com a matriz escrita, "certo" deixa de ser opinião e vira coisa que dá pra checar de forma mecânica. Todo o resto do workflow existe pra transformar cada linha dela em algo que um agent confere sozinho

E quando a matriz não diz, o agent não decide. Teste só checa as decisões que alguém tomou, ele não acha a decisão que ninguém tomou. Essa lacuna volta como pergunta pra mim

## As fases e o que faz cada uma terminar

Um **loop agêntico** é o ciclo em que o agent age, observa o resultado e corrige sozinho até bater uma condição de parada. Sem condição de parada objetiva, ele para quando acha que terminou, e "acha" é a palavra problema

Então cada task passa pelas mesmas fases, e cada fase tem uma condição de saída escrita. Nada avança porque "parece pronto"

### 0. Pesquisa de contexto

Antes de abrir código, agents pesquisadores leem o que existe em volta, via MCP servers quando a fonte tá fora do repo: documentos, tickets, ADRs e o histórico de decisões. Tudo read-only por padrão, escrever é permissão dada de propósito

Em um projeto de Front-end por exemplo a parte mais valiosa é o **contrato com o backend**. Em vez de confiar numa doc de API que pode estar desatualizada, um agent especialista lê o próprio repo do serviço com o [Octocode](https://github.com/bgauryy/octocode-mcp), um MCP server de pesquisa de código: busca o controller do endpoint, segue até o DTO, a validação e as regras de negócio, e volta com o shape real da request e da response, os campos que podem vir `null`, os valores de enum e os erros possíveis

Tudo com o arquivo e a linha de onde tirou

Isso é mais rápido e mais assertivo do que clonar o repo e sair dando grep, ou pior, deixar o agent inferir o contrato pelo nome do campo. E a resposta vira insumo direto: o schema **zod** da fronteira, as variantes de erro e de enum das fixtures e as linhas da matriz saem dali, nunca de um shape inventado

Mas **pesquisa é contexto, nunca fonte de verdade sozinha**. Afirmação sobre o backend só entra num documento com a evidência do código junto. Quando um documento diz uma coisa e o código em produção faz outra, vale o código, e a divergência vira pergunta

Quem decide? Eu

### 1. Spec

A spec junta a matriz de comportamento, as decisões que já existem e o que ainda tá em aberto. A saída é um reviewer que recebe só a spec e o pedido original e lista o que ficou de fora ou ambíguo

Zero achados, fase fechada

### 2. Decisões com evidência

Toda decisão técnica relevante ganha uma linha: o que muda, por quê e qual evidência prova que é seguro. Paralelizar duas chamadas parece óbvio até uma delas escrever o que a outra lê. **Sem evidência, sem decisão**: a linha fica como desconhecida, e o caminho seguro vence

### 3. Specs que nascem red

Os testes são escritos antes do código, a partir da matriz. Eles precisam ficar red pelo motivo certo: a feature não existe, e não porque o harness quebrou

### 4. Build em fatias até o green

O build é dividido em fatias, cada uma com os testes que ela precisa deixar green sem quebrar os que já estavam. O loop red/green tem sempre duas camadas: um **soft loop**, rápido e isolado, que roda a cada mudança, e um **deep loop**, mais lento e mais próximo do real, que pega o que o isolado não enxerga

O que muda de uma stack pra outra são as ferramentas de cada camada

**No front-end**, o soft loop é a suíte e2e com Playwright rodando contra o build de produção e um mock server, até tudo ficar green e estável repetindo. O deep loop é um agent dirigindo um browser de verdade via Playwright MCP num ambiente real, cenário por cenário, conferindo estrutura, layout, network, analytics e console contra a matriz

**No back-end**, o soft loop são testes de unidade e de integração contra dependências reais em container, como banco e fila, mais testes de contrato que travam o shape do que o serviço recebe e devolve. E o deep loop pode ser **mutation testing**, com o [Stryker](https://stryker-mutator.io/) por exemplo: ele muda o código de propósito (troca um `>` por `>=`, apaga uma condição, inverte um retorno) e confere se algum teste falha. Mutante que sobrevive é teste que não testa nada

Isso casa muito bem com agent. O risco clássico de teste escrito por AI é o teste tautológico, que fica green porque não afirma nada de relevante. Cobertura não pega isso, mutation score pega, e vira mais uma condição de saída objetiva: os mutantes que sobreviveram voltam pro loop como teste red

Em qualquer stack, a saída do deep loop é a mais dura: **duas rodadas completas seguidas sem nenhum achado real**. Uma rodada limpa pode ser sorte, duas seguidas já dizem alguma coisa

### 5. Fechamento

Docs atualizados, gate completo e um review com reviewers em paralelo, cada um com um foco (segurança, cobertura de teste, framework, qualidade) e contexto limpo. Achado crítico ou alto é corrigido, médio ou baixo é corrigido ou descartado com motivo escrito

Esse review não substitui o humano, ele muda onde o humano olha. Escrevi mais sobre isso em [code review artesanal não escala mais (e o que fazer no lugar)](/blog/code-review-artesanal-nao-escala-mais-e-o-que-fazer-no-lugar)

## Quem faz o quê

Um agent fazendo tudo funciona até o contexto encher. Depois ele esquece decisões antigas e começa a "melhorar" o que já tava certo. Então cada agent tem um papel fixo, e trabalho que toca muitos arquivos independentes vai pra subagents, cada um com uma janela de contexto limpa

- **Orquestrador (Opus ou Fable):** dono do plano, da spec, das decisões e da integração. E quase não toca em código. Ele quebra o trabalho, escreve os briefs, despacha e confere o que volta
- **Test writer (Sonnet, effort `high`):** escreve os testes red a partir da matriz, e só ele toca em `e2e/**` e nas fixtures. É outro agent de propósito: quem não vai implementar não tem viés pra escrever um teste que já nasce fácil de passar
- **Devs (Sonnet, effort `medium` ou `low`):** recebem uma fatia cada, com um brief exato, e deixam green sem tocar nos testes. Fatia mecânica, como rename ou ajuste de config, desce pra `low`
- **QA (Sonnet):** só reporta. Roda os cenários do deep loop e classifica cada achado
- **Especialistas (Sonnet ou Opus, effort `high`):** debug difícil, arquitetura, UX. Analisam e propõem, mas nunca editam
- **Reviewers (Sonnet):** rodam no fim, em paralelo, cada um com um foco e contexto limpo

Cada agent é um arquivo versionado com modelo, nível de esforço e **as ferramentas que ele pode usar**. O Opus orquestra e decide, o Sonnet executa: julgamento é caro, execução bem especificada não precisa ser. E nenhum subagent passa de `high`, porque esforço máximo numa tarefa bem especificada só queima token pensando no que o brief já respondeu

O orquestrador tocar pouco é o que mantém ele útil. Se ele mesmo escreve teste, implementa e revisa, a janela de contexto dele enche de detalhe de implementação e ele perde exatamente o que só ele tem: a visão do plano inteiro

Subagent também é ferramenta de context engineering. Cada um começa com a janela limpa, gasta o contexto dele lendo arquivo e rodando teste, e devolve pro orquestrador só o resultado. A janela do orquestrador fica guardada pro que importa: o plano e as decisões. Um reviewer com menos ferramentas declaradas também começa a sessão bem mais leve, porque cada tool definition é token

O brief de um dev é o que faz uma fatia voltar certa na primeira. Ele tem sempre a mesma forma:

```md
Slice: <slice-name>
Turn green: e2e/specs/<feature>/<flow>.spec.ts
Keep green: e2e/specs/<feature>/**
Never touch: e2e/**, fixtures, mock-server/**
Read first: docs/<feature>/spec.md (matrix rows, decisions)
Layer: <where the code lives and what it may import>
Verify: npm run gate + the spec above against the production build
Report: changed files, specs run and result, open questions
```

Se o dev acha que o teste tá errado, isso volta como pergunta pro orquestrador, que confere na fonte de verdade e, se for o caso, despacha o test writer pra corrigir. Ninguém "ajusta" o teste pra passar

O QA classifica cada achado em um balde:

- **BUG:** o app difere da matriz em comportamento, conteúdo, chamada ou evento. Vira teste red e fix
- **INTENDED:** diferença que um documento já decidiu, e precisa citar qual. INTENDED sem citação é BUG
- **SPEC:** comportamento que existe e faltou na matriz. Vira linha nova e teste novo
- **UPSTREAM:** a causa tá num serviço de fora, e vira ticket pra quem é dono dele

Esses baldes acabam com a discussão de "isso é bug ou não é": cada achado tem um destino conhecido

## Uma volta do loop

```txt
┌─► QA roda os cenários do deep loop
│     ▼
│   relatório com cada achado num balde
│     ▼   (INTENDED, UPSTREAM: registrados, sem código)
│   BUG e SPEC: orquestrador confere na fonte de verdade
│     ▼
│   test writer escreve o teste red, orquestrador fecha o brief
│     ▼
│   dev deixa green sem tocar no teste e roda o gate
│     ▼
│   orquestrador integra e roda a suíte no build de produção
│     │
└─────┤  achado novo? mais uma volta
      ▼  duas rodadas limpas seguidas
   fechamento
```

O relatório de cada rodada fica salvo, então a seguinte sabe o que é novo e o que já foi resolvido. É isso que faz "duas rodadas limpas" ser um fato verificável, e não uma sensação

## Um teste que trava o comportamento

O mock server usa respostas reais capturadas, validadas pelo schema do serviço, e compara o body da request. Payload errado não recebe resposta certa

Isso abre um dos testes mais úteis que eu conheço: **conferir a sequência exata de chamadas**. Ordem, contagem e payload:

```ts
test('adding an item writes once, then recalculates the total once', async ({ page, mockServer }) => {
  await page.goto('/orders/new')
  await page.getByRole('button', { name: 'Add item' }).first().click()
  await expect(page.getByTestId('order-total')).toBeVisible()

  // Order defined in the spec: the write first, then a single recalculation
  expect(mockServer.calls().map((call) => `${call.method} ${call.path}`)).toEqual([
    'POST /orders/items',
    'GET /orders/total',
  ])
})
```

Uma "otimização" que pula ou duplica uma chamada quebra esse teste na hora. E repara no `getByRole`: teste pela árvore de acessibilidade é o mesmo jeito que o agent enxerga a página quando dirige o browser, então HTML semântico ajuda o usuário, o teste e o agent ao mesmo tempo

Viu como tudo que você aprendeu antes continua importante?

## Documentação é o conhecimento do sistema

Documentação sempre teve um problema: ninguém lê e ninguém atualiza

Por outro lado num processo AI First ela ganha um leitor garantido e precisa ser constantemente atualizada. **Todo agent que pegar esse código depois vai ler o que ficou escrito, e vai agir em cima disso**

Isso muda totalmente o peso dela

Doc desatualizada antes era só inútil, agora ela é perigosa: o agent segue com confiança uma coisa que não vale mais

Cada fase gera um documento que é entrada de outra:

- **Specs:** o que a feature faz, as decisões e uma tabela ligando cada linha da matriz a um teste
- **ADRs:** as decisões que custam caro reverter, com o porquê. É o que impede um agent de desfazer em 5 minutos uma escolha que levou uma semana de discussão
- **Registro de escopo:** o que ficou de fora de propósito, com quem decidiu e quando. Sem ele, meses depois, um agent "conserta" uma ausência que foi decisão
- **Relatórios do loop**, rodada por rodada, para quem quiser acompanhar o que aconteceu e refinar o processo
- **Notas de handover**, pra próxima sessão ou a próxima pessoa retomar a frio

E a documentação segue regras tão duras quanto o código:

- **Cada coisa tem um lugar só.** "Sempre X" e "nunca Y" vão pra rules. Decisão com trade-off duradouro vai pra ADR. Resumo do que foi feito e lista de arquivos alterados nunca viram ADR: isso é commit e PR, lido uma vez no review
- **ADR só em momento chave:** adotar ou largar uma dependência, mudar um padrão de arquitetura, registrar uma restrição que alguém violaria sem saber. Uma decisão que reverte outra reescreve o ADR antigo, em vez de empilhar um segundo que contradiz o primeiro. Dois ADRs brigando confundem um agent muito mais do que uma pessoa
- **Convenção nova muda a rule no mesmo PR.** Convenção que só existe na memória do agent ou no histórico do chat não existe pro próximo

A documentação deixa de ser burocracia de fim de projeto e vira a memória de longo prazo do sistema

## Design system como base compartilhada

Tudo isso vale pra um lugar que eu acho que ainda é subestimado: o design system

Com agents, o design system deixa de ser só uma lib de componentes e vira **a base de onde designers e agents constroem**. Tokens, componentes e regras de uso escritos viram contexto, do mesmo jeito que a spec vira contexto pro código

No [Claude Design](https://claude.ai/design) eu montei um design system e, em cima dele, um protótipo de um fluxo completo. Com o mesmo loop: um agent construía, outro conferia os screenshots contra o design system, rodada atrás de rodada, até não sobrar diferença

O que me interessa nisso não é a ferramenta em si, é quem passa a conseguir prototipar

Produto, design e negócio validam uma ideia sem entrar na fila de dev, e chegam na conversa com algo clicável, montado com as mesmas peças que existem no código. A conversa sai de "como isso deveria parecer" e vai pra "o que falta pra isso ir pra produção"

E o papel de quem desenha muda igual ao meu. Em vez de desenhar cada tela do zero, a pessoa cuida do sistema e valida o que sai dele

Mas só funciona com a mesma disciplina do resto: design system mal documentado gera protótipo inconsistente com a mesma confiança que um agent sem guard rail gera código errado

## Agents, skills e rules: um sistema que eu refino todo dia

Nada disso mora num prompt que eu colo toda vez. Mora num sistema em camadas, e ele nunca tá pronto

- **Global:** diretrizes que valem em qualquer projeto
- **Time:** um plugin compartilhado com agents, skills e rules por stack. Cada dev instala o da stack dele e recebe atualização como qualquer dependência
- **Projeto:** o que só vale ali, versionado no repo
- **Memória:** só o que o repo não registra, sempre com o porquê, pra o agent aplicar no caso parecido e não só no idêntico

**Skills** são procedimentos versionados: fases, checklists, condições de saída e uma lista de frases que indicam que um gate tá prestes a ser pulado ("esse caso é raro", "isso fica pra depois", "o teste tá rígido demais"). Elas usam **progressive disclosure**: só a descrição fica na janela de contexto, e o corpo carrega quando a task pede

Só que skill depende de o modelo decidir carregar, e às vezes ele não carrega. Por isso padrão de código obrigatório nunca mora só numa skill

**Rules** são pequenas e obrigatórias. O teste pra uma rule existir é um só: **é obrigatória, e um dev competente erraria sem ser avisado?** Se o linter já pega, ou se é o padrão óbvio, sai. Cada linha de rule é custo de token em toda task, pra sempre

Por isso **conditional rules** podem ajudar aqui. Cada uma declara uma condição precisa, como extensão do arquivo, um padrão no conteúdo e uma lib no `package.json`, e um hook injeta a rule no máximo uma vez por sessão, só quando a task toca no assunto. A rule de formulário só entra quando o agent abre um formulário que usa aquela lib. Rule por caminho de pasta é melhor que nada, mas carrega coisa demais e desperdiça token

A rule que vale ouro é a que protege o código da boa vontade do agent. No TanStack Query, o skeleton de primeiro carregamento usa `isPending` e não `isLoading`, porque numa query desabilitada o `isLoading` é `false`:

```tsx
const { data, isPending } = useQuery(totalQueryOptions(customerId))

// Disabled until the session fills customerId: isLoading stays false, isPending does not
if (isPending) return <TotalSkeleton />
```

Todo agent que passa por ali quer "corrigir" pro padrão que ele conhece, então a regra tá escrita com o motivo junto

E o refino é simples:

- **Corrigi um agent duas vezes pela mesma coisa?** Vira rule, linha numa skill ou memória
- **Um gate foi pulado com uma desculpa nova?** A desculpa entra na lista de red flags
- **Uma rule nunca mais fez diferença, o modelo atualizou ou o linter passou a pegar?** Sai
- **Um agent fez algo fora do papel dele?** Perde a ferramenta que permitiu

Skill também é testada como código: rodo um subagent fazendo a task sem a skill, vejo onde ele erra, escrevo mirando aquele erro e rodo de novo. Skill que não muda comportamento é só texto gastando token

## Custo de token é decisão de arquitetura

Loop agêntico sem controle de custo é cartão de crédito sem limite

E quase todo o custo vem de contexto, não de código gerado: cada volta relê arquivo, roda teste, recebe log e carrega rules e tool definitions de novo

Então custo entra no desenho do harness desde o começo:

- **Model routing:** o modelo mais forte planeja, orquestra e decide. Execução bem especificada vai pra um modelo menor, e tarefa mecânica que só devolve contagem vai pro menor de todos
- **Effort por chamada:** cada agent e cada dispatch declara o nível de esforço. Renomear arquivo não precisa de raciocínio longo, debugar uma race condition precisa
- **Contexto mínimo por papel:** um reviewer com só as ferramentas que ele usa começa a sessão com uma fração do contexto de um agent com todas as ferramentas. Multiplica isso por cada reviewer em paralelo, em cada rodada
- **Prompt caching:** o que fica fixo no começo do contexto (instruções, rules globais, tool definitions) é cacheado e sai bem mais barato nas chamadas seguintes. O que muda toda hora vai pro fim, pra não invalidar o cache
- **Saída enxuta:** gate que imprime só o que falhou, agent que devolve só o resultado e não o log inteiro. Um teste green não precisa de 400 linhas de output na janela de ninguém
- **Context compaction com estado em arquivo:** sessão longa resume o próprio histórico, e resumo perde detalhe. Como o estado do loop mora nos documentos, a próxima volta relê o que importa em vez de confiar no resumo
- **Tetos:** uma rodada de review com vários agents em paralelo, sem limite, queima milhões de tokens. Por isso review ganhou teto de rodadas, e o que sobra depois dele vem pra mim como lista

E o mais importante: **custo é métrica, não sensação**

Tokens e tempo por task, por fase e por agent mostram onde o loop tá caro. Uma rodada de deep loop que custa muito e acha pouco é sinal de que a spec tava fraca, não de que o deep loop precisa rodar mais

## Dosar o tamanho do loop

Nem toda mudança merece o loop inteiro. Rodar spec, decisões e deep loop pra trocar um texto é queimar token e paciência, e processo desproporcional ensina o time a pular processo

A régua é risco, não tamanho:

- **Trivial:** não muda nada que alguém consiga observar. O gate basta
- **Leve:** muda comportamento dentro de contratos que já existem. Pede critério de pronto escrito e um teste que falha antes, sem a cerimônia
- **Completa:** toca o que é caro desfazer. Um contrato novo, uma decisão de performance, uma feature inteira

Subir de nível no meio é julgamento, não falha de planejamento. O que eu não aceito é o contrário: descer de nível porque o prazo apertou

## Onde eu entro

Com fases, papéis e guard rails definidos, o loop roda sozinho por bastante tempo. Eu entro no que é estratégico:

- **Escopo:** o que entra e o que fica pra trás. Só eu removo uma linha da matriz
- **Priorização:** o que é fundamental pro produto e o que pode ficar no backlog por enquanto. Eu decido o que vale gastar token agora e o que vale guardar pro futuro
- **Arquitetura:** se um agent acha que a estrutura tá errada, ele propõe e espera. Refactor grande nunca acontece de carona numa task
- **Risco:** o que pode ser escrito em cada ambiente. E nenhum agent digita credencial, nunca
- **Orçamento:** quantos agents, quantas rodadas, que modelo
- **Review:** o PR final passa por mim, mas não linha por linha. Leio os diffs de docs e de spec, as decisões e o que os reviewers descartaram. É a mesma ideia do [code review artesanal não escala mais](/blog/code-review-artesanal-nao-escala-mais-e-o-que-fazer-no-lugar): a revisão humana vai pra onde a decisão foi tomada

Correção de rota chega como mensagem curta no meio do caminho, e o loop absorve sem recomeçar, porque o estado tá nos documentos e não na memória de um agent. Se a correção vale pra sempre, ela não fica na conversa: vira rule, skill ou memória antes da sessão acabar

## Nem tudo são flores

- **Montar dá trabalho.** Spec e testes antes do código parecem lentos, e pagam a conta quando uma diferença é discutida com evidência em vez de opinião
- **Tokens custam.** Routing, cache e tetos seguram o gasto, mas não zeram. Um loop completo numa feature grande é caro, e precisa valer o que custa
- **O sistema precisa de manutenção.** Skill desatualizada é pior que skill nenhuma
- **Um green pode mentir.** Teste rodando contra o servidor de dev, ou contra um build sem a mudança, passa sem provar nada

## Conclusão

AI First pra mim é isso: guard rails que garantem que o que sai do loop é confiável, e documentação que garante que o que sai do loop é compreensível e fica como conhecimento para as próximas pessoas e os próximos agents

Ele só funciona com o autor do lado, eu, um mero dev humano que no auge da sua insuficiência ainda precisa tomar decisões e se responsabilizar por elas

Afinal nada disso tira a responsabilidade de lugar

O responsável por cada entrega segue sendo **VOCÊ**

## Vale ler também

- [Code review artesanal não escala mais (e o que fazer no lugar)](/blog/code-review-artesanal-nao-escala-mais-e-o-que-fazer-no-lugar)
- [Stack com AI que vai elevar seu trampo como dev](/blog/stack-com-ai-que-vai-elevar-seu-trampo-como-dev)
