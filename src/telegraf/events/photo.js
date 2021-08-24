const { db } = require('../../database')
const { clean, sizeFormat } = require('../../helpers')

module.exports = async (ctx) => {
  const user = await db.users.findByPk(ctx.from.id)
  if (user !== null) {
    if (user.canAdmin) {
      let photo = ctx.message.photo
      if (Array.isArray(photo)) {
        photo = photo.pop()
      }
      ctx.reply([
        `*Photo ID*:\n\`${clean(photo.file_id)}\``,
        `*Image Size*: ${photo.width}x${photo.height}`,
        `*Size*: ${sizeFormat(photo.file_size)}`
      ].join('\n'), {
        parse_mode: 'MarkdownV2',
        reply_to_message_id: ctx.message.message_id,
      })
    }
  }
}
