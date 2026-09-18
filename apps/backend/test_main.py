from fastapi.testclient import TestClient
import io
from unittest.mock import patch
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "Video AI API is running"}

def test_generate_guide_invalid_format():
    fake_file = io.BytesIO(b"dummy content")
    response = client.post(
        "/api/generate-guide",
        files={"video_file": ("test.txt", fake_file, "text/plain")}
    )
    assert response.status_code == 400
    assert "File format must be MP4, MOV or WEBM" in response.json()["detail"]

def test_generate_guide_empty_file():
    empty_file = io.BytesIO(b"")
    response = client.post(
        "/api/generate-guide",
        files={"video_file": ("test.mp4", empty_file, "video/mp4")}
    )
    assert response.status_code == 400
    assert "Uploaded file is empty" in response.json()["detail"]

@patch("routers.guide.extract_audio_and_transcribe")
@patch("routers.guide.process_video_and_extract_frames")
@patch("routers.guide.analyze_frames_with_gemini")
def test_generate_guide_success_mocked(mock_analyze, mock_process, mock_transcribe):
    # Setup mocks
    mock_transcribe.return_value = "Mocked audio transcript"
    mock_process.return_value = (["mock_payload"], {0: "data:image/jpeg;base64,mock"})
    mock_analyze.return_value = (
        {
            "title": "Mocked Guide",
            "steps": [{"step_number": 1, "timestamp": "00:01", "instruction": "Test", "frame_index": 0}],
            "warnings": []
        },
        {
            "processing_time_seconds": 1.0,
            "prompt_tokens": 10,
            "completion_tokens": 10,
            "total_tokens": 20,
            "estimated_cost_usd": 0.001
        }
    )

    fake_file = io.BytesIO(b"fake video data")
    response = client.post(
        "/api/generate-guide",
        files={"video_file": ("test.mp4", fake_file, "video/mp4")}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["title"] == "Mocked Guide"
    assert len(data["steps"]) == 1
    assert data["metrics"]["processing_time_seconds"] == 1.0