# 🖤 Devloka Omega – The AI‑Native Sovereign Developer OS

**Build. Hunt. Sovereign.**

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Ubuntu 24.04](https://img.shields.io/badge/Ubuntu-24.04%20LTS-E95420?logo=ubuntu)](https://ubuntu.com)
[![Ollama](https://img.shields.io/badge/Ollama-Local%20LLM-FF6F00?logo=ollama)](https://ollama.com)
[![GitHub Stars](https://img.shields.io/github/stars/dev-loka/Omega?style=social)](https://github.com/dev-loka/Omega)
[![Build Status](https://github.com/dev-loka/Omega/actions/workflows/build.yml/badge.svg)](https://github.com/dev-loka/Omega/actions/workflows/build.yml)

---

## 🔥 The First OS That Makes Security, AI, and Web3 Ambient

**Devloka Omega** is a curated Ubuntu 24.04 LTS derivative that ships with:

- 🧠 **Offline AI by default** – Ollama pre‑installed, `mistral:7b` pre‑pulled. No cloud, no telemetry.
- 🛡️ **Scope‑Lock Engine** – eBPF/nftables enforcement of testing boundaries. Never accidentally scan out‑of‑scope.
- 🔐 **LUKS + TPM2** – Full disk encryption, automatic unlock on supported hardware.
- ⚡ **Developer‑ready** – Node.js, Python, Docker, Foundry, Solana CLI – pre‑configured.
- 🌐 **Web3 native** – Ethereum + Solana development toolchain included. Sign transactions offline.
- 📦 **Ubuntu 24.04 LTS** – Unmodified kernel, stock GNOME, full compatibility.

---

## 🎯 Why Devloka?

> *"I need to validate exploits without accidentally scanning out‑of‑scope targets. Scope‑Lock makes it impossible to deviate from my allowlist."*  
> – Independent Security Researcher

> *"I want a secure, reproducible environment for smart contract development – with no telemetry, and offline signing capability."*  
> – Web3 Builder

> *"I want AI assistance that doesn't exfiltrate my code. Devloka runs everything locally, on my hardware."*  
> – Sovereignty‑Conscious Developer

---

## 🚀 Quick Start

### Option 1: Install on Existing Ubuntu
```bash
# Add Devloka apt repository
curl -fsSL https://apt.devloka.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/devloka-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/devloka-archive-keyring.gpg] https://apt.devloka.io stable main" | sudo tee /etc/apt/sources.list.d/devloka.list
sudo apt update
sudo apt install devloka-cli
```

### Option 2: Download Custom ISO

🔗 devloka.io/download – Ubuntu 24.04 LTS with Devloka Omega pre‑integrated.

---

## 🧠 Devloka CLI Reference

```
$ devloka
System:
  status                    Show system health and security posture
  doctor                    Diagnose and fix common issues
  update                    Update Devloka components

Security:
  scan <target>             Initiate authorized security scan
  validate <id>             Attempt exploit validation
  scope set <target>        Set active testing boundary
  scope status              Show current allowlist
  report                    Generate attestable security report

AI:
  ai start                  Enable local LLM service
  ai chat                   Interactive terminal chat
  ai review <file>          AI‑powered code review
```

---

## 🛡️ Security Philosophy

Devloka Omega is not a "hacking OS." It is a sovereign development environment that enables ethical security research through architectural guardrails, not subjective interpretation.

· No telemetry – every feature works offline.
· No backdoors – all code is open source and reproducible.
· No vendor lock‑in – you own your keys, your models, your system.

---

## 🤝 Contributing

We welcome contributions in:

· devloka-cli – Python CLI tooling
· scope-lock – eBPF/nftables enforcement
· iso-profiles – Cubic overlay definitions
· documentation – Tutorials, threat models, architecture

See CONTRIBUTING.md for development environment setup.

---

## 📄 License

Devloka Omega is open core:

· All community editions are GPL‑3.0
· Enterprise features (SAML, remote attestation, support SLA) are commercial

---

## 🖤 Built by Developers, for Developers

Devloka is a sovereign open‑source project.
We don't sell your data. We don't require telemetry. We don't make you choose between security and productivity.

Build. Hunt. Sovereign.

---

GitHub Topics:
ai-native-os, secure-development, ubuntu-derivative, offline-llm, web3-development, bug-bounty-tooling, sovereign-tech, ebpf-security, ethical-hacking-os, developer-workstation
