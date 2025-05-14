import { createApiRef, FetchApi } from '@backstage/core-plugin-api';
import { IMessage } from './interfaces';

export class AzureGptApi {
  private readonly temperature!: number;
  private readonly top_p!: number;
  private readonly max_tokens!: number;
  constructor(private readonly fetchApi: FetchApi) {
    this.max_tokens = 1500;
    this.temperature = 0.2;
    this.top_p = 0.95;
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
 * and returns the response as a generic type `T`.
 *
 * @template T - The expected type of the successful response.
 * @template E - The expected type of the error response.
 * @param messages - An array of `IMessage` objects to be sent to the proxy.
 * @returns A promise that resolves to the response of type `T` if the request is successful,
 * or throws an error containing the error response of type `E` if the request fails.
 * @throws {Error} - Throws an error containing the error response if the request fails.
 */
  public async askUsingProxy<T extends unknown, E extends any>(
    messages: Array<IMessage>,
  ): Promise<T | never> {
    const url = '/api/proxy/azure-gpt';
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

    const error: E = await response.json();
    throw new Error(JSON.stringify(error));
  }
}

export const azureGptApiRef = createApiRef<AzureGptApi>({
  id: 'plugin.azure-gpt.api',
});
