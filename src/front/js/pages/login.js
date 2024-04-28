import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const onSubmit = async () => {
        if(email === '' || password === '') {
            alert('Email or Password should not be empty!')
        } else {
            fetch(process.env.BACKEND_URL + "/api/log-in", {
                method: 'POST',
                body: JSON.stringify({
                    'email': email,
                    'password': password
                }),
                headers: { "Content-Type": "application/json" },
            }).then((res) => res.json())
            .then((resAsJson) => {
                console.log(' Response From Backend', resAsJson);
                localStorage.setItem('jwt-token', resAsJson.token)
                navigate('/')
            }).catch((err) => {
                console.error('Something Wrong when calling API', err)
            })
        }
    }


    return (
        <div className='container'>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
        </div>
    )
}

export default Login