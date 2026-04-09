const axios = require("axios");

exports.chatAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ msg: "Message required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct", // ✅ FIXED
        messages: [
          { role: "user", content: message }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Kaamyabi Chatbot"
        },
      }
    );

    const reply =
      response?.data?.choices?.[0]?.message?.content ||
      "⚠️ No response";

    res.json({ reply });

  } catch (err) {
    console.log("🔥 OPENROUTER ERROR:");
    console.log("👉 STATUS:", err.response?.status);
    console.log("👉 DATA:", err.response?.data || err.message);

    res.status(500).json({
      msg: "AI failed",
      error: err.response?.data || err.message,
    });
  }
};