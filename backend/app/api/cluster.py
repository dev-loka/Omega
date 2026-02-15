from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# Pydantic schemas
class PodResponse(BaseModel):
    name: str
    namespace: str
    status: str
    restarts: int
    age: str

class DeploymentResponse(BaseModel):
    name: str
    namespace: str
    replicas: str
    available: str

class EventResponse(BaseModel):
    message: str
    reason: str
    timestamp: datetime

# Mock data for development (will be replaced with real Kubernetes API)
MOCK_PODS = [
    {"name": "web3-backend-7d8f5d4c5-abcde", "namespace": "default", "status": "Running", "restarts": 0, "age": "2d"},
    {"name": "redis-cache-6f9d7c9f8-xyz12", "namespace": "default", "status": "Running", "restarts": 0, "age": "2d"},
    {"name": "postgres-5f7b9c6d8-98765", "namespace": "default", "status": "Running", "restarts": 1, "age": "2d"},
    {"name": "frontend-6f8d9c4b3-12345", "namespace": "default", "status": "Running", "restarts": 0, "age": "1d"},
    {"name": "auth-service-7f5d4c3b2-54321", "namespace": "default", "status": "Pending", "restarts": 0, "age": "10m"},
]

MOCK_DEPLOYMENTS = [
    {"name": "web3-backend", "namespace": "default", "replicas": "3/3", "available": "3"},
    {"name": "redis-cache", "namespace": "default", "replicas": "2/2", "available": "2"},
    {"name": "postgres", "namespace": "default", "replicas": "1/1", "available": "1"},
]

@router.get("/pods", response_model=List[PodResponse])
async def get_pods(namespace: str = "default"):
    """Get all pods in namespace"""
    return [pod for pod in MOCK_PODS if pod["namespace"] == namespace]

@router.get("/deployments", response_model=List[DeploymentResponse])
async def get_deployments(namespace: str = "default"):
    """Get all deployments in namespace"""
    return [dep for dep in MOCK_DEPLOYMENTS if dep["namespace"] == namespace]

@router.get("/events")
async def get_cluster_events(namespace: str = "default", limit: int = 10):
    """Get recent cluster events"""
    return [
        {
            "message": "Deployment web3-backend scaled to 3 replicas",
            "reason": "ScalingReplicaSet",
            "timestamp": datetime.utcnow()
        },
        {
            "message": "Pod redis-cache-xyz12 restarted",
            "reason": "BackOff",
            "timestamp": datetime.utcnow()
        },
        {
            "message": "ConfigMap updated for postgres",
            "reason": "ConfigMapUpdate",
            "timestamp": datetime.utcnow()
        }
    ]

@router.get("/helm/releases")
async def get_helm_releases():
    """Get Helm releases"""
    return [
        {"name": "web3-backend", "status": "deployed", "chart": "web3-backend-2.2.0"},
        {"name": "redis-cache", "status": "deployed", "chart": "redis-7.0.0"},
        {"name": "postgres", "status": "upgrading", "chart": "postgresql-12.1.0"},
    ]
