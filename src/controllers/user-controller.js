const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully created a user'
        });
    } catch (error) {
        // console.log(error);
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            err: error.explanation,
            message: error.message 
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully signed in'
        });
    } catch (error) {
        console.log("Something went wrong in the controller layer");
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            err: error.explanation,
            message: error.message
        });
    }
}

const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'user is authenticated and token is valid'
        });
    } catch (error) {
        console.log("Something went wrong in the controller layer");
        return res.status(500).json({
            success: false,
            data: {},
            err: error,
            message: 'Something went wrong'
        });
    }
}

const isAdmin = async(req, res) => {
        try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'Successfully fetched whether user is admin or not'
        })
    } catch (error) {
        console.log("Something went wrong in the controller layer");
        return res.status(500).json({
            success: false,
            data: {},
            err: error,
            message: 'Something went wrong'
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}