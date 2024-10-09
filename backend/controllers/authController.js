const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require("../config/generateToken");
const { signupSchema } = require('../validations/validation');


// Register user
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
                token: generateToken(user._id),
            });
        } 
        else {
            return res.status(500).json({ message: "Failed to create the user" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Authenticate user (login)
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
                token: generateToken(user._id),
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