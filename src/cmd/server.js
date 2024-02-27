const Server = require("../server/Server");

/**
 * 
 */
async function startServer() {
    const server = new Server();
    
    await server.setup();
}

/**
 * Main server
 */
module.exports = async function serverMain(args) {
    // Seed categories
    if(args.serve) {
        // Start server
        startServer();
    }
};
