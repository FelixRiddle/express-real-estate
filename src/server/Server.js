const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const { mysqlConn } = require("app-models");
const ConfMap = require("felixriddle.configuration-mappings");

const routes = require("./routes/index");
const UsersFolder = require("../user/UsersFolder");

/**
 * Server
 */
module.exports = class Server {
    constructor() {
        const app = express();
        this.app = app;
        
        // Public user folder
        const usersFolder = new UsersFolder();
        usersFolder.create();
    }
    
    /**
     * Start serving requests
     */
    async serve() {
        // Complete implementation of port(env, default and ephemeral) management
        const locSelector = new ConfMap.LocationSelection();
        await locSelector.selectLocation(this.app, 'express-real-estate');
    }
    
    /**
     * Setup all
     */
    async setup() {
        await this.setupMiddleware();
        
        this.app.use(routes);
    }
    
    /**
     * Enable CSP
     * 
     * TODO: Eval should be removed, but there's a package that uses it, I don't even know which one.
     * TODO: A lot of things should be banned, that's the point of CSP.
     */
    enableCsp() {
        // CSP policy
        let cspPolicy = (() => {
            // Array of allowed domains
            // Note that subdomains are disallowed by default, so you must set the star
            // to allow every subdomain.
            let allowedDomains = [
                "unpkg.com",
                "*.unpkg.com",
                "openstreetmap.org",
                "*.openstreetmap.org",
                "cloudflare.com",
                "*.cloudflare.com",
                "cdnjs.cloudflare.com",
                "geocode-api.arcgis.com",
                "cdn.jsdelivr.net",
                // My domains
                "*.perseverancia.com.ar",
                "perseverancia.com.ar",
            ];
            
            // Add domains to the list
            let domains = "";
            for(let domain of allowedDomains) {
                domains += `${domain} `;
            }
            
            // A lil more safe
            let scriptSrc = `script-src ${domains}'self';`;
            let styleSrc = `style-src ${domains}'self';`;
            let imgSrc = `img-src ${domains}'self' data:;`;
            let defaultSrc = `default-src ${domains}'self';`;
            let fontAndFrame = "font-src 'self'; frame-src 'self';";
            
            let cspPolicy = `${fontAndFrame} ${defaultSrc} ${scriptSrc} ${styleSrc} ${imgSrc}`;
            
            return cspPolicy;
        })();
        
        // Set CSP
        this.app.use((req, res, next) => {
            res.setHeader(
                'Content-Security-Policy',
                cspPolicy
            );
            next();
        });
    }
    
    /**
     * Setup some things
     */
    async setupMiddleware() {
        this.enableCsp();
        
        // I don't know
        this.app.use(express.urlencoded({
            extended: true,
        }));
        
        // Json parser middleware
        this.app.use(express.json())
        
        // Cors whitelist
        let whitelist = [];
        if(process.env.ORIGIN) whitelist.push(process.env.ORIGIN);
        if(process.env.ORIGIN_1) whitelist.push(process.env.ORIGIN_1);
        
        this.app.use(cors({
            origin: [
                ...whitelist,
            ]
        }));
        
        // Enable cookie parser
        this.app.use(cookieParser());
        
        // Connect to db
        try {
            const conn = mysqlConn();
            
            await conn.authenticate();
            
            conn.sync();
            
            console.log("Successfully connected to db");
        } catch(err) {
            console.error(err);
        }
    }
};
