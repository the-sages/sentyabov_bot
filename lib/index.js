const TOKEN = process.env.BOT_TOKEN;

const Bot = require('node-telegram-bot-api');
const phrases = require('../data/phrases');

let bot;

if (process.env.NODE_ENV === 'production') {
    bot = new Bot(TOKEN);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
    bot = new Bot(TOKEN, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode on ' + process.env.HEROKU_URL);

bot.onText(/^\/start$/, function(msg) {
    bot.sendMessage(
        msg.chat.id,
        `Привет ${msg.from.first_name}, я репрезентация недостающего в телеграме Сентбова.`
    );
});

bot.onText(/^\/phrase$/, sendPhrase);

function sendPhrase(msg) {
    bot.sendMessage(msg.chat.id, getRandom(phrases));
}

function getRandom(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
}

module.exports = bot;
