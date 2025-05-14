import { FetchApi } from '@backstage/core-plugin-api';

export class AzureGptApi {
  constructor(private readonly fetchApi: FetchApi) {}

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
   * Makes a proxied HTTP request to the specified URL and returns the parsed JSON response.
   *
   * @template T - The expected type of the successful response.
   * @template E - The expected type of the error response.
   * @param url - The endpoint to which the request will be made, relative to the proxy base URL.
   * @param init - Optional configuration for the HTTP request, such as method, headers, and body.
   * @returns A promise that resolves to the parsed JSON response. If the response is successful (`response.ok` is true),
   *          it resolves to a value of type `T`. Otherwise, it resolves to a value of type `E`.
   */
  public async useProxy<T extends unknown, E extends any>(
    url: string,
    init?: RequestInit,
  ) {
    const baseUrl = '/api/proxy';
    const response = await this.__fetch(`${baseUrl}${url}`, init);

    if (response.ok) {
      return response.json() as Promise<T>;
    }

    return response.json() as Promise<E>;
  }
}
