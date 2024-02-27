const express = require("express");

const userFolderMiddleware = require("../../../../../middleware/user/userFolderMiddleware");
const PropertyFolder = require("../../../../../user/userFolder/property/PropertyFolder");

const getAllRouter = express.Router();

// Add an image to the property
getAllRouter.get("/get_all/:id", userFolderMiddleware, (req, res) => {
    try {
        const { id: propertyId } = req.params;
        const userId = req.user.id;
        
        const propertyFolder = new PropertyFolder(userId, propertyId);
        
        return res.send({
            images: propertyFolder.publicImagesPath(),
            imageNames: propertyFolder.imagesName(),
        });
    } catch(err) {
        console.error(err);
        
        // Send nothing back
        return res.send({
            images: []
        })
    }
});

module.exports = getAllRouter;
