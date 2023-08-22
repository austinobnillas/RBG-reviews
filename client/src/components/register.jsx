import React, { useState } from  'react';
// import ('.Register.css')
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

    
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
        <>
            <div className="reg-bg split reg-left">
                <div className="centered text-white">
                    <h1 style={{fontFamily:"Rubik", fontWeight:"800", fontSize:"35px"}}>Reviews By Gamers</h1>
                    <p style={{fontFamily:"DM Sans", fontWeight:"300", fontSize:"20px"}}>Register now to get started</p>
                </div>
            </div>
            <div className="split reg-right">
                <div className="centered text-white">
                    <h1 style={{fontFamily:"Rubik", fontWeight:"800"}}>RBG</h1>
                    <h3 className='mb-4 mt-4'>Register | <Link to={'/'} className='text-decoration-none' style={{color:"#697A98"}}>Log In</Link ></h3>
                    <div className="reg-container">
                        <form onSubmit={ createUser }>
                                {errors.map((err, index) => (
                                    <p key="{index}">{err}</p>
                                ))}
                            <div className='mb-4'>
                                <label className="form-label d-flex" htmlFor="username" >Username </label> 
                                <input className="reg-input form-control" type="text" name="username" onChange={ (e) => setUsername(e.target.value) } />
                            </div>
                            <div className='mb-4'>
                                <label className="form-label d-flex" htmlFor="email">Email</label> 
                                <input className="form-control" type="text" name="email" onChange={ (e) => setEmail(e.target.value) } />
                            </div>
                            <div className='row g-3 mb-4 d-flex flex-row'>
                                <div className='col d-flex flex-column'>
                                    <label className="form-label d-flex" htmlFor="password">Password </label>
                                    <input className="form-control" type="password" name="password" onChange={ (e) => setPassword(e.target.value) } />
                                </div>
                                <div className='col mb-3'>
                                    <label className="form-label d-flex" htmlFor="confirmPassword" >Confirm Password </label>
                                    <input className="form-control" type="password" name="confirmPassword" onChange={ (e) => setConfirmPassword(e.target.value) } />
                                </div>
                            </div>
                            <div>
                                <input className="sign-up-btn mb-3" type="submit" value="Sign Up" />
                                {/* <p>Already a User?<Link to={'/'} className='text-decoration-none text-secondary' >Log In</Link ></p> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
        </>
    );
};
    
export default UserForm;
