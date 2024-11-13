const mongoose = require("mongoose");
const bcrypt = require('bcryptjs'); // library for hashing passwords and comparing passwords

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/*
 * Compares the entered password with the hashed password stored in the database.
 * This method is used to verify the user's password during login.
 * 
 * @param {string} enteredPassword - The password entered by the user at login.
 * @returns {Promise<boolean>} - Returns a boolean value indicating whether the entered password matches the hashed password.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/*
 * Pre-save middleware to hash the user's password before saving it to the database.
 * If the password is modified or newly created, it hashes the password using bcryptjs.
 * If the password is not modified, it skips the hashing process.
 * 
 * @param {Function} next - The callback to indicate that the next middleware should run.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Export the User model, which is used to interact with the 'users' collection in the database.
 * This model includes the methods for password validation and hashing as well as user data operations.
 * 
 * @returns {Model} - Mongoose model to interact with the 'users' collection.
*/
module.exports = mongoose.model("User", userSchema);