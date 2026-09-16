from fastapi import APIRouter, UploadFile, File, HTTPException, status
from schemas import GuideResponse
from services import process_video_and_extract_frames, analyze_frames_with_gemini

router = APIRouter(
    prefix="/api",
    tags=["Guide Generation"]
)

@router.post("/generate-guide", response_model=GuideResponse)
async def generate_guide(video_file: UploadFile = File(...)):
    if not video_file.filename.lower().endswith(('.mp4', '.mov', '.webm')):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File format must be MP4, MOV or WEBM."
        )

    try:
        video_bytes = await video_file.read()

        # 2. Обробка кадрів у RAM
        payload, frames_b64 = process_video_and_extract_frames(video_bytes, fps_interval=2)

        # 3. Аналіз через Gemini API
        ai_result, metrics = analyze_frames_with_gemini(payload, frames_b64)

        return GuideResponse(
            status="success",
            title=ai_result.get("title", "How-To Guide"),
            steps=ai_result.get("steps", []),
            warnings=ai_result.get("warnings", []),
            metrics=metrics
        )

    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing video: {str(e)}"
        )