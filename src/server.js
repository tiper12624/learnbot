const telegrafPlugin = require('fastify-telegraf')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const { db, seeders } = require('./database')
const { bot } = require('./telegraf')
const { fastify } = require('./fastify')

// Sequelize
db.sequelize.sync().then(async () => {
  if (process.env.NODE_ENV === 'development') {
    // await seeders.users(db)
    // await seeders.questions(db)
    // await seeders.results(db)
  }
})

// Telegraf
const SECRET_PATH = `/telegraf/${bot.secretPathComponent()}`
bot.launch()
  .then(() => console.log('Bot launched successfully!'))

// Fastify
fastify.register(telegrafPlugin, { bot, path: SECRET_PATH })
fastify.listen(process.env.PORT || 8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening on ${address}`)
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
