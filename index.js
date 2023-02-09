const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const database = require("./database");
const documentRouter = require("./routes/document.routes");
const segmentRouter = require("./routes/segment.routes");

dotenv.config();
database.connect();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/documents", documentRouter);
app.use("/api/v1/segments", segmentRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server in running on port " + port));
