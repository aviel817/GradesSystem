import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';
import React, {useEffect, useState} from 'react'

const StudentsList = () => {

    const [studentsList, setStudentsList] = useState(null)
    const queryString = window.location.search;
    const url = `${window.location.origin}${window.location.pathname}${queryString}`;
    useEffect(() => {
      fetch(url)
      .then(response => response.json())
      .then(data => setStudentsList(data))
    }, [])

    const tblHeaders = ["#", "First Name", "Last Name", "ID"]
 
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
            <div>
                <h1>Students List</h1>
                <Table data={studentsList} headers={tblHeaders} />
            </div>
            {/* <div className='row g-4' style={{textAlign: 'right', marginRight: '250px'}} onClick = "myFunction()"> */}
            {/* <div onClick={handleClick} className='row g-4' style={{textAlign: 'right', marginRight: '250px'}}> */}
                {/* <h1><FaPlusCircle /></h1> */}
            <button data-popup-target="#popup">click!</button>
            <div class="popup" id="popup">
                <div class = "popup-header">
                    <div class = "title">Add Student</div>
                </div>
                <div class = "popup-body">
                    <p>Please Enter Student Id: <input type="text" name="id" id="id" ></input></p>
                    <button data-close-button class="close-button">add </button>
                </div>  
            <div id = "overlay"></div>
         </div>
         </div>
    );
}

export default StudentsList;