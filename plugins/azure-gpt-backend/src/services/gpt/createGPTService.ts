import { GptService } from './types';
import { RootConfigService } from '@backstage/backend-plugin-api';

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

    if (!api_key) {
        throw new Error('gpt.api_key is required');
    }

  return {
    async getChatResponse(input) {
      // Simulate a chat response
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              content: `Hello! You said: ${input
                .map(msg => msg.content)
                .join(', ')}`,
              role: 'assistant',
              timestamp: Date.now(),
            },
          ]);
        }, 1000);
      });
    },
  };
}
