const path = require('path')
const fastify = require('fastify')()
const Answer = require('./pages/answers')
const Question = require('./pages/questions')
const Result = require('./pages/results')
const Source = require('./pages/sources')
const User = require('./pages/users')

const answer = new Answer()
const question = new Question()
const result = new Result()
const source = new Source()
const user = new User()

fastify.decorateRequest('userId', 0)

fastify.decorateReply('setMessage', null)
fastify.decorateReply('setSuccessMessage', null)

fastify.register(require('fastify-formbody'))

fastify.register(require('fastify-secure-session'), {
  cookieName: 'learn-session',
  secret: process.env.APP_KEY,
  salt: process.env.APP_SALT,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: process.env.SESSION_TIMEOUT || 60 * 60 * 24,
  }
})

fastify.register(require('fastify-static'), {
  root: path.resolve('src', 'assets'),
  prefix: '/assets',
  prefixAvoidTrailingSlash: true
})

fastify.register(require('point-of-view'), {
  engine: {
    pug: require('pug')
  },
  includeViewExtension: true,
  production: process.env.APP_ENV === 'production',
  root: path.resolve('src', 'templates'),
})

fastify.addHook('onRequest', require('./hooks/auth'))
fastify.addHook('onRequest', require('./hooks/bindings'))
fastify.addHook('onRequest', require('./hooks/message'))

fastify.get('/', require('./pages/dashboard'))

fastify.get('/login/:token', require('./pages/login'))

fastify.get('/question', question.new)
fastify.post('/question', question.create)

fastify.get('/questions', question.list)
fastify.get('/questions/:questions/toggle', question.toggle)
fastify.get('/questions/:questions/send', question.send)
fastify.get('/questions/:questions/edit', question.edit)
fastify.post('/questions/:questions/edit', question.save)
fastify.get('/questions/:questions/remove', question.remove)
fastify.post('/questions/:questions/remove', question.removeSubmit)

fastify.get('/questions/:questions/source', source.new)
fastify.post('/questions/:questions/source', source.create)

fastify.get('/questions/:questions/sources', source.list)
fastify.get('/sources/:sources/edit', source.edit)
fastify.post('/sources/:sources/edit', source.save)
fastify.get('/sources/:sources/remove', source.remove)
fastify.post('/sources/:sources/remove', source.removeSubmit)

fastify.get('/questions/:questions/answer', answer.new)
fastify.post('/questions/:questions/answer', answer.create)

fastify.get('/questions/:questions/answers', answer.list)
fastify.get('/answers/:answers/edit', answer.edit)
fastify.post('/answers/:answers/edit', answer.save)
fastify.get('/answers/:answers/remove', answer.remove)
fastify.post('/answers/:answers/remove', answer.removeSubmit)

fastify.get('/results', result.list)
fastify.get('/results/question/:qid', result.list)
fastify.get('/results/user/:uid', result.list)

fastify.get('/users', user.list)
fastify.get('/users/:users/edit', user.edit)
fastify.post('/users/:users/edit', user.save)
fastify.get('/users/:users/remove', user.remove)
fastify.post('/users/:users/remove', user.removeSubmit)

module.exports = { fastify }
