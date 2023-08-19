const mongoose = require('mongoose');

const GameReviewSchema = mongoose.Schema({

    gameTitle: {
        type: String,
        required: [true, 'Required Field']
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    platforms: {
        type: String,
        required: [true, "Must be 2 or more characters"]
    },

    // rating: {
    //     type: Number,
    //     required: [true, 'Rating is required'],
    //     min: [1, 'Rating must be at least 1'],
    //     max: [10, 'Rating must be at most 10']
    // },

    rating: {
        type: Number,
        required: true,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },

    comments: {
        type: String,
        maxLength: [500, 'Must be 500 or characters or less']
    },
},
    {
        timestamps: true
    },
);

module.exports = mongoose.model('GameReview', GameReviewSchema);


// not sure which rating code you want to go with