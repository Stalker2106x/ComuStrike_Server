const { DataTypes } = require('sequelize')

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
    credits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    mp3: {
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
    kills: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    headshots: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    deaths: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    }
  },
  options: {
    tableName: 'Players'
  }
}
