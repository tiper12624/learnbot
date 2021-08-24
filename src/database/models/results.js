const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class results extends Sequelize.Model {}

  results.init({
    id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    answer: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    right: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize
  })

  return results
}
