from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ClosetInput(BaseModel):
    GPT_Model: Optional[str]
    Input: List[Dict[str, Any]]

