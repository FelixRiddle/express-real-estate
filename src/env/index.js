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

/**
 * Print mysql environment variables
 */
function printMysqlEnvironmentVariables() {
    
    // Mysql information
    const MYSQL_NAME = process.env.DATABASE_NAME ?? process.env.MYSQL_DATABASE_NAME;
    const MYSQL_USERNAME = process.env.DATABASE_USERNAME ?? process.env.MYSQL_USERNAME ?? "root";
    const MYSQL_PASSWORD = process.env.DATABASE_PASSWORD ?? process.env.MYSQL_PASSWORD ?? "";
    const MYSQL_HOST = process.env.DATABASE_HOST ?? process.env.MYSQL_HOST ?? "localhost";
    const MYSQL_PORT = process.env.MYSQL_PORT ?? 3306;
    
    console.log(`Mysql name: ${MYSQL_NAME}`);
    console.log(`Mysql username: ${MYSQL_USERNAME}`);
    console.log(`Mysql password: ${MYSQL_PASSWORD}`);
    console.log(`Mysql host: ${MYSQL_HOST}`);
    console.log(`Mysql port: ${MYSQL_PORT}`);
}

module.exports = {
    envServerUrlOrDefault,
    printMysqlEnvironmentVariables,
};
