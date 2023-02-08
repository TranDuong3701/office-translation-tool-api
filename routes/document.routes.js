const express = require("express");

const documentController = require("./../controllers/document.controller");
const upload = require("./../config/multer");

const router = express.Router();

router
  .route("/")
  .post(upload.single("document"), documentController.importDocument);

module.exports = router;
