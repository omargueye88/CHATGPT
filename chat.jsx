import React, { useEffect, useState } from "react";


function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (messageContent) => {
    const userMessage = { role: "user", content: messageContent };
    setMessages((prev) => [...prev, userMessage]);

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageContent }),
    });

    const data = await response.json();
    const aiMessage = { role: "assistant", content: data.reponse };
    setMessages((prev) => [...prev, aiMessage]);
  };

  useEffect(() => {
    sendMessage("Commence la conversation");
  }, []);

  return (
    <div>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.role === "user" ? "👤 Toi" : "🤖 IA"} :</strong> {msg.content}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Écris ton message ici..."
      />
      <button onClick={() => {
        sendMessage(input);
        setInput("");
      }}>Envoyer</button>
    </div>
  );
}

export default Chat;
