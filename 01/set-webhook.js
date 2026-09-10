import path from 'node:path';

process.loadEnvFile(path.join(import.meta.dirname, '.env'));

const API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

const baseUrl = process.argv[2] ?? process.env.WEBHOOK_URL;

if (!baseUrl) {
  console.error('Usage: node set-webhook.js <https://your-tunnel-url>');
  console.error('(or set WEBHOOK_URL in .env)');
  process.exit(1);
}

async function main() {
  const url = new URL('/webhook/telegram', baseUrl).toString();

  const res = await fetch(`${API}/setWebhook`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      url,
      drop_pending_updates: true,
      allowed_updates: ['message', 'callback_query'],
    }),
  });
  const body = await res.json();

  if (!body.ok) {
    console.error('Telegram API error:', body);
    process.exit(1);
  }

  console.log(`Webhook set to ${url}`);

  const info = await fetch(`${API}/getWebhookInfo`).then((r) => r.json());
  console.log(JSON.stringify(info.result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
