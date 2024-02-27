const express = require("express");

const {
    PropertyModel,
} = require("../../../../../mappings/models/index");

const uploadProperty = require("../../../../../lib/user/userFolder/property/uploadPropertyMiddleware");
const userFolderMiddleware = require("../../../../../middleware/user/userFolderMiddleware");

const setImageRouter = express.Router();

setImageRouter.post("/set_image/:id", userFolderMiddleware, uploadProperty.array("images"), async (req, res) => {
    try {
        // All of these checks are kinda useless, because the upload happened before this.
        // maybe just to inform the user?
        
        // Check if there were even files given
        if(!req.files) {
            console.log(`Not even files were given!`);
            return res.send({
                messages: [{
                    message: "No images given for the property(1)",
                    error: true,
                }]
            });
        }
        
        // The property and the user is already validated at the middleware
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
        
        return res.send({
            messages: [{
                message: "Images updated!!!11",
                error: false,
            }],
        });
    } catch(err) {
        console.log(`Error: `);
        console.error(err);
        return res.send({
            messages: [{
                message: "Unknown error.",
                error: true,
            }]
        });
    }
});

module.exports = setImageRouter;
