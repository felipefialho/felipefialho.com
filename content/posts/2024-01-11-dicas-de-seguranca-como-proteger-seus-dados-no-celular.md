---
title: 'Dicas de Segurança: Como proteger seus dados no celular'
date: 2024-01-11 00:00:01
description:
  'Tempos atrás tive um celular furtado e além do prejuízo do aparelho, tive muita dor de cabeça porque ele tava desbloqueado, facilitando o roubo de dados e acesso a contas bancárias'
image: /assets/2024-01-11-cover.jpg
tags: ['seguranca', 'dados']
---

## Introdução

Tempos atrás tive um celular furtado e além do prejuízo do aparelho, tive muita dor de cabeça porque ele tava desbloqueado, facilitando o roubo de dados e acesso a contas bancárias. Isso poderia ter me arruinado mas algumas medidas de segurança evitaram prejuízos maiores.

Na época criei uma [thread do Twitter contando sobre o que aconteceu](https://twitter.com/felipefialho_/status/1348715719908298752) e muitas dicas de segurança foram compartilhadas.

Nesse artigo vou compartilhar algumas coisas que podem ajudar a prevenir desastres caso aconteça com você. Bora lá?

## Se prevenindo do pior

As dicas abaixo são pra prevenir problemas, elas vão te ajudar a evitar que seus dados sejam roubados ou que alguém consiga acessar suas contas bancárias.

### 🔐 Usar um gerenciador de senhas

Faz anos que utilizo o [Bitwarden](https://bitwarden.com/) que além de ser open source tem integração com desktop e aplicativo mobile, isso garante uso de senhas fortes e diferentes em todos os serviços.

Uma dica crucial é guardar a "senha do cofre" em local seguro, talvez em um papel escondido em casa, porque se alguém tiver acesso, vai conseguir ver todas as senhas.

### 🔐 Desativar funcionalidade de completar dados

Se você costuma salvar dados automaticamente, repense. Desativar essa funcionalidade vai dificultar o acesso a informações sensíveis que podem ficar gravadas em formulários.

No Chrome, você pode desativar em `Configurações > Preenchimento automático e senhas > Preenchimento automático de formulários`.

### 🔐 Remover todas as senhas na conta do Google

Evite salvar senhas no navegador, isso quase me causou problemas graves porque quando conseguiram redefinir a senha da minha conta Google (já que tinham meu celular em mãos), conseguiram acessar todos os logins salvos.

No Chrome, você pode remover todas as senhas em `Configurações > Preenchimento automático e senhas > Senhas salvas`.

O problema só não foi maior graças à próxima dica.

### 🔐 Usar 2FA e evitar SMS

Mesmo com acesso ao celular e logins, eles não conseguiram acessar logins protegidos por 2FA porque o acesso ao app estava protegido por senha. Evite usar SMS como segundo fator porque além de inseguro, o acesso fica facilitado em posse do celular.

Para gerenciar meus tokens 2FA, uso o [Authy](https://authy.com/).

### 🔐 Mantenha um e-mail de recuperação da conta principal

Se você perder acesso à sua conta principal, vai precisar de um e-mail de recuperação. Esse e-mail deve ser diferente do principal e deve ficar  escondido ser acessado com pouca frequência, assim você evita que alguém consiga acessar.

Ter um e-mail de recuperação foi essencial pra conseguir recuperar minha conta Google e evitar que continuassem acessando meus dados.

A dica é não deixar o 2FA ativado nesse e-mail, porque se perder acesso ao celular, vai perder acesso ao e-mail de recuperação.

### 🔐 Desativar notificações

Teria evitado muitos problemas se tivesse desativado as notificações.

Isso porque tentativas de recuperar acesso em serviços costumam ser feitas usando SMS ou e-mail, então a chave de recuperação vai ficar visível nas notificações mesmo que o acesso aos aplicativos esteja protegido, permitindo que a pessoa consiga recuperar acesso.

### 🔐 Ativar biometria em apps quando não tiver numa rede segura

Configuro pra que apps sejam protegidos por biometria/senha quando não tô conectado numa rede segura. No Android, uso o aplicativo [AppLock](https://play.google.com/store/apps/details?id=com.domobile.applock) pra isso. Apesar de ficar mais chato usar o celular fora de casa, vale pela segurança extra.

Quando tô em casa ou em redes seguras, desativo essa proteção pra não ficar digitando senha ou usando biometria toda hora.

### 🔐 Colocar senha no chip ou usar eSIM

Adicione senha de bloqueio no chip para impedir uso em outro aparelho. Considere usar eSIM, que são chips virtuais não utilizáveis em outros celulares.

### 🔐 Usar celular secundário pra aplicativos financeiros

Tente manter apps financeiros principais que você pode movimentar dinheiro num celular secundário em casa. Aplicativos de 2FA também podem ficar nesse celular. Outra solução é instalar esses apps em pastas seguras e deixar invisíveis.

Você pode manter uma conta num banco secundário pra movimentar dinheiro na rua.

### 🔐 Criar macros pra automatizar rotinas de segurança

Configurei alguns macros no [Macrodroid](https://play.google.com/store/apps/details?id=com.arlosoft.macrodroid) com rotinas que podem me ajudar.

Por exemplo: desligar tela e bloqueiar o celular se perder conexão bluetooth com meu relógio, reduzindo riscos numa situação de furto com celular ligado (como aconteceu comigo).

Outra rotina poderia ser desligar o celular se ficar sem conexão com a internet por mais de 5 minutos, evitando que fique ligado em caso de furto.

Também daria pra criar rotinas pra desativar notificações quando não estiver em casa ou mesmo remover aplicativos financeiros do celular ao receber determinado código por SMS ou e-mail.

A imaginação é o limite.

## Depois do pior

As dicas acima são pra prevenir problemas, mas se o pior acontecer, você pode tomar algumas medidas pra evitar prejuízos ainda maiores.

### 🔐 Avise seu banco

Avise seu banco imediatamente. Eles vão bloquear o acesso aos cartões e aplicativo e você vai evitar que alguém consiga movimentar dinheiro. De preferência, pegue um celular emprestado e faça isso imediatamente após o furto.

Cada segundo conta pra evitar prejuízos, fraudes e dores de cabeça com processos de contestação.

### 🔐 Bloquear o chip e aparelho

Se você não colocou senha no chip, ligue pra sua operadora e peça pra bloquear o chip. Isso vai impedir que a pessoa use o chip em outro aparelho.

Aproveite para também bloquear o aparelho através do IMEI.

### 🔐 Apagar remotamente os dados do celular

Se você tiver um celular Android, pode usar o [Find My Device](https://www.google.com/android/find) e se você tiver um iPhone, pode usar o [Find My](https://www.apple.com/br/icloud/find-my/) pra apagar remotamente os dados do celular. Isso pode ser feito mesmo que o celular esteja desligado e vai funcionar assim que ele for ligado e conectado à internet.

Isso vai impedir que a pessoa tenha acesso aos seus dados e vai dificultar a revenda do aparelho.

### 🔐 Mudar senhas de serviços

Se perceber que algum serviço foi acessado ou alguma senha senha foi comprometida, mude imediatamente. Se você usa um gerenciador de senhas, isso vai ser bem mais fácil.

### 🔐 Abrir um boletim de ocorrência

Isso vai facilitar a contestação de compras indevidas e vai ajudar a recuperar o aparelho e se tiver seguro, vai precisar de um boletim de ocorrência pra acionar o seguro.

Você vai precisar do IMEI do aparelho pra fazer esse processo.

Atualmente o boletim de ocorrência pode ser feito online, sem precisar ir na delegacia e deve ser feito o quanto antes.

## Conclusão

Essas são algumas dicas que podem ajudar a proteger seus dados em caso de furto ou roubo de celular. Espero que nunca precise usar, mas se precisar, vai estar preparado.

Se tiver mais dicas, compartilhe nos comentários.

Tamo junto! 🤜🤛
