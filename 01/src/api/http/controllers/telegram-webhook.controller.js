import { convertCurrencyUseCase } from '../../../application/use-cases/convert-currency.use-case.js';
import { telegramAdapter } from '../../../infra/adapters/telegram.adapter.js';
import { toIncomingMessage } from '../mappers/telegram-update.mapper.js';
import { presentConversion } from '../presenters/conversion.presenter.js';

export async function handleUpdate(request, reply) {
  const message = toIncomingMessage(request.body);

  if (message) {
    try {
      const conversion = await convertCurrencyUseCase.execute(message.text);
      await telegramAdapter.sendMessage(message.chatId, presentConversion(conversion));
    } catch (err) {
      // Always acknowledge the update, otherwise Telegram keeps redelivering it.
      request.log.error(err);
    }
  }

  return reply.send({ ok: true });
}
