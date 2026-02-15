from sqlalchemy import Column, String, DateTime, Float
from sqlalchemy.dialects.postgresql import UUID, JSON
from app.database import Base
from datetime import datetime
import uuid

class AgentLog(Base):
    """Agent execution log model"""
    __tablename__ = "agent_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_name = Column(String, nullable=False, index=True)
    action = Column(String)
    input_data = Column(JSON)
    output_data = Column(JSON)
    status = Column(String)  # success, failed, timeout
    execution_time = Column(Float)  # in seconds
    error_message = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    def __repr__(self):
        return f"<AgentLog {self.agent_name} - {self.action}>"
