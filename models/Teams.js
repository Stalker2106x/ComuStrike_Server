const { DataTypes } = require('sequelize')

module.exports = {
  define: {
    team_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  options: {
    tableName: 'Teams'
  }
}
