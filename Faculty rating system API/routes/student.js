// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student')
const Course = require('../models/Course');
const Feedback = require('../models/Feedback');
const Facutly = require('../models/Faculty');

const reqStudentAuth = (req, res, next) => {
    if (req.session.studentAuthenticated && req.session.studentId != null) {
        next();
    } else {
        res.status(401).json({ message: "student authentication required" })
    }
}

router.post('/login', async (req, res) => {
    try {

        const student = await Student.findOne({ studentId: req.body.studentId });

        if (!student) {
            return res.status(404).json({ message: "Student is not found" });
        } else {
            console.log(req.body);
            if (req.body.password === student.password) {
                req.session.studentAuthenticated = true;
                req.session.studentId = student.studentId;
                return res.status(200).json({ message: "Student is logged in successfully" });
            } else {
                return res.status(401).json({ message: "Incorrect password" });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
router.post('/logout', async (req, res) => {
    try {
        req.session.studentAuthenticated = false;
        req.session.studentId = null;
        // console.log(req.session)
        return res.status(200).json({ message: "Student is logged out successfully" })

    } catch (error) {
        return res.status(500).json({ message: { error } });
    }
})

router.get('/getCourses/:id', reqStudentAuth, async (req, res) => {
    try {

        const student = await Student.findOne({ _id: req.params.id });
        console.log(student);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const courses = await Course.find({ semester: student.semester, branch: student.branch });

        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/submitFeedback/:courseId/:studentId', async (req, res) => {
    try {

        const newfeed = new Feedback({
            courseId: req.params.courseId,
            studentId: req.params.studentId,
            ratings: req.body.ratings,
            comments: req.body.comments
        })
        await newfeed.save();
        return res.status(200).json(newfeed);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


module.exports = router;
