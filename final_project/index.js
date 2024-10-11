const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());
const TOKEN_SECRET = "verySecret";

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    //Write the authenication mechanism here
    const username = jwt.verify(req.session.authorization, TOKEN_SECRET);
    if (username) {
    } else {
        return res
            .status(403)
            .json({message: "unauthenticate"})
    }
    next();
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
