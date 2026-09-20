const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { PORT, JWT_KEY } = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

// const {User} = require('./models/index');
// const bcrypt = require('bcrypt');

// const UserRepository = require('./repository/user-repository');

// const UserService = require('./services/user-service');

const db = require('./models/index');

const prepareAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on PORT: ${PORT}`);
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }     // this will create the tables in the database if they don't exist, and update them if they do exist (alter: true)

        // const u1 = await User.findByPk(4);
        // const r1 = await Role.findByPk(1);
        // // await u1.addRole(r1); // this will add the role to the user in the User_Roles table
        // const response1 = await u1.getRoles(); // this will get all the roles of the user
        // console.log(response1);
        // const response2 = await u1.hasRole(r1); // this will check if the user has the role
        // console.log(response2);


        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        // console.log(response);

        // const incomingpassword = '123456';
        // const user = await User.findByPk(3);
        // const response = bcrypt.compareSync(incomingpassword, user.password);
        // console.log(response);

        // const service = new UserService();
        // const newToken = service.createToken({email: 'anuj@admin.com', id: 1});
        // console.log("New Token is:", newToken);
    });
}

prepareAndStartServer();