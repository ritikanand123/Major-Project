const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    studentId: { type: String, required: true },
    ratings: {
        question1: { type: Number, required: true, max: 5 },
        question2: { type: Number, required: true, max: 5 },
        question3: { type: Number, required: true, max: 5 },
        question4: { type: Number, required: true, max: 5 },
        question5: { type: Number, required: true, max: 5 },
        question6: { type: Number, required: true, max: 5 },
        question7: { type: Number, required: true, max: 5 },
        question8: { type: Number, required: true, max: 5 },
        question9: { type: Number, required: true, max: 5 },
        question10: { type: Number, required: true, max: 5 },
        question11: { type: Number, required: true, max: 5 },
        question12: { type: Number, required: true, max: 5 },
        question13: { type: Number, required: true, max: 5 },
        question14: { type: Number, required: true, max: 5 },
        question15: { type: Number, required: true, max: 5 }


    },
    comments: { type: String },
});
module.exports = mongoose.model('Feedback', feedbackSchema);