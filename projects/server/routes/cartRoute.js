const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/addToCart/:ProductId", cartController.addProductToCart);
router.delete("/deleteFromCart/:id", cartController.deleteProductFromCart);
router.get("/", cartController.getProductInCart);

module.exports = router;
