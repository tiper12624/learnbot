const { db } = require('../../database')
const { clean, sizeFormat } = require('../../helpers')

module.exports = async (ctx) => {
  const user = await db.users.findByPk(ctx.from.id)
  if (user !== null) {
    if (user.canAdmin) {
      const document = ctx.message.document
      ctx.reply([
        `*Document ID*:\n\`${clean(document.file_id)}\``,
        `*Name*: ${clean(document.file_name)}`,
        `*Mime\\-Type*: ${clean(document.mime_type)}`,
        `*Size*: ${sizeFormat(document.file_size)}`
      ].join('\n'), {
        parse_mode: 'MarkdownV2',
        reply_to_message_id: ctx.message.message_id,
      })
    }
  }
}
