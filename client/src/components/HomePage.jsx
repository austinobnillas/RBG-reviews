import React from "react";
import {Link, useNavigate} from "react-router-dom";
// import axios from "axios";

// PLACE HOLDERS vvvv
const Home = ({allReviews, deleteReview}) => {
    const navigate = useNavigate();

    const deleteHandler = e => {
        const reviewId = e.target.id;
        deleteReview(reviewId);
    }

    return (
        <div>
            <nav>
                <h1>RBG</h1>
                <ul>
                    <li><p>Home</p></li>
                    <li><button>Log Out</button></li>
                </ul>
            </nav>
            { allReviews.length === 0 ? 
            <div>
                <p>No Reviews Yet</p>
                <Link to={''}>Post a Review</Link>
            </div> 
            : allReviews.map(review => {
            <table className="table" key={review._id}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Game</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            {/* Add edit link */}
                            <td><Link to={'/'}>Edit</Link>| <p onClick={deleteHandler} id={review._id}>Delete</p></td>
                        </tr>
                    </tbody>
                </table>
            })}
        </div>
    )
}

export default Home;