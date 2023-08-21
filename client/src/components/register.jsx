import React, { useState } from  'react';
import ('.Register.css')
import axios from 'axios'
    
const UserForm = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const {errors, setErrors} = useState([]);
    
    const createUser = (e) => {

        e.preventDefault();

        axios.post("http://localhost:8000/api/register",{
            username,
            email,
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

        const newUser = { username, email, password };
        console.log("Welcome", newUser);
    	setUsername("");
    	setEmail("");
    	setPassword("");
    };
    
    return(
        <form onSubmit={ createUser }>
                    {errors.map((err, index) => (
                    <p key="{index}">{err}</p>
                ))}
            <div>
                <label>Username: </label> 
                <input type="text" value={username} onChange={ (e) => setUsername(e.target.value) } />
            </div>
            <div>
                <label>Email Address: </label> 
                <input type="text" value={email} onChange={ (e) => setEmail(e.target.value) } />
            </div>
            <div>
                <label>Password: </label>
                <input type="text" value={password} onChange={ (e) => setPassword(e.target.value) } />
            </div>
            <input type="submit" value="Create User" />
        </form>
    );
};
    
export default UserForm;
