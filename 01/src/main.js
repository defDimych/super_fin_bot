import { config } from './infra/config/config.js';
import { createApp } from './api/http/app.js';

const app = createApp();

try {
  await app.listen({ port: config.http.port, host: config.http.host });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
