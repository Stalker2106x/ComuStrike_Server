const { DataTypes } = require('sequelize')

module.exports = {
  name: 'Teams',
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
