const { Sequelize } = require('sequelize')
const { db } = require('../../database')
const Model = require('./model')
const { sendQuestion } = require('../../helpers')

class Question extends Model {
  async list (request, reply) {
    const page = request.query.page ?? 1
    const perPage = 10

    const questions = await db.questions.findAndCountAll({
      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT("sources"."id") FROM sources WHERE "sources"."questionId" = "questions"."id")`), 'sources_count'],
          [Sequelize.literal(`(SELECT COUNT("answers"."id") FROM answers WHERE "answers"."questionId" = "questions"."id")`), 'answers_count'],
          [Sequelize.literal(`(SELECT COUNT("results"."id") FROM results WHERE "results"."questionId" = "questions"."id")`), 'results_count'],
          [Sequelize.literal(`(SELECT COUNT("results"."id") FROM results WHERE "results"."questionId" = "questions"."id" AND "results"."right" = true)`), 'rights'],
        ]
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
      to: questions.count < max ? questions.count : max,
      count: questions.count,
      pages: Math.ceil(questions.count / perPage),
    }

    reply.view('pages/questions/list', {
      questions: questions.rows,
      pagination,
    })
  }

  async new (request, reply) {
    reply.view('pages/questions/new')
  }

  async create (request, reply) {
    const question = await db.questions.create({ name: request.body.name })

    reply.setSuccessMessage('Успешно создано')

    reply.redirect(`/questions/${question.id}/edit`)
  }

  async edit (request, reply) {
    reply.view('pages/questions/edit', {
      question: reply.locals.models.questions
    })
  }

  async save (request, reply) {
    const question = reply.locals.models.questions

    question.name = request.body.name
    question.enabled = request.body.enabled ? 1 : 0
    await question.save()

    super.save(request, reply)
  }

  async toggle (request, reply) {
    await db.questions.update({
      enabled: !reply.locals.models.questions.enabled
    }, {
      where: {
        id: reply.locals.models.questions.id
      }
    })

    reply.redirect(request.headers['referer'] ?? '/questions')
  }

  async send (request, reply) {
    sendQuestion(request.userId, reply.locals.models.questions.id).then()

    reply.redirect(request.headers['referer'] ?? '/questions')
  }

  async remove (request, reply) {
    super.remove(request, reply, `Удалить вопрос "${reply.locals.models.questions.name}"?`)
  }

  async removeSubmit (request, reply) {
    await reply.locals.models.questions.destroy()

    super.removeSubmit(request, reply)
  }
}

module.exports = Question
