const bb = require('bot-brother');
const bot = bb({
    key: process.env.BOT_TOKEN,
    sessionManager: bb.sessionManager.memory(),
    polling: { interval: 0, timeout: 3 }
});

const phrases = require('../data/phrases');

bot.command('start').invoke(function(ctx) {
    ctx.data.user = ctx.meta.user;

    return ctx.sendMessage('Привет <%=user.first_name%>, я репрезентация недостающего в телеграме Сентбова.');
});

bot.command('фраза').invoke(sendPhrase);
bot.command('phrase').invoke(sendPhrase);

function sendPhrase(ctx) {
    return ctx.sendMessage(getRandom(phrases));
}

function getRandom(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
}
