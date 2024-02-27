const express = require("express");

const {
    PropertyModel,
} = require("../../../../mappings/models/index.js");

const validatePropertyData = require("../../../../middleware/property/validatePropertyData");
const { envServerUrlOrDefault } = require("../../../../env/envServerUrlOrDefault");

const editRouter = express.Router();

// For post, we have to validate the property data again
editRouter.post("/edit/:id", validatePropertyData, async (req, res) => {
    try {
        const url = envServerUrlOrDefault();
        console.log(`Server url ${url}`);
        
        const { id } = req.params;
        
        // Validation
        let newProperty = req.body.property;
        
        // Check that property exists
        const propModel = PropertyModel();
        const property = await propModel.findByPk(id);
        if(!property) {
            return res.send({
                messages: [{
                    message: "Couldn't update the property",
                    error: true,
                }],
                updated: false,
            });
        }
        
        // Check that the property owner is the user that made the request
        if(property.userId.toString() !== req.user.id.toString()) {
            return res.send({
                messages: [{
                    message: "Couldn't update the property",
                    error: true,
                }],
                updated: false,
            });
        }
        
        // Extract data
        const {
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            priceId,
            categoryId,
        } = newProperty;
        
        // Update property
        property.set({
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            priceId,
            categoryId,
        });
        await property.save();
        
        return res.send({
            messages: [{
                message: "Property updated",
                error: false,
            }],
            updated: true,
        });
    } catch(err) {
        console.log(err);
        
        return res.send({
            messages: [{
                message: "Couldn't update the property",
                error: true,
            }],
            updated: false,
        });
    }
});

module.exports = editRouter;
