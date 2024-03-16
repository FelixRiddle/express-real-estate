// WARNING: This is deprecated
// Go to good-roots-ts-api to perform tests
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

const PropertyAPI = require("../../../../api/property/PropertyAPI");
const SERVER_URL_MAPPINGS = require("../../../../mappings/env/SERVER_URL_MAPPINGS");
const { AuthAPI, UserAPI } = require("express-authentication");
const createAxiosInstance = require("../../../../public/js/axios/createAxiosInstance");

test('Successful property creation', async function() {
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
    
    const url = SERVER_URL_MAPPINGS.AUTHENTICATION;
    const api = new AuthAPI(userData, url);
    
    // Create user and login
    const registerRes = await api.registerUser();
    await api.confirmUserEmailWithPrivateKey(userData.email);
    const loginRes = await api.loginGetJwt();
    
    // Create new axios instance, for this project server
    const realEstateAxios = createAxiosInstance(SERVER_URL_MAPPINGS.REAL_ESTATE, "", loginRes.token);
    
    // Create property api and send the api instance
    const propertyApi = new PropertyAPI(realEstateAxios);
    
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
    };
    const propertyCreatedResult = await propertyApi.createProperty(property);
    
    // Now delete every user property
    await propertyApi.userDeleteAll();
    
    // Create user api and delete user
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    await userApi.delete();
    
    expect(propertyCreatedResult && propertyCreatedResult.propertyCreated).toBe(true);
});

// // Test wrong ones
// // There are too many possibilities 😩 I will test some of them 
// it('Bad title', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "L",
//         description: "This is a luxury house",
//         rooms: 3,
//         parking: 2,
//         bathrooms: 3,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad description', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury House",
//         description: "This",
//         rooms: 3,
//         parking: 2,
//         bathrooms: 3,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad rooms quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 10,
//         parking: 2,
//         bathrooms: 3,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad parking quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 5,
//         bathrooms: 3,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad bathrooms quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 3,
//         bathrooms: 5,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad price quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 3,
//         bathrooms: 5,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 11,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad category quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 3,
//         bathrooms: 5,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 4,
//         categoryId: 8,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Street is not falsy', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 3,
//         bathrooms: 3,
//         street: '',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });
