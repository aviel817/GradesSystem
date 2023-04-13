# Grades System

The grades system is an online platform that facilitates lecturers in uploading and managing student grades while also granting students access to view their grades for various courses. The platform operates as a web application.

## Features

- The Grades System provides secure access for both lecturers and students, ensuring that only authorized users can view sensitive grade data.
- The user-friendly dashboard makes it easy for both lecturers and students to navigate the platform and manage grades efficiently, without the need for extensive technical knowledge or training.
- Lecturers can easily upload and manage grades for different courses, with the ability to add grades for individual assignments or exams. Additionally, they can delete grades if necessary, helping to ensure that grade data remains accurate and up-to-date.
- Lecturers can view a list of students in a particular course and assign or remove students from that list, making it easier to manage student records and grades for different courses.
- With the ability to search for grades by student ID, lecturers can quickly locate specific grade data and analyze student performance with greater ease and efficiency.


## Technologies

The Grades System uses the following technologies:

- Node.js
- React
- Express
- Mongoose
- Bootstrap


## Installation

Grades System requires [Node.js](https://nodejs.org/) v14+ to run.
It also requires [MongoDB](https://www.mongodb.com/) database.

The config file "secrets.json" structure is:
```sh
{
    "dbURL":"mongodb+srv://...",
    "cookieSecret": "..."
}
```

Install the dependencies both on server and client and start the server.
For example:
```sh
cd server
npm i
npm start
```

## Screenshots
![Login](https://i.imgur.com/WwH48QL.png)
![Subjects](https://i.imgur.com/ya365Ru.png)
![StudentsList1](https://i.imgur.com/h9EMccT.png)
![StudentsList2](https://i.imgur.com/aunTu2t.png)
![StudentsGrades1](https://i.imgur.com/nmbuUyT.png)
![StudentsGrades2](https://i.imgur.com/s3GoSIx.png)
