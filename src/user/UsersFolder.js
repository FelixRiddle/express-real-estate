const fs = require("node:fs");

/**
 * Abstraction of the users folder
 */
module.exports = class UsersFolder {
    constructor() {
        
    }
    
    // --- Operations ---
    /**
     * Delete user folder
     */
    delete() {
        try {
            fs.rmSync("public/user", { recursive: true, force: true });
        } catch(err) {
            // Directory may not exist
        }
        
        return this;
    }
}
