"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movies_actors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movies_actors.init(
    {
      actor_name: DataTypes.STRING,
      char_name: DataTypes.STRING,
      year_date: DataTypes.STRING,
      filename: DataTypes.STRING,
      filesize: DataTypes.STRING,
      filetype: DataTypes.STRING,
      MovieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movies_actors",
    }
  );
  return movies_actors;
};
