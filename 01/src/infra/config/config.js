import path from 'node:path';

const ROOT_DIR = path.resolve(import.meta.dirname, '../../..');

process.loadEnvFile(path.join(ROOT_DIR, '.env'));

export const config = {
  http: {
    port: Number(process.env.PORT ?? 3000),
    host: process.env.HOST ?? '0.0.0.0',
  },
  telegram: {
    botToken: process.env.BOT_TOKEN,
    apiBaseUrl: 'https://api.telegram.org',
    webhookPath: '/webhook/telegram',
    publicUrl: process.env.WEBHOOK_URL,
  },
  frankfurter: {
    baseUrl: 'https://api.frankfurter.dev',
  },
};
