const db = require("../models");
const cartController = {
  addProductToCart: async (req, res) => {
    try {
      const { ProductId } = req.params;
      const { quantity } = req.body;

      const findProduct = await db.Product.findOne({
        where: {
          id: ProductId,
        },
      });

      if (!findProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (quantity > findProduct.stock) {
        return res.status(400).json({
          message: "Quantity is out of range",
        });
      }

      const findProductInCart = await db.Cart.findOne({
        where: {
          ProductId,
        },
      });

      if (findProductInCart) {
        return res.status(400).json({
          message: "Product already in cart",
        });
      }

      const response = await db.Cart.create({
        ProductId,
        UserId: req.user.id,
        quantity,
      });

      return res.status(200).json({
        message: "Product successfully added to cart",
        data: findProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  deleteProductFromCart: async (req, res) => {
    try {
      const { id } = req.params;

      const findCartById = await db.Cart.findOne({
        where: {
          id,
        },
      });

      if (!findCartById) {
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      await db.Cart.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "Product successfully deleted from cart",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  getProductInCart: async (req, res) => {
    try {
      const response = await db.Cart.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [{ model: db.Product, include: [{ model: db.Image_Url }] }],
      });

      return res.status(200).json({
        message: "Successfully get all cart items",
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

module.exports = cartController;
