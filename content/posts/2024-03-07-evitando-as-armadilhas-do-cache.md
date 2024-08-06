---
title: 'Evitando armadilhas do Cache 🤡'
date: 2024-03-07 00:00:01
description:
  '"Não tá funcionando? Deve ser cache!", essa frase é muito comum entre devs, mas sabia que configurações mal feitas de cache realmente podem destruir sua aplicação?'
image: /assets/2024-03-07-cover.jpg
tags: ['javascript', 'spa', 'service-worker', 'cache']
---

## Introdução

Neste artigo, vou compartilhar uma história real sobre como um erro de configuração do Service Worker causou um loop infinito impediu que os usuários recebessem atualizações de novas versões da aplicação e como resolvemos esse problema.

## A história

Alguns anos atrás, em meados de 2017 (já faz tempo hein!), trabalhei numa aplicação SPA (Single Page Application) que tava sendo convertido em um PWA (Progressive Web App) usando [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers), tecnologia que permite que aplicativos web sejam instaláveis, funcionem offline e ofereçam uma melhor experiência de usuário.

O processo foi bem tranquilo até que percebemos dois erros cruciais:

- Esquecemos de remover o `index.html` do cache do Service Worker
- Esquecemos de remover o `service-worker.js` do cache do servidor

E ai a merda tava feita 🤡

## Consequências

Num primeiro momento não percebemos erros, a aplicação continuava funcionando normalmente, e os usuários não relataram problemas. Mas quando lançamos uma nova versão os problemas começaram a aparecer.

Usuários que já tinham a aplicação instalada não recebiam a nova versão. Eles continuavam usando a versão antiga mesmo depois de recarregar a página, já que o Service Worker estava servindo uma versão cacheada do `index.html` e o `service-worker.js` do servidor também estava cacheado, impedindo que a nova versão fosse baixada.

Isso porque SPAs (Single Page Applications) carregam o `index.html` uma única vez e, em seguida, usam JavaScript para atualizar o conteúdo da página.

Como o `index.html` estava cacheado, os usuários não recebiam esses novos chunks de JavaScript e CSS, assim a aplicação continuava funcionando com a versão antiga, pra sempre! 😱


### Primeiras tentativas de solução

A primeira coisa que tentamos foi invalidar o cache do Service Worker. No entanto, isso não resolveu o problema, pois o `index.html` (que também chamava o Service Worker) ainda estava cacheado.

Isso porque Service Worker estava sempre servindo a versão cacheada do `index.html`, que chamava o Service Worker que por sua vez servia a versão cacheada do `index.html`, e assim por diante.

Isso criou um loop infinito que impediu que os usuários recebessem atualizações de novas versões da aplicação 🤡

Uma alternativa "manual" foi simplesmente pedir para os usuários que entravam em contato reportando problemas limparem completamente o cache do navegador, mas isso não era uma solução escalável e nem garantia que todos os usuários fariam isso.

## Solução final

Depois de muita investigação e analise, encontramos uma solução que resolveu a maioria dos casos:

- Interceptamos a chamada para o `index.html` no servidor
- Injetamos um script para limpar completamente qualquer Service Worker
- Adicionamos um novo Service Worker, desta vez configurado corretamente

Essa interceptação foi feita no servidor, onde conseguimos adicionar um script que limpava o cache do Service Worker mas também poderia ser feita através de gerenciadores de scripts como o Google Tag Manager.

Já o script que limpava o cache do Service Worker era simples:

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
```

Enfim a paz! 🕊

## Conclusão

Esta experiência mostra o quanto é importante tomar cuidado com o cache em aplicações web. Configurações mal feitas podem causar problemas graves, difíceis de diagnosticar e ainda mais difíceis de resolver.

Vale muito a pena ler artigos e documentações sobre Service Worker e cache para evitar cair nas mesmas armadilhas como essa.

Indico fortemente a leitura do [Guia de Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers) e desse [artigo sobre cache do CSS Wizardry](https://csswizardry.com/2019/03/cache-control-for-civilians/) para entender melhor como funciona o cache e como evitar problemas como esse.

Essa história foi contada em primeira mão no Xwitter

https://twitter.com/felipefialho_/status/1765755625063997813
