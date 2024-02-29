const express = require("express");

const {
    PropertyModel,
    UserModel,
} = require("../../../../mappings/models/index");

const validatePropertyData = require("../../../../middleware/property/validatePropertyData");

const createPropertyRouter = express.Router();

// FIX: This has no validation???
createPropertyRouter.post(`/create`, validatePropertyData, async (req, res) => {
    // Insert on the database
    try {
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
        } = req.body.property;
        
        // Get user 'id' and rename it to 'userId'
        const user = req.user;
        const { id: userId } = user;
        
        // Find user
        const foundUser = await UserModel().findByPk(userId);
        console.log(`User found: `, foundUser);
        
        console.log(`User: `, user);
        console.log(`User id: `, userId);
        const property = {
            // id(The uuid is generated automatically by the database)
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            image: "",
            published: false,
            userId,
            priceId,
            categoryId,
        };
        console.log(`Property: `, property);
        
        // Store data
        const propertyModel = PropertyModel();
        const propertyCreated = await propertyModel.create(property);
        const propertyId = propertyCreated.id;
        console.log(`Property id: `, propertyId);
        
        let setImageUrl = `/user/property/set_image/${propertyId}`;
        return res.send({
            propertyCreated: true,
            nextUrl: setImageUrl,
        });
    } catch(err) {
        console.log(`Error detected, the user will be redirected to properties`);
        console.error(err);
        return res.send({
            propertyCreated: false,
        });
    }
});

module.exports = createPropertyRouter;
