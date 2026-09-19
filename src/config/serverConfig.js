const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();   // this will read the .env file and set the environment variables

module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(10),  // Generate a salt using the number of rounds specified in the .env file
    JWT_KEY: process.env.JWT_KEY
}
