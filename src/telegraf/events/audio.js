const { db } = require('../../database')
const { clean, sizeFormat } = require('../../helpers')

module.exports = async (ctx) => {
  const user = await db.users.findByPk(ctx.from.id)
  if (user !== null) {
    if (user.canAdmin) {
      const audio = ctx.message.audio
      ctx.reply([
        `*Audio ID*:\n\`${clean(audio.file_id)}\``,
        `*Name*: ${clean(audio.file_name)}`,
        `*Mime\\-Type*: ${clean(audio.mime_type)}`,
        `*Duration*: ${Math.floor(audio.duration / 60)}m ${audio.duration % 60}s`,
        `*Size*: ${sizeFormat(audio.file_size)}`
      ].join('\n'), {
        parse_mode: 'MarkdownV2',
        reply_to_message_id: ctx.message.message_id,
      })
    }
  }
}
