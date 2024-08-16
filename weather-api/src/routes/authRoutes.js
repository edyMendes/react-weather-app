const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const users = [];

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashPassword });
    res.status(201).send("User registered");
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: res.json({ token }) });
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send("Access Denied");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Invalid Token");
        req.user = user;
        next();
    });
};

module.exports = { router, authenticateToken };