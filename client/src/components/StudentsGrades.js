import React from 'react'
import Table from './Table';


const StudentsGrades = () => {
    const gradesTbl = [[1, "Aviel", "Turgeman", 123, "General", 100, "23/12/2022"],
                       [2, "Israel", "Israeli", 321, "General", 20, "23/12/2022"]]

    const tblHeaders = ["#", "First Name", "Last Name", "ID", "Subject", "Grade", "Date"]
    return (
        <div>
            <h1>Students Grades</h1>
            <Table data={gradesTbl} headers={tblHeaders} />
        </div>
    );
}

export default StudentsGrades;