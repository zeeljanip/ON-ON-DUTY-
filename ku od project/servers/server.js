const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const app = express();

// In-memory object to simulate local storage
const localStorage = {};

// Middleware for session management
const sessionSecret = process.env.SESSION_SECRET || 'secure-random-string';
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookie based on environment
}));

// Helmet middleware for HTTP security headers
app.use(helmet());

// Rate limiting middleware to prevent brute force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
});
app.use('/login', limiter);

// Sample user data (replace with database integration)
const users = [
    { id: 1, username: 'user1', email: 'user1@example.com', passwordHash: 'hashedPassword' } // Example user data
];

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

// Route for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user by username (replace with database query)
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    // Check password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
        return res.status(401).send('Invalid credentials');
    }

    // Encrypt the password before storing (for demonstration purposes only)
    const encryptedPassword = CryptoJS.AES.encrypt(password, sessionSecret).toString();

    // Store hashed password in local storage
    localStorage[user.username] = encryptedPassword;

    // Set session authenticated flag
    req.session.authenticated = true;

    res.send('Login successful');
});

// Route for authenticated user data
app.get('/data', isAuthenticated, (req, res) => {
    // Return sensitive data for authenticated user
    res.send('Authenticated User Data');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
