import React, { useState, useEffect, useRef } from "react";
import { chatAI } from "../api/api";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi 👋 I'm your Kaamyabi AI Assistant. How can I help your learning journey today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    lightGray: "#f4f7fe",
    white: "#ffffff",
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input;
    const userMsg = { text: currentInput, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await chatAI(currentInput);
      const botMsg = {
        text: typeof reply === "string" ? reply : "I'm having trouble processing that. Could you rephrase?",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ System busy. Please try again in a moment.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          
          {/* Header */}
          <div className="text-center mb-4">
            <div className="d-inline-block p-3 rounded-circle mb-2" style={{ backgroundColor: theme.navy }}>
                <i className="bi bi-robot text-white fs-3"></i>
            </div>
            <h3 className="fw-bold" style={{ color: theme.navy }}>AI Learning <span style={{ color: theme.gold }}>Assistant</span></h3>
            <p className="text-muted small">Powered by Kaamyabi Intelligence</p>
          </div>

          {/* Chat Window */}
          <div
            className="card shadow-lg border-0 overflow-hidden"
            style={{
              height: "600px",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: theme.white
            }}
          >
            {/* Messages Area */}
            <div
              className="p-4"
              style={{
                flex: 1,
                overflowY: "auto",
                background: theme.lightGray,
                backgroundImage: "radial-gradient(#d1d5db 0.5px, transparent 0.5px)",
                backgroundSize: "20px 20px"
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex mb-4 ${
                    msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                  }`}
                >
                  <div
                    className="shadow-sm"
                    style={{
                      padding: "12px 18px",
                      borderRadius: msg.sender === "user" ? "20px 20px 0 20px" : "20px 20px 20px 0",
                      maxWidth: "80%",
                      background: msg.sender === "user" ? theme.navy : theme.white,
                      color: msg.sender === "user" ? theme.white : theme.navy,
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                      border: msg.sender === "user" ? "none" : `1px solid #e0e0e0`
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="d-flex justify-content-start mb-4">
                  <div className="bg-white p-3 rounded-pill shadow-sm d-flex gap-1 align-items-center">
                    <span className="spinner-grow spinner-grow-sm text-muted"></span>
                    <span className="spinner-grow spinner-grow-sm text-muted" style={{ animationDelay: "0.2s" }}></span>
                    <span className="spinner-grow spinner-grow-sm text-muted" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-top">
              <div className="input-group shadow-sm" style={{ borderRadius: "50px", overflow: "hidden", border: `1px solid #eee` }}>
                <input
                  type="text"
                  className="form-control border-0 px-4 py-3"
                  placeholder="Type your academic question..."
                  style={{ outline: "none", boxShadow: "none" }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button 
                    className="btn px-4" 
                    style={{ backgroundColor: theme.navy, color: theme.white, transition: "0.3s" }}
                    onClick={sendMessage}
                >
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-center text-muted mt-3 x-small" style={{ fontSize: "0.75rem" }}>
            Kaamyabi AI can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;