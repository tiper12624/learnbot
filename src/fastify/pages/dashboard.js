const { db } = require('../../database')
const { getRoot, getSetting, saveSetting } = require('../../helpers')

module.exports = async (request, reply) => {
  const usersCount = await db.users.count()
  const questionsCount = await db.questions.count()
  const resultsCount = await db.results.count()
  const rightsCount = await db.results.count({
    where: {
      right: true
    }
  })

  console.log(await getSetting('temp', 'empty'))

  await saveSetting('temp', 'filled')
  console.log(await getSetting('temp', 'empty'))

  await saveSetting('temp', 'filled 2')
  console.log(await getSetting('temp', 'empty'))

  reply.view('dashboard', {
    usersCount,
    questionsCount,
    resultsCount,
    rightsCount,
  })
}
