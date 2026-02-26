const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Le nom ne peut pas être vide'
      },
      len: {
        args: [2, 200],
        msg: 'Le nom doit contenir entre 2 et 200 caractères'
      }
    }
  },
  
  specialty_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'specialties',
      key: 'id'
    }
  },
  
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'La note doit être supérieure ou égale à 0'
      },
      max: {
        args: [5],
        msg: 'La note doit être inférieure ou égale à 5'
      },
      isDecimal: {
        msg: 'La note doit être un nombre décimal'
      }
    }
  },
  
  location: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La localisation ne peut pas être vide'
      }
    }
  },
  
  about: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La description ne peut pas être vide'
      },
      len: {
        args: [10, 5000],
        msg: 'La description doit contenir entre 10 et 5000 caractères'
      }
    }
  },
  
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'L\'adresse email doit être valide'
      },
      notEmpty: {
        msg: 'L\'email ne peut pas être vide'
      }
    }
  },
  
  website: {
    type: DataTypes.STRING(300),
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'L\'URL du site web doit être valide'
      }
    }
  },
  
  top: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  tableName: 'artisans',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['specialty_id']
    },
    {
      fields: ['top']
    },
    {
      fields: ['name']
    }
  ]
});

module.exports = Artisan;