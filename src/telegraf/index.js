const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(require('./commands/start'))

bot.command('admin', require('./commands/admin'))
bot.command('clear', require('./commands/clear'))
bot.command('id', require('./commands/id'))
bot.command('smiles', require('./commands/smiles'))

bot.on('callback_query', require('./events/callback_query'))
bot.on('text', require('./events/text'))
bot.on('document', require('./events/document'))
bot.on('photo', require('./events/photo'))
bot.on('audio', require('./events/audio'))
bot.on('video', require('./events/video'))

module.exports = { bot }
