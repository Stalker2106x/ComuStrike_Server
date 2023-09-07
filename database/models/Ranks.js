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
    },
    weapon_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  options: {
    tableName: 'Ranks'
  },
  defineAssociations: function (models) {
  }
}
