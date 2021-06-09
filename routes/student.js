const express = require("express")
const router = express.Router()
const Student = require('../models/studentModel')

// Getting All

router.get('/', async (req, res) => {
    try {
        const student = await Student.find()
        res.json(student)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

//  Getting  One


router.get('/:id', getStudent, (req, res) => {

    res.json(res.student)

})

// Creating One



router.post('/', async (req, res) => {

    const student = new Student({
        name: req.body.name,
        departments: req.body.departments
    })
    try {
        const newStudent = await student.save()
        res.status(201).json(newStudent)
    } catch (error) {

        res.status(400).json({ message: error.message })

    }

})
// Updating One



router.patch('/:id', getStudent, async (req, res) => {
    if (req.body.name != null) {
        res.student.name = req.body.name
    }
    if (req.body.departments != null) {
        res.student.departments = res.body.departments
    }
    try {
        const updatedStudent = await res.student.save()
        res.json(updatedStudent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Deleting One


router.delete('/:id', getStudent, async (req, res) => {
    try {
        await res.student.remove()
        res.json({ message: "deleted student" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// medileware 

async function getStudent(req, res, next) {
    let student
    try {
        student = await Student.findById(req.params.id)
        if (student == null) {
            return res.status(404).json({ message: "cannot find student" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.student = student
    next()
}
module.exports = router