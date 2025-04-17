from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Autoriser le frontend (localhost:3000 par exemple)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Tu peux restreindre à ["http://localhost:3000"] si besoin
    allow_credentials=True,
    allow_methods=["http://localhost:3000"],
    allow_headers=["http://localhost:3000"],
)

class Message(BaseModel):
    message: str
@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API ChatGPT 😄"}

@app.post("/chat")
async def chat(msg: Message):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4.5-turbo",  # ou "gpt-4" si tu as accès
            messages=[
                {"role": "user", "content": msg.message}
            ]
        )

        reply = response.choices[0].message.content.strip()
        return {"reply": reply}

    except Exception as e:
        return {"error": str(e)}
