const Recipe = require("../models/Recipe");
const validateId = require("../helpers/validateId");

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

  return res.json({ data: recipes, links });
};

const storeRecipe = async (req, res) => {
  const { title, description, ingradients } = req.body;
  const recipe = await Recipe.create({
    title,
    description,
    ingradients,
  });
  return res.json(recipe);
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
  validateId(id);
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

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

    return res.json(recipe);
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  indexRecipe,
  storeRecipe,
  showRecipe,
  deleteRecipe,
  updateRecipe,
};
