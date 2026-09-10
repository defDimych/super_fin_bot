import { config } from '../config/config.js';

class TelegramAdapter {
  #apiUrl = `${config.telegram.apiBaseUrl}/bot${config.telegram.botToken}`;

  async #get(method) {
    const res = await fetch(`${this.#apiUrl}/${method}`);
    return this.#unwrap(method, await res.json());
  }

  async #post(method, payload) {
    const res = await fetch(`${this.#apiUrl}/${method}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return this.#unwrap(method, await res.json());
  }

  #unwrap(method, body) {
    if (!body.ok) {
      throw new Error(`Telegram API error on ${method}: ${JSON.stringify(body)}`);
    }

    return body.result;
  }

  sendMessage(chatId, text) {
    return this.#post('sendMessage', { chat_id: chatId, text });
  }

  setWebhook(url) {
    return this.#post('setWebhook', {
      url,
      drop_pending_updates: true,
      allowed_updates: ['message', 'callback_query'],
    });
  }

  getWebhookInfo() {
    return this.#get('getWebhookInfo');
  }
}

export const telegramAdapter = new TelegramAdapter();
