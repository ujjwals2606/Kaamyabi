const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  deleteUser,
} = require("../controllers/authController");

// ================= AUTH =================
router.post("/register", register);
router.post("/login", login);

// ================= ADMIN =================

// 🔥 GET ALL USERS
router.get("/users", getUsers);

// 🔥 DELETE USER
router.delete("/users/:id", deleteUser);

module.exports = router;