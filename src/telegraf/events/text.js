const { db } = require('../../database')

module.exports = async (ctx) => {
  const user = await db.users.findByPk(ctx.from.id)

  if (user !== null && user.canAdmin) {
    ctx.reply(encodeURI(ctx.message.text))
  }
}
