const { Op } = require("sequelize");
const db = require("../models");

const productController = {
  add: async (req, res) => {
    try {
      // console.log(req.file);

      const {
        product_name,
        stock,
        CategoryId,
        BrandCategoryId,
        price,
        description,
        is_active,
      } = req.body;

      console.log(req.body);

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

      const response = await db.Product.create(req.body);
      const image_url = `http://localhost:8000/public/${req.file.filename}`;

      await db.Image_Url.create({ image_url, ProductId: response.id });

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

      const image_url = req.file.filename;

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

      const response = await db.Product.update(req.body, {
        where: {
          id,
        },
      });

      await db.Image_Url.update(
        {
          image_url,
        },
        {
          where: {
            ProductId: response.id,
          },
        }
      );

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
  get: async (req, res) => {
    try {
      const {
        id = "",
        SKU = "",
        product_name = "",
        CategoryId = "",
        BrandCategoryId = "",
        _sortBy = "id",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
      } = req.query;

      if (id) {
        const response = await db.Product.findOne({
          include: [
            { model: db.Category },
            { model: db.Brand_Category },
            { model: db.Image_Url },
          ],
          where: {
            id: id,
          },
        });

        return res.status(200).json({
          message: "Get Product By Id",
          data: response,
        });
      }

      const response = await db.Product.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        include: [
          { model: db.Category },
          { model: db.Brand_Category },
          { model: db.Image_Url },
        ],
        where: {
          [Op.or]: {
            product_name: {
              [Op.like]: `%${product_name}%`,
            },
          },
        },
        order: [
          [_sortBy, _sortDir],
          ["price", "DESC"],
        ],
      });

      return res.status(200).json({
        message: "Get All Product",
        data: response.rows,
        dataCount: response.count,
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
