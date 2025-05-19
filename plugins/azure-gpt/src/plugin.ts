import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  fetchApiRef,
} from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';
import { AzureGptApi, azureGptApiRef } from './api';



export const azureGptPlugin = createPlugin({
  id: 'azure-gpt',
  routes: {
    root: rootRouteRef,
  },
  apis: [createApiFactory({
    api: azureGptApiRef,
    deps: { fetchApi: fetchApiRef },
    factory: ({ fetchApi }) => new AzureGptApi(fetchApi),
  })],
});

export const AzureGptPage = azureGptPlugin.provide(
  createRoutableExtension({
    name: 'AzureGptPage',
    component: () => import('./components/Root').then(m => m.RootComponent),
    mountPoint: rootRouteRef,
  }),
);
