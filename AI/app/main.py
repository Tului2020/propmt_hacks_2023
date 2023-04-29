from typing import Any, Dict
from fastapi import FastAPI
import uvicorn
import openai
import os
from app.models import (
    ClosetInput, 
    ChatSummaryInput, 
    RiskAssessmentInput, 
    UserInput
)
from app.task_manager import TaskManager

app = FastAPI()

openai.api_key = os.getenv('OPENAI_API_KEY')

@app.post('/closet_ai/')
async def closet_ai(data: ClosetInput) -> str:
    return openai.ChatCompletion.create(
        model=data.model,
        messages=data.messages
    )['choices'][0]['message']['content']

@app.post('/chat_summary/')
async def chat_summary(data: ChatSummaryInput) -> str:
    task = TaskManager()
    prompt = task.chat_summary(data.history)
    return openai.Completion.create(
        model=data.model,
        prompt=prompt,
        max_tokens=1500
    )['choices'][0]['text']

@app.post('/risk_assessment/')
async def risk_assessment(data: RiskAssessmentInput) -> str:
    task = TaskManager()
    prompt = task.risk_assessment(data.history)
    return openai.Completion.create(
        model=data.model,
        prompt=prompt,
        max_tokens=1500
    )['choices'][0]['text']

@app.post('/emotion_classification/')
async def emotion_classification(data: UserInput) -> Dict[str, Any]:
    task = TaskManager()
    return task.emotion_classification(data.history)

if __name__ == "__main__":
    config = uvicorn.Config("main:app", port=8888, log_level="info", reload=True)
    server = uvicorn.Server(config)
    server.run()