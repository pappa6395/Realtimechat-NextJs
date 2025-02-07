"use client"

import { ModeToggle } from '@/components/ModeToggle'
import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import ChatMessage from '@/components/ChatMessage';
import { socket } from '@/lib/socketClient';
const RealtimeChat = dynamic(() => import("@/components/RealtimeChat"), { ssr: false });

const page = () => {
  
  const [room, setRoom] = useState("");
  const [joined, setjoined] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on("user_joined", (message) => {
      setMessages(prevMessages => [...prevMessages, { sender: "system", message }]);
    })

    return () => {
      socket.off('user_joined');
      socket.off('message');
    }
  }, []);

  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: userName };
    setMessages((prevMessages) => [...prevMessages, { sender: userName, message }]);
    socket.emit('message', data);
  };
  
  const handleJoinRoom = () => {
    if (room && userName) {
      socket.emit('join-room', { room, username: userName });
      setjoined(true);
    }
  };
  
  return (

    <div>
        <div className='grid justify-center mt-6'>
          <div className='flex items-center w-full justify-center gap-4'>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl 
              font-semibold tracking-tight first:mt-0">
              Realtime WebSocket Chat
            </h2>
              <ModeToggle/>
          </div>
          {!joined ? (
            <div className='mt-4 flex flex-col items-center justify-center'>
              <h1>Join a Room</h1>
              <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder="Enter your name"
                className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
              />
              <input 
                type="text" 
                value={room} 
                onChange={(e) => setRoom(e.target.value)} 
                placeholder="Enter room name" 
                className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
              />
              <button 
                onClick={handleJoinRoom} 
                className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                Join
              </button>
            </div>
          ) : (
            <div className='mt-4 w-full max-w-3xl mx-auto'>
              <h1 className='mb-4 text-2xl font-bold'>Room: {room}</h1>
              <div className='mt-4 h-[500px] overflow-y-auto p-4 mb-4 bg-gray-100 border-2 rounded-lg'>
                {messages.map((msg, index) => {
                  return (
                    <div key={index}>
                      <ChatMessage 
                        sender={msg.sender} 
                        message={msg.message} 
                        isOwnMessage={msg.sender === userName}/>
                    </div>
                  )
                })}
              </div>
              <RealtimeChat onSendMessage={handleSendMessage}/>
            </div>
          )}
          
        </div>
    </div>

  )
}

export default page