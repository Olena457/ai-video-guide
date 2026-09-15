
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class TaskCreate(BaseModel):
    title: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=450)
    priority: int = Field(default=1, ge=1, le=10)
    category: Optional[str] = None
    due_date: Optional[str] = None
    status: Optional[str] = "todo"

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=450)
    status: Optional[str] = None
    priority: Optional[int] = Field(None, ge=1, le=10)
    category: Optional[str] = None
    due_date: Optional[str] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    priority: int
    category: Optional[str]
    due_date: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)