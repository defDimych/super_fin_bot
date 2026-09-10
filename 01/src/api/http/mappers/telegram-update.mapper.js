export function toIncomingMessage(update) {
  const message = update?.message;

  if (!message?.text) {
    return null;
  }

  return { chatId: message.chat.id, text: message.text };
}
