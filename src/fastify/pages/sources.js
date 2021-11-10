const { db } = require('../../database')
const Model = require('./model')
const { translateSourceType, getFile } = require('../../helpers')

class Source extends Model {
  async list (request, reply) {
    // noinspection DuplicatedCode
    const question = reply.locals.models.questions
    const page = request.query.page ?? 1
    const perPage = 10

    const sources = await db.sources.findAndCountAll({
      where: {
        questionId: question.id
      },
      limit: perPage,
      offset: (page - 1) * perPage,
      raw: true,
    })

    const max = page * perPage
    const pagination = {
      page,
      from: (page - 1) * perPage + 1,
      to: sources.count < max ? sources.count : max,
      count: sources.count,
      pages: Math.ceil(sources.count / perPage),
    }

    reply.view('pages/sources/list', {
      translateSourceType,
      sources: sources.rows,
      pagination,
      question,
    })
  }

  async new (request, reply) {
    reply.view('pages/sources/new')
  }

  async create (request, reply) {
    const source = await db.sources.create({
      name: request.body.name,
      type: request.body.type,
      media: request.body.type === 'mediaGroup' ? [] : '',
      questionId: reply.locals.models.questions.id,
    })

    reply.setSuccessMessage('Успешно создано')

    reply.redirect(`/sources/${source.id}/edit`)
  }

  async edit (request, reply) {
    const source = reply.locals.models.sources
    let link = ''
    if (['document', 'photo', 'audio', 'video'].includes(source.type)) {
      const file_path = await getFile(source.media)
      if (file_path) {
        link = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file_path}`
      }
    }
    if (source.type === 'mediaGroup') {
      link = []
      for (const media of source.media) {
        const file_path = await getFile(media.media)
        if (file_path) {
          link.push(`https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file_path}`)
        }
      }
    }

    reply.view('pages/sources/edit', {
      translateSourceType,
      source,
      link,
    })
  }

  async save (request, reply) {
    const source = reply.locals.models.sources

    source.name = request.body.name
    if (['text', 'document', 'photo', 'audio', 'video'].includes(source.type)) {
      source.media = request.body.media
    }
    if (source.type === 'mediaGroup') {
      const medias = []
      for (const media of request.body.groupMedia) {
        if (media === '') {
          continue
        }
        medias.push({
          type: 'photo',
          media,
        })
      }
      source.media = medias
    }
    await source.save()

    super.save(request, reply)
  }

  async remove (request, reply) {
    super.remove(request, reply, `Удалить источник "${reply.locals.models.sources.name}"?`)
  }

  async removeSubmit (request, reply) {
    const questionId = reply.locals.models.sources.questionId
    await reply.locals.models.sources.destroy()

    if (!reply.hasMessage()) {
      reply.setSuccessMessage('Успешно удалено')
    }

    reply.redirect(`/questions/${questionId}/sources`)
  }
}

module.exports = Source
