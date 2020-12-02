'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubComment.belongsTo(models.Comment);
      SubComment.belongsTo(models.User);
    }
  };
  SubComment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Content must not be null.',
        },
        notEmpty: {
          args: true,
          msg: 'Content must not be empty.',
        },
      },
    },
    CommentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'CommentId must not be null.',
        },
      },
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SubComment',
  });
  return SubComment;
};