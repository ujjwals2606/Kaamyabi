const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,        // 🔥 duplicate email prevent
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"], // 🔥 control roles
      default: "user",
    },
  },
  {
    timestamps: true, // 🔥 createdAt useful for admin stats
  }
);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);