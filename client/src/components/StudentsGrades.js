import React, {useEffect, useState} from 'react'
import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';

const StudentsGrades = () => {
    const [studentsGrades, setStudentsGrades] = useState(null)

    //const [queryString] = useState(window.location.search)

    useEffect(() => {
        const queryString = window.location.search;
        const url = `${window.location.origin}${window.location.pathname}${queryString}`;
        fetch(url)
          .then(response => response.json())
          .then(data => setStudentsGrades(data))
          .catch(error => console.error(error));
      }, [])

    const tblHeaders = ["#", "First Name", "Last Name", "ID", "Type", "Grade", "Date"]
    return (
        <div>
            <div>
                <h1>Students Grades - subject</h1>
                <Table data={studentsGrades} headers={tblHeaders} />
            </div>
            <div className='row g-4' style={{textAlign: 'right', marginRight: '250px'}}>
                <h1><FaPlusCircle /></h1>
            </div>
        </div>
    );
}

export default StudentsGrades;