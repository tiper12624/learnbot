const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class questions extends Sequelize.Model {}

  questions.init({
    id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    enabled: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize
  })

  return questions
}
