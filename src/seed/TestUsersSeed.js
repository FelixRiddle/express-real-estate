const bcrypt = require("bcrypt");

const TestUsersSeed = [
    {
        name: "Felix",
        email: "felix@email.com",
        confirmedEmail: 1,
        password: bcrypt.hashSync("asd12345", 10)
    }, {
        name: "Eugene",
        email: "eugene@example.com",
        confirmedEmail: 1,
        password: bcrypt.hashSync("asd12345", 10)
    }, {
        name: "Selena",
        email: "selena@email.com",
        confirmedEmail: 1,
        password: bcrypt.hashSync("asd12345", 10)
    }
];

module.exports = TestUsersSeed;
