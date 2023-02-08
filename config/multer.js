const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join("public", "uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // const validFileName = Buffer.from(file.originalname, "latin1").toString(
    //   "utf8"
    // );
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const fileExtensions = path.extname(file.originalname).toLowerCase();
  if (![".docx", ".xlsx", ".pptx"].includes(fileExtensions)) {
    return callback(new Error("Only file  .docx, .xlsx, .pptx allowed"), false);
  }
  callback(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
