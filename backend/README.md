# DEV LOK AI Backend

🇮🇳 **India's First Sovereign AI-Native Developer & Cybersecurity Platform - Backend API**

## Overview

This is the backend infrastructure for DEV LOK AI, featuring:

- **FastAPI** REST API
- **30-Agent OMEGA BLACK System** for autonomous security operations
- **PostgreSQL** database for data persistence
- **Redis** for pattern memory and caching
- **Ollama/LLM** integration for AI-powered analysis
- **Docker Compose** for easy deployment

## Quick Start

### Prerequisites

- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start services with Docker Compose
docker-compose up -d

# Run database migrations
alembic upgrade head

# Start API server
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## API Endpoints

### Core Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/agents` - List all 30 agents

### Cluster Management

- `GET /api/cluster/pods` - List Kubernetes pods
- `GET /api/cluster/deployments` - List deployments
- `GET /api/cluster/events` - Get cluster events
- `GET /api/cluster/helm/releases` - List Helm releases

### Security Operations

- `POST /api/security/scan` - Initiate security scan
- `GET /api/security/scan/{scan_id}` - Get scan status
- `GET /api/security/scan/{scan_id}/vulnerabilities` - Get vulnerabilities
- `GET /api/security/scans` - List recent scans

### Terminal

- `POST /api/terminal/execute` - Execute command
- `GET /api/terminal/history` - Get command history

## 30-Agent OMEGA BLACK System

### Security Agents (16)

1. **ReconAgent** - Subdomain enumeration, port scanning
2. **WebSecurityAgent** - OWASP Top 10, XSS, SQLi
3. APISecurityAgent - REST/GraphQL security
4. ContainerSecurityAgent - Docker/K8s security
5. CloudSecurityAgent - AWS/Azure/GCP security
6. NetworkSecurityAgent - Network vulnerabilities
7. InjectionAgent - All injection types
8. AuthSecurityAgent - Authentication flaws
9. CryptoAgent - Cryptographic issues
10. MobileSecurityAgent - iOS/Android security
11. IoTSecurityAgent - IoT device security
12. BlockchainSecurityAgent - Smart contract audits
13. AISecurityAgent - ML model security
14. SupplyChainAgent - Dependency vulnerabilities
15. ThreatIntelAgent - Threat intelligence
16. ExploitGenAgent - Exploit generation

### Developer Agents (6)

17. CodeReviewAgent - Code quality & security
18. DebugAgent - Automated debugging
19. DevOpsAgent - CI/CD optimization
20. PerformanceAgent - Performance analysis
21. DocumentationAgent - Auto-documentation
22. TestingAgent - Test generation

### Compliance Agents (5)

23. SOC2Agent - SOC 2 compliance
24. ISO27001Agent - ISO 27001 compliance
25. GDPRAgent - GDPR compliance
26. HIPAAAgent - HIPAA compliance
27. ITActAgent - IT Act 2000 compliance

### Guardian Agents (3)

28. AnomalyDetectionAgent - Real-time anomaly detection
29. AutoRemediationAgent - Automated fixes
30. IncidentResponseAgent - Incident handling

## Architecture

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration
│   ├── database.py          # Database connection
│   ├── models/              # SQLAlchemy models
│   ├── api/                 # API routes
│   │   ├── cluster.py
│   │   ├── security.py
│   │   └── terminal.py
│   ├── agents/              # 30 AI agents
│   │   ├── base.py
│   │   ├── security/
│   │   ├── developer/
│   │   ├── compliance/
│   │   └── guardian/
│   └── services/            # Business logic
│       ├── llm_service.py
│       └── agent_coordinator.py
├── tests/
├── docker-compose.yml
└── requirements.txt
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://devlok:devlok@localhost:5432/devlok
REDIS_URL=redis://localhost:6379
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:70b
SECRET_KEY=your-secret-key-here
```

## Development

```bash
# Run tests
pytest

# Format code
black app/

# Lint
flake8 app/

# Type checking
mypy app/
```

## Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

## Production Deployment

For production deployment on Kubernetes:

```bash
# Build Docker image
docker build -t devlok-api:latest .

# Deploy to Kubernetes
kubectl apply -f k8s/

# Check status
kubectl get pods -n devlok
```

## License

Proprietary - DEV LOK AI Platform

## Support

For support, contact: support@devlok.ai

---

**Made in India 🇮🇳 | Sovereign AI Infrastructure**
