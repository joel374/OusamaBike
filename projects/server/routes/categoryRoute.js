const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/add", categoryController.add);
router.patch("/update/:id", categoryController.update);
router.delete("/delete/:id", categoryController.delete);
router.get("/get", categoryController.get);
router.post("/addBrand", categoryController.addBrand);
router.patch("/updateBrand/:id", categoryController.updateBrand);
router.delete("/deleteBrand/:id", categoryController.deleteBrand);

module.exports = router;
