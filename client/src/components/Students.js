import React, {useEffect, useState} from 'react'
import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';
import './Table.css'

const StudentsList = () => {
    const [studentsList, setStudentsList] = useState(null)
    const queryString = window.location.search;
    const url = `${window.location.origin}${window.location.pathname}${queryString}`;
    useEffect(() => {
      fetch(url)
      .then(response => response.json())
      .then(data => setStudentsList(data))
    }, [])
    
    //const students = [[1, "Aviel", "Turgeman", 123, "Math"],
    //                   [2, "Israel", "Israeli", 321, "Physics"]]

    const tblHeaders = ["#", "First Name", "Last Name", "ID"]
    return (
        <div>
            <div>
                <h1>Students List</h1>
                <Table data={studentsList} headers={tblHeaders} />
            </div>
            <div className='row g-4' style={{textAlign: 'right', marginRight: '250px'}}>
                <h1><FaPlusCircle /></h1>
            </div>
        </div>
    );
}

export default StudentsList;