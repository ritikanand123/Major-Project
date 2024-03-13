// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student')
const Course = require('../models/Course');
const Feedback = require('../models/Feedback');
const Facutly = require('../models/Faculty');
const jwt = require("jsonwebtoken");

const deleteToken = async (req, res, next) => {
    try {

        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new Error('Authentication required');
        }

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

        const student = Student.findById({ _id: verifyUser._id });

        if (student) {
            await student.updateOne({ $set: { token: null } }).exec();
            next();
        } else {
            return res.status(401).json({ message: "Authorization required" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const authorization = async (req, res, next) => {
    try {

        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        console.log(token)
        // console.log(token)
        if (!token) {
            throw new Error('Authentication required');
        }

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const student = await Student.findById({ _id: verifyUser._id });

        if (student) {
            next();
        } else {
            return res.status(401).json({ message: "Authorization required" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

router.post('/login', async (req, res) => {
    try {

        const student = await Student.findOne({ studentId: req.body.studentId });

        if (!student) {
            return res.status(404).json({ message: "Student is not found" });
        } else {
            // console.log("hi")
            if (req.body.password == student.password) {
                const token = await student.generateAuthToken();
                console.log(token)
                return res.status(200).json({ message: "Student is logged in successfully" , token : token });
            } else {
                return res.status(401).json({ message: "Incorrect password" });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
router.post('/logout', deleteToken, async (req, res) => {
    try {
        
        return res.status(200).json({ message: "Student is logged out successfully" })

    } catch (error) {
        return res.status(500).json({ message:  error.message  });
    }
})

router.get('/getCourses/', authorization, async (req, res) => {
    try {

        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new Error('Authentication required');
        }

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const student = await Student.findById({ _id: verifyUser._id });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const courses = await Course.find({ semester: student.semester, branch: student.branch });

        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/submitFeedback/:courseId/', authorization, async (req, res) => {
    try {
        // console.log(req.params.courseId)
        const newfeed = new Feedback({
            courseId: req.params.courseId,
            
            ratings: req.body.ratings,
            comments: req.body.comments

        })
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        console.log(token)
        if (!token) {
            throw new Error('Authentication required');
        }

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const student = await Student.findById({ _id: verifyUser._id });
        newfeed.studentId = student.studentId
        await newfeed.save();
        return res.status(200).json(newfeed);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


module.exports = router;