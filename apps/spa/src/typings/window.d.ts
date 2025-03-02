declare global {
  interface Window {
    /**
     * This object will be injected by telegram itself
     * if the app is running in the telegram app environment
     *
     * This key is used as a flag to detect if the app is running in the telegram app environment
     * and trigger the telegram script loading (see `window.Telegram` usage in `telegram-webapp` function)
     */
    TelegramWebviewProxy?: Record<string, unknown>;
    /**
     * This object will be injected by telegram script
     * if the app is running in the telegram app environment
     *
     * This is a reason why it is optional
     */
    Telegram?: Telegram;
  }
}

export {};
