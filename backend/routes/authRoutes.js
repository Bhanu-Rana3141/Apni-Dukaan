const express = require('express');
const controller = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// express.Router(): This creates an instance of the Express router, which is used to define route handlers for specific HTTP methods (GET, POST, etc.) and paths (like /signup and /login).
const router = express.Router();

/* Route for user signup
 * This route handles POST requests to /signup
 * It will call the signup function from the controller to create a new user
*/
router.post('/signup', controller.signup);

/* Route for user login
 * This route handles POST requests to /login
 * It will call the login function from the controller to authenticate a user
*/
router.post('/login', controller.login);

router.put('/update', authMiddleware, controller.updateProfile);

// Export the router so it can be used in the main application file (app.js)
module.exports = router;