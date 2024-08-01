const Recipe = require("../models/Recipe");
const validateId = require("../helpers/validateId");
const removeFile = require("../helpers/removeFile");
const User = require("../models/User");
const emailQueue = require("../queues/emailQueue");

const indexRecipe = async (req, res) => {
  const limit = 6;
  let { page = 1 } = req.query;
  page = Number(page);

  const recipes = await Recipe.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalRecipeCount = await Recipe?.countDocuments();
  console.log(totalRecipeCount);
  const totalPage = Math.ceil(totalRecipeCount / limit);

  const links = {
    nextPage: page !== totalPage,
    prevPage: page !== 1,
    currentPage: page,
    paginateLinks: [],
  };

  for (let index = 0; index < totalPage; index++) {
    links?.paginateLinks?.push({ number: index + 1 });
  }

  return res.json({ recipes, links });
};

const storeRecipe = async (req, res) => {
  try {
    const { title, description, ingradients } = req.body;
    const recipe = await Recipe.create({
      photo: "/" + req.file.filename,
      title,
      description,
      ingradients: JSON.parse(ingradients),
    });
    const users = await User.find(null, ["email"]);
    const email = users
      .map((user) => user.email)
      .filter((email) => email !== req?.user?.email);
    const protocol = req.protocol;
    const host = req.get("host");
    emailQueue.add({
      fileName: "email",
      data: {
        name: req?.user?.name,
        recipe,
        url: {
          port: `${protocol}://${host}`,
          link: process.env.FRONT_END_PORT,
        },
      },
      from: req?.user?.email,
      to: email,
      subject: "New Recipe is Created By " + req?.user?.name,
    });
    return res.json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const showRecipe = async (req, res) => {
  const id = req.params.id;
  validateId(id);
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ msg: "Recipe Not Found" });
    }
    return res.json(recipe);
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateRecipe = async (req, res) => {
  const id = req.params.id;
  const isPhotoString = typeof req.body.photo === "string";
  validateId(id);
  try {
    const recipe = await Recipe.findByIdAndUpdate(id, {
      ...req.body,
      ingradients: JSON.parse(req.body.ingradients),
      photo: isPhotoString ? req.body.photo : "/" + req.file.filename,
    });
    // check if user upload new image or not
    if (!isPhotoString) {
      const path = __dirname + "/../public" + recipe.photo;
      removeFile(path);
    }

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe Not Found" });
    }

    return res.json(recipe);
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  validateId(id);
  try {
    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe Not Found" });
    }
    const path = __dirname + "/../public" + recipe.photo;
    removeFile(path);

    return res.json(recipe);
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
const uploadImage = async (req, res) => {
  try {
    const id = req.params.id;
    validateId(id);
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { photo: "/" + req.file.filename },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe Not Found" });
    }

    return res.json(recipe);
    console.log("image upload", req.file);
    return res.json({ image: "upload" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  indexRecipe,
  storeRecipe,
  showRecipe,
  deleteRecipe,
  updateRecipe,
  uploadImage,
};
