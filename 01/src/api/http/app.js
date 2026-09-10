import Fastify from 'fastify';
import { telegramWebhookRoute } from './routes/telegram-webhook.route.js';

export function createApp() {
  const app = Fastify({ logger: true });

  app.register(telegramWebhookRoute);

  return app;
}
