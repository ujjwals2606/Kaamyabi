const express = require("express");
const router = express.Router();

const {
  getPdfs,
  addPdf,
  deletePdf,
} = require("../controllers/pdfController");

// ✅ ROUTES
router.get("/", getPdfs);
router.post("/", addPdf);
router.delete("/:id", deletePdf);

module.exports = router;