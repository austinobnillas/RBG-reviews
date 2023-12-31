import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";



const UpdateReview = (props) => {

    const {id} = useParams();

    const [revGameTitle, setRevGameTitle] = useState("");
    const [creator, setCreator] = useState('');
    const [revPlatforms, setRevPlatforms] = useState("");
    const [revRating, setRevRating] = useState("");
    const [revComments, setRevComments] = useState("");
    const [errors, setErrors] = useState([]);
    // console.log(`http://localhost:8000/api/edit/${id}`);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/reviews/${id}`)
        .then((res) =>{
            console.log(res.data);
            setRevGameTitle(res.data.gameTitle);
            setCreator(res.data.creator)
            setRevPlatforms(res.data.platforms);
            setRevRating(res.data.rating);
            setRevComments(res.data.comments);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const submitHandler = (e) =>{
        e.preventDefault();

        axios.patch(`http://localhost:8000/api/edit/${id}`, {
            gameTitle: revGameTitle,
            creator: creator,
            platforms: revPlatforms,
            rating: revRating,
            comments: revComments
        }, {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
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
            // console.log(err.response.data.errors);
            // setErrors(err.response.data.errors);
        });
    }



    return(
        <div className="update-container">
            <div className="d-flex justify-content-between align-items-center text-white">
                <ul className="update-nav d-flex justify-content-between align-items-center">
                    <h1 className="text-white"style={{fontFamily: "Rubik"}}>Reviews By Gamers</h1>
                    <li className=""><a className='update-home-btn d-flex' href="/home">Home</a></li>
                    {/* <li className="nav-item"><a href="#">Sign Out</a></li> */}
                </ul>
            </div>
            <div className="form-container p-5 mt-4 w-75 mx-auto rounded-3">
                <h2 className="text-center">Edit Review</h2>
                <div className="container-fluid py-5">
                    <form className='d-flex flex-column align-items-center' onSubmit={submitHandler}>
                    {errors.map((err, index) => (
                    <p className="errors" key={index}>{err}</p>
                ))}
                        <div className="row d-flex justify-content-around">
                            <div className='col'>
                                <label className="form-label" >Game Title:</label>
                                <input 
                                onChange={(e) => setRevGameTitle(e.target.value)} 
                                value={revGameTitle}
                                name="revGameTitle"
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
                                onChange={(e) => setRevPlatforms(e.target.value)} 
                                value={revPlatforms}
                                name="revPlatforms"
                                type="text" 
                                className="form-control"/>
                                { errors.platforms ? 
                        <p>{errors.platforms.message}</p>
                        : null
                    }
                            </div>
                        </div>
                        <div className="rating-container d-flex flex-column justify-content-center align-items-center mb-3">
                            <label htmlFor='revRating' className='form-label'>Rating</label>
                            <select
                            className="form-select w-auto"
                            onChange={(e) => setRevRating(e.target.value)} 
                                value={revRating}
                                name="revRating"
                            >
                                <option selected>Rating:(1-10)</option>
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
                        <div>
                            <div className="comment-section mb-3">
                                <label className="form-label">Comment(s):</label>
                                <textarea
                                onChange={(e) => setRevComments(e.target.value)} 
                                value={revComments}
                                name="revComments"
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

export default UpdateReview;