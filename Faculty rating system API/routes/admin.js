// routes/adminRoutes.js
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');
const Feedback = require('../models/Feedback');
const Course = require('../models/Course');

const deleteToken = async (req, res, next) => {
    try {

        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new Error('Authentication required');
        }

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

        const admin = Admin.findById({ _id: verifyUser._id });

        if (admin) {
            await admin.updateOne({ $set: { token: null } }).exec();
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

        if (!token) {
            throw new Error('Authentication required');
        }

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const admin = await Admin.findById({ _id: verifyUser._id });

        if (admin) {
            next();
        } else {
            return res.status(401).json({ message: "Authorization required" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};






// router.post('/register', async (req, res) => {
//     try {
//         const admin = new Admin({
//             adminId: 'admin123',
//             email: 'admin@gmail.com',
//             name: 'adminA'
//         })
//         await admin.generateAuthToken();
//         await admin.save();
//         return res.json("admin registered")

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// });


// Admin Login
router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findOne({ adminId: req.body.adminId })

        if (admin) {
            const token = await admin.generateAuthToken();

            return res.status(200).json({
                message: 'Login Sucessfull',
                token: token
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});



// admin logout
router.post('/logout', deleteToken, async (req, res) => {
    try {

        return res.status(200).json({ message: "User is logged out successfully" })
    } catch (error) {
        return res.status(500).josn({ message: { error } });
    }
})



router.post('/register-faculty', authorization, async (req, res) => {
    try {
        const newFaculty = new Faculty({
            facultyId: req.body.facultyId,
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            password: req.body.password,
            branch: req.body.branch,
            semester: req.body.semester
        })
        const token = await newFaculty.generateAuthToken();
        await newFaculty.save();
        return res.status(200).json(newFaculty);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/addCourse', authorization, async (req, res) => {
    try {
        const newCourse = new Course(req.body);

        await newCourse.save();

        const faculty = await Faculty.findOne({ facultyId: req.body.facultyId });

        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        faculty.allCourses.push(newCourse._id);
        await faculty.save();

        return res.status(200).json(newCourse);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/faculty/courses-and-feedbacks', authorization, async (req, res) => {
    try {



        const faculty = await Faculty.findOne({ facultyId: req.body.facultyId }).populate('allCourses')

        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }





        const courses = faculty.allCourses;


        const coursesWithFeedbacks = await Promise.all(courses.map(async (course) => {
            const feedbacks = await Feedback.find({ courseId: course.CourseId });
            return { course, feedbacks };
        }));

        return res.status(200).json(coursesWithFeedbacks);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});




router.get('/faculty/:facultyId/course/:courseId/average-ratings', authorization, async (req, res) => {
    try {
        const { facultyId, courseId } = req.params;

        const faculty = await Faculty.findOne({ facultyId }).populate('allCourses');

        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }

        const course = faculty.allCourses.find(course => String(course.CourseId) === courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found for the given faculty" });
        }

        const feedbacks = await Feedback.find({ courseId });

        const questionwiseAverageRatings = {};

        // Iterate over each feedback
        for (const feedback of feedbacks) {
            const questionKeys = Object.keys(feedback.ratings);

            // Iterate over each question in the feedback
            for (const questionKey of questionKeys) {
                const rating = feedback.ratings[questionKey];

                // Initialize the question in the questionwiseAverageRatings object if not exists
                if (!questionwiseAverageRatings[questionKey]) {
                    questionwiseAverageRatings[questionKey] = { totalRating: 0, count: 0 };
                }

                // Update the totalRating and count for the question
                questionwiseAverageRatings[questionKey].totalRating += rating;
                questionwiseAverageRatings[questionKey].count++;
            }
        }

        // Calculate the average rating for each question
        const result = {};
        const questionKeys = Object.keys(questionwiseAverageRatings);
        for (const questionKey of questionKeys) {
            const averageRating = questionwiseAverageRatings[questionKey].count > 0 ?
                questionwiseAverageRatings[questionKey].totalRating / questionwiseAverageRatings[questionKey].count :
                0;
            result[questionKey] = averageRating;
        }

        return res.status(200).json({ facultyId, courseId, questionwiseAverageRatings: result });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});




router.get('/get_all_faculty', authorization, async (req, res) => {
    try {
        // const allFaculty = await Faculty.find().select('-allCourses');
        const allFaculty = await Faculty.find().populate('allCourses')
        return res.status(200).json(allFaculty);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});



module.exports = router;