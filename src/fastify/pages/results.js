const { Sequelize } = require('sequelize')
const moment = require('moment')
const { db } = require('../../database')
const Model = require('./model')

class Result extends Model {
  async list (request, reply) {
    const page = request.query.page ?? 1
    const perPage = 10

    const results = await db.results.findAndCountAll({
      where: {
        ...(request.params.qid) && { questionId: request.params.qid },
        ...(request.params.uid) && { userId: request.params.uid },
      },
      include: [db.users, db.questions],
      limit: perPage,
      offset: (page - 1) * perPage,
      raw: true,
    })

    const max = page * perPage
    const pagination = {
      page,
      from: (page - 1) * perPage + 1,
      to: results.count < max ? results.count : max,
      count: results.count,
      pages: Math.ceil(results.count / perPage),
    }

    let questionName = ''
    let userId = ''
    if (results.rows.length > 0) {
      questionName = results.rows[0]['question.name']
      userId = results.rows[0]['user.id']
    } else {
      if (request.params.qid) {
        questionName = (await db.questions.findByPk(request.params.qid)).name
      }
      if (request.params.uid) {
        userId = (await db.users.findByPk(request.params.uid)).id
      }
    }

    reply.view('pages/results/list', {
      moment,
      results: results.rows,
      pagination,
      title: request.params.qid ? ` по вопросу "${questionName}"` : (request.params.uid ? ` по пользователю #${userId}` : ''),
      iam: request.userId,
    })
  }
}

module.exports = Result
