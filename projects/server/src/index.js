require("dotenv/config");
const express = require("express");
const cors = require("cors");
const db = require("../models");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

// Import Route
const { verifyToken } = require("../middlewares/authMiddleware");
const authRoute = require("../routes/authRoutes");
const productRoute = require("../routes/productRoute");
const categoryRoute = require("../routes/categoryRoute");
const favoriteRoute = require("../routes/favoriteRoute");
const chatRoute = require("../routes/chatRoute");
const cartRoute = require("../routes/cartRoute");

app.use("/public", express.static("public"));
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/favorite", verifyToken, favoriteRoute);
app.use("/chat", verifyToken, chatRoute);
app.use("/cart", verifyToken, cartRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    db.sequelize.sync({ alter: true });
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    console.log(`APP RUNNING at ${PORT}`);
  }
});
