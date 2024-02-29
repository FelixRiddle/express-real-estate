const {
    mysqlConn,
    
    Category,
    Price,
    User
} = require("app-models");

const {
    CategoriesSeed,
    PricesSeed,
    TestUsersSeed,
} = require("../seed/index");

const db = mysqlConn();

/**
 * Commands
 */
async function seederArgs(args) {
    // Seed categories
    if(args.seedCategories) {
        // Insert category data
        await insertCategoriesData();
    }
    
    // Seed prices
    if(args.seedPrices) {
        // Insert property prices data
        await insertPricesData();
    }
    
    // Seed users
    if(args.seedUsers) {
        // Insert users
        await insertUserData();
    }
    
    // Seed properties
    if(args.seedProperties) {
        // Insert properties
        await insertPropertiesData();
    }
    
    return args;
}

/**
 * Insert categories data
 */
async function insertCategoriesData() {
    console.log(`Inserting categories data`);
    try {
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
            Category.bulkCreate(CategoriesSeed),
        ]);
        
        console.log(`Categories inserted`);
    } catch(err) {
        console.log(err);
    }
}

/**
 * Insert prices data
 */
async function insertPricesData() {
    try {
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
            Price.bulkCreate(PricesSeed),
        ]);
        
        console.log(`Data inserted correctly`);
    } catch(err) {
        console.log(err);
    }
}

/**
 * Insert test user data
 */
async function insertTestUserData() {
    try {
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
            User.bulkCreate(TestUsersSeed),
        ]);
        
        console.log(`Data inserted correctly`);
    } catch(err) {
        console.log(err);
    }
}

/**
 * TODO: Insert test property data
 */
async function insertTestPropertiesData() {
    console.log(`Not done yet!`);
    return;
    try {
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
        ]);
        
        console.log(`Data inserted correctly`);
    } catch(err) {
        console.log(err);
    }
}

const Seeder = {
    insertCategoriesData,
    insertPricesData,
    insertTestPropertiesData,
    insertTestUserData,
    
    seederArgs,
};

module.exports = Seeder;
