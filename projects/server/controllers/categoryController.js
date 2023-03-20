const { Op } = require("sequelize");
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

      const findCategory = await db.Category.findOne({ where: { id: id } });

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
          where: {
            id,
          },
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
      const {
        category_name = "",
        _sortBy = "category_name",
        _sortDir = "ASC",
        _limit = 10,
        _page = 1,
      } = req.query;

      if (category_name) {
        const response = await db.Category.findAndCountAll({
          limit: Number(_limit),
          order: [[_sortBy, _sortDir]],
          offset: (_page - 1) * _limit,
          where: {
            category_name: {
              [Op.like]: `%${category_name}%`,
            },
          },
        });

        return res.status(200).json({
          message: "Get Category By Category Name",
          data: response.rows,
          dataCount: response.count,
        });
      }

      const response = await db.Category.findAndCountAll({
        limit: Number(_limit),
        order: [[_sortBy, _sortDir]],
        offset: (_page - 1) * _limit,
      });

      return res.status(200).json({
        message: "Get Category",
        data: response.rows,
        dataCount: response.count,
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  addBrand: async (req, res) => {
    try {
      const { brand_name } = req.body;

      const findBrand = await db.Brand_Category.findOne({
        where: { brand_name: brand_name },
      });

      if (findBrand) {
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
      const { brand_name } = req.body;

      const findBrand = await db.Brand_Category.findOne({ where: { id: id } });

      if (!findBrand) {
        return res.status(400).json({
          message: "Brand not found",
        });
      }

      if (findBrand.brand_name === brand_name) {
        return res.status(400).json({
          message: "Category already exists",
        });
      }

      await db.Brand_Category.update(
        {
          brand_name,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({
        message: "Brand updated",
      });
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

      const findBrand = await db.Brand_Category.findOne({ where: { id } });

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
      const {
        brand_name = "",
        _sortBy = "brand_name",
        _sortDir = "ASC",
        _limit = 10,
        _page = 1,
      } = req.query;

      if (brand_name) {
        const response = await db.Brand_Category.findAndCountAll({
          limit: Number(_limit),
          order: [[_sortBy, _sortDir]],
          offset: (_page - 1) * _limit,
          where: {
            brand_name: {
              [Op.like]: `%${brand_name}%`,
            },
          },
        });

        return res.status(200).json({
          message: "Get Brand Category By Brand Name",
          data: response.rows,
          dataCount: response.count,
        });
      }

      const response = await db.Brand_Category.findAndCountAll({
        limit: Number(_limit),
        order: [[_sortBy, _sortDir]],
        offset: (_page - 1) * _limit,
      });

      return res.status(200).json({
        message: "Get Brand Category",
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

module.exports = categoryController;
