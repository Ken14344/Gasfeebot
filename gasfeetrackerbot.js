const { Telegraf } = require('telegraf');
const axios = require('axios');
const request = require('request');

const token = '6260904961:AAFl9WfILk5_Y2Jqro60VMHqMJwRGU5F7IY';
const ETHERSCAN_API_KEY = 'QMUITWUA5FTBQXEYFBZKUGKPIA2XHDBMBP';

const bot = new Telegraf(token);

console.log('Bot is starting...');

bot.start((ctx) => ctx.reply('Hello! Welcome to the Ye Xiu Eth Gasfee Tracker Bot'));
bot.help((ctx) => ctx.reply('Here are the available commands: \n /start - Start the bot \n /info - Get information about the bot \n /help - Display this help message \n /gasfee - Show eth gasfee'));
bot.command('info', (ctx) => ctx.reply('This bot was created by Ye Xiu, Owner of Ye Xiu Gambles.'));

bot.command('news', (ctx) => {
  const url = 'https://cryptopanic.com/api/v1/posts/?auth_token=81e5c5dd0522100f4dc41a4b4ccc00b9b43ed006';
  request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    const news = body.results;
    let response = '\u{1F4F0}𝙃𝙚𝙧𝙚 𝙖𝙧𝙚 𝙩𝙝𝙚 𝙡𝙖𝙩𝙚𝙨𝙩 𝙣𝙚𝙬𝙨 𝙖𝙗𝙤𝙪𝙩 𝘾𝙧𝙮𝙥𝙩𝙤𝙘𝙪𝙧𝙧𝙚𝙣𝙘𝙞𝙚𝙨:\n\n';
    for (let i = 0; i < news.length; i++) {
      response += `${i + 1}. <a href="${news[i].url}">${news[i].title}</a>\n\n`;
    }
    ctx.replyWithHTML(response);
  });
});

bot.command('gasfee', async (ctx) => {
    try {
      const response = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`);
      const { SafeGasPrice, ProposeGasPrice, FastGasPrice } = response.data.result;
      const chatId = ctx.chat.id;
      ctx.reply(`\u{26FD}𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐆𝐚𝐬 𝐏𝐫𝐢𝐜𝐞𝐬: \n\n \u{1F40C}𝘚𝘭𝘰𝘸: ${SafeGasPrice} Gwei  \n \u{1F683}𝘚𝘵𝘢𝘯𝘥𝘢𝘳𝘥: ${ProposeGasPrice} Gwei (Recommended)  \n \u{1F684}𝘍𝘢𝘴𝘵: ${FastGasPrice} Gwei`,{
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "DM ME FOR PROMOTION ! ",
                url: "https://t.me/AllahuAkbarrrrrrrrrrrrrr"
              }
            ]
          ]
        }
      });
    } catch (error) {
      console.error(error);
      ctx.reply('Sorry, an error occurred while fetching gas prices.');
    }
  });

bot.launch();
