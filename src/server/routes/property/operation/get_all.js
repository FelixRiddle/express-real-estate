const express = require("express");

const { CategoryModel, PriceModel, PropertyModel } = require("../../../../mappings/models/index.js");
const { relativePropertyImagesNorm } = require("../../../../lib/user/userFolder/property/propertyFolder");

const getAllRoutes = express.Router();

getAllRoutes.get("/get_all", async (req, res) => {
    try {
        const propModel = PropertyModel();
        const priceModel = PriceModel();
        const categoryModel = CategoryModel();
        const properties = await propModel.findAll({
            where: {
                published: true,
            },
            include: [{
                raw: true,
                model: priceModel,
                as: "price"
            }, {
                raw: true,
                model: categoryModel,
                as: "category"
            }]
        });
        
        // For each property
        // Get their images and add it to the field 'images'
        for(let property of properties) {
            const userId = property.userId;
            const propertyId = property.id;
            
            const propertyImages = relativePropertyImagesNorm(userId, propertyId);
            
            // It's a sequelize object, so insert it into data values
            property.dataValues.images = propertyImages;
        }
        
        return res.send({
            properties,
        });
    } catch(err) {
        console.error(err);
        return res.send({
            messages: [{
                message: "Unknown error",
                error: true,
            }]
        });
    }
});

module.exports = getAllRoutes;
