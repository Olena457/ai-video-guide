

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 

from database import engine
import models
import tasks 

# Initialize database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TaskFlow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000", 
        "http://192.168.1.3:3000",
        "https://python-taskflow.vercel.app"
        

    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

app.include_router(tasks.router)