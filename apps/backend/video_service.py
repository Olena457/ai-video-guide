import os
import tempfile
import base64
from io import BytesIO
import cv2
from PIL import Image

def process_video_and_extract_frames(video_bytes: bytes, fps_interval: int = 4):
    temp_video_path = None
    cap = None
    try:
        with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as temp_video:
            temp_video.write(video_bytes)
            temp_video.flush()
            temp_video_path = temp_video.name

        cap = cv2.VideoCapture(temp_video_path)
        fps = cap.get(cv2.CAP_PROP_FPS) or 30
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = total_frames / fps

        if duration > 120:
            raise ValueError("Video exceeds the allowed duration of 2 minutes.")

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
                height, width = frame.shape[:2]
                
                max_dim = 640
                if max(height, width) > max_dim:
                    scale = max_dim / max(height, width)
                    frame = cv2.resize(
                        frame, 
                        (int(width * scale), int(height * scale)), 
                        interpolation=cv2.INTER_AREA
                    )

                color_converted = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                pil_img = Image.fromarray(color_converted)

                buffered = BytesIO()
                pil_img.save(buffered, format="JPEG")
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

    finally:
        if cap is not None:
            try:
                cap.release()
            except Exception:
                pass

        if temp_video_path and os.path.exists(temp_video_path):
            try:
                os.remove(temp_video_path)
            except Exception:
                pass

    return payload_for_gemini, frames_base64