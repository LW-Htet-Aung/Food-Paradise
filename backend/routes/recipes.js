const express = require("express");
const {
  indexRecipe,
  storeRecipe,
  showRecipe,
  deleteRecipe,
  updateRecipe,
  uploadImage,
} = require("../controllers/RecipesController");
const router = express.Router();
const { body } = require("express-validator");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const upload = require("../helpers/upload");

router.get("", indexRecipe);
router.post(
  "",
  upload.single("photo"),
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingradients").custom((value, { req }) => {
      const parseVal = JSON.parse(value);
      if (!Array.isArray(parseVal)) {
        throw new Error("Ingradients must be an array");
      }
      if (Array.isArray(parseVal) && parseVal.length < 3) {
        throw new Error("Ingradients must be at least 3 items");
      }
      return true;
    }),
    body("photo").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Photo is required");
      }
      if (!req.file.mimetype.startsWith("image")) {
        throw new Error("File must be png or jpg or jpeg");
      }
      return true;
    }),
  ],
  handleErrorMessage,
  storeRecipe
);
router.get("/:id", showRecipe);
router.patch(
  "/:id",
  upload.single("photo"),
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingradients").custom((value, { req }) => {
      const parseVal = JSON.parse(value);
      if (!Array.isArray(parseVal)) {
        throw new Error("Ingradients must be an array");
      }
      if (Array.isArray(parseVal) && parseVal.length < 3) {
        throw new Error("Ingradients must be at least 3 items");
      }
      return true;
    }),
    body("photo").custom((value, { req }) => {
      if (!value && !req.file) {
        throw new Error("Photo is required");
      }
      if (!value && !req.file.mimetype.startsWith("image")) {
        throw new Error("File must be png or jpg or jpeg");
      }
      return true;
    }),
  ],
  handleErrorMessage,
  updateRecipe
);
router.delete("/:id", deleteRecipe);

// photo upload api
router.post(
  "/:id/upload",
  [
    upload.single("photo"),
    body("photo").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Photo is required");
      }
      if (!req.file.mimetype.startsWith("image")) {
        throw new Error("File must be png or jpg or jpeg");
      }
      return true;
    }),
  ],
  handleErrorMessage,
  uploadImage
);
module.exports = router;
