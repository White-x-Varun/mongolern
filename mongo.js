
const mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb://localhost/mydb')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
