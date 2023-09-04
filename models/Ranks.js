const { DataTypes } = require('sequelize')

module.exports = {
  define: {
    rank_id: {
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
    tableName: 'Ranks'
  }
}
