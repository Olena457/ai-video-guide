from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.guide import router

app = FastAPI(title="Video AI Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         
    allow_credentials=False,      
    allow_methods=["*"],          
    allow_headers=["*"],         
)

app.include_router(router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Video AI API is running"}