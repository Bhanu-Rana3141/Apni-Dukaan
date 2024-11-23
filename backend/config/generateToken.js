const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token (JWT) for a user.
 *
 * This function creates a JWT containing the user's unique ID (_id) and name. 
 * The token is signed with a secret key (JWT_SECRET) stored in environment variables 
 * and will expire in 30 days. 
 * The generated token can be used for user authentication to authorize further requests.
 * 
 * @param {Object} user - The user object containing user details like _id and name.
 * @returns {string} - A JWT token string.
 */

const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber}, // Payload: User's unique ID and name.
        process.env.JWT_SECRET, // Secret key used to sign the token.
        { expiresIn: "30d" });
}

module.exports = generateToken;