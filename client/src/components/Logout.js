import React, {useEffect, useState, useRef} from 'react'
import '../style.css'; 
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom'


const Logout = async () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const [loggedOff, setLoggedOff] = useState(false)

    useEffect(() => {
        if (loggedOff === true)
        {
            console.log("redirected")
            navigate("/");
        }
    }, [loggedOff])

    try {
        const response = await fetch("/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        console.log(response)
        if (response.status === 200)
        {
            console.log("logged out")
            setAuth({});
            setLoggedOff(true);
        }
        else
        {
            console.log("error")
        }
    } catch (err) {
        console.log(err)
    }

 
}

export default Logout;