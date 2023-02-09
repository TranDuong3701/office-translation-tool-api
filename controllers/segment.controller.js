const Segment = require("./../models/segment.model");
const excelService = require("./../services/excel.service");

async function translateSegment(req, res, next) {
  try {
    const { target } = req.body;
    const { id } = req.params;

    // Update the segment in the database
    const segment = await Segment.findByIdAndUpdate(
      id,
      { target },
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "document",
      select: ["path"],
    });

    // Update the segment in document
    if (segment.metadata.sheetId) {
      await excelService.exportSheetName(segment.document, segment);
    }

    if (segment.metadata.cellAddress) {
      await excelService.exportCell(segment.document, segment);
    }

    res.status(200).json(segment);
  } catch (error) {}
}

async function lockSegment(req, res, next) {
  const { isLock } = req.body;
  try {
    const segment = await Segment.findByIdAndUpdate(
      req.params.id,
      {
        isLock,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json(segment);
  } catch (error) {}
}

module.exports = {
  translateSegment,
  lockSegment,
};
