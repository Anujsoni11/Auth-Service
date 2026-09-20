const express=require('express');
const bodyParser=require('body-parser');

const db=require('./models/index');
const {PORT, JWT_KEY} =require('./config/server-config');
const apiRoutes=require('./routes/index');

const app=express();
// const UserRepository =require('./repository/User-repository')

// const UserService=require('./services/user-service')

const prepareAndStartServer = () => {
    app.listen(PORT,async() => {
        console.log(`Server started on Port ${PORT}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
        
        // const repo=new UserRepository();
        // const response= await repo.getById(1);
        // console.log(response);

        // const service=new UserService();
        // const newToken=service.createToken({email:'raivikas748@gmail.com',id : 1});
        // console.log("new token is : ",newToken);
        // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaXZpa2FzNzQ4QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3ODE0NDU2NDEsImV4cCI6MTc4MTQ0NTY3MX0.94C4fEMbIcjRHAvt8RvQeU1qvSwIN9GUWk_jnzu7n98'
        // const verification=service.verifyToken(token,JWT_KEY);
        // console.log(verification)
    })

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
}

prepareAndStartServer();