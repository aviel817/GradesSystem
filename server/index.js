const express = require("express")
const mongoose = require("mongoose")
const app = express()
secrets = require('./.secrets')

const dbURL = secrets.dbURL
const subjectsList = ["Calculus 1", "Calculus 2", "English", "Algebra 1", "Algebra 2", "Physics 1", "Operating Systems", "Computer graphics"]
// Login -> Subjects -> Subject Grades

app.get('/api', (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]})
    // res.send("hello world!")
})

app.get('/subjects', (req, res) => {
    res.send(JSON.stringify(subjectsList))
    // res.send("hello world!")
})

app.listen(5000, ()=> {
    console.log("Server started on port 5000")
})

mongoose.connect(dbURL)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })