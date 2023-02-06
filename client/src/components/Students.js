import React, {useEffect, useState} from 'react'
import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';
import './Table.css'
import useAuth from "../hooks/useAuth";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'





function ShowAddStudentModal(props)
{
    const [formData, setFormData] = useState({ id: '' });

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const currentPath = window.location.pathname
            const response = await fetch(currentPath+"/addStudent", {
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
                console.log('error: '+ await response.text())
            }
        } catch (err) {
            console.log(err)
        }
        props.fetchData()
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Add new student
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


const StudentsList = () => {
    const [studentsList, setStudentsList] = useState(null)
    const [modalShow, setModalShow] = useState(false);

    function fetchData() 
    {
        const queryString = window.location.search;
        const url = `${window.location.origin}${window.location.pathname}${queryString}`;
    
        fetch(url)
        .then(response => response.json())
        .then(data => setStudentsList(data))
    }

    useEffect(() => {
        fetchData()
    }, [])


    
    //const students = [[1, "Aviel", "Turgeman", 123, "Math"],
    //                   [2, "Israel", "Israeli", 321, "Physics"]]

    const { auth } = useAuth();
    const tblHeaders = ["#", "First Name", "Last Name", "ID"]

    return (
        <div>
            <div>
                <h1>Students List</h1>
                <Table data={studentsList} headers={tblHeaders} />
            </div>
            {
            (auth?.role === 'lecturer') &&
            <div className='row g-4' style={{textAlign: 'right', marginRight: '250px'}}>
                <h1><FaPlusCircle onClick={() => setModalShow(true)} /></h1>
            </div>
            }
            <ShowAddStudentModal show={modalShow} onHide={() => setModalShow(false)} fetchData={fetchData} />

        </div>
    );
}



export default StudentsList;