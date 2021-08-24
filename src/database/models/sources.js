const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class sources extends Sequelize.Model {}

  sources.init({
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
    type: {
      type: Sequelize.DataTypes.ENUM,
      values: ['text', 'document', 'photo', 'audio', 'video', 'mediaGroup'],
      allowNull: false,
    },
    media: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
    },
  }, {
    sequelize
  })

  return sources
}
