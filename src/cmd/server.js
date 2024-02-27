const Server = require("../server/Server");

/**
 * 
 */
async function startServer() {
    const server = new Server();
    
    await server.setup();
    
    server.serve();
}

/**
 * Main server
 */
module.exports = async function serverMain(args) {
    // Seed categories
    if(args.serve) {
        console.log(`SErve given`);
        // Start server
        startServer();
    }
};
