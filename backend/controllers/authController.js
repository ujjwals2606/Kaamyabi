const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { unm, mailID, pwd } = req.body;

    if (!unm || !mailID || !pwd) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // ✅ check existing user
    const existing = await User.findOne({ email: mailID });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // ✅ hash password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const user = await User.create({
      name: unm,
      email: mailID,
      password: hashedPwd,
      role: "user",
    });

    res.status(201).json({
      msg: "User registered successfully",
      userId: user._id,
    });

  } catch (err) {
    console.log("❌ REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { mailId, pwd } = req.body;

    if (!mailId || !pwd) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // ✅ find user
    const user = await User.findOne({ email: mailId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ✅ password match
    const isMatch = await bcrypt.compare(pwd, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // ✅ create token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role, // 🔥 important for admin
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      userId: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    });

  } catch (err) {
    console.log("❌ LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= GET USERS (ADMIN) =================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.log("❌ GET USERS ERROR:", err);
    res.status(500).json({ msg: "Error fetching users" });
  }
};

// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    // 🔥 clean related data
    const QuizResult = require("../models/QuizResult");
    const UserActivity = require("../models/UserActivity");

    await QuizResult.deleteMany({ userId: id });
    await UserActivity.deleteMany({ userId: id });

    res.json({
      msg: "User and related data deleted successfully",
    });

  } catch (err) {
    console.log("❌ DELETE USER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};