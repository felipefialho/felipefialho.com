---
title: 'Essas abstrações tão matando a escalabilidade do seu código (mas pelo menos tá DRY né?)'
date: 2025-05-27 00:00:01
description: 'Bora falar de Arquitetura? Como faço atualmente pra escalar de forma mais eficiente e ser mais pragmático na hora de programar.'
image: /assets/2025-05-27-cover.jpg
tags: ['arquitetura', 'abstrações', 'modularidade', 'clean code', 'DRY']
---

Essa é uma versão em vídeo do conteúdo apresentado nesse artigo
[que publiquei no meu canal no Youtube](https://www.youtube.com/@felipefialhodev).

Vale a pena assistir! 😁

<iframe width="650" height="400" src="https://www.youtube.com/embed/-GnsFbfH3rY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

📚 Livros recomendados sobre o tema

- [Código Limpo: Habilidades Práticas do Agile Software](https://amzn.to/43j38hy)
- [Arquitetura Limpa: Guia Para Estrutura e Design de Software](https://amzn.to/4keAMuM)
- [Mastering Clean Code: Essential Principles](https://amzn.to/3FchMxQ)
- [Clean Code in JavaScript](https://amzn.to/3SZqPVP)

> A vida é curta demais para criar abstrações reutilizáveis super complexas que só vão ser utilizadas uma vez. Se é algo que só vai ser usado uma vez, então não precisava ser nem reutilizável, muito menos complexo - Clarice Lispector

Neste post, eu quero falar sobre maturidade técnica, abstrações bem-feitas e, principalmente, *quando você NÃO deve abstrair nada*.

## O impulso de abstrair

Você tá ali, de boa, navegando pelo código do projeto. Aí encontra alguns trechos que estão ligeiramente duplicados. Tudo funcionando, legível... mas repetido. E aí vem aquele impulso quase incontrolável que mora no fundo da alma de todo dev: **refatorar tudo**.

Só que nessa, você cria abstrações genéricas, supostamente reutilizáveis... mas, na prática, ninguém entende mais nada. O código que antes era simples e funcional vira uma bomba-relógio.

Esse é o primeiro passo para o seu projeto começar a ruir.

## Abstrair não é o problema. Abstrair cedo demais é.

Sim, você pode e deve criar abstrações. Mas o problema real são as **abstrações prematuras**.

Componentes visuais puros como botões, cards, tags — esses até fazem sentido serem criados no início do projeto, desde que:

- você tenha **certeza que serão reutilizados**;
- e eles **mantenham consistência visual** em diferentes contextos.

Mas cuidado: abstrações visuais são uma coisa, abstrações **comportamentais** são outra história.

## Exemplo prático: o botão que abre modais

Imagina dois botões que abrem modais diferentes. Um abre o modal de confirmação de pagamento. O outro, um modal de edição.

Visualmente? Iguais.
Comportamento? Completamente diferente.

Você decide criar um componente genérico: `ButtonWithModal`. E aí você tenta colocar dentro dele a lógica de abrir qualquer modal. Resultado? Um emaranhado de condicionais específicas para cada caso de uso.

E daqui a pouco você tem `if` dentro de `if`, gambiarras pra tratar exceção da exceção... e ninguém mais entende o que aquele botão deveria fazer.

Esse é o momento onde *duplicar código seria melhor*.

Sim, código duplicado.

Um `ButtonWithPaymentModal`, outro `ButtonWithEditModal`.

Mais simples, mais direto, mais fácil de manter. Depois, **com o tempo**, se aparecerem 10 botões desses e 7 deles forem parecidos, aí sim: analisa, refatora e cria uma abstração com base real, sem futurologia.

## DRY e Clean Code: mal compreendidos

Considero **Clean Code** e **DRY (Don't Repeat Yourself)** como alguns dos conceitos mais mal compreendidos da programação. Muitos acreditam que DRY se trata de eliminar toda e qualquer repetição de código, mas ele foca muito mais em evitar a repetição de comportamento.

Já o Clean Code, devido à aura quase messiânica criada em torno dele, quando mal interpretado, pode levar a uma obsessão por padrões de código e a uma legibilidade puramente estética que ignora completamente o contexto, o produto e a escalabilidade. Isso acontece quando se segue conceitos sem compreender sua origem ou os problemas que buscavam resolver, desassociando-os da realidade.

Esses conceitos frequentemente descrevem um mundo idealizado, mais como as coisas deveriam ser do que como são. Quando aplicados sem considerar o contexto real, o resultado pode ser o oposto do desejado. O Clean Code é um exemplo clássico disso: a busca por padrões de código perfeitos leva à negligência do mais importante em um produto: sua entrega e a experiência do usuário final.

Nenhuma decisão deve ser "pelo código".

O código é apenas o meio para atingir um resultado: permitir que o usuário tenha uma boa experiência com a aplicação.

Código é um meio, não um fim.

## Recapitulando

Pra fechar, aqui vai um resumo direto:

1. **Espere o tempo validar**. Só abstraia depois que o padrão se provar real e consistente.
2. **Abstração mal feita é pior que duplicação**. Em dúvida? Duplique.
3. **Não confunda aparência com comportamento**. Códigos parecidos nem sempre devem ser unidos.
4. **Componentes visuais sem lógica podem ser abstraídos cedo**, se forem realmente reutilizados.
5. **Seja modular**. Primeiro resolve local. Depois abstrai para o módulo. Só depois, se fizer sentido, para o projeto inteiro.

## Modularidade Evolutiva: Como Penso Abstrações Atualmente

Agora, quero aprofundar minha visão sobre abstrações, que chamo de modularidade evolutiva.

Primeiro, eu analiso profundamente a demanda, suas necessidades e como ela, a princípio, deveria escalar. Então, crio um código simples o suficiente para funcionar, buscando a máxima legibilidade e clareza, especialmente nessa fase inicial.

Após a funcionalidade estar pronta, tenho dois caminhos:

- **Prazo apertado ou urgência:** Posso simplesmente entregar o que foi feito. A entrega de valor é e sempre será a parte mais importante.
- **Tempo disponível:** Começo a analisar os padrões no código. Se fizer sentido, dentro do contexto atual, crio abstrações usadas apenas naquele contexto, sem pensar em algo genérico ou global. Essas abstrações são muito específicas para o comportamento do componente ou função. O objetivo é tornar o código mais legível, coeso e claro, com funções autoexplicativas.

Essas abstrações permanecem em uma camada muito específica e contextual.

### A Segunda Fase: Abstrações Modulares e Compartilhadas

Em seguida, entramos na segunda fase. Imagine que esse código, inicialmente restrito a uma funcionalidade, começa a ter novas iterações. Dentro do módulo em que você trabalha, novas funcionalidades e componentes podem surgir e começar a compartilhar elementos.

Note que estamos falando de iterações sobre um produto ou funcionalidade que já está em produção e razoavelmente estável.

Este é um bom momento para criar **abstrações compartilhadas dentro desse módulo**.

Elas ainda resolvem problemas específicos do módulo, sem tentar ser excessivamente genéricas. O foco é eliminar duplicação e gerenciar códigos repetidos dentro dessa parte da aplicação. Isso também oferece uma melhor compreensão do que, futuramente, pode ser escalado para uma camada de abstração mais global.

Ao trabalhar nessas abstrações em camadas mais específicas, você tem muito mais controle. Se elas se mostrarem eficazes e se consolidarem como padrões, podem, no futuro, virar uma abstração global para todo o projeto.

### A Última Etapa: Consolidação Global e Além

Finalmente, chegamos à etapa de consolidação dessas abstrações e padrões. Aqui, falamos de abstrações que funcionam globalmente, ou seja, que serão usadas por toda a aplicação. Isso naturalmente introduz um risco significativo, pois qualquer problema ou alteração nelas afetará toda a aplicação.

O processo de compartilhar abstrações entre diversos módulos de um projeto pode ser facilitado por ferramentas de monorepo, como o NX, que oferecem funcionalidades espetaculares para organizar módulos e abstrações globais.

Em um cenário ainda mais complexo, mas que ocorre, você pode precisar compartilhar essas abstrações não apenas entre módulos do mesmo projeto, mas entre aplicações distintas. Isso envolveria um repositório centralizado para helpers, componentes ou um sistema de design.

Aqui, a complexidade aumenta consideravelmente, pois entramos no gerenciamento de pacotes para resolver bugs, implementar features ou grandes mudanças nessas abstrações.

Construir essa progressão de forma cuidadosa protege seu projeto contra abstrações prematuras o mesmo tempo, garante uma evolução gradual e segura de toda a aplicação.

## A Complexidade da Maturidade Técnica

Outro ponto que frequentemente falo é sobre a **complexidade de realizar tudo isso**.

Não se trata apenas de escrever código, fazer um curso rápido ou usar uma IA para gerar um prompt. Tudo o que descrevi exige um conhecimento teórico e, principalmente, prático muito vasto. Para criar abstrações de qualidade e pensar em arquitetura dessa forma, é preciso ter uma experiência e uma bagagem consideráveis, com muitos erros cometidos no passado.

Essa é uma área onde vejo a IA com grande dificuldade, e isso deve persistir no futuro próximo.

As conexões e correlações necessárias para obter bons resultados **exigem um conhecimento profundo de assuntos diversos e a capacidade de unir todas essas pontas**.

Note que nada do que abordei até agora é sobre a geração de código. Estamos falando sobre planejar a entrega, desenvolver funcionalidades e aplicações de forma eficiente e correlacionar diferentes elementos para garantir uma arquitetura estável e um código escalável.

## O Ciclo de Vida da Entrega de Código

Atualmente, divido a entrega de código em cinco etapas principais:

- **Fazer funcionar:** Minha primeira preocupação é que a funcionalidade opere. Não importa se está otimizada ou refatorada; primeiro, ela deve funcionar. Após essa etapa, a funcionalidade está pronta para ser entregue. Em prazos apertados ou demandas urgentes, posso entregar essa parte já funcional e me preocupar com melhorias depois.
- **Escrever testes:** Já na fase de funcionalidade, começo a atuar em testes — sejam unitários, de integração ou end-to-end.
- **Refatorar (se fizer sentido):** Somente depois da etapa de testes começo a refatorar. Se a refatoração fizer sentido naquele momento, eu a faço. Caso o código já esteja bom o suficiente, não me preocupo com isso imediatamente.
- **Otimizar (se necessário):** Nesta fase, também me dedico à otimização. Um código funcional e utilizável nem sempre é performático. Se não tiver bom desempenho, os usuários podem ter dificuldades, o que afeta a adoção do produto. Sempre que necessário, invisto tempo nessa etapa.
- **Monitorar em produção:** Após o código entrar em produção e a funcionalidade ser utilizada pelos usuários finais, uma parte crucial, mas pouco discutida no frontend, é o monitoramento. Com ferramentas como o Sentry, por exemplo, é possível ter feedback instantâneo dos erros dos usuários, garantindo que a funcionalidade esteja acessível com o mínimo de bugs.

## A Sofisticação na Simplicidade

O lance é que no passado, eu era o tipo de desenvolvedor que complicava as coisas para parecer mais inteligente ou com maior conhecimento técnico. Criava abstrações complexas e descabidas para exibir sofisticação, buscando que as pessoas vissem meu código e pensassem: "Que código complexo, ele deve ser muito bom!"

Mas com o tempo, percebemos que a maior sofisticação para um desenvolvedor é a simplicidade.

Hoje, mais do que nunca, prefiro o simples, bem feito, eficiente e, acima de tudo, funcional. Tudo isso com foco em uma arquitetura sólida, fácil de escalar e, principalmente, fácil de manter.

Precisamos iterar e testar rapidamente em produção, validando se a ideia ou produto faz sentido para os usuários. Ao mesmo tempo, devemos garantir que tudo o que criamos seja escalável e adaptável a mudanças rápidas de direção.

E pra isso, precisamos mais do que nunca **de menos over-engineering** e **muito mais pragmatismo**.
