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
    
    const { name, email, password, phoneNumber} = req.body;

    try {
        // Check if all fields are provided
        if (!name || !email || !password || !phoneNumber) {
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
            phoneNumber,
        });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
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

const updateProfile = async (req, res) => {
    const { name, email, phoneNumber } = req.body;
    const userId = req.user._id;  // Assuming you're using JWT authentication and the user ID is passed via the token

    try {
        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the email is being updated and if it already exists
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already exists" });
            }
            user.email = email;
        }

        // Update the other fields
        if (name) user.name = name;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // Save the updated user to the database
        const updatedUser = await user.save();

        // Return the updated user details
        return res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login, updateProfile };