import { config } from '../../../infra/config/config.js';
import { handleUpdate } from '../controllers/telegram-webhook.controller.js';

export async function telegramWebhookRoute(app) {
  app.post(config.telegram.webhookPath, handleUpdate);
}
