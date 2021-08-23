'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class line_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  line_items.init({
    qty: DataTypes.INTEGER,
    status: DataTypes.STRING,
    MovieId: DataTypes.INTEGER,
    MoviesCartId: DataTypes.INTEGER,
    OrderName: DataTypes.STRING,
    uniqId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'line_items',
  });
  return line_items;
};