import json
import time
from google.genai import types
from config import gemini_client, openrouter_client
from prompts import GUIDE_GENERATION_PROMPT

def _analyze_with_openrouter_fallback(frames_base64: dict, transcript: str = ""):
    if not openrouter_client:
        raise ValueError("OPENROUTER_API_KEY is missing or invalid in configuration.")

    transcript_context = f"\nAUDIO TRANSCRIPT OF THE SPEAKER:\n\"{transcript}\"\n" if transcript else "\nNO AUDIO DETECTED.\n"
    prompt_text = GUIDE_GENERATION_PROMPT + transcript_context

    content = [{"type": "text", "text": prompt_text}]

    for f_idx, b64_url in frames_base64.items():
        content.append({"type": "text", "text": f"Frame Index {f_idx}:"})
        content.append({
            "type": "image_url",
            "image_url": {"url": b64_url}
        })

    response = openrouter_client.chat.completions.create(
        model="mistralai/pixtral-12b:free",
        messages=[{"role": "user", "content": content}],
        response_format={"type": "json_object"}
    )

    res_text = response.choices[0].message.content
    usage = getattr(response, "usage", None)

    tokens = {
        "prompt_tokens": usage.prompt_tokens if usage else 0,
        "completion_tokens": usage.completion_tokens if usage else 0,
        "total_tokens": usage.total_tokens if usage else 0,
    }

    return res_text, tokens

def analyze_frames_with_gemini(payload_for_gemini: list, frames_base64: dict, transcript: str = ""):
    transcript_context = f"\nAUDIO TRANSCRIPT OF THE SPEAKER:\n\"{transcript}\"\n" if transcript else "\nNO AUDIO DETECTED.\n"
    full_request = [GUIDE_GENERATION_PROMPT + transcript_context] + payload_for_gemini

    fallback_models = [

        "gemini-3.6-flash",
        "gemini-3.7-flash",
        "gemini-3.5-flash-lite",
    ]

    response_text = None
    last_exception = None
    start_time = time.time()
    token_metrics = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}

    if gemini_client:
        for model_name in fallback_models:
            try:
                response = gemini_client.models.generate_content(
                    model=model_name,
                    contents=full_request,
                    config=types.GenerateContentConfig(
                        response_mime_type="application/json"
                    )
                )
                if response and response.text:
                    response_text = response.text
                    usage = getattr(response, "usage_metadata", None)
                    token_metrics = {
                        "prompt_tokens": usage.prompt_token_count if usage else 0,
                        "completion_tokens": usage.candidates_token_count if usage else 0,
                        "total_tokens": usage.total_token_count if usage else 0,
                    }
                    print(f"Successfully generated using Gemini model: {model_name}")
                    break
            except Exception as e:
                last_exception = e
                print(f"Gemini model {model_name} failed ({e}). Trying next fallback...")

    if not response_text:
        print("All Gemini models failed. Switching to OpenRouter Pixtral 12B fallback...")
        try:
            response_text, token_metrics = _analyze_with_openrouter_fallback(frames_base64, transcript)
            print("Successfully generated using OpenRouter Pixtral 12B!")
        except Exception as e:
            last_exception = e
            print(f"OpenRouter fallback failed: {e}")

    execution_time = time.time() - start_time

    if not response_text:
        raise ValueError(f"AI service is temporarily unavailable. Details: {last_exception}")

    try:
        clean_text = response_text.strip()
        if clean_text.startswith("```json"):
            clean_text = clean_text[7:]
        elif clean_text.startswith("```"):
            clean_text = clean_text[3:]
        if clean_text.endswith("```"):
            clean_text = clean_text[:-3]
        clean_text = clean_text.strip()
        result_data = json.loads(clean_text)
    except json.JSONDecodeError:
        raise ValueError(f"AI returned an invalid JSON format. Raw output: {response_text[:100]}...")

    for step in result_data.get("steps", []):
        f_idx = step.get("frame_index", 0)
        step["screenshot_base64"] = frames_base64.get(f_idx, None)

    prompt_tokens = token_metrics["prompt_tokens"]
    completion_tokens = token_metrics["completion_tokens"]
    estimated_cost = (prompt_tokens / 1_000_000 * 0.075) + (
        completion_tokens / 1_000_000 * 0.30
    )

    metrics = {
        "processing_time_seconds": round(execution_time, 2),
        "prompt_tokens": prompt_tokens,
        "completion_tokens": completion_tokens,
        "total_tokens": token_metrics["total_tokens"],
        "estimated_cost_usd": round(estimated_cost, 6),
    }

    return result_data, metrics