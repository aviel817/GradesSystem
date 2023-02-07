import React, {useEffect, useState} from 'react'
import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';
import './Table.css'
import './validation.css'
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
        const [errMsg, setErrMsg] = useState('')
        const {fetchData, ...restProps} = props 

        const handleInputChange = (event) => {
          setFormData({ ...formData, [event.target.name]: event.target.value });
        };

        useEffect(() => {
            setErrMsg('')
        }, [formData])

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
                    setErrMsg('error: '+ await response.text())
                    //console.log('error: something wrong in inputs')
                }
                else
                {
                    props.onHide()
                }
            } catch (err) {
                console.log(err)
            }
            fetchData()
        }

        return (
            <Modal {...restProps} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add new grade
            </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body className="show-grid">
            <Container>
            <Row>
                {errMsg && (
                    <p className="error">{errMsg}</p>
                )}
            </Row>
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
                        required
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
                        required
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
                        required
                    />
                </Col>
            </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
        </Modal.Footer>
        </Form>
        </Modal>
        )
    }


const StudentsGrades = () => {
    const [studentsGrades, setStudentsGrades] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const [sucMsg, setSucMsg] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setSucMsg('');
          }, 3000);
    }, [sucMsg])

    
    function fetchData() 
    {
        const queryString = window.location.search;
        const url = `${window.location.origin}${window.location.pathname}${queryString}`;
    
        fetch(url)
        .then(response => response.json())
        .then(data => setStudentsGrades(data))
    }

    useEffect(() => {
            fetchData()
      }, [])

    const { auth } = useAuth();
    const tblHeaders = ["#", "First Name", "Last Name", "ID", "Type", "Grade", "Date"]


    return (
        <div>
            <div>
                <p className={sucMsg ? "success" : "success-hidden"}>{sucMsg}</p>
            </div>
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
            <ShowAddGradeModal show={modalShow} onHide={() => setModalShow(false)} fetchData={fetchData} />

        </div>
    );
}

export default StudentsGrades;