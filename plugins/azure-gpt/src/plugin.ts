import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const azureGptPlugin = createPlugin({
  id: 'azure-gpt',
  routes: {
    root: rootRouteRef,
  },
});

export const AzureGptPage = azureGptPlugin.provide(
  createRoutableExtension({
    name: 'AzureGptPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
