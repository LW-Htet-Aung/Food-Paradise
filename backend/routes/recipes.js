const express = require("express");
const {
  indexRecipe,
  storeRecipe,
  showRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/RecipesController");
const router = express.Router();
const { body } = require("express-validator");
const handleErrorMessage = require("../middlewares/handleErrorMessage");

router.get("", indexRecipe);
router.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingradients").notEmpty().isArray({ min: 3 }),
  ],
  handleErrorMessage,
  storeRecipe
);
router.get("/:id", showRecipe);
router.patch("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
