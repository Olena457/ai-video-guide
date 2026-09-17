import os
from dotenv import load_dotenv
from google import genai
from groq import Groq

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
gemini_client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
openrouter_client = (
    OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=OPENROUTER_API_KEY,
    )
    if (OpenAI and OPENROUTER_API_KEY)
    else None
)