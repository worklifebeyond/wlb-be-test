'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
      User.hasMany(models.Comment)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "username can't be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'please input the right email'
        },
        notEmpty: {
          args: true,
          msg: "email can't be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "password can't be empty"
        }
      }
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 'false' }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};