//use mongoose to connect to the database

const mongoose = require('mongoose');
const config = require('config'); //to access global variables
const db = config.get('mongoURI'); //access default.json and get mongoURI value 

const connectDB = async () => {

    try {
       await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } 
    catch (error) {
        console.error(err.message);
        process.exit(1);
    }

};

module.exports = connectDB;