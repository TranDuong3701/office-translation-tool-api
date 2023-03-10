const fs = require("fs");
const XlsxPopulate = require("xlsx-populate");
const Segment = require("../models/segment.model");

async function importExcel(document) {
  const segments = [];
  const { path, _id } = document;

  // Load an existing workbook
  const workbook = await XlsxPopulate.fromFileAsync(path);
  const sheets = workbook.sheets();
  for (const sheet of sheets) {
    // Import SheetNames
    const sheetName = await Segment.create({
      document: _id,
      source: sheet.toXmls().id.attributes.name,
      metadata: {
        sheetId: sheet.toXmls().id.attributes.sheetId,
      },
    });
    segments.push(sheetName);

    // Import Cells
    const { _minRowNumber, _maxRowNumber, _minColumnNumber, _maxColumnNumber } =
      sheet.usedRange();

    for (let ri = _minRowNumber; ri <= _maxRowNumber; ri++) {
      for (let ci = _minColumnNumber; ci <= _maxColumnNumber; ci++) {
        const cell = sheet.row(ri).cell(ci);

        const cellValue = cell.value();
        if (typeof cellValue !== "string") {
          continue;
        }

        const cellAddress = cell.address();
        const segment = await Segment.create({
          document: _id,
          source: cellValue,
          metadata: {
            cellAddress,
          },
        });

        segments.push(segment);
      }
    }
  }

  return segments;
}
async function exportSheetName(segment) {}

async function exportCell(segment) {
  const { document: { path } } = segment;
  // Load an existing document
  const workbook = await XlsxPopulate.fromFileAsync(path);
  const sheets = workbook.sheets();

  // Update cell
  for (const sheet of sheets) {
    const { _minRowNumber, _maxRowNumber, _minColumnNumber, _maxColumnNumber } =
      sheet.usedRange();

    for (let ri = _minRowNumber; ri <= _maxRowNumber; ri++) {
      for (let ci = _minColumnNumber; ci <= _maxColumnNumber; ci++) {
        const cell = sheet.row(ri).cell(ci);

        const cellAddress = cell.address();
        if (cellAddress === segment.metadata.cellAddress) {
          cell.value(segment.target);
        }
      }
    }
  }

  // Write wookbook to file
  await workbook.toFileAsync(path);
}

module.exports = {
  importExcel,
  exportSheetName,
  exportCell,
};
