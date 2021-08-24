const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_DSN, {
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
})

const db = {
  sequelize,
  answers: require('./models/answers')(sequelize),
  questions: require('./models/questions')(sequelize),
  results: require('./models/results')(sequelize),
  sources: require('./models/sources')(sequelize),
  users: require('./models/users')(sequelize),
}

db.questions.hasMany(db.sources, { onDelete: 'CASCADE', hooks: true })
db.sources.belongsTo(db.questions)
db.questions.hasMany(db.answers, { onDelete: 'CASCADE', hooks: true })
db.answers.belongsTo(db.questions)

db.users.hasMany(db.results, { onDelete: 'CASCADE', hooks: true })
db.results.belongsTo(db.users)
db.questions.hasMany(db.results, { onDelete: 'CASCADE', hooks: true })
db.results.belongsTo(db.questions)

const seeders = {
  users: require('./seeders/users'),
  questions: require('./seeders/questions'),
  results: require('./seeders/results'),
}

module.exports = { db, seeders }
