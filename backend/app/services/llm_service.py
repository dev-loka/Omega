import httpx
from typing import Optional
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class LLMService:
    """Service for interacting with local LLM (Ollama)"""
    
    def __init__(self, model: str = None):
        self.model = model or settings.OLLAMA_MODEL
        self.base_url = settings.OLLAMA_URL
    
    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> str:
        """
        Generate text using LLM
        
        Args:
            prompt: User prompt
            system_prompt: System prompt for context
            temperature: Sampling temperature (0-1)
            max_tokens: Maximum tokens to generate
            
        Returns:
            Generated text
        """
        
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": prompt,
                        "system": system_prompt or "You are a helpful AI assistant specialized in cybersecurity.",
                        "temperature": temperature,
                        "stream": False,
                        "options": {
                            "num_predict": max_tokens
                        }
                    }
                )
                
                if response.status_code == 200:
                    return response.json().get("response", "")
                else:
                    logger.error(f"LLM API error: {response.status_code}")
                    return f"[LLM unavailable - using fallback analysis]"
                    
        except Exception as e:
            logger.error(f"LLM service error: {str(e)}")
            return f"[LLM unavailable - {str(e)}]"
    
    async def analyze_vulnerability(self, vuln_data: Dict) -> str:
        """Analyze vulnerability using LLM"""
        prompt = f"""
        Analyze this security vulnerability:
        
        Type: {vuln_data.get('type')}
        Severity: {vuln_data.get('severity')}
        CVSS Score: {vuln_data.get('cvss_score')}
        Description: {vuln_data.get('description')}
        
        Provide:
        1. Detailed severity assessment
        2. Exploitation difficulty (Easy/Medium/Hard)
        3. Step-by-step remediation instructions
        4. Additional security recommendations
        """
        
        return await self.generate(
            prompt,
            "You are a cybersecurity expert specializing in vulnerability analysis and remediation."
        )
    
    async def analyze_code(self, code: str, language: str) -> str:
        """Analyze code for security issues"""
        prompt = f"""
        Analyze this {language} code for security vulnerabilities:
        
        ```{language}
        {code}
        ```
        
        Identify:
        1. Security vulnerabilities
        2. Code quality issues
        3. Best practice violations
        4. Recommended fixes
        """
        
        return await self.generate(
            prompt,
            "You are a code security expert."
        )
