import path from 'node:path';
import Fastify from 'fastify';

process.loadEnvFile(path.join(import.meta.dirname, '.env'));

const PORT = process.env.PORT ?? 3000;
const API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

const app = Fastify({ logger: true });

async function getRate(code) {
  const res = await fetch(`https://api.frankfurter.dev/v2/rate/USD/${code}`);
  const body = await res.json();
  return body.rate;
}

async function sendMessage(chatId, text) {
  await fetch(`${API}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

app.post('/webhook/telegram', async (request, reply) => {
  const message = request.body.message;

  if (message?.text) {
    const code = message.text.trim().toUpperCase();
    const rate = await getRate(code);
    const text = rate ? `1 USD = ${rate} ${code}` : `Unknown currency: ${code}`;
    await sendMessage(message.chat.id, text);
  }

  return reply.send({ ok: true });
});

async function main() {
  await app.listen({ port: PORT, host: '0.0.0.0' });
}

main().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
