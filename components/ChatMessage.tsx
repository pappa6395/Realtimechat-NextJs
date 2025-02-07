import React from 'react'


interface ChatMessageProps {
    message: string;
    sender: string;
    isOwnMessage: boolean;
}

const ChatMessage = ({ sender, message, isOwnMessage}: ChatMessageProps) => {

    const isSystemMessage = sender === 'system';

  return (

    <div className={`flex ${
        isSystemMessage 
        ? 'justify-center' 
        : isOwnMessage 
        ? 'justify-end' 
        : 'justify-start'
        } mb-3`}
    >
        <div className={`max-w-xs px-4 py-2 rounded-lg ${
            isSystemMessage 
            ? "bg-gray-700 text-center text-xs font-semibold text-white" 
            : isOwnMessage 
            ? "bg-blue-500 text-white" 
            : "bg-gray-200"
        }`}>
            {!isSystemMessage && <p className='text-sm font-bold'>{sender}</p>}
            <p>{message}</p>
        </div>
    </div>

  )
}

export default ChatMessage