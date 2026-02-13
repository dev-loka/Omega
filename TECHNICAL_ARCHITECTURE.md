# Devloka Omega – Technical Architecture Specification

**Document ID:** ARCH‑001  
**Version:** 1.0 (Draft)  
**Date:** 2026-02-13  
**Author:** Devloka Core Team  
**Status:** Final (Public)

---

## 1. Executive Summary

Devloka Omega is a curated **Ubuntu 24.04 LTS derivative** designed to provide an **AI‑native, security‑hardened development environment** for builders, researchers, and Web3 developers. It adds **five distinct value layers** on top of stock Ubuntu while maintaining full compatibility with Ubuntu repositories and updates.

The system is built around three core innovations:
1. **Scope‑Lock Engine** – kernel‑level network egress filtering for ethical security testing.
2. **Offline AI Subsystem** – pre‑integrated Ollama with curated models, zero telemetry.
3. **Unified Command Interface** – `devloka` CLI for system, security, and AI tasks.

This document details the architecture, component boundaries, security model, and build pipeline.

---

## 2. System Architecture (Layered)

```
┌─────────────────────────────────────────────────────┐
│              DEVLOKA OMEGA SHELL UX                │
│  • GNOME 46 (Primary)                              │
│  • Hyprland / KDE Plasma (Optional Flavors)        │
│  • Plymouth Boot Theme                            │
│  • Devloka Welcome Wizard (First Boot)            │
├─────────────────────────────────────────────────────┤
│                 DEVLOKA DASHBOARD                  │
│  • System Health & Security Posture               │
│  • AI Service Control                             │
│  • Scope-Lock Status                             │
│  • Audit Log Viewer                              │
├─────────────────────────────────────────────────────┤
│                   DEVLOKA CLI                      │
│  • devloka system (status, doctor, update)      │
│  • devloka dev (build, test, deploy)           │
│  • devloka security (scan, validate, report)   │
│  • devloka ai (start, chat, review)           │
├─────────────────────────────────────────────────────┤
│              SECURITY & AI SUBSYSTEM               │
│  • Ollama (Local LLM, pre‑pulled models)         │
│  • Scope‑Lock Engine (eBPF + nftables)       │
│  • AppArmor Profiles (hardened)                  │
│  • LUKS + TPM2 (automatic encryption)           │
│  • UFW (aggressive defaults)                    │
├─────────────────────────────────────────────────────┤
│               DEVELOPMENT SUBSYSTEM                │
│  • Node.js (nvm) + Python (pyenv)               │
│  • Docker / Podman (rootless)                   │
│  • Foundry (Ethereum) + Solana CLI              │
│  • VS Code / Cursor (pre‑configured)           │
├─────────────────────────────────────────────────────┤
│                 UBUNTU 24.04 LTS                  │
│  • Linux Kernel 6.8+ (unmodified)               │
│  • systemd 255 (unmodified)                    │
│  • GNOME 46 (unmodified)                       │
│  • apt + snap (unmodified)                    │
└─────────────────────────────────────────────────────┘
```

### 2.1 Key Design Decisions
- **No kernel forks** – all modifications are additive overlays, ensuring compatibility with upstream security updates.
- **All components packaged as .deb** – installable on any Ubuntu 24.04 system.
- **Air‑gap first** – all features work offline; telemetry is absent by design.

---

## 3. Component Specifications

### 3.1 Scope‑Lock Engine
**Purpose:** Prevent accidental out‑of‑bounds scanning during security research.

**Implementation:**
- Userspace CLI: `devloka scope set <target>` writes to `/etc/devloka/scope.allowlist`
- Systemd service `devloka-scope.service` monitors this file and updates nftables/eBPF rules.
- **nftables mode** (fallback): generates an nftables set blocking all egress except allowlisted IPs.
- **eBPF mode** (advanced): attaches a TC or cgroup‑skb program to drop non‑allowlisted packets.

**Code structure:**
```
scope-lock/
├── src/
│   ├── cli.rs                 # Rust CLI (optional, integrated into devloka CLI)
│   ├── nft.rs                  # nftables rule generation
│   ├── ebpf/
│   │   ├── kern.c              # eBPF kernel program
│   │   └── loader.rs           # libbpf loader
│   └── scope.service           # systemd unit
└── tests/
    └── integration.sh
```

### 3.2 AI Subsystem (Ollama)
- **Package:** `ollama` (official .deb) + `devloka-ollama-config`
- **Pre‑pulled model:** `mistral:7b-instruct-q4_K_M` (~4.1 GB) – included on ISO (optional, can be downloaded).
- **Model storage:** `/var/lib/devloka/ollama` – encrypted if LUKS enabled.
- **Systemd service:** `ollama.service` (disabled by default; enabled via `devloka ai start`).
- **API endpoint:** `http://localhost:11434` (bound to localhost only).

### 3.3 Devloka CLI
- **Language:** Python 3.11+ with Click framework.
- **Packaging:** Debian package (`devloka-cli`) with dependencies: `python3-click`, `python3-yaml`, `nftables`, `curl`, `jq`.
- **Commands implemented:**

| Command | Description |
|---------|-------------|
| `devloka system status` | Show health, security posture, disk encryption status |
| `devloka system doctor` | Diagnose and attempt to fix common issues |
| `devloka system update` | Update Devloka packages + refresh AI models |
| `devloka security scan <target>` | Start an authorized scan (placeholder – integrates with external tools) |
| `devloka security validate <id>` | Attempt exploit validation (placeholder) |
| `devloka security scope set <target>` | Configure Scope‑Lock allowlist |
| `devloka security scope status` | Show current scope |
| `devloka security report` | Generate audit‑ready PDF |
| `devloka ai start / stop` | Control Ollama service |
| `devloka ai chat` | Interactive terminal chat (using Ollama API) |
| `devloka ai review <file>` | Ask LLM to review code/file |

---

## 4. Build & Distribution Pipeline

### 4.1 ISO Generation (Cubic Workflow)
1. Base ISO: `ubuntu-24.04.2-desktop-amd64.iso`
2. Extract with Cubic.
3. Chroot script:
   ```bash
   apt update
   apt install -y devloka-desktop  # meta‑package pulling all components
   systemctl disable unattended-upgrades  # optional
   apt clean
   ```
4. Generate ISO with Cubic.
5. Sign with GPG (devloka-release-key).
6. Publish to releases.devloka.io.

### 4.2 APT Repository

· Hosted on apt.devloka.io (CloudFront + S3).
· Signed with devloka-archive-keyring.gpg.
· Packages: devloka-cli, devloka-desktop, devloka-scope-lock, etc.

### 4.3 Update Channels

· Stable – production‑ready, security updates only.
· Preview – monthly snapshots for early adopters.
· Enterprise – private, with LTS support.

---

## 5. Security Architecture

### 5.1 Trust Boundaries

```
[User] <───> [Devloka CLI] <───> [System Services]
                │                      │
                ▼                      ▼
        [Scope‑Lock Engine]      [Ubuntu Base]
                │                      │
                ▼                      ▼
        [eBPF/nftables]          [Linux Kernel]
```

### 5.2 Hardening Measures

· LUKS + TPM2 – full disk encryption with optional PIN; TPM2 unlock for enterprise.
· AppArmor – profiles for all Devloka services (in development).
· Read‑only root (optional) – for immutable deployments.
· Audit logging – devloka audit logs to /var/log/devloka/audit.log with hash chain.

### 5.3 Scope‑Lock Threat Mitigations

| Threat | Mitigation |
|--------|-----------|
| Unprivileged user disables scope | Scope‑Lock requires CAP_NET_ADMIN; CLI uses polkit. |
| eBPF program bypass | Program pinned to cgroup; cannot be unloaded without CAP_BPF. |
| DNS trickery | Allowlist supports IP ranges; DNS resolution occurs inside container. |

---

## 6. Development & Contribution

### 6.1 Repository Structure

```
devloka/
├── cli/               # devloka-cli Python source
├── scope-lock/        # Rust + eBPF code
├── desktop/           # GNOME extensions, theming
├── iso-profiles/      # Cubic overlay definitions
├── docs/              # Documentation
└── .github/workflows/ # CI/CD
```

### 6.2 Building from Source

```bash
# Build CLI package
cd cli
make deb

# Build scope‑lock
cd ../scope-lock
cargo build --release
```

---

## 7. Roadmap

| Version | Focus | Release |
|---------|-------|---------|
| v0.1 (Preview) | CLI + Scope‑Lock (nftables) + Ollama | Q2 2026 |
| v1.0 (Stable) | eBPF Scope‑Lock, TPM2, audit logging | Q3 2026 |
| v1.5 (Enterprise) | SAML, remote attestation, custom branding | Q4 2026 |
| v2.0 (LTS) | Immutable root, confidential computing | 2027 |

---

## 8. License & Legal

· Core components: GPL‑3.0
· Documentation: CC BY‑SA 4.0
· Enterprise Edition: Commercial (source‑available, not FOSS)

---

This document is maintained by the Devloka Core Team and updated with each release.
