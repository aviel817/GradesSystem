import React, {useEffect, useState} from 'react'
import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';
import './Table.css'
import { Link } from 'react-router-dom'

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
      }, [])

    const tblHeaders = ["#", "First Name", "Last Name", "ID", "Type", "Grade", "Date"]
    
    const openPopupButtons = document.querySelectorAll('[data-popup-target]')
    const closePopupButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')
    
    openPopupButtons.forEach(button => {
        button.addEventListener('click', () =>{
        const popup = document.querySelector(button.dataset.popupTarget)
        openPopup(popup)  
        })   
    })
        
    function openPopup(popup){
        if(popup == null) return
        popup.classList.add('active')
        overlay.classList.add('active')
    }
    
    closePopupButtons.forEach(button => {
        button.addEventListener('click', () =>{
        const popup = button.closet('.popup')
        closePopup(popup)  
        })
    })
    
    function closePopup(popup){
        console.log("need to close")
        if(popup == null) return
        popup.classList.remove('active')
        overlay.classList.remove('active')
    }
    
    overlay.addEventListener('click', () => {
        const popups =document.querySelectorAll('.popup.active')
        popups.forEach(popup => {
            closePopup(popup)
        })
    })
    
    return (
        <div>
            <div className='text-center'>
                <h1>Students Grades - subject</h1>
            </div>
            <div className='d-flex justify-content-end'>
                <Link to={"students"}>
                    <button className='btn btn-primary'>Students List</button>
                </Link>
            </div>
            <div>
                <Table data={studentsGrades} headers={tblHeaders} />
            </div>
            <button data-popup-target="#popup">click!</button>
            <div class="popup" id="popup">
                <div class = "popup-header">
                    <div class = "title">Add Grade</div>
                </div>
                <div class = "popup-body">
                    <p>Please enter all fields: 
                        <input type="text" name="id" id="id" ></input>
                        <input type="text" name="type" id="type" ></input>
                        <input type="text" name="score" id="score" ></input>
                        </p>
                    <button data-close-button class="close-button">add score </button>
                </div>  
            <div id = "overlay"></div>
         </div>
            <div className='row g-4' style={{textAlign: 'right', marginRight: '250px'}}>
                <h1><FaPlusCircle /></h1>
            </div>
        </div>
    );
}

export default StudentsGrades;