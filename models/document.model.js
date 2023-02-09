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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

DocumentSchema.virtual("segments", {
  ref: "Segment",
  foreignField: "document",
  localField: "_id",
});

DocumentSchema.virtual("progress").get(function () {
  const translatedSegmentCount = this.segments.filter(
    (segment) => segment.isLock
  ).length;

  return (translatedSegmentCount / this.segments.length) * 100;
});

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
