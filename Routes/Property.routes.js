const express = require("express");
const {
  createProperty,
  getAllProperties,
  deleteProperty,
  updateProperty,
  filterProperty,
} = require("../Controller/Property.controller");
const upload = require('../Middleware/upload')
const protect = require("../Middleware/auth");

const router = express.Router();

router.get("/", getAllProperties);
router.get("/filter", filterProperty);
router.post('/', protect, upload.single('image'), createProperty)
// router.post('/', (req, res) => {
//   console.log("🔥 ROUTE HIT 🔥");
//   res.send("route works");
// });

router.delete("/:id", protect, deleteProperty);
router.put("/:id", protect, updateProperty);

module.exports = router;
