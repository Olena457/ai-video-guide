export interface StepItem {
  step_number: number;
  timestamp: string;
  instruction: string;
  frame_index: number;
  screenshot_base64: string | null;
}

export interface MetricsData {
  processing_time_seconds: number;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  estimated_cost_usd: number;
}

export interface GuideResponse {
  status: string;
  title: string;
  steps: StepItem[];
  warnings: string[];
  metrics: MetricsData;
}
