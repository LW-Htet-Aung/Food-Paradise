const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.register = async function (name, email, password) {
  const userExits = await this.findOne({ email });
  if (userExits) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt();
  const hashValue = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashValue,
  });
  // console.log(user);
  const {
    password: registerPassword,
    _id,
    __v,
    ...registeredUser
  } = user.toObject();

  return { id: _id, ...registeredUser };
};
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error(JSON.stringify({ email: "User does not exists" }));
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  if (isCorrect) {
    const { password, _id, __v, ...loggedInUser } = user.toObject();
    return { id: _id, ...loggedInUser };
  } else {
    throw new Error(JSON.stringify({ password: "Password Incorrect" }));
  }
};

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("User", UserSchema);
