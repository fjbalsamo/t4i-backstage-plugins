import { azureGptPlugin } from './plugin';

describe('azure-gpt', () => {
  it('should export plugin', () => {
    expect(azureGptPlugin).toBeDefined();
  });
});
