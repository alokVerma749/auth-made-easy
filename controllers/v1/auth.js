import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import user from "../../models/user.js";

/**
 * Logs in a user and generates a JWT token.
 * 
 * @async
 * @function login
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.password - The user's password.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with the login status.
 * 
 * @throws {Object} If the email or password is missing, returns a 400 status.
 * @throws {Object} If the user is not found or the password is incorrect, returns a 401 status.
 * @throws {Object} If there's a server error, returns a 500 status.
 */

export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const foundUser = await user.findOne({ email })
    if (!foundUser) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPassCorrect = bcrypt.compareSync(password, foundUser.password)
    if (!isPassCorrect) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const auth_token = jwt.sign({ id: foundUser._id, role: foundUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie("hydro_auth_token", auth_token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' || false,
      sameSite: 'None'
    });

    return res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

/**
 * Registers a new user and encrypts the password.
 * 
 * @async
 * @function register
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.password - The user's password.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with the registration status.
 * 
 * @throws {Object} If required fields are missing, returns a 400 status.
 * @throws {Object} If the user already exists, returns a 409 status.
 * @throws {Object} If there's a server error, returns a 500 status.
 */

export async function register(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const foundUser = await user.findOne({ email })
    if (foundUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}
