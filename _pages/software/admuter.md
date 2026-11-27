---
layout: plain
title: AdMuter
permalink: /software/admuter/
description: An Android app that mutes YouTube ads.
img: /assets/img/admuter.png
software: true
order: 2
summary: >
  An Android app that detects ads in the YouTube app and, while they play, mutes them, turns them down, or plays
  a sound of your choice instead. No internet access, and it reads nothing but YouTube.
tech: Android app, MIT license
---

<h1 class="page-title">AdMuter</h1>
<p class="page-lead">An Android app that mutes YouTube ads.</p>


**Ads without the noise.** AdMuter detects ads in the YouTube Android app and, while an ad plays, does one of:

1. **Mute only:** YouTube goes silent.
2. **Sound file:** YouTube is muted and your audio file plays, continuing where it stopped at the next ad.
3. **Alarm sound:** YouTube is muted and one of the phone's alarm sounds plays.
4. **Volume level:** YouTube is turned down to the level you set.

When the video comes back, the sound fades out and YouTube's volume returns to what it was. AdMuter doesn't block
ads: they still play, silently, so creators are still paid.

### Install

Download [`AdMuter.apk`](https://github.com/Ahcene-B/AdMuter/raw/main/AdMuter.apk) on your phone (Android 8 or
newer) and open it, then turn on **Ad Muter** in the accessibility settings; the app has a button that opens
them. The [README](https://github.com/Ahcene-B/AdMuter#install) explains the steps, including Android 13's
"restricted setting".

### Privacy

- **No internet access:** the app doesn't have the permission, so nothing it sees can leave the phone.
- **Reads YouTube only:** its accessibility service is restricted to the YouTube app and looks only for ad signs
  on screen.
- **Stores only its settings,** and during an ad, the volume to restore.

### How it works

An accessibility service watches the YouTube app for ad signs (the *Skip ad* button, the ad countdown, the ad's
own view names), on every change of YouTube's screen and twice a second. The app then lowers YouTube's media
volume and plays your sound on the alarm stream, without taking audio focus, so YouTube keeps playing the ad
silently instead of pausing it. Non-English YouTube can be handled by adding the local word for "ad" in the
app's keywords.

[Code on GitHub](https://github.com/Ahcene-B/AdMuter) · MIT license
