const { db } = require('../../database')
const createError = require('http-errors')

module.exports = (request, reply, next) => {
  if (!reply.locals) {
    reply.locals = {}
  }

  reply.locals.models = {}

  const models = Object.keys(db)
  const resolves = []
  for (const [key, value] of Object.entries(request.params)) {
    if (models.includes(key)) {
      resolves.push(new Promise((resolve, reject) => {
        db[key].findByPk(value)
          .then(record => {
            if (!record) {
              reject()
            }
            reply.locals.models[key] = record
            resolve()
          })
          .finally(() => reject())
      }))
    }
  }

  if (resolves.length > 0) {
    Promise.all(resolves).then(() => next(), () => reply.send(createError(404)))
  } else {
    next()
  }
}
