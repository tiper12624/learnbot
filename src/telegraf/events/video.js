const { db } = require('../../database')
const { clean, sizeFormat } = require('../../helpers')

module.exports = async (ctx) => {
  const user = await db.users.findByPk(ctx.from.id)
  if (user !== null) {
    if (user.canAdmin) {
      const video = ctx.message.video
      ctx.reply([
        `*Video ID*:\n\`${clean(video.file_id)}\``,
        `*Mime\\-Type*: ${clean(video.mime_type)}`,
        `*Frame Size*: ${video.width}x${video.height}`,
        `*Duration*: ${Math.floor(video.duration / 60)}m ${video.duration % 60}s`,
        `*Size*: ${sizeFormat(video.file_size)}`
      ].join('\n'), {
        parse_mode: 'MarkdownV2',
        reply_to_message_id: ctx.message.message_id,
      })
    }
  }
}
