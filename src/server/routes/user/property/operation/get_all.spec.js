const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

const { AuthAPI, UserAPI } = require("express-authentication");

const { AUTHENTICATION, REAL_ESTATE } = require("../../../../../mappings/env/SERVER_URL_MAPPINGS");
const PropertyAPI = require("../../../../../api/property/PropertyAPI");
const createAxiosInstance = require("../../../../../public/js/axios/createAxiosInstance");

test("Delete property", async () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const email = `alistar_${uuidv4()}@email.com`;
    const userData = {
        name: "Alistar",
        email: email,
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    // Auth api
    const api = new AuthAPI(userData, AUTHENTICATION);
    await api.registerUser();
    await api.confirmUserEmailWithPrivateKey(userData.email);
    const loginRes = await api.loginGetJwt();
    
    // Create some property
    const property = {
        title: "Luxury house",
        description: "This is a luxury house",
        rooms: 3,
        parking: 2,
        bathrooms: 3,
        street: 'Norris Road 1223',
        latitude: 35.0831751,
        longitude: -90.022207,
        priceId: 5,
        categoryId: 4,
        image: "",
        // This is here but in the endpoint it does nothing
        published: true,
        userId: this.userId,
    };
    
    // Property api
    const realEstateAxios = createAxiosInstance(REAL_ESTATE, "", loginRes.token);
    const propertyApi = new PropertyAPI(realEstateAxios);
    // We need to check that the property was successfully created
    // Otherwise the test is useless
    const createRes = await propertyApi.createProperty(property);
    const propCreated = createRes.propertyCreated;
    
    // Now delete every user property
    const properties = await propertyApi.getAll();
    const nonZeroProperties = properties.properties.length >= 0;
    await propertyApi.userDeleteAll();
    
    // Delete user
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    await userApi.delete();
    
    expect(propCreated && nonZeroProperties).toBe(true);
});
