const { db } = require('../../database')
const { Sequelize } = require('sequelize')

class Model {
  list (request, reply) {
    reply.send('Model List must be overridden')
  }

  edit (request, reply) {
    reply.send('Model Edit must be overridden')
  }

  save (request, reply) {
    if (!reply.hasMessage()) {
      reply.setSuccessMessage('Успешно сохранено')
    }

    reply.redirect(request.raw.url)
  }

  remove (request, reply, title = 'Удалить элемент?') {
    reply.view('pages/delete', { title })
  }

  removeSubmit (request, reply) {
    if (!reply.hasMessage()) {
      reply.setSuccessMessage('Успешно удалено')
    }

    reply.redirect(request.raw.url.split('/').slice(0, -2).join('/'))
  }
}

module.exports = Model
