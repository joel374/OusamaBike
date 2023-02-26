const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

router.post("/add/:ProductId", favoriteController.add);
router.delete("/delete/:id", favoriteController.delete);

module.exports = router;
