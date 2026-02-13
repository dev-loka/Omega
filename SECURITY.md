# Security Policy for Devloka Omega

**Version:** 1.0  
**Last Updated:** 2026-02-13  
**Contact:** security@devloka.io  
**PGP Key:** `0xDEADBEEF` (fingerprint available on website)

---

## 🛡️ Supported Versions

| Version | Supported          |
|---------|-------------------|
| Preview (v0.1) | ❌ (No security updates; development only) |
| Stable (v1.0)  | ✅ (Scheduled until next major) |
| LTS (v2.0)     | ✅ (3 years of support) |

We recommend always using the latest stable release.

---

## 🔐 Reporting a Vulnerability

If you discover a security vulnerability in Devloka Omega, please follow these steps:

1. **DO NOT** disclose the issue publicly or on GitHub issues.
2. Email details to **security@devloka.io**.
3. Include:
   - Affected component (e.g., `scope-lock`, `devloka-cli`, ISO build pipeline)
   - Steps to reproduce (PoC preferred)
   - Impact assessment
   - Suggested fix (optional)
4. You may encrypt your email using our [PGP key](https://devloka.io/security.asc).

We will acknowledge receipt within **48 hours** and provide a timeline for a fix.

---

## 📅 Disclosure Policy

- We follow a **90‑day coordinated disclosure** timeline.
- Security fixes will be backported to the latest stable release.
- We credit researchers in release notes (unless anonymity requested).

---

## 🧪 Bug Bounty Program

While we are a community project, we offer **swag and public recognition** for verified vulnerabilities.

**Scope:**
- Devloka CLI
- Scope‑Lock Engine
- ISO build infrastructure (open‑source parts)
- Official documentation

**Out of Scope:**
- Third‑party applications
- Kernel vulnerabilities already patched upstream
- Social engineering attacks

**Rewards:**
- Critical: Devloka hoodie + sticker pack + credit
- High: Sticker pack + credit
- Medium/Low: Public credit

---

## 🔒 Security Features

Devloka Omega includes:

- **LUKS + TPM2** – Full disk encryption with optional PIN
- **AppArmor profiles** – Hardened for all Devloka services
- **Scope‑Lock Engine** – eBPF/nftables network isolation
- **Signed updates** – APT repository GPG‑signed
- **Audit logging** – `devloka audit` exports tamper‑evident logs

---

## ✅ Safe Harbor

We consider security research conducted under this policy to be:
- Authorized concerning any applicable anti‑hacking laws
- Exempt from our normal contribution guidelines (private disclosure)

We will not pursue legal action against researchers acting in good faith.

---

## 📜 Version History

| Date       | Version | Changes |
|------------|---------|---------|
| 2026-02-13 | 1.0     | Initial policy |
