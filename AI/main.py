from fastapi import FastAPI
import uvicorn
import openai
import os
from models import ClosetInput

app = FastAPI()

openai.api_key = os.getenv('OPENAI_API_KEY')

@app.post('/ClosetAI/')
async def closet_ai(data: ClosetInput) -> str:
    return openai.ChatCompletion.create(
        model=data.GPT_Model,
        messages=data.Input
    )['choices'][0]['message']['content']


if __name__ == "__main__":
    config = uvicorn.Config("main:app", port=8888, log_level="info", reload=True)
    server = uvicorn.Server(config)
    server.run()