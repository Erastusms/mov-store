'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Line_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Line_items.belongsTo(models.Movie)
      Line_items.belongsTo(models.Movies_cart)
      Line_items.belongsTo(models.Order)
    }
  };
  Line_items.init({
    qty: DataTypes.INTEGER,
    status: DataTypes.STRING,
    MovieId: DataTypes.INTEGER,
    MoviesCartId: DataTypes.INTEGER,
    OrderName: DataTypes.STRING,
    uniqId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Line_items',
  });
  return Line_items;
};