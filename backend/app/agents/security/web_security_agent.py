from app.agents.base import BaseAgent
from typing import Dict, Any, List
import asyncio
import time

class WebSecurityAgent(BaseAgent):
    """Web Security Agent - OWASP Top 10, business logic flaws, security headers"""
    
    def __init__(self):
        super().__init__(
            name="WebSecurityAgent",
            description="Tests for web vulnerabilities (OWASP Top 10, XSS, SQLi, CSRF)",
            category="security"
        )
    
    async def execute(self, target: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Execute web security tests"""
        start_time = time.time()
        
        vulnerabilities = []
        
        # Test for common vulnerabilities
        vulnerabilities.extend(await self.test_xss(target))
        vulnerabilities.extend(await self.test_sql_injection(target))
        vulnerabilities.extend(await self.test_csrf(target))
        vulnerabilities.extend(await self.test_security_headers(target))
        vulnerabilities.extend(await self.test_authentication(target))
        
        # LLM analysis
        analysis_prompt = f"""
        Analyze these web vulnerabilities found on {target}:
        
        Total vulnerabilities: {len(vulnerabilities)}
        Critical: {len([v for v in vulnerabilities if v['severity'] == 'critical'])}
        High: {len([v for v in vulnerabilities if v['severity'] == 'high'])}
        Medium: {len([v for v in vulnerabilities if v['severity'] == 'medium'])}
        
        Vulnerabilities:
        {vulnerabilities}
        
        Provide:
        1. Risk assessment
        2. Exploitation likelihood
        3. Prioritized remediation plan
        """
        
        results = {
            "target": target,
            "vulnerabilities": vulnerabilities,
            "count": len(vulnerabilities),
            "severity_breakdown": {
                "critical": len([v for v in vulnerabilities if v['severity'] == 'critical']),
                "high": len([v for v in vulnerabilities if v['severity'] == 'high']),
                "medium": len([v for v in vulnerabilities if v['severity'] == 'medium']),
                "low": len([v for v in vulnerabilities if v['severity'] == 'low'])
            },
            "ai_analysis": await self.analyze_with_llm(analysis_prompt, "You are a web security expert.")
        }
        
        execution_time = time.time() - start_time
        self.log_execution("web_security_scan", results, execution_time)
        
        return results
    
    async def test_xss(self, target: str) -> List[Dict]:
        """Test for XSS vulnerabilities (mock implementation)"""
        await asyncio.sleep(0.1)
        return [
            {
                "type": "Reflected XSS",
                "severity": "high",
                "cvss_score": 7.5,
                "location": f"{target}/search?q=",
                "payload": "<script>alert(1)</script>",
                "description": "User input is reflected without sanitization"
            }
        ]
    
    async def test_sql_injection(self, target: str) -> List[Dict]:
        """Test for SQL injection (mock implementation)"""
        await asyncio.sleep(0.1)
        return [
            {
                "type": "SQL Injection",
                "severity": "critical",
                "cvss_score": 9.8,
                "location": f"{target}/login",
                "payload": "' OR '1'='1",
                "description": "SQL injection in login form allows authentication bypass"
            }
        ]
    
    async def test_csrf(self, target: str) -> List[Dict]:
        """Test for CSRF vulnerabilities (mock implementation)"""
        await asyncio.sleep(0.1)
        return [
            {
                "type": "CSRF",
                "severity": "medium",
                "cvss_score": 6.5,
                "location": f"{target}/api/update-profile",
                "description": "No CSRF token validation on state-changing operations"
            }
        ]
    
    async def test_security_headers(self, target: str) -> List[Dict]:
        """Check security headers (mock implementation)"""
        await asyncio.sleep(0.1)
        return [
            {
                "type": "Missing Security Header",
                "severity": "medium",
                "cvss_score": 5.3,
                "header": "Content-Security-Policy",
                "description": "CSP header not set, vulnerable to XSS attacks"
            },
            {
                "type": "Missing Security Header",
                "severity": "low",
                "cvss_score": 3.7,
                "header": "X-Frame-Options",
                "description": "X-Frame-Options not set, vulnerable to clickjacking"
            }
        ]
    
    async def test_authentication(self, target: str) -> List[Dict]:
        """Test authentication mechanisms (mock implementation)"""
        await asyncio.sleep(0.1)
        return [
            {
                "type": "Weak Password Policy",
                "severity": "medium",
                "cvss_score": 5.0,
                "description": "Password policy allows weak passwords (min 6 chars, no complexity)"
            }
        ]
