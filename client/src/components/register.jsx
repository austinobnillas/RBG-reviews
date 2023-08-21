import React, { useState } from  'react';
// import ('.Register.css')
import { useNavigate } from "react-router-dom";
import axios from 'axios'
    
const UserForm = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    
    const createUser = (e) => {

        e.preventDefault();

        axios.post("http://localhost:8000/api/register", {username, email, password, confirmPassword}, {withCredentials: true})
            .then((res) => {
                navigate('/');
            })
        .catch((err) => {
            const errorResponse = err.response.data.errors; 
            const errorMsg = err.response.data.msg
            if (errorMsg) {
                alert(errorMsg)
            }
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
        // const newUser = { username, email, password };
        // console.log("Welcome", newUser);
        // setUsername("");
        // setEmail("");
        // setPassword("");
    };
    
    return(
        <form onSubmit={ createUser }>
                {errors.map((err, index) => (
                    <p key="{index}">{err}</p>
                ))}
            <div>
                <label htmlFor="username" >Username: </label> 
                <input type="text" name="username" onChange={ (e) => setUsername(e.target.value) } />
            </div>
            <div>
                <label htmlFor="email">Email Address: </label> 
                <input type="text" name="email" onChange={ (e) => setEmail(e.target.value) } />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" onChange={ (e) => setPassword(e.target.value) } />
            </div>
            <div>
                <label htmlFor="confirmPassword" >Confirm Password: </label>
                <input type="password" name="confirmPassword" onChange={ (e) => setConfirmPassword(e.target.value) } />
            </div>
            <input type="submit" value="Create User" />
        </form>
    );
};
    
export default UserForm;
