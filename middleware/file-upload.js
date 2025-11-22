const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Maps MIME types to file extensions
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

// Storage configuration
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images"); // store inside backend/uploads/images
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, uuidv4() + "." + ext);
  }
});

// Filters file uploads according to MIME type
const fileFilter = (req, file, cb) => {
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  let error = isValid ? null : new Error("Unsupported file type");
  cb(error, isValid);
};

// Export the configured multer middleware
module.exports = multer({
  limits: { fileSize: 500000 },  // 500kb
  storage: fileStorage,
  fileFilter: fileFilter
});
