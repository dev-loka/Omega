from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
from datetime import datetime
import uuid

class Pod(Base):
    """Kubernetes Pod model"""
    __tablename__ = "pods"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, index=True)
    namespace = Column(String, default='default')
    status = Column(String)
    restarts = Column(Integer, default=0)
    age = Column(String)
    node = Column(String)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Pod {self.name} - {self.status}>"


class Deployment(Base):
    """Kubernetes Deployment model"""
    __tablename__ = "deployments"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, index=True)
    namespace = Column(String, default='default')
    replicas = Column(String)
    available = Column(String)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Deployment {self.name}>"
