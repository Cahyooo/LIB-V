import React, { useEffect, useRef, useState } from "react";
import { sendMessageToChatbot } from "./n8n/Chatbot.service";
import "./App.css";
const SPLASH_KEY = "libv_splash_seen_v1";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! Saya LIB-V, asisten perpustakaan virtual Anda. Apa yang bisa saya bantu hari ini?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTechModal, setShowTechModal] = useState(false);
  const [splashVisible, setSplashVisible] = useState(false);

  const [showSplash, setShowSplash] = useState(() => {
    try {
      return localStorage.getItem(SPLASH_KEY) ? false : true;
    } catch {
      return true;
    }
  });

  const chatLogRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = chatLogRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (showSplash) {
      setTimeout(() => setSplashVisible(true), 20);
    }
  }, [showSplash]);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const showTyping = () => setIsTyping(true);
  const hideTyping = () => setIsTyping(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    addMessage(text, "user");
    setInput("");

    showTyping();

    try {
      const botReply = await sendMessageToChatbot(text, messages);

      hideTyping();

      const replyText =
        typeof botReply === "string" ? botReply : JSON.stringify(botReply);

      addMessage(replyText, "bot");
    } catch (err) {
      hideTyping();
      addMessage(
        "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        "bot"
      );
      console.error("sendMessageToChatbot error:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSplashStart = () => {
    setSplashVisible(false);

    setTimeout(() => {
      try {
        localStorage.setItem(SPLASH_KEY, "1");
      } catch {}

      setShowSplash(false);
    }, 400);
  };

  const handleBack = () => {
    try {
      localStorage.removeItem(SPLASH_KEY);
    } catch {}

    window.location.reload();
  };

  const techs = [
    {
      name: "React",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
      name: "Tailwind CSS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    },
    {
      name: "n8n",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/N8n-logo-new.svg",
    },
  ];

  return (
    <>
      {showSplash && (
        <div
          className={`overlay-center splash-backdrop ${
            splashVisible ? "fade-in" : "fade-out"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="splash-card" aria-live="polite">
            <img src="/logo.png" alt="LIB-V Logo" className="splash-logo" />
            <div style={{ color: "white", maxWidth: 560 }}>
              <h2 style={{ marginBottom: 8, fontSize: 32 }}>Selamat datang di LIB–V!</h2>
              <p style={{ opacity: 0.9, fontSize: 24 }}>
                Asisten perpustakaan virtual. Tekan Mulai untuk memulai
                percakapan.
              </p>
            </div>
            <button className="splash-start-btn" onClick={handleSplashStart}>
              Mulai
            </button>
          </div>
        </div>
      )}

      <div
        className={`modal-overlay ${showTechModal ? "fade-in" : "fade-out"}`}
        onClick={() => setShowTechModal(false)}
      >
        <div
          className={`tech-modal-card ${
            showTechModal ? "fade-in" : "fade-out"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {techs.map((t) => (
            <div className="tech-item" key={t.name}>
              <img src={t.logo} alt={t.name} className="tech-logo" />
              <div className="tech-name">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="app-container">
        <header className="chat-header">
          <button
            className="back-button"
            aria-label="Kembali"
            onClick={handleBack}
          >
            <span style={{ transform: "translateY(-3px)" }}>&lt;</span>
          </button>

          <div className="header-content">
            <h1 className="welcome-text">LIB–V Virtual Librarian</h1>
          </div>

          <div
            className="tech-info-button"
            onClick={() => setShowTechModal(true)}
            title="Teknologi yang digunakan"
          >
            <div style={{ color: "white", fontWeight: 700 }}>Tech</div>
            <div className="question-circle" aria-hidden>
              ?
            </div>
          </div>
        </header>

        <div
          className="chat-log"
          id="chat-log"
          ref={chatLogRef}
          style={{ flex: 1, overflowY: "auto", padding: 20 }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`message ${m.sender}`}
              style={{ marginBottom: 14 }}
            >
              <div
                className="message-bubble"
                style={{ maxWidth: "75%", padding: 12 }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div
              className={`message typing-indicator`}
              id="typing-indicator"
              style={{ marginBottom: 14 }}
            >
              <div
                className="message-bubble"
                style={{
                  width: 60,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div
                  className="dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "#1e3a42",
                    opacity: 0.3,
                    animation: "dot-pulse 1.5s infinite ease-in-out",
                  }}
                />
                <div
                  className="dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "#1e3a42",
                    opacity: 0.3,
                    animation: "dot-pulse 1.5s infinite ease-in-out",
                    animationDelay: "0.2s",
                  }}
                />
                <div
                  className="dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "#1e3a42",
                    opacity: 0.3,
                    animation: "dot-pulse 1.5s infinite ease-in-out",
                    animationDelay: "0.4s",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div
          className="input-area"
          style={{ padding: 16, background: "var(--color-bg-light)" }}
        >
          <textarea
            id="user-input"
            className="user-input"
            ref={inputRef}
            placeholder="Ketik pesan Anda di sini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 16,
              resize: "vertical",
              minHeight: 44,
            }}
          />
          <button
            className="send-button"
            id="send-button"
            aria-label="Kirim Pesan"
            onClick={handleSend}
            style={{
              position: "absolute",
              right: 28,
              bottom: 22,
              background: "transparent",
              border: "none",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
              aria-hidden
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
