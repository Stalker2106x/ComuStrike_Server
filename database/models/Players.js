const { DataTypes } = require('sequelize')

module.exports = {
  define: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '157'
    },
    mac_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_login: {
      type: 'TIMESTAMP',
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'agtx'
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    level_xp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'Players'
  },
  defineAssociations: function (models) {
    models.Players.belongsTo(models.MP3, {
      foreignKey: {
        name: 'mp3_id',
        allowNull: false,
        defaultValue: 1
      },
      onUpdate: 'NO ACTION'
    })
    models.Players.belongsTo(models.Ranks, {
      foreignKey: {
        name: 'rank_id',
        allowNull: false,
        defaultValue: 1
      },
      onUpdate: 'NO ACTION'
    })
    models.Players.belongsToMany(models.Teams, { through: 'Teams_Players' })
  }
}
