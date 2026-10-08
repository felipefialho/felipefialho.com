---
title: 'Code review artesanal não escala mais (e o que fazer no lugar)'
date: 2026-10-09 00:00:01
description: 'Agents geram código bem mais rápido do que sapiens conseguem revisar, code reviews talvez tenham virado apenas um ritual de tempos antigos'
tags: ['ai', 'programação', 'workflow']
---

Code review artesanal não escala mais

Agents de AI geram código muito mais rápido do que sapiens conseguem revisar, isso atrasa a esteira e vira o famoso **LGTM** no automático

Faz pelo menos 1 ano que trabalho com uma abordagem diferente pra esse problema, e esse post é sobre ela

A ideia não é parar de revisar. É mudar **o que** a gente revisa e **quando**, porque o lugar onde a revisão acontece hoje deixou de ser o lugar onde as decisões acontecem

## Pra que serve um code review

Antes de mexer no processo, vale lembrar pra que ele existe. Code reviews sempre tiveram duas funções principais:

- **Pegar bug ou decisão errada:** uma segunda pessoa olha o que a primeira não viu, seja um erro de lógica, um caso de borda ou uma escolha que vai custar caro depois
- **Espalhar conhecimento do código pelo time:** quem revisa aprende como aquela parte funciona, e quem escreveu explica o porquê das escolhas

Repara que nenhuma das duas funções é "conferir linha por linha". A leitura linha por linha sempre foi o meio, nunca o objetivo. Enquanto o meio funcionava, ninguém precisava questionar o objetivo

## O que quebra quando agents geram o PR

Em time que revisa tudo à mão, os PRs passam a nascer bem mais rápido do que dá pra acompanhar. Um agent monta em minutos um PR que uma pessoa levaria um dia pra escrever, e o tempo de leitura continua o mesmo de sempre

O resultado é uma fila. E ninguém quer ser o gargalo da fila, então a pressão vai toda pra um lado: aprovar logo

Aí acontece o que todo mundo já viu:

- O PR grande demais ganha um "LGTM" depois de uma passada rápida, porque ler tudo de verdade não cabe no dia
- O review espalha menos conhecimento, porque ninguém entendeu de fato o que mudou
- O review se torna irrelevante, porque ninguém leu com atenção

Então o review perde a razão de existir e vira só um ritual de tempos antigos

As duas funções que ele tinha ficam sem ser cumpridas, e o time continua gastando tempo com algo que simplesmente já não agrega mais na grande maioria dos casos

## Ler o PR só mostra o que mudou

Tem um problema mais fundo do que a velocidade. Um diff mostra **o que** mudou, mas o **porquê** de cada escolha não mora no diff. Ele mora nas docs, nas specs ou no plan que antecederam o código

O modelo mental, as decisões de arquitetura e os motivos de cada caminho estão nesses documentos. Quando a revisão começa só no PR, quem revisa precisa reconstruir o raciocínio olhando o resultado, e essa é a parte mais cara e mais fácil de errar

Por isso faz mais sentido a revisão começar onde as decisões são tomadas, e não onde elas já viraram código

## Um caminho em 3 camadas

A abordagem que uso muda o foco do review em três frentes que se complementam. Nenhuma funciona bem sozinha

### 1. O time aprende antes do código

A primeira camada é revisar **docs, specs e plans antes da AI implementar**. É aqui que ficam as decisões de verdade:

- Arquitetura: onde a mudança vive e o que ela toca
- Contrato: o que entra, o que sai, quem depende disso
- O que não pode mudar: o que a implementação não tem permissão de quebrar
- Como vai escalar: o que acontece quando o volume ou o número de usos cresce

Isso espalha os porquês pelo time, que era uma das funções originais do review, só que antes do código existir. Quem lê a spec entende a decisão, não só o resultado dela

E tem um ganho de custo que a gente sente rápido: corrigir uma decisão errada aqui pode economizar **milhares de tokens e horas de trabalho**. Mudar um parágrafo de spec é barato. Mudar um PR inteiro já implementado, com testes e tudo, é bem mais caro

E claro, também podemos usar LLMs pra ajudar nisso

### 2. A parte mecânica da revisão fica com os agents

A segunda camada é deixar a parte mecânica da revisão com os agents. Cada um com um foco:

- Regressão
- Segurança
- Performance

E o ponto que faz diferença: rodar cada um em **modelos e prompts diferentes**, com contexto limpo. Cada modelo erra de um jeito, então a chance de o mesmo bug escapar de todos eles é menor do que a chance de escapar de um só. É a mesma lógica de ter pessoas diferentes revisando, só que com a velocidade que o volume de PRs exige

Isso não é subestimar a AI

LLMs já revisam quase sempre melhor do que a gente quando leem o doc, a spec e o plan. É por isso que faz sentido entregar a elas o trabalho mecânico, e guardar o tempo humano pra onde ele rende mais

### 3. Gates no pipeline

A terceira camada é o pipeline decidir se o PR passa. Os gates:

- **Code smells:** análise estática pega o padrão que ninguém quer ver de novo
- **Preview deploy:** alguém pode abrir e ver funcionando antes de aprovar
- **Testes:** o comportamento que a spec descreveu continua valendo
- **Types:** os contratos continuam se encaixando

Os gates pegam o que a spec acertou e a implementação errou, que é justamente o tipo de falha que a revisão de spec sozinha não enxerga. Spec certa não garante código certo, e gate sem spec só valida o que alguém já decidiu errado

## O que continua passando por pessoas

Nada disso quer dizer parar completamente de revisar

**PR estratégico** continua passando por pessoas: auth, dados, migração e arquitetura

São as áreas onde um erro custa muito, e onde o conhecimento do código crítico precisa continuar dentro do time. Se só a AI conhece como a autenticação funciona, o time perdeu uma parte do que sabe sobre o próprio produto

A diferença está no que a pessoa faz nesse PR. Ela não está ali pra conferir sintaxe, que os agents e os gates já olharam. Ela está ali pra confirmar que a decisão faz sentido pro produto e pro negócio

## Nem tudo são flores

Essa abordagem tem custo e tem limite, e vale falar a real sobre os dois:

- **Spec ruim gera código ruim com muita velocidade.** Se a camada 1 for feita de qualquer jeito, a AI implementa a decisão errada rapidinho e com testes passando. O gate verifica se o código bate com a spec, não se a spec é boa
- **Agents também gastam tokens.** Várias rodadas de revisão, cada uma com um foco e um modelo, têm um custo. Vale mais a pena em PR grande ou de risco do que em ajuste pequeno
- **Dá trabalho montar.** Escrever docs, specs e plans de qualidade é um hábito de time. Se ninguém mantém esse material, a revisão antes do código não funciona
- **Não substitui 100% o lado humano** Mentoria, discussão de abordagem e conversa sobre decisões continuam existindo, só que mais cedo e em volta da spec

Também não é uma receita pra aplicar igual em qualquer time. Pensa nela como um ponto de partida pra ajustar com o seu contexto, o seu volume de PRs e o quanto o seu time já documenta as decisões

## Conclusão

Quando a velocidade de gerar código passou a velocidade de ler código, o review linha por linha deixou de ser uma proteção e virou um ritual. Aprovar no automático não protege ninguém

O trabalho humano sobe uma camada: decidir o que vai ser construído antes do código, em vez de conferir cada linha de PRs que provavelmente já passaram por várias rodadas de revisão com AI. Os agents fazem o mecânico, os gates garantem o comportamento, e o time guarda o que só ele pode fazer, que é decidir

E quem decide continua sendo a gente. O responsável por cada entrega segue sendo **VOCÊ**, e isso não muda porque o código chegou mais rápido

A pergunta deixou de ser se o código tá certo e virou se a decisão tá certa

## Vale ler também

- [Stack com AI que vai elevar seu trampo como dev](/blog/stack-com-ai-que-vai-elevar-seu-trampo-como-dev)
- [AI e engenharia de contexto em um projeto do zero com vibe coding](/blog/ai-e-engenharia-de-contexto-em-um-projeto-do-zero-com-vibe-coding)
