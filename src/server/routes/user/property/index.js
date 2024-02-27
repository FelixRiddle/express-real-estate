const express = require("express");

// Routers
const createPropertyRouter = require("./create.js");
const deleteRouter = require("./delete.js");
const editRouter = require("./edit.js");
const operationRoutes = require("./operation/index.js");
const imagesRouter = require("./images/index.js");
const publishPropertyRouter = require("./publish_property");

const propertyRoutes = express.Router();

// Use these routers
propertyRoutes.use(createPropertyRouter);
propertyRoutes.use(deleteRouter);
propertyRoutes.use(editRouter);
propertyRoutes.use(publishPropertyRouter);

propertyRoutes.use("/images", imagesRouter);
propertyRoutes.use("/operation", operationRoutes);

module.exports = propertyRoutes;
