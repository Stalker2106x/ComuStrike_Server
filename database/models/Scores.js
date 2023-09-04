const { DataTypes } = require('sequelize')

module.exports = {
  define: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    player_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Players',
        key: 'id'
      }
    },
    kills: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    headshots: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    deaths: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  options: {
    tableName: 'Scores'
  },
  defineAssociations: function (models) {
  }
}
