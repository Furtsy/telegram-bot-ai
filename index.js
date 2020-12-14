const { Telegraf } = require('telegraf');
const request = require("request");
const google = require('./tts.js');

const bot = new Telegraf("token")
bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});
bot.start((ctx) => ctx.reply('commands...'))

bot.command('help', (ctx) => ctx.replyWithMarkdown(helpResponse));
bot.on('text', (ctx) => {
  let soru = ctx.message.text
  let encodedsoru = encodeURI(soru)
  request(`https://api.codare.fun/sor/${encodedsoru}`, function(error, response, body) {
    let json = JSON.parse(body)
    ctx.reply(json.cevap)
        ctx.replyWithAudio({url: google(json.cevap)}, {title: 'ih'})
  })



})
console.log('start')
bot.launch()
