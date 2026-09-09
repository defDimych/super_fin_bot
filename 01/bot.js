import path from 'node:path';

process.loadEnvFile(path.join(import.meta.dirname, '.env'));

const API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

let offset = 0;

async function poll() {
  const res = await fetch(`${API}/getUpdates?offset=${offset}`);
  const body = await res.json();

  if (!body.ok) {
    console.error('Telegram API error:', body);
    return;
  }

  for (const update of body.result) {
    console.log(JSON.stringify(update, null, 2));
    offset = update.update_id + 1;
  }
}

function main() {
  setInterval(() => poll().catch((err) => console.error(err)), 5000);
}

main();
