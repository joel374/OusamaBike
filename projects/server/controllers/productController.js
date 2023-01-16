const db = require("../models");

const productController = {
  add: async (req, res) => {
    try {
      const {
        product_name,
        stock,
        CategoryId,
        BrandCategoryId,
        price,
        description,
      } = req.body;

      const findProduct = await db.Product.findOne({
        where: {
          product_name,
        },
      });

      if (findProduct) {
        return res.status(400).json({
          message: "Product already exists ",
        });
      }

      await db.Product.create(req.body);

      return res.status(200).json({
        message: "Product added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const {
        product_name,
        stock,
        CategoryId,
        BrandCategoryId,
        price,
        description,
      } = req.body;

      const findProduct = await db.Product.findOne({
        where: {
          id,
        },
      });

      if (!findProduct.id) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (findProduct.product_name === product_name) {
        return res.status(400).json({
          message: "Product already exists ",
        });
      }

      await db.Product.update(req.body, {
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "Product edited",
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
      const { id } = req.params;
      const findProduct = await db.Product.findOne({
        where: {
          id,
        },
      });

      if (!findProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      await db.Product.destroy({
        where: req.params,
      });

      return res.status(200).json({
        message: "Product deleted",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
};

module.exports = productController;
