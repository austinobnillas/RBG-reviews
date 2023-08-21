import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

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
            .then(alert('Logged out'))
    }
    const deleteHandler = e => {
        const reviewId = e.target.id;
        deleteReview(reviewId);
    }

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="main-page-container">
            <nav className="home-navbar">
                <h1 className="main-logo">RBG</h1>
                <ul className="nav-list">
                    <li><Link to={'/'} className="underline" style={{textDecoration: "none", color:"black"}}>Home</Link></li>
                    <li className="underline">About</li>
                    <li className="underline">Contact</li>
                    <li><button className="logout-btn" onClick={logout}>Log Out</button></li>
                </ul>
            </nav>
            <div className="inner-body-container">
                { allReviews.length === 0 ? 
                <div>
                    <p>No Reviews Yet</p>
                    <Link to={'/create'}>Post a Review</Link>
                </div> 
                : allReviews.map(review => {
                    return (
                        <div>
                            <div className="subheading">
                                <h3>See what the community has to say:</h3>
                                <Link to={`/new/${review._id}`}>Post a Review</Link>
                            </div>
                            <table className="table" key={review._id}>
                                <thead className="table-head">
                                    <tr>
                                        <th>Username</th>
                                        <th>Game</th>
                                        <th>Rating</th>
                                        <th>Review</th>
                                        <th>Comments</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>{review.creator}</td>
                                        <td>{review.gameTitle}</td>
                                        <td>{review.platforms}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.comments}</td>
                                        <td style={{display:'flex', flexDirection:"row", justifyContent:"space-evenly"}}><Link style={{textDecoration:"none", color:"gray"}}to={'/'}>Edit</Link><p onClick={deleteHandler} id={review._id} className="delete-icon">Delete</p></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;