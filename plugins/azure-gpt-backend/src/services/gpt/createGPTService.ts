import { GptService } from './types';
import { RootConfigService } from '@backstage/backend-plugin-api';
import fetch from 'node-fetch';

type GptServiceOptions = {
  config: RootConfigService;
};

export async function createGptService(
  options: GptServiceOptions,
): Promise<GptService> {
  const { config } = options;
  const gptConfig = config.getOptionalConfig('gpt');

  const max_tokens = gptConfig?.getOptionalNumber('max_token') ?? 1500;
  const temperature = gptConfig?.getOptionalNumber('temperature') ?? 0.2;
  const top_p = gptConfig?.getOptionalNumber('top_p') ?? 0.95;
  const api_version =
    gptConfig?.getOptionalString('api_version') ?? '2024-02-15-preview';
  const api_base = gptConfig?.getOptionalString('api_base') ?? '';
  const api_key = gptConfig?.getOptionalString('api_key');

  return {
    async getChatResponse(input) {
      if (!api_key) {
        throw new Error('gpt.api_key is required');
      }
      const url = `${api_base}?api-version=${api_version}`;
      const headers = {
        'Content-Type': 'application/json',
        'api-key': api_key,
      };

      const body = JSON.stringify({
        messages: input,
        max_tokens,
        temperature,
        top_p,
      });
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} ${
            response.statusText
          } ${await response.text()}`,
        );
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(`Error: ${data.error.code} ${data.error.message}`);
      }
      return data;
    },
  };
}
