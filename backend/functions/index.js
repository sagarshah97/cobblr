// Author: Sagar Paresh Shah (B00930009)

const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const connectDB = require("./app/db/db.js");
const cors = require("cors");
const { router, healthCheck } = require("./app/components/indexRoutes");

const app = express();
const apiPort = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

connectDB();

app.use("/", router);
app.get("/health-check", healthCheck);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

module.exports = app;
module.exports.handler = serverless(app);
