from typing import List, Dict, Any
from app.agents.security.recon_agent import ReconAgent
from app.agents.security.web_security_agent import WebSecurityAgent
import asyncio
import logging

logger = logging.getLogger(__name__)

class AgentCoordinator:
    """Coordinates execution of multiple agents in the OMEGA BLACK system"""
    
    def __init__(self):
        # Initialize all agents
        self.agents = {
            # Security Agents (16 total, implementing 2 for now)
            "ReconAgent": ReconAgent(),
            "WebSecurityAgent": WebSecurityAgent(),
            # TODO: Add remaining 28 agents
        }
        
        logger.info(f"AgentCoordinator initialized with {len(self.agents)} agents")
    
    async def execute_scan(
        self,
        scan_id: str,
        target: str,
        agent_names: List[str]
    ) -> Dict[str, Any]:
        """
        Execute scan with specified agents
        
        Args:
            scan_id: Unique scan identifier
            target: Target to scan
            agent_names: List of agent names to use
            
        Returns:
            Combined results from all agents
        """
        
        results = {
            "scan_id": scan_id,
            "target": target,
            "agents_used": agent_names,
            "findings": {}
        }
        
        context = {"scan_id": scan_id, "target": target}
        
        # Phase 1: Reconnaissance (if requested)
        if "ReconAgent" in agent_names:
            logger.info(f"[{scan_id}] Starting reconnaissance phase")
            recon_results = await self.agents["ReconAgent"].execute(target, context)
            results["findings"]["reconnaissance"] = recon_results
            context["recon"] = recon_results
        
        # Phase 2: Vulnerability scanning (parallel execution)
        vuln_agents = [a for a in agent_names if a != "ReconAgent" and a in self.agents]
        
        if vuln_agents:
            logger.info(f"[{scan_id}] Starting vulnerability scanning with {len(vuln_agents)} agents")
            vuln_tasks = [
                self.agents[agent].execute(target, context)
                for agent in vuln_agents
            ]
            vuln_results = await asyncio.gather(*vuln_tasks, return_exceptions=True)
            
            for agent_name, result in zip(vuln_agents, vuln_results):
                if isinstance(result, Exception):
                    logger.error(f"[{scan_id}] Agent {agent_name} failed: {str(result)}")
                    results["findings"][agent_name] = {"error": str(result)}
                else:
                    results["findings"][agent_name] = result
        
        # Aggregate vulnerability count
        total_vulns = 0
        for finding in results["findings"].values():
            if isinstance(finding, dict) and "vulnerabilities" in finding:
                total_vulns += len(finding["vulnerabilities"])
        
        results["total_vulnerabilities"] = total_vulns
        
        logger.info(f"[{scan_id}] Scan completed. Found {total_vulns} vulnerabilities")
        
        return results
    
    def get_agent_health(self) -> Dict[str, str]:
        """Get health status of all agents"""
        return {
            name: agent.status
            for name, agent in self.agents.items()
        }
    
    def get_available_agents(self) -> List[Dict[str, str]]:
        """Get list of available agents"""
        return [agent.get_info() for agent in self.agents.values()]
