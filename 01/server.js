import path from 'node:path';
import Fastify from 'fastify';

process.loadEnvFile(path.join(import.meta.dirname, '.env'));

const PORT = process.env.PORT ?? 3000;

const app = Fastify({ logger: true });

app.post('/webhook/telegram', async (request, reply) => {
  console.log(JSON.stringify(request.body, null, 2));
  return reply.send({ ok: true });
});

async function main() {
  await app.listen({ port: PORT, host: '0.0.0.0' });
}

main().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
