---
layout: blog.njk
title: proving you're human in 2026
date: 2026-11-26
tags:
    - post
---

```zsh
$ keybase id wispaelis
✔ public key fingerprint: 3696 F7E9 CA76 E400 99EA 40E8 6915 EE19 6785 1835
✔ "ayvacs" on github: https://gist.github.com/ayvacs/91943fba4897b3f1a4115ebfbe23230d
✔ admin of ave.is-a.dev via HTTPS: https://ave.is-a.dev/keybase.txt
✔ admin of gba.js.org via HTTPS: https://gba.js.org/keybase.txt
✔ admin of simple-pip.js.org via HTTPS: https://simple-pip.js.org/keybase.txt
```

In 2026 - the year that <a href="https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/zeta-paper_v2.pdf">AI models are being accepted as co-authors of mathematical papers</a> and <a href="https://news.ycombinator.com/item?id=50595168">increased gen-AI-powered video game decompilation has forced developers to rethink their publishing strategies</a> - proving that you are actually *you* across platforms is surprisingly difficult. Most services rely on centralised OAuth or paid verification badges that prove nothing more than who holds a payment method.

Keybase approaches this problem from first principles: rather than asking third parties to vouch for your identity, it constructs a mathematically-verifiable web of trust using public-key cryptography and an append-only signature chain.

Here is how my own Keybase profile (`wispaelis`) ties my digital identity together, how it works under the hood, and why it matters!

### PGP key-pair

At the foundation of my Keybase profile is a 4096-bit RSA PGP keypair that I also use to sign my GitHub commits.

```bash
Fingerprint: 3696 F7E9 CA76 E400 99EA 40E8 6915 EE19 6785 1835
User ID:     ayvacs
```

When you interact with a Keybase user, you don't trust Keybase's servers to assert who they are. Private companies should not be the single source of authentication validity; if they become compromised, you're back to square one. Instead, you verify statements signed by their private keys: decentralized systems are much more trustworthy.

Whenever you add a device (in my case, my laptop, phone, and tablet), or a paper backup key, each instance generates its own local signing and encryption keys. The existing key signs a delegation proof for the new device, forming a local tree of trusted devices.

For me, my laptop trusted my phone; which trusted my GitHub profile. My laptop then trusted my domains, as well as my tablet. You can recreate this flow yourself using my <a href="https://keybase.io/wispaelis/sigchain#766d961c3b974bf2c116ff26a2db4ba43f6686a34ecb97141f6a0d56c8c2de4a0f">sigchain</a> (which we'll discuss later). 

### Bidirectional proofs

Connecting a social handle or a domain to Keybase doesn't work by just pasting a token into your profile. This would be too easy to hack (i.e. if someone compromises your social media page, it would be easy for them to proclaim they're just about anybody!) Instead, it requires a **bidirectional cryptographic proof**:

1. **Outbound Claim**: My Keybase account signs a statement with my private key asserting: *"I, wispaelis on Keybase, own the GitHub account ayvacs and the domain ave.is-a.dev"*.
2. **Inbound Verification**: I post that signed claim publicly in a place only the true owner can write to:
   - For GitHub: a public Gist under the [`ayvacs`](https://github.com/ayvacs) account.
   - For websites: a hosted file at [`ave.is-a.dev/keybase.txt`](https://ave.is-a.dev/keybase.txt).

This matters because there's trust from both ends. Only I could possibly sign my outbound claim; only those who have access to a GitHub profile can post Gists to it; and only those who own a domain can add the required file to it. Therefore, I'm proving beyond a reasonable doubt that I am all three!

When someone runs `keybase id wispaelis`, the client pulls these public records, checks the cryptographic signatures against my public key, and verifies the identity independently. If anyone were to tamper with either the DNS, the gist, or Keybase's API, the verification would instantly fail.

### The sigchain

To prevent history rewriting (such as a compromised server quietly replacing a public key), every proof, device addition, and key revocation is appended to a personal signature chain.

Each link in the chain contains the SHA-256 hash of the previous link, making the chain tamper-evident. Keybase periodically commits the root of all user sigchains into a global Merkle tree, anchoring identity updates into a public, auditable timeline.

You don't even need the Keybase CLI to inspect this; you can query the public endpoint directly:

```bash
curl -sL "https://keybase.io/_/api/1.0/user/lookup.json?username=wispaelis"
```

When I was doomscrolling Keybase I came across the <a href="https://keybase.io/mikem/sigchain">sigchain</a> of someone who has 765 historical devices (only 7 of which are active today). Keybase never forgot a single one. You can look through this person's entire device history, seeing which device proved another, over and over again over the course of 12 years.

### Daily encryption

The best part about Keychain is how practical it makes day-to-day cryptography. Sending an encrypted message or file to someone usually requires finding their public key, importing it to your GPG keyring, and trusting their key fingerprint. Booooring, I don't even know what any of those commands do!

With Keybase, the lookup and verification happen seamlessly:

```bash
keybase encrypt wispaelis -m "Super secret message that NEEDS to be hidden..."
```

The CLI verifies my identity proofs, fetches my public encryption key, and encrypts the message. No prior key exchanges or manual fingerprint verification required.

### Why it matters

Having spent time researching cryptographic systems, from classic key exchange to modern quantum key distribution, I have a huge appreciation for tools that make robust cryptography so easy to use that your grandma might be using it to text you one day.

One of my biggest complaints about cryptography is that it's too complicated to set up. If only people who are experienced with tech can use it, then its use cases are severely restricted from the start.

Keybase proves that decentralised, verifiable identity is easier to achieve than you think. By combining simple public-key primitives with public proof chains, you get a transparent, verifiable identity that you truly own.
