const express = require("express");
const { constants } = require("node:fs");
const fs = require("node:fs");

const userFolderMiddleware = require("../../../../../middleware/user/userFolderMiddleware");
const { relativePropertyFolder } = require("../../../../../lib/user/userFolder/property/propertyFolder");

const removeImageRouter = express.Router();

removeImageRouter.post("/remove_image/:id", userFolderMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        
        const imagePublicPath = req.body.imageName;
        
        // The image name comes with its paths and everything
        // Even for security we want to cut it and just get the name
        const imageParts = imagePublicPath.split("/");
        const encodedImageName = imageParts[imageParts.length - 1];
        
        // We have to try to decode it first
        let imageName = "";
        try {
            imageName = decodeURI(encodedImageName);
        } catch(err) {
            console.log(`Couldn't decode the image name!!111!! 😡😡😨😰`);
            console.error(err);
            
            return res.send({
                messages: [{
                    message: "Couldn't decode the image name",
                    error: true,
                }]
            });
        }
        
        // Check if it exists
        try {
            // Get image path
            const propFolder = relativePropertyFolder(req.user.id, id);
            const imagePath = `${propFolder}/${imageName}`;
            
            // Check if file exists
            fs.accessSync(imagePath, constants.R_OK);
            
            // OK file exists
            fs.rmSync(imagePath);
        } catch(err) {
            console.log(`The file doesn't exist!`);
            
            // It doesn't exists
            return res.send({
                messages: [{
                    message: "The image you tried to delete doesn't exists",
                    error: true,
                }]
            });
        }
        
        return res.send({
            messages: [{
                message: "Image deleted",
                error: false,
            }]
        });
    } catch(err) {
        console.log(`Error: `);
        console.error(err);
        return res.redirect(url);
    }
});

module.exports = removeImageRouter;
