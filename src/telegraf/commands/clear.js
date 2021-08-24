const { db } = require('../../database')
const { getGreetings, sendQuestion } = require('../../helpers')

module.exports = async (ctx) => {
  const user = await db.users.findByPk(ctx.from.id)
  if (user !== null) {
    await db.results.destroy({
      where: {
        userId: user.id
      }
    })
    await ctx.reply(getGreetings())
    await sendQuestion(user.id)
  }
}
