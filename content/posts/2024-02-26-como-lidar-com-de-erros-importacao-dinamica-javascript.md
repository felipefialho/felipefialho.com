---
title: 'Lidando com erros de Dynamic Imports no JavaScript'
date: 2024-02-26 00:00:01
description:
  'Chega de passar raiva com erros de importação dinâmica! Bora aprender a lidar com eles e manter a aplicação funcionando'
image: /assets/2024-02-26-cover.jpg
tags: ['javascript']
---

## Introdução

Imagina uma aplicação de e-commerce, onde o usuário está prestes a finalizar uma compra e ao clicar no botão aplicação quebra?

> Um verdadeiro desastre 😱

Se você utiliza [importações dinâmicas](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import) em seus projetos JavaScript, provavelmente já se deparou com alguns erros "misteriosos" no Sentry (ou outras ferramentas de monitoria), como

- `Failed to fetch dynamically imported module`
- `Unexpected token '<'`
- `ChunkLoadError`

Esses erros podem ser críticos e impedir o funcionamento correto da sua aplicação, por isso é fundamental entender como mitigá-los pra garantir a melhor experiência para seus usuários

## O que são importações dinâmicas?

Antes de entender como lidar com os erros, vale explicar o que é o tal do Dynamic Imports.

Também conhecido como Lazy Load, importações dinâmicas são feitas em tempo de execução, ou seja, não são carregadas no momento em que a aplicação é carregada, mas sim apenas quando realmente são necessárias.

```html
<button id="load-module">Load Module</button>

<script>
  const loadModule = document.getElementById('load-module')

  loadModule.addEventListener('click', async () => {
    const module = await import('./dynamicModule.js')
    module.myFunction();
  })
</script>
```

Isso é útil para carregar módulos quando necessários ou de acordo com ações do usuário, como em rotas dinâmicas, o que favorece bastante a performance da aplicação.

O problema é que, por serem carregadas em tempo de execução, essas importações podem falhar, e é aí que os problemas começam a acontecer. Como são erros no carregamento de módulos eles podem simplesmente quebrar completamente a aplicação, impedindo que o usuário continue navegando.

## Como lidar com erros de carregamento

### Mudar estratégia de deploy

Um dos principais problemas com importações dinâmicas está relacionado ao deploy de novas versões da sua aplicação.

Se o deploy for realizado enquanto um usuário navega no site, o código antigo continuará solicitando os chunks dos módulos dinâmicos da versão anterior. Se esses módulos não existirem mais na nova versão, erros vão acontecer e a aplicação vai parar de funcionar pra esse usuário até que ele recarregue a página.

> Pra mitigar esse problema, é essencial manter os builds e hashes antigos  dos chunks disponíveis por um período de tempo após o deploy

Pra mitigar esse problema, é essencial manter os builds e hashes antigos  dos chunks disponíveis por um período de tempo após o deploy. Isso garante que os usuários que ainda estão na versão anterior continuem a ter acesso aos recursos necessários, mesmo após a atualização.

Essa estratégia já resolve a maioria dos casos de erros relacionados a importações dinâmicas durante o deploy.

Diria que mais de 90% dos problemas que tive com importações dinâmicas foram resolvidos com essa estratégia.

## Usuários com problemas de conexão

Outro fator que pode gerar erros de importação dinâmica são problemas de conexão e até mesmo o uso de bloqueadores de anúncios.

Pra dificultar ainda mais, por questões de segurança, o navegador não permite repetir a importação de scripts mesmo que o módulo falhe ao carregar. Embora não existam soluções 100% eficazes para lidar com falhas de rede, algumas alternativas podem ajudar:

- **Forçar o recarregamento da página**: Essa opção não é ideal, pois pode gerar uma experiência negativa para o usuário, mas pode ser necessária em alguns casos e funcionar bem em situações que o problema acontece durante uma troca de rota ou em um carregamento inicial mas não é recomendado para situações onde o erro acontece durante a interação do usuário
- **Exibir uma mensagem de erro**: Informe o usuário sobre o problema e ofereça a opção de atualizar a página manualmente. Essa abordagem permite maior controle sobre a experiência do usuário, mas exige implementações específicas

## Dicas adicionais

### Monitore seus erros

Utilize ferramentas como o Sentry para rastrear e identificar os erros de importação dinâmica (e tantos outros) em sua aplicação. Isso é fundamental para entender a frequência e o impacto desses problemas e para garantir que você está tomando as medidas corretas para mitigá-los.

### Utilize ferramentas de cache

O cache de módulos dinâmicos pode reduzir o tempo de carregamento e minimizar o risco de erros relacionados à rede. Uma das formas de fazer isso é utilizando o [import-maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import-maps), que permite que você defina mapeamentos de importação para URLs de módulos, o que pode ser útil para garantir que os módulos estejam disponíveis mesmo em situações de falha de rede.

### Service Workers

Service Workers podem ser utilizados para interceptar e tratar falhas de rede, permitindo que você exiba uma mensagem de erro ou até mesmo carregue uma versão offline da aplicação. Isso pode ser útil para garantir que o usuário tenha uma experiência consistente.

## Conclusão

Passei muita raiva com erros de importação dinâmica e tive muitas dificuldades de achar materiais que me ajudassem a entender e lidar com esses problemas. Por isso, espero que esse artigo tenha te ajudado a entender melhor como lidar com esses problemas e a garantir que sua aplicação continue sempre funcionando.

Apesar dessas estratégias possam ajudar, ainda sim não garantem que erros assim não vão acontecer. Por isso, é fundamental continuar monitorando e entender quando esses erros estão acontecendo em sua aplicação.

Tamo junto! 🚀







