import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";



const CreateReview = (props) => {

    const [gameTitle, setGameTitle] = useState("");
    const [platforms, setPlatforms] = useState("");
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/new", {
            gameTitle,
            platforms,
            rating,
            comments
        }, {withCredentials: true})

        .then((res)=>{
            console.log(res.data);
            // setGameTitle("");
            // setPlatforms("");
            // setRating("");
            // setComments("");
            navigate("/home");
        })
        .catch((err) =>{
            const loginError = err.response.data.msg;
                if (loginError) {
                    alert(loginError);
                }
            console.log(err.response.data.errors);
            console.log(err)
            const errorResponse = err.response.data.errors;
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            // setErrors(err.response.data.errors);
        });
    }
    

    return(
        <div className="create-container">
            <div className="d-flex justify-content-around align-items-center">
                <ul className="update-nav d-flex justify-content-between align-items-center">
                    <h1 style={{fontFamily:"Rubik"}}>Reviews By Gamers</h1>
                    <li className="nav-item"><a className="update-home-btn d-flex" href="/home">Home</a></li>
                    {/* <li className="nav-item"><a href="/logout">Sign Out</a></li> */}
                </ul>
            </div>
            <div className="form-container mt-3 p-5 mb-2 w-75 mx-auto rounded-3">
                <h2 className="text-center">Share your thoughts with others</h2>
                <div className="container-fluid py-5">
                    <form className="d-flex flex-column align-items-center"onSubmit={submitHandler}>
                    {errors.map((err, index) => (
                    <p className="errors text-danger" key={index}>{err}</p>
                    ))}
                        <div className="row">
                            <div className='col'>
                                <label className="form-label" >Game Title:</label>
                                <input onChange={(e) => setGameTitle(e.target.value)} 
                                // value={gameTitle}
                                name="gameTitle"
                                type="text" 
                                className="form-control"/>
                                { errors.gameTitle ? 
                                    <p>{errors.gameTitle.message}</p>
                                    : null
                                }
                            </div>
                            <div className="col mb-5">
                                <label className="form-label">Platform(s):</label>
                                <input 
                                onChange={(e) => setPlatforms(e.target.value)} 
                                value={platforms}
                                name="platforms"
                                type="text" 
                                className="form-control"/>
                                { errors.platforms ? 
                                <p>{errors.platforms.message}</p>
                                : null
                                }
                            </div>
                        </div>
                        
                        <div className="rating-container d-flex flex-column justify-content-center align-items-center mb-3">
                            <label className="form-label" htmlFor="rating">Rating: </label>
                            <select className="form-select w-auto" name="rating" onChange={(e) => setRating(e.target.value)} >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                            { errors.rating ? 
                        <p>{errors.rating.message}</p>
                        : null
                    }
                        </div>
                        <div className='comment-section mb-4'>
                            <div className="mb-3">
                                <label className="form-label">Comment(s):</label>
                                <textarea
                                onChange={(e) => setComments(e.target.value)} 
                                value={comments}
                                name="comments"
                                type="text" 
                                className="form-control"
                                rows="3"></textarea>
                                { errors.comments ? 
                        <p>{errors.comments.message}</p>
                        : null
                        }
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateReview;