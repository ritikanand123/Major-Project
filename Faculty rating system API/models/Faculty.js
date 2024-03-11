const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
    }],
    token: {
        type: String,
        required: true
    }
});

FacultySchema.methods.generateAuthToken = async function () {
    try {

        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.token = token
        console.log(token);
        await this.save();
        return token;
    } catch (error) {
        return error;
    }
};
module.exports = mongoose.model("Faculty", FacultySchema);