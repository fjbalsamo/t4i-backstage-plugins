export interface IMessage {
  content: string;
  role: 'user' | 'assistant';
}

export interface AzureGptResponse {
  choices: Choice[];
  created: number;
  id: string;
  model: string;
  object: string;
  prompt_filter_results: PromptFilterResult[];
  system_fingerprint: string;
  usage: Usage;
}

export interface Choice {
  content_filter_results: ContentFilterResults;
  finish_reason: string;
  index: number;
  logprobs: null;
  message: IMessage;
}

export interface ContentFilterResults {
  hate: Hate;
  self_harm: Hate;
  sexual: Hate;
  violence: Hate;
}

export interface Hate {
  filtered: boolean;
  severity: string;
}

export interface Usage {
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
}

export interface PromptFilterResult {
  prompt_index: number;
  content_filter_results: ContentFilterResults;
}
