const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "visitor"],
      default: "visitor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserDB", userSchema);
