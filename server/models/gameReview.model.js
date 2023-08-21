const mongoose = require('mongoose');

const GameReviewSchema = new mongoose.Schema({

    gameTitle: {
        type: String,
        required: [true, 'Game Title is Required'], 
        minLength: [3, "Must be at least 3 characters."]
    },

    creator: {
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User"
    },

    platforms: {
        type: String,
        required: [true, "Platform(s) is Required"],
        minLength: [2, "Must be at least 3 characters."]
    },

    // rating: {
    //     type: Number,
    //     required: [true, 'Rating is required'],
    //     min: [1, 'Rating must be at least 1'],
    //     max: [10, 'Rating must be at most 10']
    // },

    rating: {
        type: String,
        required: [true, "A rating is required"],
        enum: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },

    comments: {
        type: String,
        minLength: [2, "Comments must be at least 3 characters."],
        maxLength: [500, 'Comments must  be 500 or characters or less']
    },
},
    {
        timestamps: true
    },
);

module.exports = mongoose.model('GameReview', GameReviewSchema);


// not sure which rating code you want to go with