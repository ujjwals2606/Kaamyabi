const Pdf = require("../models/Pdf");

// ✅ GET ALL PDFs
exports.getPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({ createdAt: -1 });
    res.json(pdfs);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching PDFs" });
  }
};

// ✅ ADD PDF
exports.addPdf = async (req, res) => {
  try {
    const { title, url, thumbnail } = req.body;

    if (!title || !url) {
      return res.status(400).json({ msg: "Title & URL required" });
    }

    const pdf = await Pdf.create({
      title,
      url,
      thumbnail,
    });

    res.status(201).json({
      msg: "PDF added successfully",
      pdf,
    });

  } catch (err) {
    res.status(500).json({ msg: "Error adding PDF" });
  }
};

// ✅ DELETE PDF
exports.deletePdf = async (req, res) => {
  try {
    const { id } = req.params;

    await Pdf.findByIdAndDelete(id);

    res.json({ msg: "PDF deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Error deleting PDF" });
  }
};