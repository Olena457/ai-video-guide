import os
import subprocess
import tempfile
import imageio_ffmpeg
from config import groq_client

def extract_audio_and_transcribe(video_bytes: bytes) -> str:
    if not groq_client:
        return ""

    temp_video_path = None
    audio_path = None

    try:
        with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as temp_video:
            temp_video.write(video_bytes)
            temp_video.flush()
            temp_video_path = temp_video.name

        audio_path = temp_video_path + ".mp3"
        ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

        subprocess.run(
            [
                ffmpeg_exe, "-y", "-i", temp_video_path,
                "-vn", "-acodec", "libmp3lame", "-b:a", "32k", "-ar", "16000", "-ac", "1", audio_path
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=True
        )

        if not os.path.exists(audio_path) or os.path.getsize(audio_path) == 0:
            return ""

        with open(audio_path, "rb") as audio_file:
            transcription = groq_client.audio.transcriptions.create(
                file=(os.path.basename(audio_path), audio_file),
                model="whisper-large-v3-turbo",
                response_format="verbose_json",
            )

        return transcription.text if hasattr(transcription, 'text') else ""

    except Exception as e:
        print(f"Audio transcription warning: {e}")
        return ""
        
    finally:
        if temp_video_path and os.path.exists(temp_video_path):
            try:
                os.remove(temp_video_path)
            except Exception:
                pass
                
        if audio_path and os.path.exists(audio_path):
            try:
                os.remove(audio_path)
            except Exception:
                pass