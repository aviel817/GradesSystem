const express = require("express")
const mongoose = require("mongoose")
const app = express()
const secrets = require('./.secrets')
const isAuth = require('./middleware/isAuth')
const reqLogin = require('./middleware/reqLogin')
const expressSession = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const bodyParser = require('body-parser');
const User = require("./models/User")
const Subject = require("./models/Subject")
const Grade = require("./models/Grade")

mongoose.set('strictQuery', false);

const dbURL = secrets.dbURL
const cookieSecret = secrets.cookieSecret



// Login -> Subjects -> Subject Grades


app.use(bodyParser.urlencoded({ extended: false }));
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


const loginRoute = require('./routes/login')
const logoutRoute = require('./routes/logout')
const subjectRoute = require('./routes/subjects')


app.use('/login', loginRoute)
app.use('/logout', logoutRoute)
app.use('/subjects', subjectRoute)



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