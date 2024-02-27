/**
 * Take variables from the environment and get the server url or return the default
 * 
 * @returns {string} The serve url(or origin)
 */
function envServerUrlOrDefault() {
    const protocol = process.env.SERVER_PROTOCOL ? process.env.SERVER_PROTOCOL : "http";
    const host = process.env.SERVER_HOST ? process.env.SERVER_HOST : "localhost";
    const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : "38003";
    
    return `${protocol}://${host}:${port}`;
}

module.exports = {
    envServerUrlOrDefault,
};
