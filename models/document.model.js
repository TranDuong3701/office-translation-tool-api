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

DocumentSchema.virtual("segments", {
  ref: "Segment",
  foreignField: "document",
  localField: "_id",
});

DocumentSchema.virtual("progress").get(function () {
  if (!this.segments?.length) return 0;

  const translatedSegmentCount =
    this.segments.filter((segment) => segment.target).length;

  return Number((translatedSegmentCount / this.segments.length) * 100).toFixed(2);
});

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
