const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/add", verifyToken, productController.add);
router.patch("/update/:id", verifyToken, productController.update);
router.delete("/delete/:id", verifyToken, productController.delete);
router.get("/get", productController.get);

module.exports = router;
