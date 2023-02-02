const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: String,
}, {
    collection: 'subjects'
});

const Subject = mongoose.model('subjects', subjectSchema);

module.exports = Subject;