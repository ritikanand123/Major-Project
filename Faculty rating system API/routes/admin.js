// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');
const Feedback = require('../models/Feedback');

const Course = require('../models/Course');

const reqAdminAuth = (req, res, next) => {
    console.log(req.session.AdminAuthenticated);
    if (req.session.AdminAuthenticated) {
        next();
    } else {
        res.status(401).json({ message: "admin authentication required" })
    }
}

// Admin Login
router.post('/login', async (req, res) => {
    
    try {
        if (req.body.email == "admin@admin.com" && req.body.password == "admin123") {
            req.session.AdminAuthenticated = true;
            console.log(req.session.AdminAuthenticated);
            console.log(req.session);
            res.json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    // console.log(req.session);

});


router.post('/logout', async (req, res) => {
    try {
        req.session.AdminAuthenticated = false;
        // console.log(req.session)
        return res.status(200).json({ message: "User is logged out successfully" })
    } catch (error) {
        return res.status(500).josn({ message: { error } });
    }
})
router.post('/register-faculty', reqAdminAuth, async (req, res) => {
    try {
        const newFaculty = new Faculty({
            facultyId: req.body.facultyId,
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            password: req.body.password
        })
        await newFaculty.save();
        return res.status(200).json(newFaculty);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/addCourse', reqAdminAuth, async (req, res) => {
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

router.get('/faculty/:facultyId/courses-and-feedbacks', reqAdminAuth, async (req, res) => {
    try {



        const faculty = await Faculty.findOne({ facultyId: req.params.facultyId }).populate('allCourses')

        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }


        // console.log(faculty);


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
router.get('/faculty/:facultyId/average-ratings-and-comments', reqAdminAuth, async (req, res) => {
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

router.get('/faculty/:facultyId/questionwise-average-ratings', reqAdminAuth, async (req, res) => {
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



module.exports = router;
