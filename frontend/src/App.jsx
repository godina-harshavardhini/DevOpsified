import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './index.css';


function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await fetch("http://localhost:8080/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setMessages([...messages, data]);
    setText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-700 flex flex-col items-center p-8 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-8 text-blue-400 tracking-wide"
      >
        🚀 DevOpsified  — MERN Stack UI
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="flex gap-3 w-full max-w-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          className="flex-1 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="💬 Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg shadow-lg font-semibold transition-all duration-200"
        >
          Add
        </button>
      </motion.form>

      <div className="w-full max-w-md bg-gray-900/60 rounded-xl shadow-xl p-4 backdrop-blur-lg border border-gray-700">
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
          Message Board 🗒️
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet! 😅</p>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
            {messages.map((msg, index) => (
              <motion.li
                key={msg._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 p-3 rounded-lg shadow-md border border-gray-700 hover:border-blue-500 transition"
              >
                {msg.text}
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <footer className="mt-10 text-gray-400 text-sm">
        Made with ❤️ using MERN Stack
      </footer>
    </div>
  );
}

export default App;
