import React from 'react'
import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';

const StudentsGrades = () => {
    const gradesTbl = [[1, "Aviel", "Turgeman", 123, "HW1", 100, "23/12/2022"],
                       [2, "Israel", "Israeli", 321, "HW2", 20, "23/12/2022"]]

    const tblHeaders = ["#", "First Name", "Last Name", "ID", "Type", "Grade", "Date"]
    return (
        <div>
            <div>
                <h1>Students Grades - subject</h1>
                <Table data={gradesTbl} headers={tblHeaders} />
            </div>
            <div className='row g-4' style={{textAlign: 'right', marginRight: '250px'}}>
                <h1><FaPlusCircle /></h1>
            </div>
        </div>
    );
}

export default StudentsGrades;