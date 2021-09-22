const { db } = require('../../database')
const Model = require('./model')
const { saveSetting } = require('../../helpers')

class Settings extends Model {
  async list (request, reply) {
    const settings = {}
    const result = await db.settings.findAll()
    result.forEach(row => {
      settings[row.name] = row.value
    })

    reply.view('pages/settings/list', {
      settings
    })
  }

  async save (request, reply) {
    for (const name of Object.keys(request.body)) {
      await saveSetting(name, request.body[name])
    }

    super.save(request, reply)
  }
}

module.exports = Settings
