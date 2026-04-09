import React, { useState, useEffect, useRef } from "react";
import { chatAI } from "../api/api";

const AdminChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "System Online. 👋 I am your Command Assistant. How can I assist with your administrative tasks today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f4f7fe",
    userBubble: "#1e3a8a",
    botBubble: "#ffffff"
  };

  // 🔥 Auto scroll to bottom
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
      const response = await chatAI(currentInput);
      
      const botMsg = {
        text: typeof response === "string" ? response : (response.data?.reply || "I'm processing your request."),
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Connectivity issue with AI core. Please try again.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: theme.lightGray, minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
          
          {/* Header */}
          <div className="text-center mb-4">
            <div className="d-inline-block p-3 rounded-circle shadow-sm mb-3" style={{ backgroundColor: theme.navy }}>
              <i className="bi bi-robot fs-3" style={{ color: theme.gold }}></i>
            </div>
            <h3 className="fw-bold" style={{ color: theme.navy }}>Kaamyabi <span style={{ color: theme.gold }}>AI Agent</span></h3>
            <p className="text-muted small">Powered by Kaamyabi Intelligence</p>
          </div>

          {/* Chat Window */}
          <div className="card shadow-lg border-0" style={{ borderRadius: "25px", overflow: "hidden", height: "600px" }}>
            
            {/* Messages Area */}
            <div className="p-4" style={{ flex: 1, overflowY: "auto", backgroundColor: "#fdfdfd" }}>
              {messages.map((msg, index) => (
                <div key={index} className={`d-flex mb-4 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                  <div className={`d-flex ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"} align-items-end`}>
                    
                    {/* Avatar dots */}
                    <div className="mx-2 mb-1" style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: msg.sender === "user" ? theme.navy : theme.gold }}></div>
                    
                    <div style={{
                      padding: "12px 20px",
                      borderRadius: msg.sender === "user" ? "20px 20px 0px 20px" : "20px 20px 20px 0px",
                      maxWidth: "85%",
                      backgroundColor: msg.sender === "user" ? theme.userBubble : theme.botBubble,
                      color: msg.sender === "user" ? theme.white : "#333",
                      boxShadow: msg.sender === "user" ? "0 4px 15px rgba(30, 58, 138, 0.2)" : "0 4px 15px rgba(0,0,0,0.05)",
                      fontSize: "0.95rem",
                      border: msg.sender === "user" ? "none" : "1px solid #eee"
                    }}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="d-flex justify-content-start mb-4">
                  <div className="p-3 bg-white border rounded-pill shadow-sm d-flex align-items-center">
                    <div className="spinner-grow spinner-grow-sm text-muted me-1" role="status"></div>
                    <div className="spinner-grow spinner-grow-sm text-muted me-1" role="status" style={{ animationDelay: "0.2s" }}></div>
                    <div className="spinner-grow spinner-grow-sm text-muted" role="status" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Control Area */}
            <div className="p-3 bg-white border-top">
              <div className="input-group" style={{ backgroundColor: "#f8f9fa", borderRadius: "50px", padding: "5px", border: "1px solid #dee2e6" }}>
                <input
                  type="text"
                  className="form-control border-0 bg-transparent px-4"
                  placeholder="Ask about analytics, users, or site status..."
                  style={{ boxShadow: "none" }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button 
                  className="btn px-4 shadow-sm" 
                  style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "50px", transition: "0.3s" }}
                  onClick={sendMessage}
                  disabled={isTyping}
                >
                  {isTyping ? <span className="spinner-border spinner-border-sm"></span> : <i className="bi bi-send-fill"></i>}
                </button>
              </div>
            </div>

          </div>

          {/* Suggested Prompts */}
          <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
            {["User Stats", "Analyze Growth", "System Health"].map((chip) => (
              <span 
                key={chip}
                className="badge border text-muted py-2 px-3" 
                style={{ borderRadius: "50px", cursor: "pointer", backgroundColor: theme.white }}
                onClick={() => setInput(chip)}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatbot;