
const express = require('express');
const mongoose = require('mongoose');
const router=require('./Route/UserRoute');

const app = express();

//Middleware
app.use(express.json());
app.use("/users", router);



mongoose.connect('mongodb+srv://admin:8RfnHs4xwQd2TSUr@cluster0.ngkxs.mongodb.net/')
.then(() => {
    console.log('Connected to database');
})
.then(() => {
    //http://localhost:5000/
    app.listen(5000);
})
.catch((e) => {
    console.log("Error: ");
});