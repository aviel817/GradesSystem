const express = require("express")
const mongoose = require("mongoose")
const app = express()
const secrets = require('./.secrets')
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
function getSubjects(userID)
{
    return User.findById(userID).then((user) => user.subjects)
}

function getSubjectsName(subjectIDS)
{
    const subjectNames = subjectIDS.map(async (id, i) => {
        return Subject.findById(id).then((subject) => subject.name)
    })
    return Promise.all(subjectNames)
}

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

const isAuth = (req, res, next) => {
    if (!req.session.isAuth)
    {
        return res.status(400).send()
    }
    next()
  };

const reqLogin = (req, res, next) => {
    if (req.session.isAuth)
    {
        return res.status(400).send()
    }
    next()
};


/**
 * Show relevant subjects
 */
app.get('/subjects', isAuth, async (req, res) => {
    const userID = req.session.userID
    const subjectsIDSList = await getSubjects(userID)
    const subjectsList = await getSubjectsName(subjectsIDSList)

    res.send(JSON.stringify(subjectsList))
})

app.get('/subjects/:name', isAuth, async (req, res) => {
    const userID = req.session.userID
    const subjectName = req.params.name
    const subjectObj = await Subject.findOne({name: subjectName})
    if (subjectObj)
    {
        const grades = await Grade.find({subjectID: subjectObj._id})

        const gradesTblInfo = await Promise.all(grades.map(async (grade, i) => {
            let user = await User.findOne({ID: grade.userID})

            let gradeTblInfo =  {
                                    "#": i+1,
                                    "First Name": user.firstName,
                                    "Last Name": user.lastName,
                                    ID: user.ID,
                                    Type: grade.type,
                                    Grade: grade.grade,
                                    Date: grade.date
                                }
            return gradeTblInfo
        }))
        
        res.status(200).send(JSON.stringify(gradesTblInfo))
    }

    res.status(400).send()
})

app.get('/subjects/:name/students', isAuth, async (req, res) => {
    const userID = req.session.userID
    const subjectName = req.params.name
    const subjectObj = await Subject.findOne({name: subjectName})
    if (subjectObj)
    {
        const users = await User.find({subjects: subjectObj._id})
        const studentsList = users.map((user, i) => {
            let studentInfo = {
                                "#": i+1, 
                                "First Name": user.firstName, 
                                "Last Name": user.lastName, 
                                "ID": user.ID
                              }
            return studentInfo
        })
        
        
        res.status(200).send(JSON.stringify(studentsList))
    }

    res.status(400).send()
})

app.get('/login', reqLogin, (req, res) => {
    res.status(200).send()
  });

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.status(200).send()
    });
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
    res.status(200).send({role: "lecturer"})
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