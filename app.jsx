import React from "react";
import Chat from "/Chat";
fetch('http://localhost:8000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: "Bonjour !" }),
  })

function App() {
  return (
    <div>
      <h1>Assistant IA 💬</h1>
      <Chat />
    </div>
  );
}

export default App;
