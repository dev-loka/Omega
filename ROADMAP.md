# Devloka Omega – Product Roadmap 2026–2027

**Last Updated:** 2026-02-13  
**Status:** Planning / In Progress

---

## 🎯 Vision

Make sovereign, offline‑capable AI security validation a standard feature of the developer workstation.

---

## 🗺️ Roadmap Overview

| Quarter | Focus | Key Deliverables |
|---------|-------|------------------|
| **Q2 2026** | Preview Release (v0.1) | CLI tool, nftables Scope‑Lock, Ollama integration, first ISO |
| **Q3 2026** | Stable (v1.0) | eBPF Scope‑Lock, TPM2 LUKS, audit logging, signed updates |
| **Q4 2026** | Enterprise (v1.5) | SAML SSO, remote attestation, air‑gap mirror, commercial licensing |
| **2027**   | LTS & Expansion (v2.0) | Immutable root, confidential computing, hardware partnerships |

---

## ✅ Q2 2026 – Preview (v0.1)

**Focus:** Developer preview, gather feedback, build community.

### Features
- [x] Devloka CLI with `system`, `security`, `ai` subcommands
- [x] `devloka scope set` – nftables‑based egress filtering
- [x] Ollama pre‑installed, `mistral:7b` pre‑pulled (optional)
- [x] GNOME theme + Plymouth branding
- [x] LUKS encryption (user‑set password)
- [x] Devloka apt repository
- [x] Custom ISO using Cubic

### Community
- [ ] GitHub repository public
- [ ] Discord server
- [ ] First blog post: "Introducing Devloka Omega"
- [ ] Contributor guide

---

## 🚀 Q3 2026 – Stable (v1.0)

**Focus:** Production readiness, security hardening.

### Features
- [ ] **eBPF Scope‑Lock Engine** – advanced mode, lower overhead
- [ ] **TPM2 LUKS unlock** – automatic decryption on supported hardware
- [ ] **Audit logging** – tamper‑evident logs for compliance
- [ ] **Signed APT repository** – all packages GPG‑signed
- [ ] **`devloka report`** – generate PDF security posture report
- [ ] **Hyprland flavor** – tiling WM variant

### Security
- [ ] Third‑party security audit
- [ ] Bug bounty program launch
- [ ] CVE disclosure process documented

### Adoption
- [ ] 500 GitHub stars
- [ ] 5 external contributors
- [ ] 2,000 ISO downloads

---

## 💼 Q4 2026 – Enterprise (v1.5)

**Focus:** Commercial offering, enterprise features.

### Enterprise Edition
- [ ] SAML / SSO integration (Okta, Entra ID)
- [ ] Remote attestation API (integrates with compliance tools)
- [ ] Central policy server (manage many Devloka endpoints)
- [ ] Air‑gap mirror – fully offline update channel
- [ ] Custom branding / OEM ISO builds
- [ ] 24/7 support SLA

### Community Edition
- [ ] All features remain free and open
- [ ] Enterprise features are clearly separated (open‑core model)

### Business Metrics
- [ ] First 10 paying enterprise customers
- [ ] $50k ARR
- [ ] Partnerships with 2 hardware vendors (e.g., Framework, System76)

---

## 🌍 2027 – LTS & Expansion (v2.0)

**Focus:** Long‑term stability, new frontiers.

### v2.0 LTS
- [ ] 3‑year support lifecycle
- [ ] Immutable root option (ostree / systemd‑sysupdate)
- [ ] Confidential computing support (AMD SEV, Intel TDX)
- [ ] Full disk encryption with TPM2 + PIN
- [ ] Kernel live patching (enterprise)

### Ecosystem
- [ ] Devloka Marketplace – one‑click install of security tools
- [ ] Devloka Cloud – managed Devloka instances for teams
- [ ] Devloka Academy – training & certification

### Impact Goals
- [ ] 5,000 GitHub stars
- [ ] 50 contributors
- [ ] 20,000 active users
- [ ] 100 enterprise customers
- [ ] $1M ARR

---

## 📅 Release Cadence

- **Preview:** Monthly snapshots (automated builds)
- **Stable:** Quarterly releases (feature freeze, security updates)
- **LTS:** Every 2 years (3 years support)
- **Security updates:** Within 7 days for critical issues

---

## 🧭 How You Can Help

| Area | How to Contribute |
|------|-------------------|
| **Code** | Pick an issue labeled `good first issue` |
| **Docs** | Improve README, write tutorials |
| **Design** | Create icons, themes, dashboard mockups |
| **Testing** | Run preview ISO, report bugs |
| **Community** | Answer questions on Discord, moderate forums |

---

## 📢 Stay Updated

- **Twitter:** [@devloka_io](https://twitter.com/devloka_io)
- **Blog:** [devloka.io/blog](https://devloka.io/blog)
- **Discord:** [discord.gg/devloka](https://discord.gg/devloka)

**Let's build the future of sovereign development together.** 🖤
