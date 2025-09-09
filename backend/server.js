import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth.js";
import { authMiddleware, roleMiddleware } from "./src/middlewares/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error ❌", err));

// Routes
app.use("/auth", authRoutes);

// Example: Protected route (any logged-in user)
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ msg: `Hello ${req.user.role}, you are authenticated!` });
});

// Example: Admin-only route
app.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ msg: "Welcome Admin! This is a protected route." });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
