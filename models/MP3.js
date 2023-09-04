const { DataTypes } = require('sequelize')

module.exports = {
  define: {
    mp3_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  options: {
    tableName: 'MP3'
  }
}
