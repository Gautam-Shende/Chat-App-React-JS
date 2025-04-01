import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaUserAlt, FaPaperPlane } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
            { role: 'user', content: userInput },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = {
        sender: 'bot',
        text: response.data.choices[0].message.content,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[90vh] max-h-[800px] w-full max-w-4xl mx-auto p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <FaRobot className="text-2xl" />
          <span>AI Assistant</span>
        </h1>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <FaRobot className="text-5xl mb-4 opacity-30" />
            <p className="text-lg">How can I help you today?</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] md:max-w-[80%] rounded-2xl p-4 ${msg.sender === 'user'
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none shadow'
                }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {msg.sender === 'user' ? (
                  <FaUserAlt className="text-sm" />
                ) : (
                  <FaRobot className="text-sm" />
                )}
                <span className="text-xs opacity-80">{getCurrentTime()}</span>
              </div>
              <div className="text-sm md:text-base">{msg.text}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-2xl rounded-bl-none p-4 shadow">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow p-3 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !userInput.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;