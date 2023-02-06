import React, {useEffect, useState} from 'react'
import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';
import './Table.css'
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'

function ShowAddGradeModal(props)
    {
        const [formData, setFormData] = useState({ id: '', type: '', grade: '' });

        const handleInputChange = (event) => {
          setFormData({ ...formData, [event.target.name]: event.target.value });
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                const currentPath = window.location.pathname
                const response = await fetch(currentPath+"/addGrade", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            ...formData
                          }),
                    credentials: "include"
                })
                console.log(response)
                if (response.status === 400)
                {
                    console.log('error: something wrong in inputs')
                }
            } catch (err) {
                console.log(err)
            }
        }

        return (
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add new grade
            </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body className="show-grid">
            <Container>
            <Row className='mb-4'>
                <Col className='col-4 my-auto'>
                    <Form.Label>ID</Form.Label>
                </Col>
                <Col className='col-6'>
                    <Form.Control
                        type="number"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        autoFocus
                    />
                </Col>
            </Row>
            <Row className='mb-4'>
                <Col className='col-4 my-auto'>
                    <Form.Label>Type</Form.Label>
                </Col>
                <Col className='col-6'>
                    <Form.Control
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    />
                </Col>
            </Row>
            <Row className='mb-4'>
                <Col className='col-4 my-auto'>
                    <Form.Label>Grade</Form.Label>
                </Col>
                <Col className='col-6'>
                    <Form.Control
                        type="number"
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                    />
                </Col>
            </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <Button variant="primary" type="submit" onClick={props.onHide}>Save Changes</Button>
        </Modal.Footer>
        </Form>
        </Modal>
        )
    }



const StudentsGrades = () => {
    const [studentsGrades, setStudentsGrades] = useState(null)

    //const [queryString] = useState(window.location.search)
    const queryString = window.location.search;
    const url = `${window.location.origin}${window.location.pathname}${queryString}`;
    useEffect(() => {
        fetch(url)
          .then(response => response.json())
          .then(data => setStudentsGrades(data))
          .catch(error => console.error(error));
      }, [url])

    const { auth } = useAuth();
    const tblHeaders = ["#", "First Name", "Last Name", "ID", "Type", "Grade", "Date"]
    const [modalShow, setModalShow] = useState(false);


    return (
        <div>
            <div className='text-center'>
                <h1>Students Grades - {decodeURIComponent(window.location.pathname.split("/").pop())}</h1>
            </div>
            <div className='d-flex justify-content-end'>
                <Link to={"students"}>
                    <button className='btn btn-primary'>Students List</button>
                </Link>
            </div>
            <div>
                <Table data={studentsGrades} headers={tblHeaders} />
            </div>
            {
            (auth?.role === 'lecturer') &&
            
            <div className='g-4' style={{textAlign: 'right', marginRight: '250px'}}>
                <h1><FaPlusCircle onClick={() => setModalShow(true)} /></h1>
            </div>
            }
            <ShowAddGradeModal show={modalShow} onHide={() => setModalShow(false)} />

        </div>
    );
}

export default StudentsGrades;