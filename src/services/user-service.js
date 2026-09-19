const UserRepository = require('../repository/User-repository');

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/server-config');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    createToken(user) {
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn: '1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in Token creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in Token validation",error);
            throw error;
        }
    }
}

module.exports = UserService;