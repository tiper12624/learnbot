const { db } = require('../../database')
const Model = require('./model')

class Answer extends Model {
  async list (request, reply) {
    // noinspection DuplicatedCode
    const question = reply.locals.models.questions
    const page = request.query.page ?? 1
    const perPage = 10

    const answers = await db.answers.findAndCountAll({
      where: {
        questionId: question.id
      },
      order: [
        ['id'],
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
      raw: true,
    })

    const max = page * perPage
    const pagination = {
      page,
      from: (page - 1) * perPage + 1,
      to: answers.count < max ? answers.count : max,
      count: answers.count,
      pages: Math.ceil(answers.count / perPage),
    }

    reply.view('pages/answers/list', {
      answers: answers.rows,
      pagination,
      question,
    })
  }

  async new (request, reply) {
    reply.view('pages/answers/new')
  }

  async create (request, reply) {
    const answer = await db.answers.create({
      text: request.body.text,
      right: request.body.right ? 1 : 0,
      replyText: request.body.replyText,
      questionId: reply.locals.models.questions.id,
    })

    reply.setSuccessMessage('Успешно создано')

    reply.redirect(`/answers/${answer.id}/edit`)
  }

  async edit (request, reply) {
    reply.view('pages/answers/edit', {
      answer: reply.locals.models.answers,
    })
  }

  async save (request, reply) {
    const answer = reply.locals.models.answers

    answer.text = request.body.text
    answer.right = request.body.right ? 1 : 0
    answer.replyText = request.body.replyText
    await answer.save()

    super.save(request, reply)
  }

  async remove (request, reply) {
    super.remove(request, reply, `Удалить ответ "${reply.locals.models.answers.text}"?`)
  }

  async removeSubmit (request, reply) {
    const questionId = reply.locals.models.answers.questionId
    await reply.locals.models.answers.destroy()

    if (!reply.hasMessage()) {
      reply.setSuccessMessage('Успешно удалено')
    }

    reply.redirect(`/questions/${questionId}/answers`)
  }
}

module.exports = Answer
