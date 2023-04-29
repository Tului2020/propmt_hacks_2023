from typing import Any, Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import openai
import os
from app.models import (
    ClosetInput, 
    ChatSummaryInput, 
    RiskAssessmentInput, 
    UserConversationInput,
    UserInput
)
from app.task_manager import TaskManager


app = FastAPI(title='AI Server')
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
openai.api_key = os.getenv('OPENAI_API_KEY')
task = TaskManager()

@app.post('/closet_ai/')
async def closet_ai(data: ClosetInput) -> str:
    return openai.ChatCompletion.create(
        model=data.model,
        messages=data.messages
    )['choices'][0]['message']['content']

@app.post('/chat_summary/')
async def chat_summary(data: ChatSummaryInput) -> str:
    prompt = task.chat_summary(data.history)
    return openai.Completion.create(
        model=data.model,
        prompt=prompt,
        max_tokens=1500
    )['choices'][0]['text']

@app.post('/risk_assessment/')
async def risk_assessment(data: RiskAssessmentInput) -> str:
    prompt = task.risk_assessment(data.history)
    return openai.Completion.create(
        model=data.model,
        prompt=prompt,
        max_tokens=1500
    )['choices'][0]['text']

@app.post('/emotion_classification/')
async def emotion_classification(data: UserConversationInput) -> List[List[Dict[str, Any]]]:
    return task.emotion_classification(data.history)

@app.post('/intervention_check/')
async def intervention_check(data: UserInput) -> str:
    prompt = task.intervention_check(data.message)
    return openai.Completion.create(
        model=data.model,
        prompt=prompt,
        max_tokens=10
    )['choices'][0]['text'].replace('\n', '')

if __name__ == "__main__":
    config = uvicorn.Config("main:app", port=8888, log_level="info", reload=True)
    server = uvicorn.Server(config)
    server.run()