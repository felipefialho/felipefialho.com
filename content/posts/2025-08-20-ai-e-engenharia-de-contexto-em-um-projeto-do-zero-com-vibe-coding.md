---
title: 'AI e Engenharia de Contexto (Context Engineering) em um projeto do zero com vibe coding'
date: 2025-08-20 00:00:01
description: 'Me rendi ao vibe coding e criei uma aplicação inteira em 5 minutos! Só que não 😅'
image: /assets/2025-08-20-cover.jpg
tags: ['ai', 'front-end', 'programação']
---

Faz pelo menos 2 anos que tenho usado ativamente LLMs para criar código, geralmente para entregar features em projetos que já existiam.

Dito isso passei o último mês completamente imerso usando **vibe coding** pra criar uma aplicação de mundo real, complexa e do zero, com **Next.js + TypeScript**.  

Aqui vão minhas percepções sobre ferramentas, modelos e workflows que usei nesse processo:  

## ➡️ Ferramentas usadas  

### VS Code + Copilot  

Usei esse combo por muito tempo e, no geral, funcionava bem.  

O problema é que como na vida, pra cada vislumbre de felicidade, precisamos lidar com decepções e frustrações:  

- O **Sonnet 4** ganhou limite de tokens.  
- O **GPT 4.1 ilimitado do Copilot** é preguiçoso e alucina tanto que poderia ser chamado de *Burrice Artificial*.  

E de burro e preguiçoso basta eu.  

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1947395637579788501">
    <p>Assinei o Cursor<br><br>Depois das mudanças no GitHub Copilot, limitando LLMs como Sonnet 4, ficou simplesmente intragável usar<br><br>O modelo ilimitado do GPT 4.1 do Copilot, além de preguiçoso, alucina tanto que podia ser chamado de Burrice Artificial<br><br>E de burro e preguiçoso basta eu</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1947395637579788501">July 21, 2025</a></figcaption>
</figure>

### Cursor  

Foi amor no primeiro prompt.  

O **modo auto ilimitado** funciona muito bem, permitindo alternar pro Sonnet 4 em tarefas complexas e voltar pro auto nas mais simples.  

Resultado: um workflow eficiente e econômico em tokens.  

Além disso, a **DX é absurdamente boa**, especialmente pra quem trabalha com front-end.  

## ➡️ LLMs usadas  

- **Claude Sonnet 4** – Melhor output geral, entende o contexto do projeto, segue instruções mesmo com prompts simples.  
- **Claude Opus 4.1** – Gasta tokens como um Opala bebe gasolina mas consegue resultados impressionantes, vale usar pra tarefas muito complexas ou pra trabalhar na estrutura inicial da aplicação.  
- **Modo auto (Cursor)** – Supostamente escolhe o melhor custo benefício pra sua tarefa, vi muita gente falando mal mas funcionou muito bem pra mim, especialmente depois da aplicação estar mais estruturada. 
- **GPT 5** – Mais rápido e com menos alucinações que o 4.1, mas ainda atrás do Sonnet 4 pra front-end.  
- **GPT 4.1** – Intragável: outputs ruins, cortados pela metade e sem entender contexto.  

Também testei **o4 mini, Gemini 2.5 e Grok 2**, mas por pouco tempo pra tirar conclusões sólidas.  

## ➡️ Engenharia de Contexto (Context Engineering)

Esse termo se popularizou rápido, e com razão. 

É basicamente **preparar o terreno** para que as LLMs sejam mais eficientes.

Não é só escrever um bom prompt.

Em vez de simplesmente fazer uma pergunta, você fornece ao modelo o contexto, a persona e as instruções necessárias para gerar a saída desejada. 

No mundo da programação, isso é crucial para transformar uma LLM de uma ferramenta genérica pra um assistente de código que realmente vai te ajudar no mundo real.

A ideia é dar a eles **exatamente o que precisam**, a informação certa, no formato ideal e no momento certo para que as respostas sejam precisas e controladas. Ou seja, construir um sistema que monta dinamicamente um workflow completo.

Isso inclui: 

- Documentação e arquivos relevantes  
- Formato esperado do output  
- Contexto histórico  
- Exemplos de código
- Instruções claras  

### O que pode ajudar na engenharia de contexto?

A engenharia de contexto vai além de apenas dar instruções claras. Ao fornecer informações adicionais, você ajuda o LLM a entender melhor seu input, o que resulta num output mais preciso.

**1. Forneça uma Persona para o LLM**

Ao atribuir um "papel" ao LLM, você o direciona a adotar uma perspectiva e um tom específicos. Isso é especialmente útil para tarefas que exigem um estilo de comunicação particular.

*Exemplo de Prompt com Persona*: 

> You are an expert full-stack developer with 15 years of experience specializing in Node.js backend APIs. You always follow best practices and prioritize security and performance. Your task is to write a fast and efficient function to handle HTTP POST requests that creates a new user.

Usando persona de "desenvolvedor experiente" você orienta o LLM a gerar código de alta qualidade seguindo as convenções e boas práticas da linguagem, em vez de um código genérico.

**2. Dê Exemplos de Input e Output (Few-Shot Learning)**

Mostrar ao LLM como você quer que a resposta seja formatada pode reduzir drasticamente o risco de "alucinar" ou retornar um resultado fora do padrão.

Isso é conhecido como "few-shot learning".

**Prompt com Exemplos:** 

>`Given a URL, extract the domain name.
>
> Input: 'https://www.google.com/search'
> Output: 'https://www.google.com/search?q=google.com'
>
> Input: 'https://github.com/microsoft'
> Output: 'github.com'
>
> Input: 'http://my-blog.com'
> Output: 'my-blog.com'

Com isso o LLM aprende o padrão da sua solicitação pelos exemplos. Isso garante que a resposta será consistente e no formato desejado.

**3. Inclua TODAS as Restrições e Limitações**

Definir o que o LLM não deve fazer é tão importante quanto dizer o que ele deve fazer.

**Prompt com Restrições:** 

> Write a simple JavaScript script to read a JSON file and print its contents. The script must NOT use any external libraries like 'fs-extra' or 'lodash'. Use only built-in Node.js modules.

A instrução de "não usar bibliotecas externas" evita que o LLM gere um código que possa ser incompatível com o seu ambiente de projeto.

**4. Estruture seu Prompt**

A clareza é fundamental. Usar uma estrutura clara, como a marcação Markdown, ajuda a organizar o seu pedido em seções lógicas.

**Prompt Estruturado:**

> Task
> Write a simple JavaScript function to sort a list of numbers.
> Context
> The list can contain positive and negative integers.
> Constraints
> Do not use the built-in 'sort()' method. Implement a sorting algorithm from scratch.
> Desired Output Format
> The function should return a sorted list.

A organização do prompt em seções ( Task, Context, Constraints e Desired Output Format) faz ficar mais fácil de ser lido pelo LLM, diminuindo a chance de ele pular alguma instrução importante.

**5. Crie um arquivo de contexto**

Para prompts mais complexos ou que exigem informações de diversos arquivos, você pode criar um arquivo de texto, como `context.md`, com o seu prompt detalhado e carregá-lo no LLM. Isso é útil para:

- **Reutilização:** Você pode salvar e reutilizar prompts complexos para tarefas recorrentes.
- **Organização:** Mantém seu prompt limpo e bem-estruturado.
- **Colaboração:** Permite que outros membros da equipe usem o mesmo contexto para obter respostas consistentes.

Dessa forma em vez de digitar um prompt longo toda vez, você pode simplesmente carregar o arquivo, garantindo que todas as instruções e o contexto sejam fornecidos de forma consistente.

Ferramentas como Cursor e Copilot permitem carregar arquivos como contexto adicionando em pastas de contexto, vale ler a documentação de cada uma delas.

**6. Adicione arquivos do seu projeto como contexto**

Essa é uma maneira mais poderosa de fornecer contexto. Isso permite que o LLM analise a arquitetura de código, as dependências, as convenções de nomenclatura e outros detalhes que seriam difíceis de descrever manualmente.

**Cenário:** Você precisa que o LLM crie um novo componente para o seu projeto React.

**Ação:** Adicione o arquivo package.json para que o LLM entenda as dependências. Em seguida, adicione o arquivo UserComponent.js e UserComponent.scss para que o LLM entenda o estilo de código atual e as classes CSS que você já está usando.

**Prompt após o upload:**

> Given the context from the files I've uploaded, create a new 'ProductCard' component. It should follow the same structure and coding style as 'UserComponent.js' and use classes from the 'UserComponent.scss' file to maintain a consistent look.

A capacidade de "ver" os arquivos de contexto permite que o LLM gere um código que se integra perfeitamente ao seu projeto existente, economizando tempo de refatoração e minimizando erros.

**7. Use MCP Servers para enriquecer o contexto**

MCP Servers são uma forma de estender o poder das LLMs. Eles são servidores que podem ser acessados via API e que podem fornecer contexto adicional para o LLM.

Um bom exemplo é o [context7](https://github.com/upstash/context7), que tem integração com todos os principais LLMs, ferramentas, editores e ainda tem uma API para criar seus próprios servers.

Com isso é possível enriquecer o contexto de forma mais eficiente e customizada, mantendo um prompt com linguagem mais natural na maioria das vezes

> Create a Next.js middleware that checks for a valid JWT in cookies and redirects unauthenticated users to `/login`. use context7

> Configure a Cloudflare Worker script to cache JSON API responses for five minutes. use context7

Nesse cenário o Context7 faz fetch de exemplos de código e documentação diretamente no contexto do LLM.

Sensacional né?

### Exemplo 1: Gerando Código com Especificações Detalhadas

Você precisa de uma função em JavaScript para validar um endereço de e-mail. Uma solicitação simples pode até funcionar, mas não garante a precisão ou o formato do código.

**Prompt Simples** (baixa qualidade)

> Write a JavaScript function to validate an email address.

**Prompt com Contexto** (boa qualidade)

> "As a senior JavaScript developer specializing in front-end performance, your task is to create a function to validate email addresses.
>
>The function, named 'validateEmail', should accept a single string parameter 'email'. It must use a minimal regular expression for validation to ensure maximum performance and avoid unnecessary complexity. The function should return a boolean value and include comprehensive JSDoc comments describing its purpose, parameters, and return value
>
> After the function, please write unit tests using Jest to cover the following cases:
>
> - A valid email address.
> - An invalid email address (e.g., missing '@').
> - An empty string.
> - A null or undefined value.
> 
> Finally, provide a clear usage example with one valid email and one invalid email"

Este prompt não apenas pede o código, mas também define a assinatura da função, o método a ser usado (regex), o formato da saída (boolean), a necessidade de documentação (JSDoc) e um exemplo de uso. Isso elimina ambiguidades e garante que o código gerado atenda a requisitos específicos.

### Exemplo 2: Depurando Erros e Otimizando Código

Você tem um trecho de código JavaScript que está falhando, mas a mensagem de erro não é clara.

```js
const data = null;
const evenNumbers = data.filter(num => num % 2 === 0);
console.log(evenNumbers);
```

**Prompt Simples** (baixa qualidade)

> Why is this JavaScript code not working? [code snippet]

Nesse cenário, o LLM vai te dizer que data é nulo, algo que a própria mensagem de erro já aponta. O resultado é uma resposta genérica e pouco útil.

**Prompt com Contexto** (boa qualidade)

> Analyze the following JavaScript code. It's supposed to iterate over an array of numbers and return only the even values. However, it's throwing a 'TypeError: Cannot read properties of undefined' error. Identify the root cause of the error, provide the corrected code, and explain the bug. Also, suggest how the code can be refactored for better readability and performance.

Nesse cenário você tá fornecendo pro LLM a tarefa (identificar e corrigir um erro), o contexto (o objetivo do código), a mensagem de erro exata e uma solicitação adicional para otimização.

Isso guia o modelo para uma análise mais profunda e uma resposta mais completa.

### Exemplo 3: Refatorando e Adicionando Comentários

Você tem um trecho de código desorganizado e sem documentação que precisa ser melhorado.

```js
function process(a, b, c, d){
	if(c === 'sum'){
		return a + b
	} else if(c === 'subtract'){
		return a - b
	} else {
		return 'Error: Invalid operation'
	}
}
```

**Prompt Simples** (baixa qualidade)

> Improve this code. [code]

A AI até pode melhorar o código, mas sem instruções específicas, o resultado será genérico e talvez não atenda às suas expectativas.

**Prompt com Contexto** (boa qualidade)

> As an experienced software engineer specializing in clean and maintainable code, your task is to refactor the following JavaScript function.
>
> The refactored code should use descriptive variable names, apply modern coding practices like const and switch statements, and have proper indentation. Add JSDoc comments to document the function's purpose, parameters, and return value. The original functionality must be preserved.
>
> After the refactored code, provide a brief explanation of the key changes you made and why they improve the code's readability and maintainability.

Dessa forma o prompt detalha o que precisa ser feito (refatorar), o objetivo (melhorar legibilidade), as diretrizes (renomear variáveis, formatação) e as restrições (não alterar a funcionalidade).

Isso transforma a tarefa de "melhorar" em um conjunto de instruções claras e contextuais para o LLM.

### Resumindo

Ao fornecer as informações corretas, o propósito, a persona, as restrições e o formato desejado e etc, você transforma o LLM em um parceiro de programação inteligente, capaz de gerar código mais preciso, documentado e útil. 

Se você realmente deseja maximizar o poder dos LLMs em seu fluxo de trabalho, a engenharia de contexto não é apenas uma habilidade útil, mas sim uma necessidade.

Usei essa abordagem pra tentar extrair o máximo das LLMs gastando menos recursos e esforço. E a diferença de qualidade quando o contexto tá bem amarrado é absurda.

E agora vou falar dessa experiência.

## ➡️ Fase 1 – Scaffolding e Arquitetura  

Aqui foi onde enfrentei o maior desafio.  

Mesmo com prompts e contexto bem pensados, o modelo ainda não tinha exemplos suficientes pra gerar bons outputs.  
Resultado: **código genérico, sem aderência ao projeto**.  

O jeito foi criar um volume inicial de exemplos e arquivos pra que a LLM pudesse se apoiar. Isso exige tempo e paciência.

A dica aqui é usar Thinking LLMs como o Claude Opus 4.1, que são mais caros e lentos mas entregam resultados muito melhores em etapas iniciais, quando o contexto é mais fraco.

Nessa altura o modo Chat pode ser interessante pra fazer brainstorming sobre decisões de arquitetura e organização do projeto.

E sem uma base sólida de arquitetura, essa etapa pode simplesmente matar a escalabilidade antes mesmo da aplicação ganhar vida.  

## ➡️ Fase 2 – Implementação  

Com o scaffolding pronto, podemos começar a implementar as features e aqui conseguimos ver todo o potêncial que LLMs entregam no dia a dia

Features que facilmente durariam uma sprint inteira para serem desenvolvidas, agora podem ser entregues em algumas horas, já otimizadas, testadas e performáticas (se você tiver conhecimentos pra direcionar o LLM, é claro!).

Tarefas como escrever testes, documentação, etc, são feitas em minutos.

Existe uma distância exponencial entre o que é possível fazer com LLMs e o que é possível fazer com um dev humano.

### O problema: CSS, UI e UX

Aqui a coisa complica.  

LLMs parecem ter uma **paixão estranha e tóxica por flexbox**, criando layouts desnecessariamente complexos.  

Sendo assim muitas vezes escrever CSS manualmente, como faziamos nos tempos dos caçadores-coletores, foi mais rápido.  

Mas depois que o projeto já tinha padrões e exemplos bem definidos, os resultados também melhoraram bastante.  

---

## ➡️ Desenvolvimento de software mudou  

O jogo mudou e não tem mais volta.  

Cada vez mais vejo o termo **"Engenheiro de Prompt"** se popularizando. Vamos ser responsáveis por criar prompts otimizados, estruturar workflows inteligentes e revisar cuidadosamente cada output.  

Mas não existe milagre: 

Sem conhecimento técnico e experiência acumulada, o resultado é só acelerar os próprios erros. 

Engenharia de Contexto te faz parar de tratar AIs como uma simples ferramenta de suporte. Com essa abordagem ela se torna parte essencial no seu dia a dia

Você consegue código mais preciso, documentado e útil, atingindo uma velocidade de desenvolvimento de features que seria impossível ter escrevendo código artesanal como faziam caçadores-coletores.

Se você quer extrair o máximo das ferramentas e ter mais eficiência no seu dia a dia, isso não é mais opcional.
