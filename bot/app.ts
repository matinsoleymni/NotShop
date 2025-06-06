import TelegramBot from 'node-telegram-bot-api';

// Replace with your actual bot token
const token = "<YOUR TOKEN>";
const miniAppUrl = "<YOUR MINI APP URL>";

const bot = new TelegramBot(token, { polling: true });

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = '🛍️ Welcome to NotStore!\nyou can bou cloth wuth not ✨';
  const imageUrl = 'https://not.zmat24.ir/botThumb.png';

  const opts: TelegramBot.SendPhotoOptions = {
    caption: welcomeMessage,
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open Mini App', web_app: { url: miniAppUrl } }]
      ],
      keyboard: [
        [{ text: 'start app' }],
        [{ text: 'contact me' }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };

  bot.sendPhoto(chatId, imageUrl, opts);
});

// Listen for the 'start app' button press
bot.onText(/start app/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = '🛍️ Welcome to NotStore!\nyou can bou cloth wuth not ✨';

  const opts: TelegramBot.SendMessageOptions = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open Mini App', web_app: { url: miniAppUrl } }]
      ],
      keyboard: [
        [{ text: 'start app' }],
        [{ text: 'contact me' }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };

  bot.sendMessage(chatId, welcomeMessage, opts);
});

// Listen for the 'contact me' button press
bot.onText(/contact me/, (msg) => {
  const chatId = msg.chat.id;
  const contactInfo = "👋 Hello, my name is Matin Soleymani. \n im fullstack developer. @matinsoleymni";

  bot.sendMessage(chatId, contactInfo);
});

console.log('Bot is running...');
