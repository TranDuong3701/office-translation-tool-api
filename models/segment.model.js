const mongoose = require("mongoose");

const SegmentSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: null,
    },
    document: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Document",
      required: true,
    },
    isLock: {
      type: Boolean,
      default: false,
    },
    metadata: {
      key: String,
      order: Number,
      isSheetName: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Segment = mongoose.model("Segment", SegmentSchema);

module.exports = Segment;
