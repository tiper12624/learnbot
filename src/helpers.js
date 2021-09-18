const { Sequelize } = require('sequelize')
const axios = require('axios')
const { db } = require('./database')

module.exports = {
  getGreetings () {
    return 'Приветствуем, это обучающий бот платформы FreeUnion.online. Совсем скоро ты сможешь присоединяться к объединениям и вместе делать хорошие и важные дела, а сейчас хотим рассказать нашу историю - кто мы и какие наши ценности. Отвечай на вопросы и будь в курсе событий.'
  },

  async sendQuestion (userId, id, test = false) {
    const { bot } = require('./telegraf')

    if (!id) {
      // TODO: resolve error
      /*
(node:29) UnhandledPromiseRejectionWarning: SequelizeDatabaseError: column "results.id" must appear in the GROUP BY clause or be used in an aggregate function,
(node:29) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 15),
    at Query.formatError (/app/node_modules/sequelize/lib/dialects/postgres/query.js:386:16),
    at Query.run (/app/node_modules/sequelize/lib/dialects/postgres/query.js:87:18),
    at runMicrotasks (<anonymous>),
    at processTicksAndRejections (internal/process/task_queues.js:95:5),
    at async /app/node_modules/sequelize/lib/sequelize.js:619:16,
    at async Function.aggregate (/app/node_modules/sequelize/lib/model.js:1986:19),
    at async Function.min (/app/node_modules/sequelize/lib/model.js:2123:12),
    at async PostgresQueryInterface.rawSelect (/app/node_modules/sequelize/lib/dialects/abstract/query-interface.js:995:18),
    at async sendQuestion (/app/src/helpers.js:14:12),
    at async module.exports (/app/src/telegraf/commands/clear.js:13:5)
       */
      try {
        id = await db.questions.min('questions.id', {
          include: [
            {
              model: db.results,
              required: false,
              where: {
                userId: userId,
              }
            }
          ],
          where: [
            Sequelize.where(Sequelize.col('questions.enabled'), true),
            Sequelize.where(Sequelize.col('results.id'), null),
          ],
          raw: true,
        })
      } catch (e) {
        id = await db.questions.min('questions.id', {
          raw: true,
        })
      }
    }

    const question = await db.questions.findByPk(id, {
      order: [
        [db.sources, 'id', 'ASC'],
        [db.answers, 'id', 'ASC'],
      ],
      include: [db.sources, db.answers],
    })

    if (question) {
      for (const source of question.sources) {
        switch (source.type) {
          case 'text':
            await bot.telegram.sendMessage(userId, source.media)
            break
          case 'document':
            await bot.telegram.sendDocument(userId, source.media)
            break
          case 'photo':
            await bot.telegram.sendPhoto(userId, source.media)
            break
          case 'audio':
            await bot.telegram.sendAudio(userId, source.media)
            break
          case 'video':
            await bot.telegram.sendVideo(userId, source.media)
            break
          case 'mediaGroup':
            await bot.telegram.sendMediaGroup(userId, source.media)
            break
        }
      }

      const buttons = []
      let line = []
      for (const answer of question.answers) {
        line.push({
          text: answer.text,
          callback_data: answer.id,
        })
        if (line.length === 2) {
          buttons.push(line)
          line = []
        }
      }
      if (line.length > 0) {
        buttons.push(line)
      }
      if (buttons.length === 0) {
        buttons.push([{
          text: 'Нет вариантов',
          callback_data: 0,
        }])
      }

      await bot.telegram.sendMessage(userId, 'Выберите один из вариант ответа', {
        reply_markup: {
          inline_keyboard: buttons
        }
      })
    } else {
      await bot.telegram.sendMessage(userId, 'Спасибо за внимание и ответы. Совсем скоро мы продолжим обучение и расскажем как ты можешь помочь себе и что для можешь делать при помощи нашей платформы. Спасибо что с нами!')
    }
  },

  translateSourceType (type = null) {
    const types = {
      text: 'Текст',
      document: 'Документ',
      photo: 'Изображение',
      audio: 'Аудио',
      video: 'Видео',
      mediaGroup: 'Группа изображений',
    }

    if (type) {
      return types[type] ?? ''
    } else {
      return types
    }
  },

  async getFile (hash) {
    if (hash != '') {
      try {
        const { data } = await axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${hash}`)
        if (data.ok) {
          return data.result.file_path
        }
      } catch (e) {}
    }

    return ''
  },

  yesSmile (all = false) {
    const smiles = ['%F0%9F%91%8D', '%F0%9F%91%8F', '%F0%9F%A5%B3', '%F0%9F%8E%89', '%F0%9F%98%8D']
    if (all) {
      return smiles
    }

    return decodeURI(smiles[Math.floor(Math.random() * smiles.length)])
  },

  noSmile (all = false) {
    const smiles = ['%F0%9F%98%B3', '%F0%9F%98%94', '%F0%9F%98%A2', '%F0%9F%A5%BA', '%F0%9F%98%9E']
    if (all) {
      return smiles
    }

    return decodeURI(smiles[Math.floor(Math.random() * smiles.length)])
  },

  timeout (s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000))
  },

  clean (string) {
    return string.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1')
  },

  sizeFormat (size) {
    const i = Math.floor(Math.log(size) / Math.log(1024))
    return ((size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]).toString().replace('.', '\\.')
  },
}
