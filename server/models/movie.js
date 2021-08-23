"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movie.init(
    {
      title: DataTypes.STRING,
      episode: DataTypes.INTEGER,
      director: DataTypes.STRING,
      studio: DataTypes.STRING,
      tv_status: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      release: DataTypes.DATEONLY,
      country: DataTypes.STRING,
      genre: DataTypes.STRING,
      rating_tmdb: DataTypes.FLOAT,
      network: DataTypes.STRING,
      trailer: DataTypes.STRING,
      views: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      image: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movie",
    }
  );
  return movie;
};