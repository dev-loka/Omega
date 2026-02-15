from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """Application settings"""
    
    # Database
    DATABASE_URL: str = "postgresql://devlok:devlok@localhost:5432/devlok"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # LLM
    OLLAMA_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.1:70b"
    
    # Security
    SECRET_KEY: str = "dev-lok-ai-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: list = ["http://localhost:3001", "http://localhost:3000"]
    
    # Agent Configuration
    MAX_CONCURRENT_AGENTS: int = 10
    AGENT_TIMEOUT: int = 300  # 5 minutes
    
    class Config:
        env_file = ".env"

settings = Settings()
