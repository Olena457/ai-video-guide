# AI Video Guide — System Documentation

The AI Video Guide is an automated documentation system that transforms short screen recordings (up to two minutes) into structured, step-by-step visual user manuals with inline screenshots and exact timestamps.

---

## 1. Application Overview

The application automates the generation of Standard Operating Procedures (SOPs) and feature walkthroughs from MP4 screen captures. By combining visual frame analysis with speech transcription, the system identifies the demonstrator's intent, cleans up human error during the recording, and outputs a validated JSON timeline rendered in a modern Web interface.

### Key Capabilities
* **Single-Operation Documentation**: Converts single-task browser recordings into sequential action guides.
* **Automatic Screenshot & Timestamp Mapping**: Pairs every logical step with an isolated, Base64-encoded frame and exact video timestamp (`MM:SS`).
* **Operational Telemetry**: Displays execution metrics per request, including total processing time, prompt/completion token usage, and calculated USD costs.
* **Resilient Infrastructure**: Offers model fallback mechanisms and automated JSON sanitization.

---

## 2. AI & Data Processing Pipeline

The backend processes incoming media through a multi-stage pipeline:
MP4 Upload ──┬──> Audio Extraction (FFmpeg) ──> Groq Whisper ──> Transcript Text
              │                                                         │
              └──> Frame Sampling (OpenCV) ───> Base64 Encoding ────────┤
                                                                        ▼
                                                         Multimodal AI Processing
                                                         (Gemini / OpenRouter)
                                                                        │
                                                                        ▼
                                                         [Structured JSON Guide]

                                                         Ось готовий блок документації у форматі Markdown (`.md`). Ви можете скопіювати його в один клік, натиснувши кнопку в правому верхньому куті кодового блоку.

```markdown
# AI Video Guide — System Documentation

The AI Video Guide is an automated documentation system that transforms short screen recordings (up to two minutes) into structured, step-by-step visual user manuals with inline screenshots and exact timestamps.

---

## 1. Application Overview

The application automates the generation of Standard Operating Procedures (SOPs) and feature walkthroughs from MP4 screen captures. By combining visual frame analysis with speech transcription, the system identifies the demonstrator's intent, cleans up human error during the recording, and outputs a validated JSON timeline rendered in a modern Web interface.

### Key Capabilities
* **Single-Operation Documentation**: Converts single-task browser recordings into sequential action guides.
* **Automatic Screenshot & Timestamp Mapping**: Pairs every logical step with an isolated, Base64-encoded frame and exact video timestamp (`MM:SS`).
* **Operational Telemetry**: Displays execution metrics per request, including total processing time, prompt/completion token usage, and calculated USD costs.
* **Resilient Infrastructure**: Offers model fallback mechanisms and automated JSON sanitization.

---

## 2. AI & Data Processing Pipeline

The backend processes incoming media through a multi-stage pipeline:

---


[MP4 Upload] ──┬──> Audio Extraction (FFmpeg) ──> Groq Whisper ──> Transcript Text
│                                                         │
└──> Frame Sampling (OpenCV) ───> Base64 Encoding ────────┤
▼
Multimodal AI Processing
(Gemini / OpenRouter)
│
▼
[Structured JSON Guide]

---


### Stage 1: Audio Processing (`audio_service.py`)
1. Extracts an isolated MP3 audio stream using `imageio_ffmpeg`.
2. Transcribes spoken instructions via Groq’s `whisper-large-v3-turbo` model.
3. Returns a clean text transcript or degrades gracefully to an empty context string if no speech is detected.


###  Stage 2: Video Sampling (`video_service.py`)
1. Inspects the video duration via OpenCV (`cv2.VideoCapture`); rejects files over 120 seconds.
2. Samples frames at a configurable interval (default: every 2 seconds).
3. Converts RGB frames to JPEG buffer streams and encodes them into Base64 Data URLs.
4. Maps frame indices to calculated timestamps (`MM:SS`).

### Stage 3: Multimodal Synthesis (`ai_service.py`)
1. Combines the text transcript, system prompt (`GUIDE_GENERATION_PROMPT`), and ordered base64 visual frames into a unified multimodal payload.
2. Submits the payload to Google Gemini (`gemini-2.5-flash` or `gemini-2.0-flash-lite`).
3. Formats the response into a structured JSON payload containing step titles, explicit instructions, referenced frame indices, and screenshot URLs.

---

## 3. Error Handling & System Resilience

The architecture incorporates both infrastructure-level fault tolerance and AI behavioral error correction.

### System & Infrastructure Resilience
* **Model Fallbacks**: If primary Google Gemini APIs fail or hit rate limits, the system automatically redirects the payload to OpenRouter (`mistralai/pixtral-12b:free`).
* **JSON Sanitization**: Cleans markdown wrappers (e.g., ` ```json ... ``` `) from model outputs before execution of `json.loads` to prevent parsing crashes.
* **Resource Cleanup**: Uses `try...finally` blocks around temporary video and audio file handlers to avoid storage leaks or file-locking on operating systems like Windows.

### AI Behavioral Error Correction
* **Mistake Filtering**: The multimodal prompt instructs the model to detect and eliminate demonstrator misclicks or corrected UI paths, keeping only the final successful sequence.
* **Visual Verification over Speech**: Prioritizes visible screen actions over spoken commentary, ensuring unexecuted speech is ignored and actual UI interactions are captured.
* **Missing Step Flagging**: Identifies abrupt video cuts or skipped critical interactions and explicitly marks them as missing context within the steps.
