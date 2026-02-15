# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**DO NOT** open public issues for security vulnerabilities.

Please report security vulnerabilities to: **security@devloka.ai**

**PGP Key:** Available on request

### Response Time
- **Initial Response:** Within 24 hours
- **Status Update:** Within 72 hours
- **Fix Timeline:** Depends on severity (P1: 7 days, P2: 14 days, P3: 30 days)

### Bug Bounty Program

We offer rewards for security vulnerabilities:

| Severity | Reward | Examples |
|----------|--------|----------|
| **P1 (Critical)** | $10,000 | Remote code execution, authentication bypass |
| **P2 (High)** | $5,000 | SQL injection, XSS, privilege escalation |
| **P3 (Medium)** | $1,000 | CSRF, information disclosure |
| **P4 (Low)** | Swag & recognition | Minor security improvements |

### Scope

**In Scope:**
- `/src` application code
- Docker images and configurations
- API endpoints (`/api/*`)
- Authentication and authorization
- Data encryption and storage

**Out of Scope:**
- Third-party dependencies (report to upstream)
- Social engineering attacks
- Physical attacks
- Denial of service (DoS)

### Disclosure Policy

We follow **responsible disclosure**:
1. Report vulnerability privately
2. We investigate and confirm
3. We develop and test a fix
4. We release the fix
5. Public disclosure after 90 days (or sooner if agreed)

### Hall of Fame

Security researchers who help us will be acknowledged in our [SECURITY_HALL_OF_FAME.md](SECURITY_HALL_OF_FAME.md).

---

For more details, see [CONTRIBUTING.md](CONTRIBUTING.md).

**Contact:** security@devloka.ai
