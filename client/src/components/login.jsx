import React, {useState} from "react";
// import '.Login.css';
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/login", {username, password}, {withCredentials: true})
        .then((res) => {
            navigate('/')
        }) 
        .catch((err)=>{
            alert(err.response.data.msg)
            console.log(err);
            // const errorResponse = err.response.data.errors; 
            // const errorArr = [];
            // for (const key of Object.keys(errorResponse)) {
            //     errorArr.push(errorResponse[key].message)
            // }
            // setErrors(errorArr);
        })
            };

    return (
        <>
            <div className="login-bg split left">
                {/* <div className="login-bg"> */}
                    <div className="centered text-white">
                        <h1>Reviews By Gamers</h1>
                        <p>Real reviews, by gamers like you.</p>
                    {/* </div> */}
                </div>
            </div>
            <div className="login-container split right">
                <div className="centered">
                    <h1 style={{fontFamily:"Rubik"}}>RGB</h1>
                    <h2 className="mb-4 mt-4">Welcome Back!</h2>
                    <form onSubmit={handleSubmit}>
                    {/* {errors.map((err, index) => (
                            <p key="{index}">{err}</p>
                        ))} */}
                    <div>
                        <p>
                        <label className="form-label d-flex">Username</label>
                        <input className="form-control" type="text" onChange={(e) => setUsername(e.target.value)} />
                        </p>
                    </div>
                    <div>
                        <p>
                        <label className="form-label d-flex">Password</label>
                        <input className="form-control" type="text" onChange={(e) => setPassword(e.target.value)} />
                        </p>
                    </div>    
                    <div className="mb-4">
                        <button className="login-btn btn btn-dark text-white" type="submit">Login</button>
                    </div>
                    </form>
                    <div><p>New to the Community? <Link to={'/register'}>Sign Up</Link></p></div>
                </div>
            </div>
        </>
    );
}

export default Login;