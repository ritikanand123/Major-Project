const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const AdminSchema = new mongoose.Schema({
    adminId: {
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

AdminSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        console.log(token);
        await this.save();
        return token;
    } catch (error) {
        return error;
    }
};

module.exports = mongoose.model("Admin", AdminSchema);
