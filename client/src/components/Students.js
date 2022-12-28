import React from 'react'
import Table from './Table';


const StudentsList = () => {
    const students = [[1, "Aviel", "Turgeman", 123, "Math"],
                       [2, "Israel", "Israeli", 321, "Physics"]]

    const tblHeaders = ["#", "First Name", "Last Name", "ID", "Courses"]
    return (
        <div>
            <h1>Students List</h1>
            <Table data={students} headers={tblHeaders} />
        </div>
    );
}

export default StudentsList;