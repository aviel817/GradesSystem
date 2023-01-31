const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    role: String,
    ID: Number,
    password: String,
    subjects: [mongoose.Types.ObjectId]
}, {
    collection: 'users'
});

const User = mongoose.model('users', userSchema);

module.exports = User;