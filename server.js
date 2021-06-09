require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")



// database connection codes

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("db Connected"))


// routes
app.use(express.json())

const studentRouter = require('./routes/student')
app.use('/students', studentRouter)

// port config in localhost
app.listen(6000, () => console.log("server started"))