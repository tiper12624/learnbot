const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class settings extends Sequelize.Model {}

  settings.init({
    id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    timestamps: false,
  })

  return settings
}
