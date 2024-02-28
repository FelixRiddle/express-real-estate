const createAxiosInstance = require("../../public/js/axios/createAxiosInstance");

/**
 * Property API
 */
module.exports = class PropertyAPI {
    /**
     * 
     * @param {AxiosInstance} instance Axios instance that is already logged in
     */
    constructor(instance) {
        this.instance = instance;
    }
    
    /**
     * New from http things
     * 
     * I got this habit of creating constructors from rust hehe
     * 
     * @param {*} serverUrl 
     * @param {*} endpoint 
     * @param {*} jwtToken 
     */
    static newFrom(serverUrl = "", endpoint = "", jwtToken = '') {
        return new PropertyAPI(createAxiosInstance(serverUrl, endpoint, jwtToken));
    }
    
    /**
     * Create a property
     * 
     * @param {object} property Property information
     */
    async createProperty(property) {
        const res = await this.instance.post("/user/property/create", {property})
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
    
    /**
     * Get all
     */
    async getAll() {
        const res = await this.instance.get("/user/property/operation/get_all")
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
    
    /**
     * Deletes all user(the one logged in) properties
     * 
     */
    async userDeleteAll() {
        const properties = await this.getAll();
        
        if(properties && properties.properties) {
            for(const property of properties.properties) {
                await this.instance.post(`/user/property/delete/${property.id}`)
                    .then((res) => {
                        // console.log(`Property ${property.title} deleted`);
                        // console.log(`Response: `, res.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }
    }
    
    /**
     * Edit property by id
     * 
     * @param {number} id Property id
     * @param {object} property Property information to update
     */
    async editPropertyById(id, property) {
        const res = await this.instance.post(`/user/property/edit/${id}`, {
            property
        })
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
}
