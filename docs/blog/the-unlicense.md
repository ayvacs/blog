---
layout: blog.njk
title: why i use the unlicense
date: 2026-11-01
tags:
    - post
---

```
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.
```

Whenever you spin up a new repository on GitHub, you're greeted by the familiar license dropdown: *MIT, Apache 2.0, GPLv3, BSD 3-Clause...*

<a href="https://innovationgraph.github.com/global-metrics/licenses">Most developers</a> instinctively click a MIT and move on with their lives. And for good reason: MIT is simple, permissive, and universally understood. For larger, standalone projects like my [Proton](https://github.com/ayvacs/Proton) UI library, MIT is a great default.

However, as I continued building and publishing smaller libraries, I started getting annoyed with MIT. For a specific class of software—reusable utilities, algorithmic building blocks, and data structures—even the modest terms of the MIT license feel like unnecessary friction.

That's why for my newer projects like [gradient](https://github.com/ayvacs/gradient) and [sort](https://github.com/ayvacs/sort), I have begun to use **The Unlicense**.

### "Permissive" licenses and why they suck

The MIT license is often described as "do whatever you want with it." But that isn't quite true. It comes with one non-negotiable clause:

> *"The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software."*

In practice, this means anyone who uses your code is legally obligated to bundle your copyright header and license text inside their distributed software or source tree.

Now, imagine someone building a Roblox game or a small embedded C application. They just need a clean, smooth color interpolation helper (like my [gradient](https://github.com/ayvacs/gradient) module) or a fast array sorting algorithm (like [sort](https://github.com/ayvacs/sort)). 

Does it really make sense to demand that they maintain a legal credits screen or keep an attribution comment block in their minified bundle just because they borrowed a 30-line sorting routine?

To me, that feels absurd. When I write code and publish it I don't care about seeing my name in lights. I wrote it so that someone else wouldn't have to reinvent the wheel. Attaching legal strings to basic algorithms misses the entire spirit of open source.

I built my software engineering career off of incorporating and taking inspiration from the work of others. That's the beauty of open source. I want to make sure the next generation of programmers can do that too, without being worried about credits and attributions.

### The public domain and why it doesn't suck

The Unlicense takes a fundamentally different route. Rather than granting a conditional copyright license, it intentionally waives copyright altogether, dedicating the work directly to the public domain:

> *"We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law."*

(You have to appreciate how dramatic that "to the detriment of our heirs and successors" line is.)

Crucially, it still includes the standard liability disclaimer, protecting you from being sued if someone uses your sorting routine in rocket flight controller software and encounters a bug.

### How I choose licenses across my projects

I don't use The Unlicense for everything. Over time, I've settled on a clear licensing mental model depending on what a project actually does:

1. **The Unlicense (Public Domain)**: For fundamental building blocks, math helpers, and small standalone algorithms ([`gradient`](https://github.com/ayvacs/gradient), [`sort`](https://github.com/ayvacs/sort), [`adt`](https://github.com/ayvacs/adt)). Take the code, paste it into your proprietary closed-source game, use it for school, rebrand it, do whatever you want. No attribution required.
2. **MIT (Permissive)**: For larger, distinct libraries and tools where polite attribution is appropriate, but commercial and private reuse should still be frictionless ([`Proton`](https://github.com/ayvacs/Proton), [`ez-ds`](https://github.com/ayvacs/ez-ds), [`chat-message-service`](https://github.com/ayvacs/chat-message-service)).
3. **GPLv3 (Copyleft)**: For complete, standalone applications where I want to guarantee that any derivative works remain free and open for the community (like my Discord bot [`dimwit`](https://github.com/ayvacs/dimwit)).

### Summary

There is something deeply satisfying about publishing code with zero strings attached.

If you're writing something that you think might be super important today, or if you feel you're deserved credits for a project that took you months to create, by all means, pick a structured license. But the next time you find yourself publishing a lightweight helper, a small algorithmic trick, or a utility module, consider scrolling down the dropdown list to **The Unlicense**. 

Sometimes, the best license is no license at all.
