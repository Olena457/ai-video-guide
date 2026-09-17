# AI Video Guide

AI Video Guide is an intelligent web application designed to automatically generate step-by-step instructional guides from video demonstrations. It analyzes uploaded videos, extracts key frames and audio transcripts, and leverages advanced AI (Google Gemini / Mistral Pixtral) to create clear, concise, and visual "How-To" instructions.

##  Features

- **Automated Video Analysis**: Extracts frames and transcribes audio (using Groq Whisper) to understand the context.
- **AI-Powered Generation**: Generates structured, step-by-step guides using Google Gemini (with an OpenRouter fallback).
- **Modern User Interface**: A responsive and visually appealing frontend built with Next.js 16 and Tailwind CSS.
- **Detailed Metrics**: Provides insights into processing time, token usage, and estimated AI costs.

##  Project Structure

This is a monorepo consisting of two main parts:

- `apps/backend`: FastAPI application responsible for video processing, audio transcription, and AI integration.
- `apps/frontend`: Next.js frontend application providing the user interface for video uploads and timeline visualization.

## Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (React framework)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [Lucide React](https://lucide.dev/) (Icons)

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) (Web framework)
- [OpenCV](https://opencv.org/) (Video frame extraction)
- Google GenAI SDK & Groq API (AI Inference and Transcription)

##  Documentation

For detailed technical information, architecture, and setup instructions, please refer to the [DOCUMENTATION.md](./DOCUMENTATION.md).

##  Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- FFmpeg (required for backend audio extraction)

### Backend Setup
1. Navigate to the backend directory: `cd apps/backend`
2. Create a virtual environment: `python -m venv .venv`
3. Activate the environment:
   - Windows: `.venv\Scripts\activate`
   - Mac/Linux: `source .venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Configure `.env` based on `.env.example`.
6. Run the server: `fastapi dev main.py`

### Frontend Setup
1. Navigate to the frontend directory: `cd apps/frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.
