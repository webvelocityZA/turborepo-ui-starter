export const isTelegramApp = () => [window.Telegram, window.TelegramWebviewProxy].some(Boolean);
