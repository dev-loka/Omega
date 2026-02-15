# Quick Start Guide

Get DEVLOKA OMEGA up and running in **5 minutes**!

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js:** 18.0 or higher ([Download](https://nodejs.org/))
- **Docker:** 20.10+ ([Install Guide](https://docs.docker.com/get-docker/))
- **Git:** 2.40+ ([Download](https://git-scm.com/))
- **Optional:** NVIDIA GPU for accelerated LLM inference

### System Requirements

**Minimum:**
- CPU: 4 cores
- RAM: 16GB
- Storage: 50GB SSD
- OS: Linux (Ubuntu 22.04+, RHEL 8+, Debian 11+)

**Recommended:**
- CPU: 8+ cores with AVX2
- RAM: 32GB+ (64GB for large models)
- GPU: NVIDIA RTX 3060+ or A100
- Storage: 500GB+ NVMe SSD

---

## Option 1: Local Development (Fastest)

### Step 1: Clone the Repository

```bash
git clone https://github.com/dev-loka/Omega.git devloka-omega
cd devloka-omega
```

### Step 2: Install Dependencies

```bash
npm ci  # Faster than npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

**Default Credentials:**
- Username: `admin`
- Password: `omega2026`

⚠️ **Change these credentials on first login!**

---

## Option 2: Docker Deployment (Recommended for Production)

### Step 1: Clone the Repository

```bash
git clone https://github.com/dev-loka/Omega.git devloka-omega
cd devloka-omega
```

### Step 2: Configure Environment

```bash
cp .env.example .env
nano .env  # Edit environment variables
```

**Key Variables:**
```env
NODE_ENV=production
OLLAMA_API_URL=http://ollama:11434
CHROMA_API_URL=http://chromadb:8000
REDIS_URL=redis://redis:6379
POSTGRES_PASSWORD=<CHANGE_THIS>
```

### Step 3: Build and Start Services

```bash
docker-compose up -d --build
```

### Step 4: Verify Services

```bash
docker-compose ps
```

You should see 5 services running:
- `omega-ui` (Next.js app)
- `ollama` (LLM server)
- `chromadb` (Vector database)
- `redis` (Cache)
- `postgres` (Audit logs)

### Step 5: Access the Application

```
http://localhost:3000
```

---

## Option 3: Air-Gap Deployment (For Strategic Facilities)

### On Internet-Connected Machine

```bash
# 1. Clone and prepare
git clone https://github.com/dev-loka/Omega.git
cd Omega

# 2. Save Docker images
docker-compose pull
docker save -o omega-images.tar \
  devloka/omega:latest \
  ollama/ollama:latest \
  chromadb/chroma:latest \
  redis:latest \
  postgres:latest

# 3. Mirror npm dependencies
npm run offline-mirror

# 4. Transfer omega-images.tar and node_modules via USB
```

### On Air-Gapped Machine

```bash
# 1. Load Docker images
docker load -i omega-images.tar

# 2. Copy node_modules to project directory

# 3. Start services
docker-compose --profile airgap up -d
```

---

## Post-Installation Steps

### 1. Change Default Credentials

1. Log in with `admin` / `omega2026`
2. Go to **Settings** → **Security**
3. Update password and enable 2FA

### 2. Configure Operational Mode

Choose your mode:

```bash
# Academy Mode (Learning & Certification)
npm run omega:academy

# Research Mode (Red Team Lab)
npm run omega:research

# Federal Mode (GovTech Compliance)
npm run omega:federal
```

Or use the UI toggle in the top-right corner.

### 3. Pull LLM Models

```bash
# Access Ollama container
docker exec -it omega-ollama bash

# Pull models
ollama pull llama3
ollama pull mistral
ollama pull codellama

# For Indian languages
ollama pull bharatgen  # If available
```

### 4. Test OMEGA PHANTOM

1. Navigate to **Security** → **OMEGA PHANTOM**
2. Click **"Start Simulation"**
3. Watch real-time attack/defense visualization
4. Generate compliance report (PDF)

---

## Verification Checklist

After installation, verify:

- [ ] Application loads at http://localhost:3000
- [ ] Can log in with credentials
- [ ] Dashboard displays system stats
- [ ] Ollama API responds (check `/api/health`)
- [ ] ChromaDB is accessible
- [ ] Redis cache is working
- [ ] PostgreSQL audit logs are recording
- [ ] OMEGA PHANTOM can generate attacks
- [ ] OMEGA BLACK blocks threats

---

## Troubleshooting

### Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process or change port in docker-compose.yml
```

### Docker Services Not Starting

```bash
# Check logs
docker-compose logs -f omega-ui

# Restart services
docker-compose restart
```

### Ollama Model Download Fails

```bash
# Check Ollama logs
docker-compose logs ollama

# Manually pull model
docker exec -it omega-ollama ollama pull llama3
```

### Permission Denied Errors

```bash
# Fix permissions
sudo chown -R $USER:$USER .
chmod +x scripts/*
```

---

## Next Steps

Now that OMEGA is running:

1. **Explore Features:** [Operational Modes](Operational-Modes)
2. **Deploy Models:** [Sovereign Intelligence](Sovereign-Intelligence)
3. **Test Security:** [OMEGA PHANTOM](OMEGA-PHANTOM)
4. **Configure Compliance:** [IT Act Compliance](IT-Act-Compliance)
5. **Production Deploy:** [Production Checklist](Production-Checklist)

---

## Need Help?

- **📖 Full Documentation:** [Wiki Home](Home)
- **💬 Discord:** https://discord.gg/devloka
- **🐛 GitHub Issues:** https://github.com/dev-loka/Omega/issues
- **📧 Email:** support@devloka.ai

---

**🎉 Congratulations! You're now running India's first sovereign AI command center!**

**Ω DEVLOKA OMEGA | Made with 🇮🇳 in India**
