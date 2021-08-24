const { db } = require('../../database')
const { yesSmile, noSmile } = require('../../helpers')

module.exports = async (ctx) => {
  const user = await db.users.findByPk(ctx.from.id)

  if (user !== null && user.canAdmin) {
    await ctx.reply('Правильный ответ')
    for (const smile of yesSmile(true)) {
      await ctx.reply(decodeURI(smile))
    }

    await ctx.reply('Неправильный ответ')
    for (const smile of noSmile(true)) {
      await ctx.reply(decodeURI(smile))
    }
  }
}
