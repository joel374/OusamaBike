"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorit.belongsTo(models.Product);
      Favorit.belongsTo(models.User);
    }
  }
  Favorit.init(
    {},
    {
      sequelize,
      modelName: "Favorit",
    }
  );
  return Favorit;
};
