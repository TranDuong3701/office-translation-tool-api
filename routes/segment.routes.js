const express = require("express");

const segmentController = require("./../controllers/segment.controller");

const router = express.Router({ mergeParams: true });

router.route("/:id").patch(segmentController.translateSegment);

module.exports = router;
