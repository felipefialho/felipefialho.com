---
title: "Usando o Terminal do Linux no Windows"
date: 2017-10-22 00:00:01
description: "No inicio de 2016 o Windows entregou uma nova funcionalidade que era muito aguardada: A possibilidade de rodar o Bash do Linux"
image: /assets/2017-10-22-usando-o-terminal-do-linux-no-windows.png
tags: ["workflow"]
---

No inicio de 2016 o Windows entregou uma nova funcionalidade que era muito aguardada: A possibilidade de rodar o Bash do Linux.

Isso é possível porque o módulo "Subsistema do Windows para o Linux", fornece um ambiente Linux rodando dentro do próprio Windows 10, sem necessidade de maquinas virtuais, funcionando de forma integrada com o Windows.

## Analisando o mercado

Por vezes temos a impressão que pouquíssimas pessoas ainda usam o Windows para desenvolvimento. Mas tenho certeza que essa impressão destoa da realidade. Fiz uma rápida pesquisa no Twitter (sendo que é bastante nichada) e os resultados foram:

https://twitter.com/felipefialho/status/921109237501227013

Isso mostra que mesmo entre meus seguidores, muitas pessoas usam Windows, e isso realmente não deveria ser um problema.

MacBooks são caríssimos e inacessíveis para boa parte das pessoas. O Linux acaba gerando resistência entre alguns developers, [mas não deveria, leia esse texto do Jaydson](https://jaydson.com/por-que-uso-linux/) e apresenta uma lista de softwares incompatíveis
 como o pacote Adobe.

Então o bom e velho Windows acaba sendo uma alternativa e acho importante que esteja evoluindo.

## Impressões sobre o Bash on Ubuntu

Fiz alguns testes assim que a funcionalidade foi liberada, ainda em 2016. Mas ainda era beta e ainda tinha muitos problemas, principalmente para encontrar as pastas do Windows, além de compatibilidade com algumas _libs_.

Algum tempo depois comecei a usar o macOS e fiquei um bom tempo sem brincar com o Windows. Porém esses dias, quase dois anos depois, voltei a testar o _Bash on Ubuntu_ e para minha surpresa, está funcionando perfeitamente.

## Vamos o que interessa

O único ponto aqui é que para que tudo funcione você precisa ter o *Windows 10* com todas as atualizações instaladas.

Tenho o *Windows 10* rodando em uma maquina virtual dentro do Mac, portanto todas as prints vão estar em inglês.

### Ativando o Bash on Ubuntu

Primeiro de tudo vá até as _System Settings_ e ative o *Developer Mode*

![Developer Mode](assets/windows-developer-mode.png)

Em seguida vá até o Control Panel (Painel de Controle), clique em Programs e clique em *Turn Windows Features On or Off*. Depois procure por *Windows Subsystem for Linux (Beta)*, ative e reinicie o sistema.

![Turn Windows Features On or Off](assets/windows-turn-on.png)

Após reiniciar. Faça uma busca por **bash** e inicie o terminal.

![Bash on Ubuntu](assets/windows-bash.png)

Na primeira execução você vai precisar aceitar os termos de uso e então vai começar o download do _Bash on Ubuntu_. Quando a instalação finalizar crie seu nome de usuário e sua senha e pronto!

Agora basta buscar por _Bash on Ubuntu_ para acessar o terminal.

## Plus

Agora vamos melhorar as coisas. Os terminais padrões do Windows são péssimos e não fornecem coisas básicas como abas ou customização.

### Hyper

![Hyper](assets/hyper.gif)

O [Hyper](https://hyper.is/) é um terminal open source, bastante configurável, leve e poderoso. Sabe o melhor? Todas as configurações são feitas usando HTML, CSS e JavaScript.

Ele tem versão para Windows e indico fortemente.

Para integrar com o _Bash on Ubuntu_ basta acessar as configurações do Hyper (você vai editar diretamente na sua IDE padrão), buscar por *shell* e adicionar o path:

`C:\\Windows\\System32\\bash.exe`

### VSCode

![VSCode](vscode.png)

Já faz algum tempo que é minha IDE principal, acho o [VSCode](https://code.visualstudio.com/) fantástico e virei quase um evangelista.

Uma das features mais legais do VSCode é o terminal integrado, e você também pode configurar para rodar o _Bash on Ubuntu_.

Basta acessar as configurações e procurar por:

`terminal.integrated.shell.windows`

Clique em editar, e no painel da direita altere para:

`"C:\\WINDOWS\\Sysnative\\bash.exe"`

## Configurando seu ambiente de desenvolvimento no Bash on Ubuntu

Você provavelmente já deve ter o _git_, o _node_ e outras ferramentas de desenvolvimento instaladas no Windows, mas elas não vão funcionar no Bash. É importante ressaltar que todas as instalações devem ser feitas dentro do próprio Bash on Ubuntu, ou seja, você vai precisar instalar tudo de novo.

Você vai estar dentro de um Bash de verdade, portanto alguns comandos são diferentes do Terminal do Windows, [veja uma lista dessa diferenças](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/4/html/Step_by_Step_Guide/ap-doslinux.html).

A seguir estão alguns comandos para instalar duas das ferramentas mais essenciais atualmente: o *git* e o *node*.

```bash
#### Atualizando o apt-get
sudo apt-get update

#### Instalando o pacote essencial
sudo apt-get install -y build-essential

#### Instalando o zsh
sudo apt-get install zsh

#### Instalando o git
sudo add-apt-repository ppa:git-core/ppa
sudo apt-get update
sudo apt-get install git

#### Instalando o Node
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```

A partir daqui você já vai conseguir instalar qualquer dependência de desenvolvimento, lembrando sempre de não instalar mais no Windows, e sim dentro do _Bash on Ubuntu_.
___

O _Bash on Ubuntu_ consegue deixar o desenvolvimento no Windows muito mais próximo ao Linux e o macOS, e deve evoluir ainda mais nos próximos anos.

Se você usa Windows, finalmente, depois de muitos anos pode ter um ambiente mais estável e confortável para desenvolver, agora o céu é o limite.

Se curtiu e conhece developers que usam Windows, não deixe de compartilhar com eles.

Nóis!
