'use strict';
const {
  Model
} = require('sequelize');
const { generate_bcrypt_hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post);
      User.hasMany(models.Like);
      User.hasMany(models.Comment);
      User.hasMany(models.SubComment);
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username must not be empty.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please use the correct email format.',
        },
        notEmpty: {
          args: true,
          msg: 'Email must not be empty.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: 'Password minimum length is 5 characters.' 
        },
        notEmpty: {
          args: true,
          msg: 'Password must not be empty.'
        },
      },
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = generate_bcrypt_hash(user.password);
    user.status = 'registered';
  });
  return User;
};