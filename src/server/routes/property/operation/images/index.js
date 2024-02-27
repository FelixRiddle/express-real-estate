const express = require("express");

const getAll = require("./get_all");

const imagesRouter = express.Router();

imagesRouter.use(getAll);

module.exports = imagesRouter;
