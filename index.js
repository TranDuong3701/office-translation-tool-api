const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server in running on port " + port));
