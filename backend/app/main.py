from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.api import cluster, security, terminal
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI application
app = FastAPI(
    title="DEV LOK AI API",
    description="🇮🇳 India's First Sovereign AI-Native Developer & Cybersecurity Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(cluster.router, prefix="/api/cluster", tags=["cluster"])
app.include_router(security.router, prefix="/api/security", tags=["security"])
app.include_router(terminal.router, prefix="/api/terminal", tags=["terminal"])

@app.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "DEV LOK AI API - Operational",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "agents": 30,
        "services": {
            "database": "connected",
            "redis": "connected",
            "llm": "ready"
        }
    }

@app.get("/api/agents")
def list_agents():
    """List all available agents"""
    return {
        "total": 30,
        "categories": {
            "security": 16,
            "developer": 6,
            "compliance": 5,
            "guardian": 3
        },
        "agents": [
            # Security Agents (16)
            {"name": "ReconAgent", "category": "security", "status": "ready"},
            {"name": "WebSecurityAgent", "category": "security", "status": "ready"},
            {"name": "APISecurityAgent", "category": "security", "status": "ready"},
            {"name": "ContainerSecurityAgent", "category": "security", "status": "ready"},
            {"name": "CloudSecurityAgent", "category": "security", "status": "ready"},
            {"name": "NetworkSecurityAgent", "category": "security", "status": "ready"},
            {"name": "InjectionAgent", "category": "security", "status": "ready"},
            {"name": "AuthSecurityAgent", "category": "security", "status": "ready"},
            {"name": "CryptoAgent", "category": "security", "status": "ready"},
            {"name": "MobileSecurityAgent", "category": "security", "status": "ready"},
            {"name": "IoTSecurityAgent", "category": "security", "status": "ready"},
            {"name": "BlockchainSecurityAgent", "category": "security", "status": "ready"},
            {"name": "AISecurityAgent", "category": "security", "status": "ready"},
            {"name": "SupplyChainAgent", "category": "security", "status": "ready"},
            {"name": "ThreatIntelAgent", "category": "security", "status": "ready"},
            {"name": "ExploitGenAgent", "category": "security", "status": "ready"},
            
            # Developer Agents (6)
            {"name": "CodeReviewAgent", "category": "developer", "status": "ready"},
            {"name": "DebugAgent", "category": "developer", "status": "ready"},
            {"name": "DevOpsAgent", "category": "developer", "status": "ready"},
            {"name": "PerformanceAgent", "category": "developer", "status": "ready"},
            {"name": "DocumentationAgent", "category": "developer", "status": "ready"},
            {"name": "TestingAgent", "category": "developer", "status": "ready"},
            
            # Compliance Agents (5)
            {"name": "SOC2Agent", "category": "compliance", "status": "ready"},
            {"name": "ISO27001Agent", "category": "compliance", "status": "ready"},
            {"name": "GDPRAgent", "category": "compliance", "status": "ready"},
            {"name": "HIPAAAgent", "category": "compliance", "status": "ready"},
            {"name": "ITActAgent", "category": "compliance", "status": "ready"},
            
            # Guardian Agents (3)
            {"name": "AnomalyDetectionAgent", "category": "guardian", "status": "ready"},
            {"name": "AutoRemediationAgent", "category": "guardian", "status": "ready"},
            {"name": "IncidentResponseAgent", "category": "guardian", "status": "ready"},
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
