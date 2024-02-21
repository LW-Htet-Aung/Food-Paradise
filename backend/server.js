const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");

// mongo
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to server");
  app.listen(process.env.PORT, () => {
    console.log("app is running on localhost:" + process.env.PORT);
  });
});

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);
