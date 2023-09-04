const { DataTypes } = require('sequelize')

module.exports = {
  define: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sessions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  options: {
    tableName: 'Maps'
  },
  defineAssociations: function (models) {
  }
}
