const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    userID: mongoose.Types.ObjectId,
    subjectID: mongoose.Types.ObjectId,
    type: String,
    grade: Number,
    date: String
}, {
    collection: 'grades'
});

const Grade = mongoose.model('grades', gradeSchema);

module.exports = Grade;