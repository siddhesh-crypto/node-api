const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { getPosts } = require('../dataRetreival');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registers a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logs out the user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post('/logout', logoutUser);

/**
 * @swagger
 * /api/auth/protected:
 *   get:
 *     summary: Access a protected route (requires authentication)
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Protected route accessed successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).send('You have accessed a protected route.');
});

/**
 * @swagger
 * /api/auth/posts:
 *   get:
 *     summary: Fetch posts with optional filtering and limiting
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter posts by userId
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: Limit the number of posts
 *     responses:
 *       200:
 *         description: List of posts fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts(req.query);  // Use getPosts from dataRetrieval.js
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
});

module.exports = router;
