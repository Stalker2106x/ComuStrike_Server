const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize({ dialect: 'mariadb' })

module.exports = {
  name: 'Players',
  define: {
    player_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    version: {
      type: DataTypes.STRING,
      defaultValue: 100
    },
    mac_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_login: {
      type: 'TIMESTAMP',
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    model: {
      type: DataTypes.STRING,
      defaultValue: 'agtx'
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    score: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    }
  },
  options: {
    tableName: 'Players'
  }
}
