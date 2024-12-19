const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'All fields are required.' });

        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ message: 'User already exists.' });

        const user = await User.create({ username, password });
        res.status(201).json({ message: 'User registered successfully.', user: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'All fields are required.' });

        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully.' });
};

module.exports = { registerUser, loginUser, logoutUser };
