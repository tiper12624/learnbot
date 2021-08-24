const { db } = require('../../database')
const { sendQuestion, yesSmile, noSmile, timeout } = require('../../helpers')

module.exports = async (ctx) => {
  const message = ctx.callbackQuery.message
  const userId = ctx.callbackQuery.from.id

  ctx.telegram.editMessageReplyMarkup(message.chat.id, message.message_id)
  ctx.answerCbQuery()

  const answer = await db.answers.findByPk(ctx.callbackQuery.data)
  if (answer) {
    await db.results.findOrCreate({
      where: {
        userId,
        questionId: answer.questionId,
      },
      defaults: {
        userId,
        questionId: answer.questionId,
        answer: answer.text,
        right: answer.right,
      }
    })

    await timeout(.5)
    if (answer.right) {
      await ctx.reply(yesSmile())
    } else {
      await ctx.reply(noSmile())
    }

    await timeout(1)
    await ctx.reply(answer.replyText)
  }

  await timeout(3)
  await sendQuestion(userId)
}
