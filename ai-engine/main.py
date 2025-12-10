import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Warning: GEMINI_API_KEY not found in .env")

genai.configure(api_key=api_key)


# -------------------------------
#  FORCE A SAFE MODEL SELECTION
# -------------------------------

SAFE_MODELS = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
]

def get_best_model():
    try:
        # Fetch available models
        available_models = [m.name.replace("models/", "") for m in genai.list_models()]
        print(f"Available models: {available_models}")

        # Choose a safe model (avoids gemini-2.0-flash)
        for m in SAFE_MODELS:
            if m in available_models:
                print(f"Using safe model: {m}")
                return genai.GenerativeModel(m)

        # Fallback: pick any supported generateContent model
        for m in genai.list_models():
            if "generateContent" in m.supported_generation_methods:
                model_name = m.name.replace("models/", "")
                print(f"Fallback model: {model_name}")
                return genai.GenerativeModel(model_name)

        # Absolute last fallback
        print("No valid model found; using gemini-1.5-flash")
        return genai.GenerativeModel("gemini-1.5-flash")

    except Exception as e:
        print(f"Error selecting model: {e}")
        return genai.GenerativeModel("gemini-1.5-flash")


model = get_best_model()


# -------------------------------
#  FASTAPI APP
# -------------------------------

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str


@app.get("/")
def root():
    return {"message": "CodeREX AI Engine is running with Gemini"}


@app.post("/generate", response_model=ChatResponse)
async def generate_chat(request: ChatRequest):
    try:
        chat = model.start_chat(history=[])
        output = chat.send_message(request.message)
        return ChatResponse(response=output.text)

    except Exception as e:
        err = str(e)

        # Detect quota exceeded (429)
        if "quota" in err.lower() or "429" in err:
            raise HTTPException(
                status_code=429,
                detail="Gemini API quota exceeded. Enable billing or switch model."
            )

        raise HTTPException(status_code=500, detail=err)
