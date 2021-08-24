module.exports = (db) => {
  db.questions.create({
    name: 'Пример 1 (text)',
    enabled: true,
    sources: [
      {
        name: 'Просто текст',
        type: 'text',
        media: 'Текст вопроса...',
      }
    ],
    answers: [
      {
        text: 'Ответ №1',
        right: true,
        replyText: 'Вы выбрали ответ №1',
      },
      {
        text: 'Ответ №2',
        right: false,
        replyText: 'Вы выбрали ответ №2',
      }
    ],
  }, {
    include: [db.sources, db.answers]
  }).then()

  db.questions.create({
    name: 'Пример 2 (docs/txts)',
    enabled: true,
    sources: [
      {
        name: 'Просто документ',
        type: 'document',
        media: 'BQACAgIAAxkBAAICy2EhRfgNUJHaYBlg4vrX_4emyJH8AAI9EQACU-4JSWwj2wHLUO4_IAQ',
      },
      {
        name: 'Просто документ',
        type: 'document',
        media: 'BQACAgIAAxkBAAICzWEhRfoB58v7__fDIjJTemSATn_5AAI-EQACU-4JSduSjkfORKduIAQ',
      },
      {
        name: 'Просто документ',
        type: 'document',
        media: 'BQACAgIAAxkBAAICz2EhRf-29qyYoTdunh_Sz69y8qUOAAI_EQACU-4JSfSvBYGQaOU3IAQ',
      },
      {
        name: 'Просто документ',
        type: 'document',
        media: 'BQACAgIAAxkBAAIC0GEhRf-RsSykRYUOgEpSlwSrRCNAAAJAEQACU-4JSYvAPcuUxNfSIAQ',
      },
      {
        name: 'Просто документ',
        type: 'document',
        media: 'BQACAgIAAxkBAAIC0WEhRf80tBUNxwmhcLHV1WLWtgqCAAJBEQACU-4JSSYD83aqyLuOIAQ',
      }
    ],
    answers: [
      {
        text: 'Документ №1',
        right: true,
        replyText: 'Вы выбрали документ №1',
      },
      {
        text: 'Документ №2',
        right: false,
        replyText: 'Вы выбрали документ №2',
      },
      {
        text: 'Документ №3',
        right: false,
        replyText: 'Вы выбрали документ №3',
      },
      {
        text: 'Текст №1',
        right: false,
        replyText: 'Вы выбрали текст №1',
      },
      {
        text: 'Текст №2',
        right: false,
        replyText: 'Вы выбрали текст №2',
      }
    ],
  }, {
    include: [db.sources, db.answers]
  }).then()

  db.questions.create({
    name: 'Пример 3 (images)',
    enabled: true,
    sources: [
      {
        name: 'Просто группа',
        type: 'mediaGroup',
        media: [
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDNmEiT3jvCvddgvMmTZgf6misWH13AAJ7uDEbU-4JSdkgflv--Pf6AQADAgADeQADIAQ',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDOGEiT3qBszy-U8tdEPKSCcu7OhlyAAJctTEbV6AQSX5v8ffUPEFNAQADAgADeQADIAQ',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDOmEiT3yOcucRD2sM_16hR-y80RJ7AAJ5uDEbU-4JSYtOehFh-3I1AQADAgADeQADIAQ',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDPGEiT3yipa8AATlCxtl8nnjxt90pNwACfbgxG1PuCUkbcS4jRieWoAEAAwIAA3kAAyAE',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDPmEiT30qwreX7B_JbBz0YSOMXzZZAAJdtTEbV6AQSTncuFyB1yayAQADAgADeQADIAQ',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDQGEiT31nhJ2b_VvlgjUsGZN8TEKFAAKDuDEbU-4JSeOvQx_8cgX7AQADAgADeQADIAQ',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDQmEiT35xhW19BQN9l6Tb7wTR3bMEAAKEuDEbU-4JSRyIPko4RYCvAQADAgADeQADIAQ',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDRGEiT3-3rNCiw9RwUuD60YdAXIELAAJ-uDEbU-4JSelG8uf6upF0AQADAgADeQADIAQ',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDRmEiT38j3BeJLUAnBlaX5ffLPQUEAAJ_uDEbU-4JSWDKRgsw7m5eAQADAgADeQADIAQ',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDSGEiT4C_4aP1tDXh66T72LPZX1LLAAJetTEbV6AQSQm4M6e7hD0bAQADAgADeQADIAQ',
          },
        ],
      },
      {
        name: 'Просто изображение',
        type: 'photo',
        media: 'AgACAgIAAxkBAAIDSmEiT4AOrebonwY5nC12NO4iQApaAAJftTEbV6AQSQ2b31gLM-RRAQADAgADeQADIAQ',
      },
      {
        name: 'Просто изображение',
        type: 'photo',
        media: 'AgACAgIAAxkBAAIDTGEiT4Ee_H-zTL5nbMnrJbL0WfZEAAJgtTEbV6AQSfA_QOWDe8VwAQADAgADeQADIAQ',
      },
      {
        name: 'Просто изображение',
        type: 'photo',
        media: 'AgACAgIAAxkBAAIDTmEiT4Hjhl41jYb1bgAB-n0ufZup9QACYbUxG1egEEnvIYODBga7xAEAAwIAA3kAAyAE',
      }
    ],
    answers: [
      {
        text: 'Группа',
        right: true,
        replyText: 'Вы выбрали группу',
      },
      {
        text: 'Изображение №1',
        right: false,
        replyText: 'Вы выбрали изображение №1',
      },
      {
        text: 'Изображение №2',
        right: false,
        replyText: 'Вы выбрали изображение №2',
      },
      {
        text: 'Изображение №3',
        right: false,
        replyText: 'Вы выбрали изображение №3',
      },
    ],
  }, {
    include: [db.sources, db.answers]
  }).then()

  db.questions.create({
    name: 'Пример 4 (audios)',
    enabled: true,
    sources: [
      {
        name: 'Просто аудио',
        type: 'audio',
        media: 'CQACAgIAAxkBAAIDD2EhSA9BEfaMceG6YORtp-ZpKBNDAAJZEQACU-4JSbkCCWRTQakoIAQ',
      },
      {
        name: 'Просто аудио',
        type: 'audio',
        media: 'CQACAgIAAxkBAAIDEWEhSBBd6AwB2HCsR2cHIjD88b1HAAJaEQACU-4JSYbDxRgV5Lz3IAQ',
      },
      {
        name: 'Просто аудио',
        type: 'audio',
        media: 'CQACAgIAAxkBAAIDE2EhSBLK8fMSuoM7NZG4DHTAn4UYAAJbEQACU-4JSdWjlj7YVSoEIAQ',
      }
    ],
    answers: [
      {
        text: 'Аудио №1',
        right: true,
        replyText: 'Вы выбрали аудио №1',
      },
      {
        text: 'Аудио №2',
        right: false,
        replyText: 'Вы выбрали аудио №2',
      },
      {
        text: 'Аудио №3',
        right: false,
        replyText: 'Вы выбрали аудио №3',
      }
    ],
  }, {
    include: [db.sources, db.answers]
  }).then()

  db.questions.create({
    name: 'Пример 5 (videos)',
    enabled: true,
    sources: [
      {
        name: 'Просто видео',
        type: 'video',
        media: 'BAACAgIAAxkBAAIDFWEhSFe6blUGk9_TYJ6U5QZLHQ_gAAJgEQACU-4JSS83ncfTyLtbIAQ',
      },
      {
        name: 'Просто видео',
        type: 'video',
        media: 'BAACAgIAAxkBAAIDF2EhSHOldtphXyZC1lZ2U1bRd-50AAJhEQACU-4JSUq0k4Xr3gABLSAE',
      },
      {
        name: 'Просто видео',
        type: 'video',
        media: 'BAACAgIAAxkBAAIDGWEhSI_U4A7y0tdFMII4veKZkJW9AAJlEQACU-4JSeGgi3kVX3alIAQ',
      }
    ],
    answers: [
      {
        text: 'Видео №1',
        right: true,
        replyText: 'Вы выбрали видео №1',
      },
      {
        text: 'Видео №2',
        right: false,
        replyText: 'Вы выбрали видео №2',
      },
      {
        text: 'Видео №3',
        right: false,
        replyText: 'Вы выбрали видео №3',
      }
    ],
  }, {
    include: [db.sources, db.answers]
  }).then()

  db.questions.create({
    name: 'Пример 6 (disabled)',
    enabled: false,
    sources: [
      {
        name: 'Просто текст',
        type: 'text',
        media: 'Неактивный вопрос',
      }
    ],
    answers: [
      {
        text: 'Ответ №1',
        right: true,
        replyText: 'Вы выбрали ответ №1',
      },
      {
        text: 'Ответ №2',
        right: false,
        replyText: 'Вы выбрали ответ №2',
      }
    ],
  }, {
    include: [db.sources, db.answers]
  }).then()

  db.questions.create({
    name: 'Пример 7 (mixed)',
    enabled: true,
    sources: [
      {
        name: 'Просто текст',
        type: 'text',
        media: 'Текст вопроса...',
      },
      {
        name: 'Просто документ',
        type: 'document',
        media: 'BQACAgIAAxkBAAICy2EhRfgNUJHaYBlg4vrX_4emyJH8AAI9EQACU-4JSWwj2wHLUO4_IAQ',
      },
      {
        name: 'Просто изображение',
        type: 'photo',
        media: 'AgACAgIAAxkBAAIDNmEiT3jvCvddgvMmTZgf6misWH13AAJ7uDEbU-4JSdkgflv--Pf6AQADAgADeQADIAQ',
      },
      {
        name: 'Просто аудио',
        type: 'audio',
        media: 'CQACAgIAAxkBAAIDD2EhSA9BEfaMceG6YORtp-ZpKBNDAAJZEQACU-4JSbkCCWRTQakoIAQ',
      },
      {
        name: 'Просто видео',
        type: 'video',
        media: 'BAACAgIAAxkBAAIDFWEhSFe6blUGk9_TYJ6U5QZLHQ_gAAJgEQACU-4JSS83ncfTyLtbIAQ',
      }
    ],
    answers: [
      {
        text: 'Правильный ответ',
        right: true,
        replyText: 'Вы выбрали правильный ответ',
      },
      {
        text: 'Текст',
        right: false,
        replyText: 'Вы выбрали текст',
      },
      {
        text: 'Документ',
        right: false,
        replyText: 'Вы выбрали документ',
      },
      {
        text: 'Изображение',
        right: false,
        replyText: 'Вы выбрали изображение',
      },
      {
        text: 'Аудио',
        right: false,
        replyText: 'Вы выбрали аудио',
      },
      {
        text: 'Видео',
        right: false,
        replyText: 'Вы выбрали видео',
      },
    ],
  }, {
    include: [db.sources, db.answers]
  }).then()

  db.questions.create({
    name: 'Пример 8 (group)',
    enabled: true,
    sources: [
      {
        name: 'Просто группа',
        type: 'mediaGroup',
        media: [
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDNmEiT3jvCvddgvMmTZgf6misWH13AAJ7uDEbU-4JSdkgflv--Pf6AQADAgADeQADIAQ',
          },
          {
            type: 'photo',
            media: 'AgACAgIAAxkBAAIDTmEiT4Hjhl41jYb1bgAB-n0ufZup9QACYbUxG1egEEnvIYODBga7xAEAAwIAA3kAAyAE',
          }
        ],
      },
    ],
    answers: [
      {
        text: 'Ответ!',
        right: true,
        replyText: 'Вы выбрали ответ',
      }
    ],
  }, {
    include: [db.sources, db.answers]
  }).then()
}
