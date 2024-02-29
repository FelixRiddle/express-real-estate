const express = require("express");
const fs = require("node:fs");

const {
    PropertyModel
} = require("../../../../mappings/models/index.js");

const { relativePropertyFolder } = require("../../../../lib/user/userFolder/property/propertyFolder.js");

const deleteRouter = express.Router();

deleteRouter.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check that property exists
        const propertyController = await PropertyModel().findByPk(id);
        const property = propertyController.get({plain:true});
        if(!property) {
            console.log(`Property doesn't exists!`);
            return res.send({
                propertyDeleted: false,
                messages: [{
                    message: "Error when trying to delete the property, the property doesn't exists!",
                    error: true,
                }]
            });
        }
        
        // Check that person that accessed this url
        // is the person that owns this property
        if(property.userId.toString() !== req.user.id.toString()) {
            console.log(`The user is not the owner of the property!(/delete)`);
            return res.send({
                propertyDeleted: false,
                messages: [{
                    message: "Error when trying to delete the property, you're not the owner of it.",
                    error: true,
                }]
            });
        }
        
        
        // Delete property folder
        const propertyFolder = relativePropertyFolder(req.user.id, id);
        
        // Remove it
        try {
            fs.rmSync(propertyFolder, { recursive: true, force: true });
        } catch(err) {
            // If we can't delete the folder, don't delete the property either
            console.error(err);
            return res.send({
                propertyDeleted: false,
                messages: [{
                    message: "Error when trying to delete the property.",
                    error: true,
                }]
            });
        }
        
        // Delete it
        await propertyController.destroy();
        
        return res.send({
            propertyDeleted: true,
            messages: [{
                message: "Property deleted",
                error: false,
            }]
        });
    } catch(err) {
        console.log(err);
        return res.send({
            propertyDeleted: false,
            messages: [{
                message: "Error when trying to delete the property.",
                error: true,
            }]
        });
    }
});

module.exports = deleteRouter;
