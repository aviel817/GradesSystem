const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const isAuth = require('../middleware/isAuth')
const User = require("../models/User")
const Subject = require("../models/Subject")
const Grade = require("../models/Grade")


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


/**
 * Show relevant subjects
 */
router.get('/', isAuth, async (req, res) => {
    const userID = req.session.userID
    const subjectsIDSList = await getSubjects(userID)
    const subjectsList = await getSubjectsName(subjectsIDSList)

    res.send(JSON.stringify(subjectsList))
})


router.get('/:name', isAuth, async (req, res) => {
    const user_id = req.session.userID
    const userObj = await User.findById(mongoose.Types.ObjectId(user_id))
    if (!userObj)
    {
        return res.status(403).send('user not found')
    }
    const subjectName = req.params.name
    const subjectObj = await Subject.findOne({name: subjectName})
    if (!subjectObj)
    {
        return res.status(400).send('invalid subject')
    }
    let grades = ''
    if (userObj.role === 'student')
    {
        grades = await Grade.find({subjectID: subjectObj._id, userID: userObj.ID})
    }
    else {
        grades = await Grade.find({subjectID: subjectObj._id})
    }
    if (!grades)
    {
        return res.status(400).send() 
    }
    const gradesTblInfo = await Promise.all(grades.map(async (grade, i) => {
        let user = await User.findOne({ID: grade.userID})
        if (!user)
        {
            return {}
        }
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
    
})


router.get('/:name/students', isAuth, async (req, res) => {
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

router.post('/:name/addGrade', isAuth, async (req, res) => {
    const id = req.body.id
    const type = req.body.type
    const gradeValue = req.body.grade
    const subjectName = req.params.name

    if (id === '' || type === '' || gradeValue === '')
    {
        return res.status(400).send('empty input')
    }
    if (gradeValue > 100 || gradeValue < 0)
    {
        return res.status(400).send('invalid grade value')
    }

    const user = await User.findOne({ID: id})
    if (!user)
    {
        return res.status(400).send('wrong user id')
    }

    const subjectObj = await Subject.findOne({name: subjectName})
    if (!subjectObj)
    {
        return res.status(400).send("invalid subject")
    }

    const checkExistingGrade = await Grade.findOne({userID: id, type: type})
    if (checkExistingGrade)
    {
        return res.status(400).send("The user already have grade for this type")
    }

    let date = new Date();
    let formattedDate = date.toLocaleDateString('en-gb', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });

    const newGrade = {
        userID: id,
        subjectID: subjectObj._id,
        type: type,
        grade: gradeValue,
        date: formattedDate
    }
    Grade.create(newGrade, (err) => { console.log(err); })
    res.status(200).send('added grade successfuly')
})

router.post('/:name/deleteGrade', isAuth, async (req, res) => {
    const id = req.body.id
    const type = req.body.type
    const subjectName = req.params.name

    if (id === '' || type === '')
    {
        return res.status(400).send('empty input')
    }

    const user = await User.findOne({ID: id})
    if (!user)
    {
        return res.status(400).send('wrong user id')
    }

    const subjectObj = await Subject.findOne({name: subjectName})
    if (!subjectObj)
    {
        return res.status(400).send("invalid subject")
    }

    const checkExistingGrade = await Grade.findOne({userID: id, type: type})

    if (!checkExistingGrade)
    {
        return res.status(400).send("The user doesn't have grade for this type")
    }


    await Grade.deleteOne({userID: id, type: type});

    res.status(200).send('Deleted grade successfuly')
})

router.post('/:name/students/addStudent', isAuth, async (req, res) => {
    const id = req.body.id
    const subjectName = req.params.name

    if (id === '')
    {
        return res.status(400).send('empty input')
    }

    const user = await User.findOne({ID: id})
    if (!user)
    {
        return res.status(400).send('wrong user id')
    }
    
    const subjectObj = await Subject.findOne({name: subjectName})
    if (!subjectObj)
    {
        return res.status(400).send("invalid subject")
    }

    const isAlreadyAssigned = await User.findOne({ID: id, subjects: {$in: [subjectObj._id]}})
    if (isAlreadyAssigned)
    {
        return res.status(400).send('Student already assigned')
    }
    await User.updateOne({ ID: id },
                         { $push: {subjects: subjectObj._id} })
    res.status(200).send('Added student successfuly')
})

router.post('/:name/students/deleteStudent', isAuth, async (req, res) => {
    const id = req.body.id
    const subjectName = req.params.name

    if (id === '')
    {
        return res.status(400).send('empty input')
    }

    const user = await User.findOne({ID: id})
    if (!user)
    {
        return res.status(400).send('wrong user id')
    }
    
    const subjectObj = await Subject.findOne({name: subjectName})
    if (!subjectObj)
    {
        return res.status(400).send("invalid subject")
    }

    const isAlreadyAssigned = await User.findOne({ID: id, subjects: {$in: [subjectObj._id]}})
    if (!isAlreadyAssigned)
    {
        return res.status(400).send("Student isn't assigned")
    }

    await User.updateOne({ ID: id },
                         { $pull: {subjects: subjectObj._id} })
    res.status(200).send('Student deleted from the course successfuly')
})



module.exports = router;