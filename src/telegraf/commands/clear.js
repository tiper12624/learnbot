const { db } = require('../../database')
const { getSetting, sendQuestion } = require('../../helpers')

module.exports = async (ctx) => {
  const user = await db.users.findByPk(ctx.from.id)
  if (user !== null) {
    await db.results.destroy({
      where: {
        userId: user.id
      }
    })
    const welcomeText = await getSetting('welcomeText', '')
    if (welcomeText !== '') {
      await ctx.reply(welcomeText, { parse_mode: 'Markdown' })
    }
    await sendQuestion(user.id)
  }
}
