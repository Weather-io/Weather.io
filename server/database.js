const mongoose = require('mongoose');
require('dotenv').config();


const URI = process.env.MONGO_URI;

async function db() {
try {
    await mongoose.connect(URI);
    console.log('Connected to database....')
}
catch(err) {
    console.error('An error occured while trying to connect to Mongoose!')
}
}

module.exports = db;
