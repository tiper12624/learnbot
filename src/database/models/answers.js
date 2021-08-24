const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class answers extends Sequelize.Model {}

  answers.init({
    id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    right: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    replyText: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize
  })

  return answers
}
