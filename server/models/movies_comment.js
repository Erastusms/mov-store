"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movies_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movies_comment.belongsTo(models.User)
      Movies_comment.belongsTo(models.Movie)
    }
  }
  Movies_comment.init(
    {
      comments: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      MovieId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movies_comment",
    }
  );
  return Movies_comment;
};
