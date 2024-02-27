const fs = require("node:fs");

/**
 * Abstraction of the users folder
 */
module.exports = class UsersFolder {
    constructor() {
        this.folderPath = "public/user";
    }
    
    // --- Operations ---
    /**
     * Create folder
     */
    create() {
        try {
            fs.mkdirSync("public", { recursive: true, force: true });
        } catch(err) {
            
        }
        
        try {
            fs.mkdirSync(this.folderPath, { recursive: true, force: true, });
        } catch(err) {
            
        }
    }
    
    /**
     * Delete user folder
     */
    delete() {
        try {
            fs.rmSync(this.folderPath, { recursive: true, force: true });
        } catch(err) {
            // Directory may not exist
        }
        
        return this;
    }
}
