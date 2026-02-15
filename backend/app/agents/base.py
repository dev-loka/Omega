from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class BaseAgent(ABC):
    """Base class for all DEV LOK AI agents"""
    
    def __init__(self, name: str, description: str, category: str):
        self.name = name
        self.description = description
        self.category = category  # security, developer, compliance, guardian
        self.status = "ready"
    
    @abstractmethod
    async def execute(self, target: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute agent's primary function
        
        Args:
            target: Target to analyze (URL, IP, code, etc.)
            context: Additional context and data from other agents
            
        Returns:
            Dictionary containing agent's findings
        """
        pass
    
    async def analyze_with_llm(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Use LLM for analysis"""
        from app.services.llm_service import LLMService
        llm = LLMService()
        return await llm.generate(prompt, system_prompt)
    
    def log_execution(self, action: str, result: Dict[str, Any], execution_time: float):
        """Log agent execution for audit trail"""
        logger.info(f"[{self.name}] {action} completed in {execution_time:.2f}s")
        # In production, this would store in database
    
    def get_info(self) -> Dict[str, str]:
        """Get agent information"""
        return {
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "status": self.status
        }
