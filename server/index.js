const express = require("express")
const mongoose = require("mongoose")
const app = express()
const secrets = require('./.secrets')
const expressSession = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const bodyParser = require('body-parser');
const User = require("./models/User")

mongoose.set('strictQuery', false);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const dbURL = secrets.dbURL
const cookieSecret = secrets.cookieSecret



const subjectsList = ["Calculus 1", "Calculus 2", "English", "Algebra 1", "Algebra 2", "Physics 1", "Operating Systems", "Computer graphics"]
// Login -> Subjects -> Subject Grades

app.use(express.json());

const store = new MongoDBStore({
    uri: dbURL,
    collection: 'mySessions'
  });


app.use(
    expressSession({
    resave: false,
    saveUninitialized: false,
    secret: cookieSecret,
    store: store,
    cookie: { sameSite: 'strict' }
})
);

const isAuth = (req, res, next) => {
    if (req.session.isAuth)
    {
        return res.status(400).send()
    }
    next()
  };


app.get('/api', (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]})
    // res.send("hello world!")
})

app.get('/subjects', (req, res) => {
    res.send(JSON.stringify(subjectsList))
    // res.send("hello world!")
})

app.get('/login', isAuth, (req, res) => {
    res.status(200).send()
  });

app.post('/login', async (req, res) => {
    console.log(req.body)
    const id = req.body.id
    const password = req.body.password

    if (id === '' || password === '')
    {
        return res.status(400).send()
    }
    const user = await User.findOne({ID: id})
    if (user)
    {

        if (user.password === password)
        {
            req.session.isAuth = true;
            req.session.userID = user._id;
            console.log('logged in!')
        } else {
            return res.status(401).send()
        }
    } else {
        return res.status(401).send()
    }
    res.status(200).send()
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