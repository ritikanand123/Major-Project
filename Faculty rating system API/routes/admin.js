// routes/adminRoutes.js
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');
const Feedback = require('../models/Feedback');
const authMiddleware = require('../middlewares/auth');
const Course = require('../models/Course');






// router.post('/resgiter', async (req, res) => {
//     try {
//         const admin = new Admin({
//             adminId: 'admin123',
//             email: 'admin@gmail.com',
//             name: 'adminA'
//         })
//         const token = admin.generateAuthToken();
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

            // res.header('Access-Control-Allow-Credentials', true);

            const options = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("jwt", token, options);

            return res.status(200).json({
                success: true,
                message: 'Login Sucessfull'
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});



// admin logout
router.post('/logout', async (req, res) => {
    try {

        return res.status(200).json({ message: "User is logged out successfully" })
    } catch (error) {
        return res.status(500).josn({ message: { error } });
    }
})



router.post('/register-faculty', async (req, res) => {
    try {
        const newFaculty = new Faculty({
            facultyId: req.body.facultyId,
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            password: req.body.password,
            branch: req.body.branch
        })
        await newFaculty.save();
        return res.status(200).json(newFaculty);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/addCourse', async (req, res) => {
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

router.get('/faculty/courses-and-feedbacks', async (req, res) => {
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
router.get('/faculty/:facultyId/average-ratings-and-comments', async (req, res) => {
    try {
        const faculty = await Faculty.findOne({ facultyId: req.params.facultyId }).populate('allCourses');

        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }

        // console.log(faculty);

        const courses = faculty.allCourses;

        const ratingsAndComments = await Promise.all(courses.map(async (course) => {
            const feedbacks = await Feedback.find({ courseId: course.CourseId });


            const totalRatings = feedbacks.reduce((total, feedback) => {
                const feedbackValues = Object.values(feedback.ratings);
                return total + feedbackValues.reduce((sum, value) => sum + value, 0);
            }, 0);

            const averageRating = feedbacks.length > 0 ? totalRatings / (feedbacks.length * 15) : 0;


            const comments = feedbacks.map(feedback => feedback.comments)
                .filter(comment => comment !== undefined && comment !== null && comment.trim() !== '');

            return { course, averageRating, comments };
        }));

        return res.status(200).json(ratingsAndComments);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/faculty/:facultyId/questionwise-average-ratings', async (req, res) => {
    try {
        const faculty = await Faculty.findOne({ facultyId: req.params.facultyId }).populate('allCourses');

        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }

        // console.log(faculty);

        const courses = faculty.allCourses;

        const questionwiseAverageRatings = {};

        // Iterate over each course
        for (const course of courses) {
            const feedbacks = await Feedback.find({ courseId: course.CourseId });

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
        }

        // Calculate the average rating for each question
        const result = {};
        const questionKeys = Object.keys(questionwiseAverageRatings);
        for (const questionKey of questionKeys) {
            const averageRating = questionwiseAverageRatings[questionKey].totalRating / questionwiseAverageRatings[questionKey].count;
            result[questionKey] = averageRating;
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.get('/get_all_faculty', async (req, res) => {
    try {
        // const allFaculty = await Faculty.find().select('-allCourses');
        const allFaculty = await Faculty.find().populate('allCourses')
        return res.status(200).json(allFaculty);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});



module.exports = router;
