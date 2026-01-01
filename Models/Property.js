const mongoose = require("mongoose");

const schema = mongoose.Schema;

const propertySchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["rent", "sale"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDB",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PropertyDB", propertySchema);
