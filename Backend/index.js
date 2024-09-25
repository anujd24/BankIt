const express = require("express");
const app = express();
const mainRouter = require("./routes/index.js");

app.use("/api/v1", mainRouter);

app.listen(3000);