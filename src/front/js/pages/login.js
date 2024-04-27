import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [error, setError] = useState("");
        const navigate = useNavigate();
        

        const onSubmit = async (e) => {
          e.preventDefault();
            if (email === '' || password === '') {
              alert(' Email or password should not be empty')
            }else {
              // fetching data from the backend
                fetch(process.env.BACKEND_URL + "/api/log-in", {
                  method: 'POST',
                  body: JSON.stringify({
                    'email': email,
                    'password': password
                  }),
                  headers: {"Content-Type": "application/json"},

                }).then((res) => res.json())
                .then((resAsJson) => {
                  console.log('Response from Backend', resAsJson);
                  localStorage.setItem('jwt-token', resAsJson.token)
                  navigate('/')

                }).catch((err) => {
                  console.error('Something wrong when calling API', err)
                })
                   }
            }
            
             
        return (
          
        <div className="container">
          <form className="form">
            <div className="form-group">
            <label className="label1" htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            placeholder="Enter email" 
            value= {email} 
          onChange={(e) => setEmail(e.target.value)}
          />
         
        </div>
        <div className="form-group">
          <label className="labe2" htmlFor="exampleInputPassword1">Password</label>
          <input type="password" 
          className="form-control" 
          id="exampleInputPassword1" 
          placeholder="Password" 
          value= {password} 
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" 
        className="btn btn-primary"
        onClick= {onSubmit}
        >Submit</button>
      </form>
        </div>)
        
} 
          

export default Login