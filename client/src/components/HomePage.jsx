import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import ProfileImg from '../assets/profile-placeholder.png'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [allReviews, setAllReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/viewreviews')
            .then(res => setAllReviews(res.data))
            .catch(err => {
                console.log(err)
        })
    }, [])

    const deleteReview = (id) => {
        axios.delete(`http://localhost:8000/api/delete/${id}`, {withCredentials: true})
            .then(res => {
                const updatedAllReviews = allReviews.filter(reviews => reviews._id !== res.data._id)
                setAllReviews(updatedAllReviews);
                navigate('/');
            })
            .catch((err) => {
                const loginError = err.response.data.msg;
                alert(loginError);
            })
    }
    const logout = () => {
        axios.post(`http://localhost:8000/api/logout`, {}, {withCredentials: true})
            .then(
                alert('Logged out'),
                navigate('/')
            )
    }
    const deleteHandler = e => {
        const reviewId = e.target.id;
        deleteReview(reviewId);
        navigate('/home');
    }

    return (
        <div className="main-page-container">
            <nav className="home-navbar">
                <h1 className="main-logo">RBG</h1>
                <ul className="nav-list">
                    <li><Link to={'/'} className="underline text-decoration-none text-dark">Home</Link></li>
                    <li className="underline">About</li>
                    <li className="underline">Contact</li>
                    <li><button className="logout-btn" onClick={logout}>Log Out</button></li>
                </ul>
            </nav>
            <div className="inner-body-container">
                <div className="subheading mb-4">
                    <h3>See what the community has to say</h3>
                    <Link to={`/create`} className="post-review-btn">Post a Review</Link>
                </div>
                { allReviews.length === 0 ? 
                <div>
                    <p>No Reviews Yet</p>
                    <Link to={'/create'}>Post a Review</Link>
                </div> 
                : allReviews.map(review => {
                    return (
                        <div className="review-list-container mb-4">
                            <div className="review" key={review._id}>
                                <ul className="inner-review p-4">
                                    <div className="profile-cont">
                                        <img className="profile-img" src={ProfileImg} alt="profile image"></img>
                                    </div>
                                    
                                    <div className="d-flex flex-column" style={{width:"30em"}}>
                                        <div className="review-top-section d-flex flex-row justify-content-between">
                                            <div className="creator-title d-flex flex-row">
                                                <li style={{fontWeight: "800", color: "#A3A4BE"}}>{review.creator}</li>
                                                <p className="mx-2"></p>
                                                <li style={{fontWeight: "500", color:"#502D55"}}>{review.gameTitle}</li>
                                            </div>
                                            <div className="actions-cont d-flex flex-row justify-content-evenly">
                                                <Link to={`/update/${review._id}`} className="text-decoration-none">Edit Post</Link>
                                                <p onClick={deleteHandler} id={review._id} className="delete-icon">Delete</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex flex-row mb-3">
                                                <li style={{fontWeight: "500"}}>{review.rating} <span className="emphasize-text out-of me-3">out of 10</span></li>
                                                <li><span className="emphasize-text">Avaliable Platform(s):</span> {review.platforms}</li>
                                            </div>
                                            <div>
                                                <li className="comments">{review.comments}</li>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;