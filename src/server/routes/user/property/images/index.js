const express = require("express");

const getAllRouter = require("./get_all");
const setImageRouter = require("./set_image");
const removeImageRouter = require("./remove_image");

const imagesRouter = express.Router();

imagesRouter.use(getAllRouter);
imagesRouter.use(removeImageRouter);
imagesRouter.use(setImageRouter);

module.exports = imagesRouter;
