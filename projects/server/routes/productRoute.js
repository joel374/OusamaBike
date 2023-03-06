const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { upload } = require("../lib/uploader");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post(
  "/add",
  verifyToken,
  upload({
    acceptedFileTypes: ["jpg", "jpeg", "png"],
    filePrefix: "PRODUCT",
  }).single("image_url"),
  productController.add
);
router.patch("/update/:id", verifyToken, productController.update);
router.delete("/delete/:id", verifyToken, productController.delete);
router.get("/get", productController.get);

module.exports = router;
