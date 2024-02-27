const express = require("express");
const fs = require("node:fs");

const {
    PropertyModel
} = require("../../../../mappings/models/index.js");

const userFolderMiddleware = require("../../../../middleware/user/userFolderMiddleware.js");
const { relativePropertyFolder } = require("../../../../lib/user/userFolder/property/propertyFolder.js");

const publishPropertyRouter = express.Router();

publishPropertyRouter.post("/publish_property/:id", userFolderMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate that the property exists
        const propertyModel = PropertyModel();
        const property = await propertyModel.findByPk(id);
        
        if(!property) {
            console.log(`Property doesn't exists!!!11`);
            return res.send({
                messages: [{
                    message: "Property doesn't exists.",
                    error: true,
                }]
            });
        }
        
        // Check if the property has images
        const propertyFolder = relativePropertyFolder(req.user.id, id);
        const files = fs.readdirSync(propertyFolder);
        if(files.length === 0) {
            console.log(`No images, bounce back.`);
            return res.send({
                messages: [{
                    message: "The property posseses no images.",
                    error: true,
                }]
            });
        }
        
        // Update property published value
        const value = req.body.value;
        if(value) {
            property.published = 1;
        } else {
            property.published = 0;
        }
        
        // Store
        await property.save();
        console.log(`Property updated, redirecting user`);
        
        // For now it's not important to communicate when the property is already published
        // You can't redirect the user nice
        return res.send({
            messages: [{
                message: "Property published.",
                error: false,
            }]
        });
    } catch(err) {
        console.error(err);
        
        return res.send({
            messages: [{
                message: "Internal server error",
                error: true,
            }]
        });
    }
});

module.exports = publishPropertyRouter;
