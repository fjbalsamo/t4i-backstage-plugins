import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { azureGptPlugin, AzureGptPage } from '../src/plugin';

createDevApp()
  .registerPlugin(azureGptPlugin)
  .addPage({
    element: <AzureGptPage />,
    title: 'Root Page',
    path: '/azure-gpt',
  })
  .render();
