# Devloka Omega – Complete Project Setup & Launch Guide

**This document contains everything you need to set up the Devloka Omega GitHub repository, build the first ISO, and execute the launch strategy.**

---

## 📦 Step 1: Repository Initialization

```bash
# Create the repository on GitHub (via web UI)
# Repository name: Omega
# Description: "AI‑Native Sovereign Developer OS – Ubuntu‑based with offline LLM, eBPF scope enforcement, and Web3 tooling."
# Public, GPL-3.0 license, .gitignore: Python

# Clone locally
git clone git@github.com:dev-loka/Omega.git
cd Omega

# Add all files from this package
# (README.md, SECURITY.md, CONTRIBUTING.md, ROADMAP.md, LICENSE, TECHNICAL_ARCHITECTURE.md, .github/workflows/*)

git add .
git commit -m "Initial commit: core documentation and workflows"
git push origin main
```

---

## 🛠️ Step 2: Enable GitHub Features

· Go to Settings > Pages – enable GitHub Pages from /root (will serve README).
· Go to Settings > Security > Code security and analysis – enable:
  · Dependabot alerts
  · CodeQL scanning
  · Secret scanning
· Go to Settings > Actions > General – allow all actions.

---

## 🔧 Step 3: Set Up Secrets for CI/CD

Add these secrets to the repository (Settings > Secrets and variables > Actions):

| Secret Name | Value |
|-------------|-------|
| GPG_PRIVATE_KEY | GPG private key for signing ISOs (export with `gpg --export-secret-keys --armor KEYID`) |
| GPG_PASSPHRASE | Passphrase for the GPG key |
| DOCKERHUB_USERNAME | (optional) Docker Hub username for publishing containers |
| DOCKERHUB_TOKEN | (optional) Docker Hub access token |

---

## 🖥️ Step 4: Local Build Environment (for ISO generation)

Set up a dedicated build machine (Ubuntu 24.04 recommended):

```bash
# Install dependencies
sudo apt update && sudo apt install -y cubic xorriso isolinux genisoimage \
  python3-pip docker.io qemu-kvm libvirt-daemon-system

# Install Cubic from PPA
sudo add-apt-repository ppa:cubic-wizard/release
sudo apt update
sudo apt install cubic

# Clone the repo
git clone https://github.com/dev-loka/Omega.git
cd Omega/iso-profiles
```

### Test ISO Build Manually

```bash
./build.sh --base ubuntu-24.04.2-desktop-amd64.iso --output devloka-preview.iso
```

---

## 🧪 Step 5: Testing the ISO

```bash
# Quick test with QEMU
qemu-system-x86_64 -cdrom devloka-preview.iso -m 4096 -enable-kvm -cpu host
```

Check:

· Boots to GNOME desktop
· Devloka CLI available (`devloka doctor`)
· Scope‑Lock functional (`sudo devloka scope set example.com`)
· Ollama pre‑pulled model (`ollama list`)

---

## 🚀 Step 6: First Release (v0.1-preview)

1. Create a new tag:
   ```bash
   git tag -a v0.1-preview -m "Preview release – CLI, nftables scope, Ollama"
   git push origin v0.1-preview
   ```
2. The release.yml workflow will:
   · Build ISO
   · Sign with GPG
   · Generate checksums
   · Create GitHub Release with artifacts
   · (Optional) Anchor hash on Ethereum blockchain (requires ETH_PRIVATE_KEY secret)
3. Announce on:
   · Twitter: @devloka_io
   · Discord: #announcements
   · Reddit: r/linux, r/netsec, r/selfhosted (text posts)
   · Hacker News: Show HN

---

## 📈 Step 7: Post‑Launch SEO & Community

· Write 3 blog posts (see SEO-METADATA.md for topics)
· Submit to product directories: AlternativeTo, Slant, LinuxLinks, DistroWatch
· Engage on Discord: welcome new users, answer questions
· Monitor GitHub Issues: tag bugs and feature requests

---

## ✅ Launch Checklist

- [ ] GitHub repository public
- [ ] All core documentation committed
- [ ] CI/CD workflows tested
- [ ] First ISO built and tested
- [ ] GPG signing configured
- [ ] Release created (v0.1-preview)
- [ ] Announcement posts published
- [ ] Discord server live
- [ ] Twitter account active
- [ ] First 100 stars achieved

---

Congratulations! You have successfully launched Devloka Omega. 🖤

Now the real work begins – listen to the community, iterate, and build the sovereign developer OS the world needs.
