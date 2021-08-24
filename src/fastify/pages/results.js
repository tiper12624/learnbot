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

    const questionName = results.rows[0]['question.name'] ?? ''
    const userId = results.rows[0]['user.id']

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
