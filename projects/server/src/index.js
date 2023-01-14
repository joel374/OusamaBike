require("dotenv/config");
const express = require("express");
const cors = require("cors");
const db = require("../models");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 8000;

// Import Route
const authRoute = require("../routes/authRoutes");

app.use("/auth", authRoute);

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
