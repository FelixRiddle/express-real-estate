/**
 * Property folder
 * 
 * Things related to a single and existent property folder.
 */
const { constants } = require("node:buffer");
const path = require("node:path");
const fs = require("node:fs");

const { userPropertyFolder, relativeUserPropertyFolder } = require("./index");

/**
 * Get user property folder
 * 
 * @param {string} userId User id
 * @param {int} id Property ID
 * @returns {string} Given property folder
 */
function propertyFolder(userId, id) {
    const parentFolder = userPropertyFolder(userId);
    
    // Create user property folder
    const propFolder = path.resolve(parentFolder, `${id}`);
    try {
        fs.accessSync(propFolder, constants.F_OK);
    } catch(err) {
        // The folder doesn't exists
        // Create folder
        fs.mkdirSync(propFolder);
    }
    
    return propFolder;
}

/**
 * Uses user id and property's to get the relative property folder from public folder
 * 
 * @param {string} userId 
 * @param {number} id Property id
 * @returns {string} Property folder relative path
 */
function relativePropertyFolder(userId, id) {
    return `${relativeUserPropertyFolder(userId)}/${id}`;
}

/**
 * Get every image relative path from the public folder of a given property
 * 
 * Encodes spaces and weird digits.
 * 
 * Maybe it's a little complex to explain the things should this be a class?
 * 
 * @param {string} userId 
 * @param {number} id The property id
 * @returns {array} Array of property images relative path from public directory
 */
function relativePropertyImages(userId, id) {
    let images = fs.readdirSync(relativePropertyFolder(userId, id), { withFileTypes: true });
    
    let imagesURI = [];
    for(let image of images) {
        let encodedImageName = encodeURIComponent(image.name);
        
        // Because express doesn't add the 'public' part to it, we have to remove it
        let imagePath = image.path.substring(7, image.path.length);
        
        let imageURI = `${imagePath}/${encodedImageName}`;
        
        imagesURI.push(imageURI);
    }
    
    return imagesURI;
}

/**
 * The same as relative property images
 * 
 * But it starts from public, which makes it not be protected '/public/[IMAGE LOCATION]'
 * Making the public folder start from the bare url, was my mistake, prepositioning '/public' is the norm.
 * 
 * @param {string} userId 
 * @param {number} id The property id
 * @returns {array} Array of property images relative path from public directory
 */
function relativePropertyImagesNorm(userId, id) {
    let images = fs.readdirSync(relativePropertyFolder(userId, id), { withFileTypes: true });
    
    let imagesURI = [];
    for(let image of images) {
        let encodedImageName = encodeURIComponent(image.name);
        
        // Because express doesn't add the 'public' part to it, we have to remove it
        let imagePath = image.path.substring(7, image.path.length);
        
        let imageURI = `public/${imagePath}/${encodedImageName}`;
        
        imagesURI.push(imageURI);
    }
    
    return imagesURI;
}

module.exports = {
    propertyFolder,
    relativePropertyFolder,
    relativePropertyImages,
    relativePropertyImagesNorm,
}
