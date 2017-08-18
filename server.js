const express = require('express');
const app = express();

app.use(require('body-parser').json());

const server = app.listen(process.env.APP_PORT || 3000, () => {
    console.log('Process listening on port ' + server.address().port);
});

app.get('/', (req, res) => {
    res.send('I\'m Sentyabov!');
});

module.exports = function (bot) {
    app.post('/' + bot.token, function (req, res) {
        bot.processUpdate(req.body);
        res.sendStatus(200);
    });
};
