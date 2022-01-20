const { db } = require('../../database')
const { getSetting, sendQuestion, yesSmile, noSmile, timeout } = require('../../helpers')

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

    const beforeSmilePause = await getSetting('beforeSmilePause', 0)
    await timeout(beforeSmilePause)
    if (answer.right) {
      await ctx.reply(yesSmile())
    } else {
      await ctx.reply(noSmile())
    }

    const beforeAnswerPause = await getSetting('beforeAnswerPause', 0)
    await timeout(beforeAnswerPause)
    await ctx.reply(answer.replyText || '...')
  }

  const beforeQuestionPause = await getSetting('beforeQuestionPause', 0)
  await timeout(beforeQuestionPause)
  await sendQuestion(userId)
}
