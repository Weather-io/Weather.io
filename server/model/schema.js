const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
  zipcode: Number
});

const NewUser = mongoose.model('zipcode', userSchema);

module.exports = NewUser;