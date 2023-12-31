const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../server/models/User");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const path = require("path");

// SSL certificate paths
const privateKey = fs.readFileSync(path.join(__dirname, 'localhost-key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'localhost.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

require("dotenv").config();
const tmdbAPIRouter = require("./routers/tmdbAPIRouter");
const authRouter = require("./routers/authRouter");

// Create an Express server
const server = express();

// Use logger
server.use(logger("dev"));

// Get port from environment variables or default to 3004
const PORT = process.env.PORT || 3004;

// Use body parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
server.use(cors({
  origin: 'https://localhost:5173', // Client's origin, now using HTTPS
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

// Connect to MongoDB
const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("connected", () => console.log("Connected to MongoDB"));
db.on("error", (error) => console.error("MongoDB connection error:", error));

// Session configuration
server.use(session({
  secret: process.env.SECRET_KEY || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: 'None', // Set to 'None' for cross-site requests
    secure: true // Set to true since using HTTPS
  }
}));

// Initialize Passport and session
server.use(passport.initialize());
server.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routers
server.use("/movies", tmdbAPIRouter);
server.use("/auth", authRouter);

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Create HTTPS server and listen
const httpsServer = https.createServer(credentials, server);
httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});
