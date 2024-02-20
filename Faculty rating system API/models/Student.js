const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    studentId: {
        type: String,
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
    branch: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,
        min: 4
    },
})

module.exports = mongoose.model("Student", StudentSchema);