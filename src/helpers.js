const { Sequelize, Op } = require('sequelize')
const axios = require('axios')
const { db } = require('./database')

module.exports = {
  async sendQuestion (userId, id) {
    const { bot } = require('./telegraf')

    if (!id) {
      id = await db.questions.min('questions.id', {
        include: [
          {
            model: db.results,
            required: false,
            attributes: [],
            where: {
              userId: userId,
            }
          }
        ],
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.col('questions.enabled'), 'true'),
            Sequelize.where(Sequelize.col('results.id'), null),
          ]
        },
        raw: true,
      })
    }

    const question = await db.questions.findOne({
      where: {
        id,
      },
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
            await bot.telegram.sendMessage(userId, source.media, { parse_mode: 'Markdown' })
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

      const beforeVariantsPause = await module.exports.getSetting('beforeVariantsPause', 0)
      await module.exports.timeout(beforeVariantsPause)

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

      await bot.telegram.sendMessage(userId, 'Ждем Ваш ответ', {
        reply_markup: {
          inline_keyboard: buttons
        }
      })
    } else {
      const goodbyeText = await module.exports.getSetting('goodbyeText', '')
      if (goodbyeText !== '') {
        await bot.telegram.sendMessage(userId, goodbyeText, { parse_mode: 'Markdown' })
      }
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
    if (hash !== '') {
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

  async getSetting (name, def = null) {
    const result = await db.settings.findOne({ where: { name } })

    return result !== null ? result.value : def
  },

  async saveSetting (name, value = null) {
    if (value === null) {
      await db.settings.destroy({ where: { name } })
    } else {
      const settings = await db.settings.findOrCreate({ where: { name } })
      const setting = settings[0]
      setting.value = value
      await setting.save()
    }
  }
}
