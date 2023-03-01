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
          message: "Product already exists in wishlist",
        });
      }

      await db.Favorite.create({
        ProductId,
        UserId: req.user.id,
      });

      return res.status(200).json({
        message: "Product added to wishlist",
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
      console.log(ProductId);

      const findProduct = await db.Favorite.findOne({
        where: {
          ProductId: ProductId,
          UserId: req.user.id,
        },
      });

      if (!findProduct) {
        return res.status(400).json({
          message: "Product not found",
        });
      }

      await db.Favorite.destroy({
        where: { ProductId, UserId: req.user.id },
      });

      return res.status(200).json({
        message: "Product deleted from wishlist",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  get: async (req, res) => {
    try {
      const response = await db.Favorite.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [{ model: db.Product, include: [{ model: db.Image_Url }] }],
      });

      return res.status(200).json({
        message: "Get Wishlist",
        data: response,
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
