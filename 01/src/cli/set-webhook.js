import { config } from '../infra/config/config.js';
import { telegramAdapter } from '../infra/adapters/telegram.adapter.js';

const baseUrl = process.argv[2] ?? config.telegram.publicUrl;

if (!baseUrl) {
  console.error('Usage: node src/cli/set-webhook.js <https://your-tunnel-url>');
  console.error('(or set WEBHOOK_URL in .env)');
  process.exit(1);
}

const webhookUrl = new URL(config.telegram.webhookPath, baseUrl).toString();

try {
  await telegramAdapter.setWebhook(webhookUrl);
  console.log(`Webhook set to ${webhookUrl}`);
  console.log(JSON.stringify(await telegramAdapter.getWebhookInfo(), null, 2));
} catch (err) {
  console.error(err);
  process.exit(1);
}
