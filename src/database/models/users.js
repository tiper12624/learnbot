const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class users extends Sequelize.Model {}

  users.init({
    id: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    canAdmin: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sessionToken: {
      type: Sequelize.DataTypes.STRING,
      length: 64,
      allowNull: true,
      unique: true,
    },
    authToken: {
      type: Sequelize.DataTypes.STRING,
      length: 64,
      allowNull: true,
      unique: true,
    },
    notes: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
  })

  return users
}
