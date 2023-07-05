const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./app/db/db.js");
const cors = require("cors");
const { router, healthCheck } = require("./app/components/indexRoutes");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/", router);
app.get("/health-check", healthCheck);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
