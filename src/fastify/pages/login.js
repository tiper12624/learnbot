const httpErrors = require('http-errors')
const { db } = require('../../database')
const { getRoot } = require('../../helpers')

module.exports = async (request, reply) => {
  const user = await db.users.findOne({
    where: {
      authToken: request.params.token.replace(/-/g, '')
    }
  })

  if (!user) {
    reply.send(httpErrors.NotFound())
  }

  const token = [...Array(64)].map(() => Math.random().toString(36)[2]).join('')
  if (process.env.APP_ENV === 'development') {
    console.log(token)
  }

  user.sessionToken = token
  user.authToken = null
  await user.save()

  request.session.set('id', user.id)
  request.session.set('token', token)

  reply.redirect('/')
}
