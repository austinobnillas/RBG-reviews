const GameReview = require('../models/gamereview.model');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


module.exports = {
    createGameReview: (req, res) => {
        const username = jwt.verify(req.cookies.userToken, secret);
        const review = req.body;
        review["creator"] = username.username;
        GameReview.create(review)
            .then(newReview => res.json(newReview))
            // .then(async e => { 
            //     e=await e.populate('creator', 'gameTitle platform rating comments')
            //     res.status(201).json(e)
            // })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: "Error creating Review!", errors: err.errors });
            });
    },
    findAllGameReview: (req, res) => {
        GameReview.find()
            .populate('creator', 'gameTitle platform rating createdAt comments')
            .sort({ createdAt: 'desc' })
            .then(e => res.json(e))
            .catch(err => res.status(400).json({ message: "Error getting all Reviews!", error: err }));
    },

    findOneSingleGameReview: (req, res) => {
        GameReview.findOne({ _id: req.params.id })
            .populate('creator', 'gameTitle platform rating comments')
            .then(e => res.json(e))
            .catch(err => res.status(400).json({ message: "Error getting Review!", errors: err.errors }));
    },

    updateGameReview: (req, res) => {
        const userToken = jwt.verify(req.cookies.userToken, secret);
        if (userToken.username === req.body.creator) {
            GameReview.findOneAndUpdate({_id: req.params.id}, req.body, { new: true, runValidators: true })
                .then(updatedReview => res.json(updatedReview))
                .catch(err => res.status(400).json(err))
        } else {
            res.status(400).json({msg: "Only the creator of the review can edit this."})
        }
        // try {
        //     const userToken = jwt.verify(req.cookies.userToken, secret);
        //     const updatedReview = await GameReview.findOneAndUpdate(
        //         {_id: req.params.id},
        //         req.body, { new: true, runValidators: true })
        //         .populate('creator', 'gameTitle platform rating comments');
        //     res.json(updatedReview);
        // } catch (err) {
        //     console.log(err);
        //     res.status(400).json({ message: "Error updating GameReview!", errors: err.errors });
        // }
    },

    // deleteGameReview: (req, res) => {
    //     GameReview.deleteOne({ _id: req.params.id })
    //         .then(e => res.json(e))
    //         .catch(err => res.status(400).json({ message: "Error deleting Review!", errors: err.errors }));
    // },
    deleteGameReview: async(req, res) => {
        const userToken = jwt.verify(req.cookies.userToken, secret)
        const createdBy =  await GameReview.findById({_id: req.params.id})
        if (userToken.username === createdBy.creator){
            GameReview.findByIdAndDelete({_id: req.params.id})
                .then(deletedReview => res.json(deletedReview))
                .catch(err => res.json(err));
        } else {
            res.status(400).json({msg: "Only the creator of the review can delete this."})
        }
        // try {
        //     const userToken = jwt.verify(req.cookies.usertoken, secret);
    
        //     const review = await GameReview.findOne({ _id: req.params.id });
    
        //     if (!review) {
        //         return res.status(404).json({ message: "Review not found!" });
        //     }
    
        //     if (review.creator.toString() !== userToken._id) {
        //         return res.status(403).json({ message: "You are not authorized to delete this review!" });
        //     }
    
        //     await GameReview.deleteOne({ _id: req.params.id });
        //     res.json({ message: "Review deleted successfully!" });
    
        // } catch (err) {
        //     console.log(err);
        //     res.status(400).json({ message: "Error deleting review!", errors: err.errors });
        // }
    }
}
