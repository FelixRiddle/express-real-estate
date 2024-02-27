// import propertyImagesConfiguration from "./propertyImagesConfig.js";
const propertyImagesConfiguration = require("./propertyImagesConfig.js");

module.exports = class PropertyImagesUtils {
    constructor() { }
    
    /**
     * Convert to megabytes
     */
    static maxFileSizeMB() {
        return propertyImagesConfiguration.maxSizeKb / 1024;
    }
    
    static minFileSize() {
        return propertyImagesConfiguration.minSizeKb / 1024;
    }
}
