import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';
import { GptService } from './services/gpt/types';

export async function createRouter({
  service,
}: {
  service: GptService;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  // TEMPLATE NOTE:
  // Zod is a powerful library for data validation and recommended in particular
  // for user-defined schemas. In this case we use it for input validation too.
  //
  // If you want to define a schema for your API we recommend using Backstage's
  // OpenAPI tooling: https://backstage.io/docs/next/openapi/01-getting-started
  const askSchema = z.array(
    z.object({
      content: z.string(),
      role: z.enum(['user', 'assistant']),
      timestamp: z.number().optional(),
    }),
  );

  router.post('/ask', async (req, res) => {
    // Validate the request body against the schema
    const result = askSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Invalid request body',
        issues: result.error.issues,
      });
    }
    const data = result.data;

    const response = await service.getChatResponse(data);

    return res
      .status(200)
      .json([
        ...data,
        ...response.map(item => ({
          ...item,
          role: 'assistant',
          timestamp: Date.now(),
        })),
      ]);
  });

  return router;
}
