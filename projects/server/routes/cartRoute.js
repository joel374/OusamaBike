const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/addToCart/:ProductId", cartController.addProductToCart);
router.delete("/deleteFromCart/:id", cartController.deleteProductFromCart);
router.get("/", cartController.getProductInCart);
router.patch("/checkCart/:id", cartController.checkedCart);
router.patch("/checkAllCart", cartController.checkedAllCart);
router.get("/totalPrice", cartController.totalPrice);

module.exports = router;
