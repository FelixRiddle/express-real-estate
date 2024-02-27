const express = require("express");

const { protectRoute } = require("express-authentication");
const propertyRoutes = require("./property/index.js");
const userRoutes = require("./user/index.js");

const routes = express.Router();

// Open routes
routes.use("/property", propertyRoutes);
routes.use("/user", protectRoute, userRoutes);

// --- Public ---
// Public assets folder
routes.use(express.static("public"));

// Access through public alias
// This prevents route protection like /user
// The public shouldn't ever be protected, but most of the functionality already
// uses the 'bare' public version, so it would be a hassle to migrate everything.
routes.use("/public", express.static("public"));

module.exports = routes;
