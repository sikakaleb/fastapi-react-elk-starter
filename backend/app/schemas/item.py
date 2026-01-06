
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class ItemBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="Item title")
    description: Optional[str] = Field(None, description="Item description")


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255, description="Item title")
    description: Optional[str] = Field(None, description="Item description")


class ItemResponse(ItemBase):
    
    id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)  # Pydantic v2 syntax
