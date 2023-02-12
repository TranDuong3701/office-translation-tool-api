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
      cellAddress: String,
      sheetId: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.id;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.id;
      },
    },
  }
);

const Segment = mongoose.model("Segment", SegmentSchema);

module.exports = Segment;
