const mongoose = require('mongoose')
const { subscribe } = require('../routes/student')

// mongodb schema for array objects in json 

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true

    },
    departments: {
        type: String,
        require: true
    },
    admissionDate: {

        type: Date,
        require: true,
        default: Date.now

    }
})

module.exports = mongoose.model("Student", studentSchema)