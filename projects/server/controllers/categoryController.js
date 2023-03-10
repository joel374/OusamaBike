const db = require("../models");

const categoryController = {
  add: async (req, res) => {
    try {
      const { category_name } = req.body;

      const findCategory = await db.Category.findOne({
        where: {
          category_name,
        },
      });

      if (findCategory) {
        return res.status(400).json({
          message: "Category already exists",
        });
      }

      const response = await db.Category.create(req.body);

      return res.status(200).json({
        message: "Category added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { category_name } = req.body;

      const findCategory = await db.Category.findOne({ where: id });

      if (!findCategory) {
        return res.status(400).json({
          message: "Category not found",
        });
      }

      if (findCategory.category_name === category_name) {
        return res.status(400).json({
          message: "Category already exists",
        });
      }

      await db.Category.update(
        {
          category_name,
        },
        {
          id,
        }
      );

      return res.status(200).json({
        message: "Category updated",
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

      const findCategory = await db.Category.findOne({
        where: {
          id: id,
        },
      });

      if (!findCategory) {
        return res.status(400).json({
          message: "Category not found",
        });
      }

      await db.Category.destroy({
        where: { id: id },
      });

      return res.status(200).json({
        message: "Category deleted",
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
      const response = await db.Category.findAll();

      return res.status(200).json({
        message: "Get Category",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  addBrand: async (req, res) => {
    try {
      const { brand_name } = req.body;

      const findBrand = await db.Brand_Category.findOne({ where: brand_name });

      if (findBrand.brand_name === brand_name) {
        return res.status(400).json({
          message: "Brand already exists",
        });
      }

      await db.Brand_Category.create({ brand_name });

      return res.status(200).json({
        message: "Brand added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  updateBrand: async (req, res) => {
    try {
      const { id } = req.params;

      const findBrand = await db.Brand_Category.findOne({ where: id });

      if (!findBrand) {
        return res.status(400).json({
          message: "Brand not found",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  deleteBrand: async (req, res) => {
    try {
      const { id } = req.params;

      const findBrand = await db.Brand_Category.findOne({ where: id });

      if (!findBrand) {
        return res.status(400).json({
          message: "Brand not found",
        });
      }

      await db.Brand_Category.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "Brand deleted",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  getBrand: async (req, res) => {
    try {
      const response = await db.Brand_Category.findAll();

      return res.status(200).json({
        message: "Get Brand Category",
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

module.exports = categoryController;
