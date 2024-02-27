const express = require("express");

const getAllRoutes = require("./get_all");

const operationRoutes = express.Router();

// Use these routers
operationRoutes.use(getAllRoutes);

module.exports = operationRoutes;
