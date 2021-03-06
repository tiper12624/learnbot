const { db } = require('../../database')
const { getSetting, sendQuestion } = require('../../helpers')

module.exports = async (ctx) => {
  const id = ctx.from.id
  const count = await db.users.count()
  if (count === 0) {
    db.users.create({
      id,
      canAdmin: true,
    })
      .then(() => {
        ctx.reply('Успешно зарегистрирован как администратор')
      })
  } else {
    db.users.findByPk(id)
      .then(async user => {
        if (user === null) {
          db.users.create({ id }).then()
          const welcomeText = await getSetting('welcomeText', '')
          if (welcomeText !== '') {
            await ctx.reply(welcomeText, { parse_mode: 'Markdown' })
          }
        }

        sendQuestion(id).then()
      })
  }
}
