const {
    // MySQLDatabaseConnection,
    mysqlConn,
    
    Category,
    DebugPropertyImageUpload,
    Price,
    Property,
    User,
    UserMessages,
} = require("app-models");

const {
    CategoriesSeed,
    PricesSeed,
    TestUsersSeed,
} = require("../seed/index.js");
const UserFolder = require("../user/UsersFolder.js");
const { printMysqlEnvironmentVariables } = require("../env/index");

// Main
async function tableArgs(args) {
    // // Drop all
    // if(args.downAll) {
    //     await downAll();
    // }
    
    // // Create all
    // if(args.upAll) {
    //     await upAll();
    // }
    
    // Reset tables
    if(args.reset_tables) {
        
        printMysqlEnvironmentVariables();
        
        const tablesController = new TablesController();
        
        await tablesController.initialize();
        await tablesController.dropAll();
        await tablesController.upAll();
    }
}

/**
 * Tables controller
 * 
 * To manage all tables
 */
class TablesController {
    constructor() {}
    
    /**
     * Initialize
     */
    async initialize() {
        const db = mysqlConn();
        console.log(`Tables db connection`);
        
        // Authenticate
        await db.authenticate();
        console.log(`Authenticated`);
        
        this.db = db;
        
        return this;
    }
    
    /**
     * Create tables
     */
    async upAll() {
        try {
            // Create tables
            // db.sync doesn't seems to work
            await this.createAll();
            
            // Insert data
            console.log(`User: `, new User());
            await Promise.all([
                new Category().bulkCreate(CategoriesSeed),
                new Price().bulkCreate(PricesSeed),
                new User().bulkCreate(TestUsersSeed),
            ]);
            
            console.log(`Tables seeded`);
        } catch(err) {
            console.log(err);
        }
    }
    
    /**
     * Drop all tables
     */
    async downAll() {
        try {
            // This should drop everything in cascade
            await this.db.drop();
            
            // Temporal fix
            // await this.dropAll();
            
            // Remove user folder
            const usersFolder = new UserFolder();
            usersFolder.delete();
            console.log(`Deleted user folder`);
            
            console.log(`Tables down`);
        } catch(err) {
            console.log(`Drop table error`);
        }
    }
    
    // --- Drop and create models ---
    /**
     * Models from high independence to low independence
     * 
     * @returns {Array}
     */
    models() {
        const modelArray = [
            // Independent
            new User(),
            new DebugPropertyImageUpload(),
            new Category(),
            new Price(),
            
            // Dependents
            new Property(),
            new UserMessages(),
        ];
        
        return modelArray;
    }
    
    /**
     * Drop all tables
     * 
     * I don't know why db.drop doesn't work
     */
    async dropAll() {
        for(const model of this.models().reverse()) {
            try {
                await model.drop();
            } catch(err) {
                console.log(`Couldn't drop model: `, model);
            }
        }
    }
    
    /**
     * Create all
     */
    async createAll() {
        for(const model of this.models()) {
            try {
                await model.sync();
            } catch(err) {
                console.log(`Couldn't sync model: `, model);
            }
        }
    }
}

module.exports = tableArgs;
