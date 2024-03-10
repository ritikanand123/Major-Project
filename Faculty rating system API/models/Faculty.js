const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
    facultyId: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        max: 15
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    branch: {
        type: String,
        required: true,
    },
    allCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

module.exports = mongoose.model("Faculty", FacultySchema);
