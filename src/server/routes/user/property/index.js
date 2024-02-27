const express = require("express");

// Routers
const adminRoutes = require("./admin.js");
const createPropertyRouter = require("./create.js");
const deleteRouter = require("./delete.js");
const editRouter = require("./edit.js");
const setImageRouter = require("./set_image.js");
const operationRoutes = require("./operation/index.js");
const imagesRouter = require("./images/index.js");
const publishPropertyRouter = require("./publish_property");

const propertyRoutes = express.Router();

// Use these routers
propertyRoutes.use(adminRoutes);
propertyRoutes.use(createPropertyRouter);
propertyRoutes.use(deleteRouter);
propertyRoutes.use(editRouter);
propertyRoutes.use(publishPropertyRouter);
propertyRoutes.use(setImageRouter);

propertyRoutes.use("/images", imagesRouter);
propertyRoutes.use("/operation", operationRoutes);

module.exports = propertyRoutes;
