const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    path: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      default: null,
    },
    translator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      default: null,
    },
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Project",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
