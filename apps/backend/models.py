
from sqlalchemy import Column, Integer, String
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True, nullable=False) 
    description = Column(String(450), nullable=True)
    status = Column(String, default="todo", index=True) 
    priority = Column(Integer, default=1)  
    category = Column(String, nullable=False)
    due_date = Column(String, nullable=True)