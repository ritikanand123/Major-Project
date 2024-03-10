// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const XLSX = require('xlsx');




// Faculty Login
router.post('/login', async (req, res) => {
    try {

        const faculty = await Faculty.findOne({ facultyId: req.body.facultyId });
        if (!faculty) {
            return res.status(404).json({ message: "Faculty memeber is not registered" })
        }

        if (req.body.password == faculty.password) {

            return res.status(200).json(faculty);
        } else {
            return res.status(404).json({ message: "wrong password" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    // console.log(req.session);

});

router.post('/logout', async (req, res) => {
    try {
        req.session.facultyAuthenticated = false;
        req.session.facultyId = null;
        // console.log(req.session)
        return res.status(200).json({ message: "User is logged out successfully" })

    } catch (error) {
        return res.status(500).json({ message: { error } });
    }
})

router.post('/student-register', async (req, res) => {
    try {
        const newStudent = new Student({
            studentId: req.body.studentId,
            email: req.body.email,
            name: req.body.name,
            branch: req.body.branch,
            semester: req.body.semester,
            password: req.body.password
        })
        console.log("hi");
        await newStudent.save();
        return res.status(200).json(newStudent);
    } catch (error) {
        return res.status(500).json({ message: { error } });
    }
})


router.post('/import-students/:path', async (req, res) => {
    try {
        const excelFilePath = req.params.path;
        const workBook = XLSX.readFile(excelFilePath);
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

router.post('/getStudents', async (req, res) => {
    try {
        const faculty = await Faculty.findOne({ facultyId: req.body.facultyId });

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
