from pydantic import BaseModel, Field, field_validator
from typing import List, Optional

class StepItem(BaseModel):
    step_number: int = Field(..., gt=0, description="Step number (starts from 1)")
    timestamp: str = Field(..., description="Timestamp in MM:SS format")
    instruction: str = Field(..., min_length=3, description="Step instruction text")
    frame_index: int = Field(..., ge=0, description="Frame index for screenshot")
    screenshot_base64: Optional[str] = Field(None, description="Base64-encoded screenshot image")

    @field_validator("timestamp")
    @classmethod
    def validate_timestamp(cls, v: str) -> str:
        parts = v.split(":")
        if len(parts) != 2 or not all(part.isdigit() for part in parts):
            raise ValueError("Timestamp must be in MM:SS format (e.g., 01:15)")
        return v

class MetricsData(BaseModel):
    processing_time_seconds: float = Field(..., ge=0, description="Processing time in seconds")
    prompt_tokens: int = Field(..., ge=0, description="Number of prompt tokens used")
    completion_tokens: int = Field(..., ge=0, description="Number of completion tokens used")
    total_tokens: int = Field(..., ge=0, description="Total number of tokens used")
    estimated_cost_usd: float = Field(..., ge=0, description="Estimated cost in USD")

class GuideResponse(BaseModel):
    status: str = Field(default="success", description="Response status")
    title: str = Field(..., min_length=2, description="Guide title")
    steps: List[StepItem] = Field(..., min_items=1, description="Steps list must contain at least 1 step")
    warnings: List[str] = Field(default_factory=list, description="List of warnings")
    metrics: MetricsData = Field(..., description="Processing metrics data")