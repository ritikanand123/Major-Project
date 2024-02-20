const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    CourseId: {
        type: String,
        required: true
    },
    CourseName: {
        type: String,
        required: true
    },
    facultyId: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Course", CourseSchema);
