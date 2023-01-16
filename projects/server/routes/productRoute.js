const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/add", productController.add);
router.patch("/update/:id", productController.update);
router.delete("/delete/:id", productController.delete);

module.exports = router;
