import React from 'react'
import Table from './Table';
import { FaPlusCircle } from 'react-icons/fa';
import {useEffect, useState, useRef} from 'react'

const StudentsList = () => {
    
    const students = [[1, "Aviel", "Turgeman", 123, "Math"],
    [2, "Israel", "Israeli", 321, "Physics"]]

    const openPopupButtons = document.querySelectorAll('[data-popup-target]')
    const closePopupButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')
    
    openPopupButtons.forEach(button => {
        console.log("open popup2")
        button.addEventListener('click', () =>{
        const popup = document.querySelector(button.dataset.popupTarget)
        openPopup(popup)  
        })   
    })
        
    function openPopup(popup){
        console.log("open popup")
        if(popup == null) return
        popup.classList.add('active')
        overlay.classList.add('active')
    }
    
    closePopupButtons.forEach(button => {
        console.log("close popup2")
        button.addEventListener('click', () =>{
        const popup = button.closet('.popup')
        closePopup(popup)  
        })   
    })
    
    function closePopup(popup){
        console.log("close popup")
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

    const tblHeaders = ["#", "First Name", "Last Name", "ID", "Courses"]
    return (
        <div>
            <div>
                <h1>Students List</h1>
                <Table data={students} headers={tblHeaders} />
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