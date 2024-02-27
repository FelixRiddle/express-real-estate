const express = require("express");

const allRoutes = require("./all");

const nearMeRouter = express.Router();

nearMeRouter.use(allRoutes);

module.exports = nearMeRouter;
