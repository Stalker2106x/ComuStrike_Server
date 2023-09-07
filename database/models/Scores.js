const { DataTypes } = require('sequelize')

module.exports = {
  define: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    kills: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    headshots: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    deaths: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  options: {
    tableName: 'Scores'
  },
  defineAssociations: function (models) {
    models.Scores.belongsTo(models.Players, {
      foreignKey: {
        name: 'player_id',
        allowNull: false
      },
      onUpdate: 'NO ACTION'
    })
  }
}
