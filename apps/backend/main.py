from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.guide import router
app = FastAPI(title="Video AI Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000", 
        "http://192.168.1.3:3000",
        "https://frontend-seven-sable-65.vercel.app" 
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

app.include_router(router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Video AI API is running"}