'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcomment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subcomment.belongsTo(models.Post)
      Subcomment.belongsTo(models.User)
      Subcomment.belongsTo(models.Comment)
    }
  };
  Subcomment.init({
    content: DataTypes.STRING,
    CommentId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subcomment',
  });
  return Subcomment;
};