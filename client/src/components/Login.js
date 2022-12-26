import React from 'react'
import '../style.css'; 


const Login = () => {


    return (

<div class="wrapper">
    <div class="text-center mt-4 name">
        Login
    </div>
    <form class="p-3 mt-3">
        <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>
            <input type="number" name="ID" id="id" placeholder="ID"/>
        </div>
        <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input type="password" name="password" id="pwd" placeholder="Password"/>
        </div>
        <button class="btn mt-3">Login</button>
    </form>
</div>
    );
}

export default Login;