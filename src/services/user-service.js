const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong in the service layer");
            throw error;
            // throw new AppErrors(
            //     'ServerError',
            //     'Something went wrong in service',
            //     'Logical Issue found',
            //     500
            // );
        }
    }

    // async destroy(userId){
    //     try {
    //         await this.userRepository.destroy(userId);
    //         return true;
    //     } catch (error) {
    //         console.log("Something went wrong in the service layer");
    //         throw error;
    //     }
    // }

    async signIn(email,plainPassword){
        try {
            // step 1 -> fetch the user using email
            const user = await this.userRepository.getByEmail(email);
            // step 2 -> compare incoming plain password with stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            // step 3 -> if password matches then create a token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            if(error.name == 'Attribute Not Found'){
                throw error;
            }
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with corresponding token exists'};
            }
            return user.id;  // we are returning user.id so that we can save this in req object so generally we return this user id
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
}

module.exports = UserService;