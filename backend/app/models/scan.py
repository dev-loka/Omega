from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SQLEnum, Float, Text, Integer
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime
import uuid

class SecurityScan(Base):
    """Security scan model"""
    __tablename__ = "security_scans"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    target = Column(String, nullable=False)
    scan_type = Column(String)  # web, api, container, cloud, network
    status = Column(SQLEnum('pending', 'running', 'completed', 'failed', name='scan_status'), default='pending')
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    vulnerabilities = relationship("Vulnerability", back_populates="scan", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<SecurityScan {self.target} - {self.status}>"


class Vulnerability(Base):
    """Vulnerability model"""
    __tablename__ = "vulnerabilities"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    scan_id = Column(UUID(as_uuid=True), ForeignKey('security_scans.id'))
    title = Column(String, nullable=False)
    severity = Column(SQLEnum('critical', 'high', 'medium', 'low', 'info', name='severity_level'))
    cvss_score = Column(Float)
    cwe_id = Column(String)
    description = Column(Text)
    remediation = Column(Text)
    proof_of_concept = Column(Text)
    agent_name = Column(String)  # Which agent discovered it
    confidence = Column(Float)  # AI confidence score
    metadata = Column(JSON)  # Additional data
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    scan = relationship("SecurityScan", back_populates="vulnerabilities")
    
    def __repr__(self):
        return f"<Vulnerability {self.title} - {self.severity}>"
