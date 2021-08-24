module.exports = (request, reply, next) => {
  if (!reply.locals) {
    reply.locals = {}
  }

  reply.hasMessage = () => {
    return request.session.get('message') !== null
  }

  reply.setMessage = (type, message) => {
    request.session.set('message', { type, message })
  }

  reply.setSuccessMessage = (message) => {
    reply.setMessage('primary', message)
  }

  if (reply.hasMessage()) {
    reply.locals.message = request.session.get('message')
    request.session.set('message', null)
  }

  next()
}
