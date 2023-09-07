const { DataTypes } = require('sequelize')

module.exports = {
  define: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  options: {
    tableName: 'Teams'
  },
  defineAssociations: function (models) {
  }
}
