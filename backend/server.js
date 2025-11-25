// ----------------------
//  Royal Empire Backend
// ----------------------

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const http = require("http");
require("dotenv").config();

const { Server } = require("socket.io");

// ----------------------
// Express + HTTP Server
// ----------------------
const app = express();
const server = http.createServer(app);

// ----------------------
// CORS FIXED (for Netlify + Localhost)
// ----------------------
app.use(
  cors({
    origin: [
      "https://royalempireliveapp.netlify.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  })
);

// ----------------------
// Socket.io Correct Setup
// ----------------------
const io = new Server(server, {
  cors: {
    origin: [
      "https://royalempireliveapp.netlify.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ----------------------
// Middlewares
// ----------------------
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----------------------
// MongoDB Connection
// ----------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error: ", err));

// ----------------------
// Import Routes
// ----------------------
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const depositRoutes = require("./routes/deposit");
const withdrawRoutes = require("./routes/withdraw");
const packageRoutes = require("./routes/package");
const referralRoutes = require("./routes/referral");
const profileRoutes = require("./routes/profile");
const supportRoutes = require("./routes/support");
// ⭐ NEW: Transaction history route
const transactionsRoutes =  require("./routes/transactions");

// ----------------------
// API Routes
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/user/dashboard", dashboardRoutes);
app.use("/api/user/deposit", depositRoutes);
app.use("/api/user/withdraw", withdrawRoutes);
app.use("/api/user/packages", packageRoutes);
app.use("/api/user/referrals", referralRoutes);
app.use("/api/user/profile", profileRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/user/transactions'", transactionsRoutes);



// ----------------------
// Socket.io Events
// ----------------------
io.on("connection", (socket) => {
  console.log("🔵 Socket connected:", socket.id);

  socket.on("subscribeBalance", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });
});

// ----------------------
// For Railway (PORT fix)
// ----------------------
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

