const userController = require("../controllers/user.controller");
const reviewController = require("../controllers/review.controller");
//import review controller when created
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.post('/api/register', userController.register);
    app.post('/api/login', userController.login);
    app.post('/api/logout', userController.logout);
    app.get('/api/viewreviews', authenticate, reviewController.findAllGameReview);
    app.get('/api/reviews/:id', reviewController.findOneSingleGameReview);
    app.post('/api/new', authenticate, reviewController.createGameReview);
    app.patch('/api/edit/:id', authenticate, reviewController.updateGameReview);
    app.delete('/api/delete/:id', authenticate, reviewController.deleteGameReview)

}