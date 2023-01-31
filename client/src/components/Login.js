import React, {useEffect, useState, useRef} from 'react'
import '../style.css'; 
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom'


const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    console.log(from)

    const idRef = useRef()
    const errRef = useRef()

    const [id, setID] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        idRef.current.focus()
    }, [])

    
    useEffect(() => {
        setErrMsg('')
    }, [id, password])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setID('')
        setPassword('')

        try {
            const response = await fetch("/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        "id": id,
                        "password": password
                      }),
                credentials: "include"
            })
            console.log(response)
            if (response.status === 400)
            {
                setErrMsg('Missing ID or Password!')
                errRef.current.focus()
            } else if (response.status === 401)
            {
                setErrMsg('Wrong ID or Password!')
                errRef.current.focus()
            } else {
                const data = await response.json()
                const role = data.role
                console.log(role)
                if (role) {
                    setAuth({id, password, role})
                    return navigate(from, {replace: true}) 
                }
            }
        } catch (err) {
            console.log(err)
        }


    }

    return (
    <div className="wrapper">
        <div className="text-center mt-4 name">
            Login
        </div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
            <p className={errMsg ? "errMsg" : "offScreen"} ref={errRef} aria-live="assertive">{errMsg}</p>
            <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input 
                    type="number" 
                    name="ID" 
                    ref={idRef} 
                    id="id" 
                    placeholder="ID"
                    autoComplete="off"
                    onChange={(e) => setID(e.target.value)}
                    value={id}
                    required
                />
            </div>
            <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input 
                    type="password" 
                    name="password"  
                    id="pwd"
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    value={password}
                />
            </div>
            <button className="btn mt-3">Login</button>
        </form>
    </div>
    );
}

export default Login;