

const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    adminId: {
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
    }
});

module.exports = mongoose.model("Admin", AdminSchema);
