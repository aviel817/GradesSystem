import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaPlusCircle } from 'react-icons/fa';


const Subjects = () => {

    const subjectsList = ["Math", "Bible", "English", "Literature", "Physics", "Science"]

    return (
        <div>
        <div className='row row-cols-4 g-4' style={{margin: '40px' }}>
            { subjectsList.map((subject, i) => {
                    return (
                    <div className='col'>
                    <Card style={{ width: '18rem'}}>
                        <Card.Body>
                        <Card.Title>{subject}</Card.Title>
                        {/*<Card.Text>
                        </Card.Text>*/}
                        <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    </div>
                    )
            })
            }
      </div>
        <div className='row g-4' style={{textAlign: 'right', marginRight: '250px'}}>
           <h1><FaPlusCircle /></h1>
        </div>
      </div>
    );
}

export default Subjects;