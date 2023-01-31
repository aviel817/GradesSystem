import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'


const Subjects = () => {

    const [subjectsList, setSubjectsList] = useState(null)
  
    useEffect(() => {
      fetch("/subjects")
      .then(response => response.json())
      .then(data => setSubjectsList(data))
    }, [])

    return (
        <div>
        <div className='row row-cols-4 g-4' style={{margin: '40px' }}>
            { !(subjectsList) ? "Loading" : subjectsList.map((subject, i) => {
                    return (
                    <div className='col' key={i}>
                    <Card style={{ width: '18rem'}}>
                        <Card.Body>
                        <Card.Title>{subject}</Card.Title>
                        {/*<Card.Text>
                        </Card.Text>*/}
                        <Link to={"/subjects/"+subject}>
                                <Button variant="primary">Grades</Button>
                        </Link>

                        </Card.Body>
                    </Card>
                    </div>
                    )
            })
            }
      </div>

      </div>
    );
}

export default Subjects;