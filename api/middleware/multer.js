const multer = require("multer");
var ext;
var filename;

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    ext = file.mimetype.split("/")[1];
    filename = `${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadListingImages = upload.fields([{ name: "image", maxCount: 1 }]);
