const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middlewares/authMiddleware");

const app = express();
app.use(express.static("public"));
// mongo
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to server");
  app.listen(process.env.PORT, () => {
    console.log("app is running on localhost:" + process.env.PORT);
  });
});

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// routes
app.use("/api/recipes", AuthMiddleware, recipeRoutes);
app.use("/api/users", userRoutes);
