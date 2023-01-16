const db = require("../models");

const favoriteController = {
  add: async (req, res) => {
    try {
      const { ProductId } = req.params;

      const findProduct = await db.Favorite.findOne({
        where: {
          ProductId,
          UserId: req.user.id,
        },
      });

      if (findProduct) {
        return res.status(400).json({
          message: "Product already exists in favorit",
        });
      }

      await db.Favorite.create({
        ProductId,
        UserId: req.user.id,
      });

      return res.status(200).json({
        message: "Added product to favorit",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { ProductId } = req.params;

      const findProduct = await db.Favorite.findOne({
        where: {
          ProductId,
          UserId: req.user.id,
        },
      });

      if (!findProduct) {
        return res.status(400).json({
          message: "Favorit not found",
        });
      }

      await db.Favorite.destroy({
        ProductId,
        UserId: req.user.id,
      });

      return res.status(200).json({
        message: "Product deleted from favorit",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
};

module.exports = favoriteController;
