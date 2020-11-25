'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Like);
      Post.hasMany(models.Comment);
      Post.belongsTo(models.User);
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title must not be null.'
        },
        notEmpty: {
          args: true,
          msg: 'Title must not be empty.',
        },
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Content must not be null.'
        },
        notEmpty: {
          args: true,
          msg: 'Content must not be empty.',
        },
      },
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};