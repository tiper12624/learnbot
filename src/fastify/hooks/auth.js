const httpErrors = require('http-errors')
const { db } = require('../../database')

module.exports = (request, reply, next) => {
  if (
    request.raw.url.startsWith('/assets')
    || request.raw.url.startsWith('/login')
    || request.raw.url.startsWith('/health')
  ) {
    next()
  } else {
    user = db.users.findOne({
      where: {
        sessionToken: request.session.get('token') || ''
      }
    }).then(user => {
      if (user !== null && user.canAdmin) {
        request.userId = user.id
        next()
      } else {
        reply.send(httpErrors(404))
      }
    })
  }
}
