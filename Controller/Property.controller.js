const PropertyDB = require("../Models/Property");

const createProperty = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    if (req.user.role == "visitor") {
      return res.status(403).json({ msg: "Only owners can add property" });
    }

    const property = await PropertyDB.create({
      title: req.body.title,
      price: req.body.price,
      location: req.body.location,
      type: req.body.type,
      description: req.body.description,
      image: req.file ? req.file.path : null, // Cloudinary URL
      createdBy: req.user.id,
    });
    res.status(201).json({ msg: "property created", property });
  } catch (error) {
    console.error("Error creating property:", error);
    res
      .status(500)
      .json({ msg: "Error creating property", error: error.message });
  }
};

const getAllProperties = async (req, res) => {
  const propertyData = await PropertyDB.find().populate(
    "createdBy",
    "name email phone"
  );
  res.json(propertyData);
};

const deleteProperty = async (req, res) => {
  const property = await PropertyDB.findById(req.params.id);
  if (!property) {
    return res.status(500).json({ msg: "property not exist" });
  }
  if (property.createdBy.toString() !== req.user.id) {
    return res.status(500).json({ msg: "property editing not allowed" });
  }
  await PropertyDB.deleteOne({ _id: req.params.id });
  res.json({ msg: "deleted" });
};

const updateProperty = async (req, res) => {
  const property = await PropertyDB.findById(req.params.id);

  if (!property) return res.status(500).json({ msg: "porperty not found" });

  if (property.createdBy.toString() !== String(req.user.id))
    return res.status(500).json({ msg: "not allowed" });

  const update = await PropertyDB.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(update);
};

const filterProperty = async (req, res) => {
  const { type, minPrice, maxPrice } = req.query;
  let filter = {};

  if (type) filter.type = type;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
  }

  const property = await PropertyDB.find(filter).populate(
    "createdBy",
    "name email phone"
  );
  res.json(property);
};

module.exports = {
  createProperty,
  getAllProperties,
  deleteProperty,
  updateProperty,
  filterProperty,
};
