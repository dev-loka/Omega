from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import subprocess
import shlex
from typing import Optional

router = APIRouter()

# Pydantic schemas
class CommandRequest(BaseModel):
    command: str

class CommandResponse(BaseModel):
    output: str
    exit_code: int
    success: bool

# Whitelist of allowed commands for security
ALLOWED_COMMANDS = [
    "kubectl", "helm", "docker", "devloka", "git"
]

@router.post("/execute", response_model=CommandResponse)
async def execute_command(request: CommandRequest):
    """Execute terminal command (whitelisted only)"""
    
    # Parse command
    parts = shlex.split(request.command)
    if not parts or parts[0] not in ALLOWED_COMMANDS:
        raise HTTPException(status_code=403, detail=f"Command '{parts[0] if parts else 'empty'}' not allowed")
    
    # Simulate command execution for development
    # In production, this would execute real commands
    simulated_output = simulate_command(request.command)
    
    return {
        "output": simulated_output,
        "exit_code": 0,
        "success": True
    }

def simulate_command(command: str) -> str:
    """Simulate command execution for development"""
    
    if "kubectl get pods" in command:
        return """NAME                     READY   STATUS    RESTARTS   AGE
web3-backend-7d8f5d4c5-abcde   1/1     Running   0          2d
redis-cache-6f9d7c9f8-xyz12   1/1     Running   0          2d
postgres-5f7b9c6d8-98765      1/1     Running   0          2d"""
    
    elif "kubectl logs" in command:
        return """[INFO] 2026-02-14T10:23:45Z - Server started
[INFO] 2026-02-14T10:23:46Z - Connected to database
[WARN] 2026-02-14T10:24:01Z - Slow query detected"""
    
    elif "helm list" in command:
        return """NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART
web3-backend    default         3               2026-02-12 15:43:22 +0530 IST    deployed        web3-backend-2.2.0"""
    
    elif "docker ps" in command:
        return """CONTAINER ID   IMAGE          COMMAND                  CREATED       STATUS       PORTS                    NAMES
abc123def456   web3-backend   "python app.py"          2 days ago    Up 2 days    0.0.0.0:8000->8000/tcp   backend"""
    
    elif "devloka status" in command:
        return """DEV LOK AI Platform Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ API Server:        Running
✓ Database:          Connected
✓ Redis:             Connected
✓ LLM Service:       Ready
✓ Active Agents:     30/30
✓ Scans Running:     3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"""
    
    elif "help" in command:
        return """Available commands:
  kubectl get pods          - List all pods
  kubectl logs <pod>        - View pod logs
  kubectl describe <pod>    - Describe pod details
  helm list                 - List Helm releases
  docker ps                 - List containers
  devloka status           - Platform status
  devloka agents           - List all agents
  help                     - Show this help"""
    
    else:
        return f"Command executed: {command}\nOutput: Success"

@router.get("/history")
async def get_command_history(limit: int = 50):
    """Get command history"""
    return {
        "commands": [
            {"command": "kubectl get pods", "timestamp": "2026-02-14T10:30:00Z"},
            {"command": "helm list", "timestamp": "2026-02-14T10:25:00Z"},
            {"command": "devloka status", "timestamp": "2026-02-14T10:20:00Z"},
        ]
    }
