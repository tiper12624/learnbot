const { Sequelize } = require('sequelize')
const { db } = require('../../database')
const Model = require('./model')
const moment = require('moment')

class User extends Model {
  async list (request, reply) {
    const page = request.query.page ?? 1
    const perPage = 10

    const users = await db.users.findAndCountAll({
      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT(id) FROM results WHERE userId = users.id)`), 'answered'],
          [Sequelize.literal(`(SELECT COUNT(id) FROM results WHERE userId = users.id AND results.right = true)`), 'rights'],
        ]
      },
      limit: perPage,
      offset: (page - 1) * perPage,
      raw: true,
    })

    const max = page * perPage
    const pagination = {
      page,
      from: (page - 1) * perPage + 1,
      to: users.count < max ? users.count : max,
      count: users.count,
      pages: Math.ceil(users.count / perPage),
    }

    reply.view('pages/users/list', {
      users: users.rows,
      pagination,
      iam: request.userId,
    })
  }

  edit (request, reply) {
    reply.view('pages/users/edit', {
      user: reply.locals.models.users
    })
  }

  async save (request, reply) {
    const user = reply.locals.models.users

    if (request.userId !== user.id) {
      user.canAdmin = request.body.canAdmin !== undefined && request.body.canAdmin
    }
    user.notes = request.body.notes
    await user.save()

    super.save(request, reply)
  }

  remove (request, reply) {
    super.remove(request, reply, `Удалить пользователя #${reply.locals.models.users.id}?`)
  }

  async removeSubmit (request, reply) {
    await reply.locals.models.users.destroy()

    super.removeSubmit(request, reply)
  }
}

module.exports = User
