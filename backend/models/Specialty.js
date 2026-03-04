const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Specialty = sequelize.define('Specialty', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Le nom de la spécialité ne peut pas être vide'
      }
    }
  },
  
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    },
    validate: {
      notNull: {
        msg: 'La spécialité doit appartenir à une catégorie'
      }
    }
  }
}, {
  tableName: 'specialties',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['category_id']
    }
  ]
});

module.exports = Specialty;