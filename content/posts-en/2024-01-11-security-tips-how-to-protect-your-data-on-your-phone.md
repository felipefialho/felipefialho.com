---
title: 'Security Tips: How to protect your data on your phone'
date: 2024-01-11 00:00:01
description: 'A while back my phone was stolen, and besides the loss of the device, I had a huge headache because it was unlocked, making it easy to steal data and access bank accounts'
tags: ['security', 'data']
translationOf: dicas-de-seguranca-como-proteger-seus-dados-no-celular
---

## Introduction

A while back my phone was stolen, and besides the loss of the device, I had a huge headache because it was unlocked, making it easy to steal data and access bank accounts. This could have ruined me, but a few security measures prevented bigger losses.

At the time I created a Twitter thread telling what happened, and lots of security tips were shared

<figure class="embed embed-tweet">
  <blockquote cite="https://x.com/felipefialho_/status/1490428784528474121">
    <p>Alerta: Protejam seus dados<br><br>Ontem tive o celular furtado por um maluco de bicicleta e foi só o começo do transtorno<br><br>Como tomou da minha mão, o aparelho tava desbloqueado, minutos depois já tinham alterado senha do Google e logado de outro celular pra olhar senhas salvas e etc</p>
  </blockquote>
  <figcaption><span class="embed-author">felipe.md ⚡ (@felipefialho_)</span>, <a href="https://x.com/felipefialho_/status/1490428784528474121">February 6, 2022</a></figcaption>
</figure>

In this article I'll share some things that can help you prevent disasters if it happens to you. Let's go?

## Preparing for the worst

The tips below are for preventing problems. They'll help you keep your data from being stolen or someone from accessing your bank accounts.

### 🔐 Use a password manager

I've been using [Bitwarden](https://bitwarden.com/) for years. Besides being open source, it has desktop integration and a mobile app, which ensures strong, unique passwords on every service.

A crucial tip is to keep the "vault password" somewhere safe, maybe on a piece of paper hidden at home, because if someone gets access, they'll be able to see all your passwords.

#### Bonus Tip

A good idea to boost security even more is to add a standard prefix or suffix (that only you know) to all your passwords, so if there's a data leak or someone manages to see the password, they won't be able to get in

Tip given by [Voogel13](https://twitter.com/Voogel13/status/1745629544248193444) and [claitonb_dev](https://twitter.com/claitonb_dev/status/1745761982014181771)

### 🔐 Turn off autofill

If you usually save data automatically, rethink that. Turning this feature off makes it harder to access sensitive information that may be stored in forms.

In Chrome, you can turn it off in `Configurações > Preenchimento automático e senhas > Preenchimento automático de formulários`.

### 🔐 Remove all passwords from your Google account

Avoid saving passwords in the browser. This almost caused me serious problems, because when they managed to reset my Google account password (since they had my phone in hand), they got access to all the saved logins.

In Chrome, you can remove all passwords in `Configurações > Preenchimento automático e senhas > Senhas salvas`.

The problem was only not bigger thanks to the next tip.

### 🔐 Use 2FA and avoid SMS

Even with access to the phone and logins, they couldn't get into logins protected by 2FA, because access to the app was password-protected. Avoid using SMS as a second factor because, besides being insecure, it makes access easy for whoever has your phone.

To manage my 2FA tokens, I use [Authy](https://authy.com/).

### 🔐 Keep a recovery email for your main account

If you lose access to your main account, you'll need a recovery email. That email should be different from your main one and should be kept hidden and accessed rarely, so you keep anyone else from getting in.

Having a recovery email was essential for getting my Google account back and stopping them from continuing to access my data.

My tip is to not leave 2FA enabled on this email, because if you lose your phone, you'll lose access to the recovery email.

### 🔐 Turn off notifications

I would have avoided a lot of problems if I had turned off notifications.

That's because attempts to recover access to services are usually made via SMS or email, so the recovery code will be visible in the notifications even if access to the apps is protected, letting the person regain access.

### 🔐 Enable biometrics on apps when you're not on a safe network

I set up my apps to be protected by biometrics/password when I'm not connected to a safe network. On Android, I use the [AppLock](https://play.google.com/store/apps/details?id=com.domobile.applock) app for that. Even though it makes using the phone more annoying outside the house, it's worth it for the extra security.

When I'm at home or on safe networks, I turn this protection off so I'm not typing passwords or using biometrics all the time.

### 🔐 Put a PIN on your SIM card or use eSIM

Add a lock PIN to your SIM card to prevent it from being used in another device. Consider using eSIM, which are virtual SIM cards that can't be used in other phones.

### 🔐 Use a secondary phone for financial apps

Try to keep your main financial apps, the ones you can move money with, on a secondary phone at home. 2FA apps can stay on that phone too. Another solution is to install these apps in secure folders and keep them invisible.

You can keep an account at a secondary bank for moving money on the street.

### 🔐 Create macros to automate security routines

I set up some macros in [Macrodroid](https://play.google.com/store/apps/details?id=com.arlosoft.macrodroid) with routines that can help me.

For example: turn off the screen and lock the phone if it loses its Bluetooth connection with my watch, reducing risk in a theft situation with the phone still on (like what happened to me).

Another routine could be turning the phone off if it stays without an internet connection for more than 5 minutes, preventing it from staying on in case of theft.

You could also create routines to turn off notifications when you're not at home, or even remove financial apps from the phone when it receives a certain code by SMS or email.

The sky's the limit.

## After the worst

The tips above are for preventing problems, but if the worst happens, you can take a few steps to avoid even bigger losses.

### 🔐 Tell your bank

Tell your bank immediately. They'll block access to your cards and app, and you'll keep anyone from moving money. Ideally, borrow a phone and do this right after the theft.

Every second counts to avoid losses, fraud, and headaches with dispute processes.

### 🔐 Block the SIM card and the device

If you didn't put a PIN on your SIM card, call your carrier and ask them to block it. This will keep the person from using the SIM in another device.

Take the chance to also block the device through its IMEI.

### 🔐 Remotely wipe the phone's data

If you have an Android phone, you can use [Find My Device](https://www.google.com/android/find), and if you have an iPhone, you can use [Find My](https://www.apple.com/br/icloud/find-my/) to remotely wipe the phone's data. This can be done even if the phone is turned off, and it will take effect as soon as it's turned on and connected to the internet.

This will keep the person from accessing your data and make it harder to resell the device.

### 🔐 Change service passwords

If you notice that a service was accessed or a password was compromised, change it immediately. If you use a password manager, this will be much easier.

### 🔐 File a police report

This will make it easier to dispute unauthorized purchases and help recover the device, and if you have insurance, you'll need a police report to file a claim.

You'll need the device's IMEI to go through this process.

These days a police report (boletim de ocorrência) can be filed online, without going to the police station, and it should be done as soon as possible.

## Conclusion

These are some tips that can help protect your data in case your phone is stolen or robbed. I hope you never have to use them, but if you do, you'll be prepared.

If you have more tips, share them in the comments.

We got each other's back! 🤜🤛
