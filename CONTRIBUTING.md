# Contributing to Devloka Omega

First off, thank you for considering contributing to Devloka Omega! 🖤

We welcome contributions of all kinds – code, documentation, bug reports, feature requests, and community support.

---

## 📜 Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@devloka.io.

---

## 🧭 How Can I Contribute?

### 🐛 Reporting Bugs
- **Ensure the bug was not already reported** by searching [GitHub Issues](https://github.com/dev-loka/Omega/issues).
- If you can't find an existing issue, [open a new one](https://github.com/dev-loka/Omega/issues/new). Include:
  - A clear title and description
  - Steps to reproduce
  - Expected vs. actual behavior
  - Screenshots / logs if applicable
  - Your environment (Ubuntu version, Devloka version)

### 💡 Suggesting Enhancements
- Open an issue with the label `enhancement`.
- Describe the problem you're solving, not just your proposed solution.
- Include examples of how the feature would be used.

### 🔧 Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code, add tests.
3. Ensure the test suite passes (`make test`).
4. Update documentation if needed.
5. Issue the pull request.

---

## 🛠️ Development Setup

### Prerequisites
- Ubuntu 24.04 (or any Debian‑based system)
- Python 3.11+, Rust (for scope‑lock), Docker (for ISO builds)
- `make`, `git`, `curl`

### Clone the Repository
```bash
git clone https://github.com/dev-loka/Omega.git
cd Omega
```

### Build the CLI

```bash
cd cli
make install-dev  # installs in editable mode
devloka doctor
```

### Build Scope‑Lock

```bash
cd ../scope-lock
cargo build
sudo target/debug/scope-lock --help
```

### Test the ISO Build (Cubic)

```bash
cd iso-profiles
./build.sh  # downloads Ubuntu base and creates ISO in out/
```

---

## 🧪 Testing

· Unit tests: `make test` (CLI) / `cargo test` (scope‑lock)
· Integration tests: `./tests/run.sh` (requires root for nftables/eBPF tests)
· ISO sanity: Boot the generated ISO in QEMU:
  ```bash
  qemu-system-x86_64 -cdrom out/devloka.iso -m 4096 -enable-kvm
  ```

---

## 📝 Style Guides

### Python (CLI)

· Follow PEP 8
· Use type hints
· Docstrings: Google style
· Format with black and isort

### Rust (scope‑lock)

· Follow Rust API Guidelines
· Format with rustfmt

### Git Commit Messages

· Use present tense ("Add feature" not "Added feature")
· Reference issues and pull requests
· Keep first line under 50 characters

---

## ✅ Pull Request Process

1. Ensure your PR passes all CI checks (GitHub Actions).
2. Update CHANGELOG.md with your changes under the "Unreleased" section.
3. Request review from at least one maintainer.
4. After approval, a maintainer will merge it.

---

## 🧠 Areas That Need Help

· Documentation – tutorials, API references, architecture diagrams
· UI/UX – GNOME extensions, dashboard design
· Security – threat model reviews, AppArmor profiles
· Web3 – integration with more chains (Solana, Cosmos, etc.)
· Testing – automated test suites for ISO builds

---

## 🤝 Community

· Discord: discord.gg/devloka
· Twitter: @devloka_io
· Forum: discourse.devloka.io

---

Thank you for being part of Devloka Omega! 🖤
