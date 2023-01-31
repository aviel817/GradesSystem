import React from 'react'
import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';


const StudentsList = () => {
    const students = [[1, "Aviel", "Turgeman", 123, "Math"],
                       [2, "Israel", "Israeli", 321, "Physics"]]

    const tblHeaders = ["#", "First Name", "Last Name", "ID", "Courses"]
    return (
        <div>
            <div>
                <h1>Students List</h1>
                <Table data={students} headers={tblHeaders} />
            </div>
            <div className='row g-4' style={{textAlign: 'right', marginRight: '250px'}}>
                <h1><FaPlusCircle /></h1>
            </div>
        </div>
    );
}

export default StudentsList;