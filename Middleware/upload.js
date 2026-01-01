const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/claudinary");

const storage = new CloudinaryStorage({
    
  cloudinary: cloudinary,
  params: {
    folder: "properties",
    resource_type: "auto",
    public_id: (req, file) => {
      return Date.now() + "-" + file.originalname.split(".")[0];
    },
    allowed_formats: ["jpg", "png", "jpeg", "webp"],   
     
  },
  
});
console.log("UPLOAD MIDDLEWARE LOADED");

const upload = multer({ storage });

module.exports = upload;
