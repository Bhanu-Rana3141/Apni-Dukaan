const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { signupSchema } = require('../validations/validation');


/* Registers a new user after validating input data and checking if the user already exists.
 * Validates the request body using the signup schema.
 * Checks if all required fields are provided.
 * Checks if the user already exists.
 * Creates a new user and triggers password hashing.
 * Returns a success response with user details and a JWT token if the user is created.
*/
const signup = async (req, res) => {

    // Validate request body 
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    const { name, email, password } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all the fields" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user - (triggers password hashing)
        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user),
            });
        } 
        else {
            return res.status(500).json({ message: "Failed to create the user" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/* Authenticates a user by verifying their credentials (email and password).
 * Validates the login credentials against the database.
 * Checks if the user exists and compares the provided password with the stored hashed password.
 * Returns a JWT token and user details on successful login.
 * Returns an error message if the credentials are invalid.
*/
const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user),
            });
        } 
        else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login };