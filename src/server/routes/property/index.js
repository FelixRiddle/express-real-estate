const express = require("express");

const propertyOperationRouter = require("./operation/index");

const propertyRoutes = express.Router();

propertyRoutes.use("/operation", propertyOperationRouter);
propertyRoutes.use(viewRoute);

module.exports = propertyRoutes;
