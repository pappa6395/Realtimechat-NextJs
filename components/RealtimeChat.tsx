"use client"

import { useState } from "react";

const RealtimeChat = ({
  onSendMessage,
  }: {
    onSendMessage: (message: string) => void;
  }) => {

  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      setMessage("")
    }
    onSendMessage(message);
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Real-Time Chat</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="border w-full p-2 mt-2"
          />
          <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-2 ml-2 rounded"
          >
              Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default RealtimeChat;