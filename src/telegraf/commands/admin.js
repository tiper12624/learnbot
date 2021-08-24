const { db } = require('../../database')

module.exports = async (ctx) => {
  const user = await db.users.findByPk(ctx.from.id)

  if (user !== null && user.canAdmin) {
    const token = [...Array(64)].map(() => Math.random().toString(36)[2]).join('')

    user.authToken = token
    await user.save()

    ctx.reply(`${process.env.WEB_HOST}/login/` + token.match(/\w{8}/g).join('-'), {
      disable_web_page_preview: true
    })
  }
}
