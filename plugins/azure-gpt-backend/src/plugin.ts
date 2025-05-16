import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { createGptService } from './services/gpt';

/**
 * azureGptPlugin backend plugin
 *
 * @public
 */
export const azureGptPlugin = createBackendPlugin({
  pluginId: 'azure-gpt',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
        config: coreServices.rootConfig,
      },
      async init({ logger, httpRouter, config }) {
        logger.info('azure-gpt: Starting plugin...');

        httpRouter.use(
          await createRouter({
            service: await createGptService({
              config,
            }),
          }),
        );
      },
    });
  },
});
