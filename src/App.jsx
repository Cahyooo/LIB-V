import { useState } from "react";
import "./App.css";
import { sendMessageToChatbot } from "./n8n/Chatbot.service";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const botReply = await sendMessageToChatbot(input, messages);
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setInput("");
    console.log(messages); 
  };
  return (
      <main
        style={{ border: "1px solid black", padding: "10px", width: "300px" }}
      >
        <div style={{ height: "200px", overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{ textAlign: m.sender === "user" ? "right" : "left" }}
            >
              <b>{m.sender}:</b> {m.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={{ width: "80%" }}
        />
        <button onClick={handleSend}>Send</button>
      </main>
  );
}

export default App;
