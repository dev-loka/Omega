# Contributing to DEVLOKA OMEGA

Welcome to the **Omega Cohort**. This document outlines the protocols for contributing to India's Sovereign AI Command Center.

## 🏛️ The Omega Cohort Philosophy

DEVLOKA OMEGA is not just a project—it's a movement toward digital sovereignty. We welcome contributions from:
- **Elite Developers** building the future of AI infrastructure
- **Security Researchers** hardening our OMEGA BLACK suite
- **GovTech Specialists** ensuring Indian IT Act compliance
- **AI/ML Engineers** optimizing local LLM orchestration

## 🚀 Quick Start

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/Omega.git
cd Omega
npm install
```

### 2. Run Locally
```bash
npm run dev
```

### 3. Run with Docker (Air-Gapped Mode)
```bash
docker-compose up -d
```

## 📋 Contribution Guidelines

### Code Standards
- **TypeScript First**: All new code must be TypeScript with strict mode enabled
- **Component Structure**: Follow atomic design principles (atoms → molecules → organisms)
- **Accessibility**: All interactive elements must have ARIA labels and 44px touch targets
- **Security**: Never commit API keys, credentials, or sensitive data

### Commit Message Format
Follow conventional commits:
```
feat: add OMEGA PHANTOM autonomous red teaming module
fix: resolve XSS vulnerability in prompt sanitizer
docs: update air-gap deployment guide
chore: upgrade dependencies for security patches
```

### Branch Naming
- `feature/phantom-red-team` - New features
- `fix/xss-vulnerability` - Bug fixes
- `docs/federated-learning` - Documentation
- `security/pqc-integration` - Security enhancements

## 🛡️ Security Contributions

### Bug Bounty Program
Report vulnerabilities in the OMEGA BLACK suite:
1. **DO NOT** open a public issue for security vulnerabilities
2. Email: security@devloka.ai (or create a private security advisory)
3. Include: Steps to reproduce, impact assessment, suggested fix

### Severity Levels
- **Critical**: Remote code execution, authentication bypass
- **High**: XSS, SQL injection, privilege escalation
- **Medium**: CSRF, information disclosure
- **Low**: Minor security improvements

## 🧬 Feature Contributions

### Priority Areas
1. **OMEGA PHANTOM**: Autonomous penetration testing
2. **Sovereign Swarm**: Federated learning protocols
3. **Q-SHIELD**: Post-quantum cryptography
4. **Project OVERSEER**: Multi-modal telemetry
5. **Phoenix Protocol**: Self-healing infrastructure

### Proposal Process
For major features:
1. Open a GitHub Discussion with `[RFC]` prefix
2. Outline: Problem, Solution, Technical Approach, Risks
3. Wait for maintainer feedback before implementation
4. Create implementation plan artifact
5. Submit PR with comprehensive tests

## 🧪 Testing Requirements

All PRs must include:
- **Unit Tests**: For utility functions and business logic
- **Integration Tests**: For API routes and database operations
- **E2E Tests**: For critical user flows (Cypress/Playwright)

```bash
npm run test        # Run all tests
npm run test:e2e    # Run end-to-end tests
npm run lint        # Check code quality
```

## 📚 Documentation

### What to Document
- New features in `/docs` folder
- API changes in inline JSDoc comments
- Configuration options in `.env.example`
- Deployment changes in `deployment_guide.md`

### Documentation Style
- Use clear, concise language
- Include code examples
- Add diagrams for complex architectures (use Mermaid)
- Link to relevant external resources

## 🎯 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Add tests
   - Update documentation

3. **Test Locally**
   ```bash
   npm run build
   npm run test
   ```

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Open Pull Request**
   - Use the PR template
   - Link related issues
   - Request review from maintainers

6. **Address Feedback**
   - Respond to code review comments
   - Make requested changes
   - Re-request review

## ✅ PR Checklist

- [ ] Code follows TypeScript/React best practices
- [ ] All tests pass (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Documentation updated
- [ ] Accessibility requirements met (ARIA labels, contrast ratios)
- [ ] Security considerations addressed
- [ ] Commit messages follow conventional format
- [ ] PR description is clear and complete

## 🤝 Code Review Standards

Reviewers will check for:
- **Functionality**: Does it work as intended?
- **Security**: Any vulnerabilities introduced?
- **Performance**: Any bottlenecks or memory leaks?
- **Maintainability**: Is the code readable and well-structured?
- **Testing**: Adequate test coverage?

## 🌐 Community

- **GitHub Discussions**: For questions and feature proposals
- **Discord**: [Join the Omega Cohort](#) (coming soon)
- **Twitter**: [@devloka_ai](#)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Digital Atmanirbharta. Together, we build the sovereign future.**

Ω DEVLOKA OMEGA
