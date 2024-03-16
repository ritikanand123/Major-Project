// routes/adminRoutes.js

const express = require('express');

const router = express.Router();
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const XLSX = require('xlsx');
const jwt = require("jsonwebtoken");

const deleteToken = async (req, res, next) => {
    try {

        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new Error('Authentication required');
        }

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

        const faculty = Faculty.findById({ _id: verifyUser._id });

        if (faculty) {
            await faculty.updateOne({ $set: { token: null } }).exec();
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

        console.log(token);
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

        const faculty = await Faculty.findById({ _id: verifyUser._id });

        if (faculty) {
            next();
        } else {
            return res.status(401).json({ message: "Authorization required" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



// Faculty Login
router.post('/login',async (req, res) => {
    try {
        // console.log("hi")
        const faculty = await Faculty.findOne({ facultyId: req.body.facultyId });
        if (!faculty) {
            return res.status(404).json({ message: "Faculty memeber is not registered" })
        }
        
        if (req.body.password == faculty.password) {
            const token = await faculty.generateAuthToken();
            console.log("hi")
            console.log(token)
            return res.status(200).json({
                message: 'Login Sucessfull',
                token: token
            });
        } else {
            return res.status(404).json({ message: "wrong password" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    // console.log(req.session);

});

router.post('/logout', deleteToken, async (req, res) => {
    try {

        return res.status(200).json({ message: "User is logged out successfully" })

    } catch (error) {
        return res.status(500).json({ message: { error } });
    }
})

router.post('/student-register', authorization, async (req, res) => {
    try {
        const newStudent = new Student({
            studentId: req.body.studentId,
            email: req.body.email,
            name: req.body.name,
            branch: req.body.branch,
            semester: req.body.semester,
            password: req.body.password
        })


        const token = await newStudent.generateAuthToken();
        await newStudent.save();
        return res.status(200).json(newStudent);
    } catch (error) {
        return res.status(500).json({ message: { error } });
    }
})


router.post('/import-students', authorization, async (req, res) => {
    try {
        // const excelFilePath = req.params.path;
        const workBook = req.body.formData;
        const sheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

        // Skip the first row (headers)
        const dataToInsert = jsonData.slice(1).map((row) => {
            return {
                studentId: row[0],
                name: row[1],
                email: row[2],
                branch: row[3],
                semester: row[4],
                password: row[5]
            };
        });

        // console.log(dataToInsert);
        await Student.insertMany(dataToInsert);
        return res.status(200).json(dataToInsert)

    } catch (error) {
        return res.status(500).json({ message: { error } });
    }

})

router.post('/getStudents', authorization, async (req, res) => {
    try {

        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication required');
        }

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const faculty = await Faculty.findById({ _id: verifyUser._id });


        if (!faculty) {
            return res.status(204).json({ message: "Faculty not registered" });
        } else {
            const allStudent = await Student.find({ branch: faculty.branch })
            return res.status(200).json(allStudent);

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

});


module.exports = router;