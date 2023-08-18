const userController = require("../controllers/user.controller");
//import review controller when created
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.post('/api/register', userController.register);
    app.post('/api/login', userController.login);
    app.post('/api/logout', userController.logout);
}