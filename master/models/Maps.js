const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize({ dialect: 'mariadb' })

module.exports = {
  name: 'Maps',
  define: {
    map_id: {
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
    }
  },
  options: {
    tableName: 'Maps'
  }
}
