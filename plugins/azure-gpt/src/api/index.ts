import { createApiRef, FetchApi } from '@backstage/core-plugin-api';
import { IMessage } from './interfaces';

export class AzureGptApi {
  private readonly temperature!: number;
  private readonly top_p!: number;
  private readonly max_tokens!: number;
  private readonly api_version!: string;
  constructor(private readonly fetchApi: FetchApi) {
    this.max_tokens = 1500;
    this.temperature = 0.2;
    this.top_p = 0.95;
    this.api_version = '2024-02-15-preview';
  }

  /**
   * Makes an HTTP request to the specified URL using the provided `fetchApi`.
   *
   * @param url - The URL to send the request to.
   * @param init - Optional configuration for the request, such as method, headers, and body.
   * @returns A promise that resolves to the response of the fetch operation.
   */
  private async __fetch(url: string, init?: RequestInit) {
    const { fetch } = this.fetchApi;
    return fetch(url, init);
  }

  /**
   * Sends a request to the Azure GPT proxy endpoint with the provided messages
   * and returns the response.
   *
   * @template T - The expected type of the response data.
   * @param messages - An array of message objects to be sent to the Azure GPT proxy.
   * @returns A promise that resolves to the response data of type `T` if the request is successful.
   * @throws An error if the response status is not OK.
   */
  public async askUsingProxy<T extends unknown>(
    messages: Array<IMessage>,
  ): Promise<T | never> {
    const url =
      'http://localhost:7007/api/proxy/azure-gpt?api-version=' +
      this.api_version;
    const response = await this.__fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        max_tokens: this.max_tokens,
        messages,
        top_p: this.top_p,
        temperature: this.temperature,
      }),
    });

    if (response.ok) {
      return response.json() as Promise<T>;
    }

    throw new Error(response.statusText);
  }

  /**
   * Sends an array of messages to the backend API endpoint for processing and returns the response.
   *
   * @template T The expected response type.
   * @param messages - An array of `IMessage` objects to be sent to the backend.
   * @returns A promise that resolves to the response of type `T` if the request is successful.
   * @throws {Error} Throws an error if the response status is not OK.
   */
  public async askUsingBackend<T extends unknown>(
    messages: Array<IMessage>,
  ): Promise<T | never> {
    const url = 'http://localhost:7007/api/azure-gpt/ask';
    const response = await this.__fetch(url, {
      method: 'POST',
      body: JSON.stringify(messages),
    });

    if (response.ok) {
      return response.json() as Promise<T>;
    }

    throw new Error(response.statusText);
  }
}

export const azureGptApiRef = createApiRef<AzureGptApi>({
  id: 'plugin.azure-gpt.api',
});
