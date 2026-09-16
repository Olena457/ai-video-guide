import base64
from io import BytesIO
import json
import tempfile
import time
import cv2
from PIL import Image

from .config import gemini_model
from .prompts import GUIDE_GENERATION_PROMPT


def process_video_and_extract_frames(video_bytes: bytes, fps_interval: int = 2):
    with tempfile.NamedTemporaryFile(suffix=".mp4", delete=True) as temp_video:
        temp_video.write(video_bytes)
        temp_video.flush()

        cap = cv2.VideoCapture(temp_video.name)
        fps = cap.get(cv2.CAP_PROP_FPS) or 30
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = total_frames / fps

        if duration > 125:
            cap.release()
            raise ValueError("Відео перевищує допустиму тривалість у 2 хвилини.")

        frame_stride = int(fps * fps_interval)
        payload_for_gemini = []
        frames_base64 = {}

        frame_count = 0
        extracted_idx = 0

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            if frame_count % frame_stride == 0:
                color_converted = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                pil_img = Image.fromarray(color_converted)

                buffered = BytesIO()
                pil_img.save(buffered, format="JPEG", quality=85)
                img_b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
                b64_url = f"data:image/jpeg;base64,{img_b64}"

                seconds = frame_count / fps
                timestamp = f"{int(seconds // 60):02d}:{int(seconds % 60):02d}"

                payload_for_gemini.append(
                    f"Frame Index {extracted_idx} (Timestamp: {timestamp}):"
                )
                payload_for_gemini.append(pil_img)

                frames_base64[extracted_idx] = b64_url
                extracted_idx += 1

            frame_count += 1

        cap.release()

    return payload_for_gemini, frames_base64


def analyze_frames_with_gemini(payload_for_gemini: list, frames_base64: dict):
    full_request = [GUIDE_GENERATION_PROMPT] + payload_for_gemini

    start_time = time.time()
    response = gemini_model.generate_content(
        full_request,
        generation_config={"response_mime_type": "application/json"},
    )
    execution_time = time.time() - start_time

    try:
        result_data = json.loads(response.text)
    except json.JSONDecodeError:
        raise ValueError("AI повернув некоректний JSON формат.")

    for step in result_data.get("steps", []):
        f_idx = step.get("frame_index", 0)
        step["screenshot_base64"] = frames_base64.get(f_idx, None)

    usage = getattr(response, "usage_metadata", None)
    prompt_tokens = usage.prompt_token_count if usage else 0
    completion_tokens = usage.candidates_token_count if usage else 0
    total_tokens = usage.total_token_count if usage else 0

    estimated_cost = (prompt_tokens / 1_000_000 * 0.075) + (
        completion_tokens / 1_000_000 * 0.30
    )

    metrics = {
        "processing_time_seconds": round(execution_time, 2),
        "prompt_tokens": prompt_tokens,
        "completion_tokens": completion_tokens,
        "total_tokens": total_tokens,
        "estimated_cost_usd": round(estimated_cost, 6),
    }

    return result_data, metrics