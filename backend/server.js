const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middlewares/authMiddleware");
const cron = require("node-cron");
const sentEmail = require("./helpers/sentEmail");

const app = express();
app.use(express.static("public"));
// mongo
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to server");
    app.listen(process.env.PORT, () => {
      console.log("app is running on localhost:" + process.env.PORT);
      // cron.schedule("*/4 * * * * *", () => {
      //   console.log("running a task every 4 second");
      // });
    });
  })
  .catch((err) => console.log("Network error"));

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
app.set("views", "./views");
app.set("view engine", "ejs");

// routes
app.use("/api/recipes", AuthMiddleware, recipeRoutes);
app.use("/api/users", userRoutes);

app.get("/send-email", async (req, res) => {
  try {
    await sentEmail({
      fileName: "emai",
      data: { name: "Mg Mg" },
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
    });

    return res.send("email sent");
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});
