const { mongoose } = require("mongoose");
const { ObjectId } = mongoose.Types;

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Not a valid ID" });
  }
};
module.exports = validateId;
