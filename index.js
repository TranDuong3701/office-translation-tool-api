const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const globalErrorHandler = require('./controllers/error.controller')

const database = require("./database");
const documentRouter = require("./routes/document.routes");
const segmentRouter = require("./routes/segment.routes");

dotenv.config();
database.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/documents", documentRouter);
app.use("/api/v1/segments", segmentRouter);
app.use(globalErrorHandler)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server in running on port " + port));
