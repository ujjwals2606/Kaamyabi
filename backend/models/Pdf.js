const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: String,
  url: String,
  thumbnail: String,
});

module.exports = mongoose.model("Pdf", pdfSchema);