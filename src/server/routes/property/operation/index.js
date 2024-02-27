const express = require("express");

const getAllRoutes = require("./get_all");

const propertyOperationRouter = express.Router();

propertyOperationRouter.use(getAllRoutes);

module.exports = propertyOperationRouter;
