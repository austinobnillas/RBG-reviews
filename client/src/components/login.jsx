import React, {useState} from "react";
import '.Login.css';
import axios from 'axios'

const Login = () => {
    const {username, setUsername} = useState('');
    const {password, setPassword} = useState('');
    const {errors, setErrors} = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/login", {
            username,
            password
        })
        .then(res=>console.log(res)) 
        .catch(err=>{
            const errorResponse = err.response.data.errors; 
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
            };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            {errors.map((err, index) => (
                    <p key="{index}">{err}</p>
                ))}
            <div>
                <p>
                <label>Username</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
                </p>
            </div>
            <div>
                <p>
                <label>Password</label>
                <input type="text" onChange={(e) => setPassword(e.target.value)} />
                </p>
            </div>    
            <div>
                <button type="submit">Login</button>
            </div>
            </form>

        </div>
    );
}

export default Login;