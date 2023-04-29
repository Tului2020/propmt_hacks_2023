from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ClosetInput(BaseModel):
    model: Optional[str]='gpt-3.5-turbo'
    messages: List[Dict[str, Any]]

class ChatSummaryInput(BaseModel):
    model: Optional[str]='text-davinci-003'
    history: List[Dict[str, Any]]

class RiskAssessmentInput(BaseModel):
    model: Optional[str]='text-davinci-003'
    history: List[Dict[str, Any]]

class UserConversationInput(BaseModel):
    history: List[Dict[str, Any]]

class UserInput(BaseModel):
    model: Optional[str]='text-davinci-003'
    message: Dict[str, Any]