const express = require("express");

const propertyRoutes = require("./property/index");

const userRoutes = express.Router();

// Insert other routers
userRoutes.use("/property", propertyRoutes);

module.exports = userRoutes;
