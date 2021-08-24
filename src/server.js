require('dotenv').config()

const { db, seeders } = require('./database')
db.sequelize.sync().then(async () => {
  if (process.env.APP_ENV == 'development') {
    await seeders.users(db)
    await seeders.questions(db)
    await seeders.results(db)
  }
})

const { bot } = require('./telegraf')
bot.launch()
  .then(() => console.log('Bot launched successfully!'))

const { fastify } = require('./fastify')
fastify.listen(process.env.WEB_PORT, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening on ${address}`)
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
