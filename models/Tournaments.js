const { DataTypes } = require('sequelize')

module.exports = {
  define: {
    tournament_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    map: {
      type: DataTypes.STRING,
      allowNull: false
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score2: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  options: {
    tableName: 'Tournaments'
  }
}
