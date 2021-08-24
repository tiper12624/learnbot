const { db } = require('../../database')
const { getRoot } = require('../../helpers')

module.exports = async (request, reply) => {
  const usersCount = await db.users.count()
  const questionsCount = await db.questions.count()
  const resultsCount = await db.results.count()
  const rightsCount = await db.results.count({
    where: {
      right: true
    }
  })

  reply.view('dashboard', {
    usersCount,
    questionsCount,
    resultsCount,
    rightsCount,
  })
}
