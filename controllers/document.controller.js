const Document = require("./../models/document.model");
const excelService = require("./../services/excel.service");

async function importDocument(req, res, next) {
  try {
    const { path, originalname: name } = req.file;
    const document = await Document.create({
      name,
      path,
    });

    await excelService.importExcel(document);

    res.status(200).json(document);
  } catch (error) {}
}

async function exportDocument(req, res, next) {
  try {
    const document = await Document.findById(req.params.id);

    res.download(document.path);
  } catch (error) {}
}

async function getDocument(req, res, next) {
  try {
    const document = await Document.findById(req.params.id).populate(
      "segments"
    );

    res.status(200).json(document);
  } catch (error) {}
}

module.exports = { importDocument, exportDocument, getDocument };
