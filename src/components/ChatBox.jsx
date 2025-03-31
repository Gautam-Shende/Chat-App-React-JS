import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaUserAlt } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth'});
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
            'Authorization': `Bearer YOUR_API_KEY`, // Replace with your OpenAI API key
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

  let icon1 = <FaUserAlt className='text-2xl'/>
  let icon2 = <FaRobot className='text-3xl'/>
   
  return (
    <div className="bg-gradient-to-br from-gray-700 to-slate-700 
    rounded-xl shadow-2xl p-6 w-5/6">
      <div className="h-96 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div
          key={index}
          className={`flex ${
            msg.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
           
          <div
            className={`p-3 rounded-lg max-w-[70%] ${
              msg.sender === 'user'
                ? 'bg-gradient-to-br from-pink-400 to-pink-700 mr-3 font-bold' 
                : 'bg-gray-800 text-white font-bold '
            }`}
            
          >
            <p className='mb-4 flex gap-2 items-center justify-between
            '>{msg.sender === 'user' ? icon1 : icon2}
              <p className='text-sm ml-3'>9:30 am</p>
            </p>
            {msg.text}
          </div>
        </div>
      ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-indigo-100 text-indigo-900">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-900 mr-2"></div>
                Thinking...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center flex-wrap">
        <input
          type="text"
          className="flex-grow p-2 border text-black font-semibold text-lg 
          rounded-md
           focus:outline-none focus:ring-2 "
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className=" bg-white text-black px-4 py-2 font-bold text-xl ml-4
          rounded-xl hover:bg-gradient-to-br from-yellow-300 to-orange-500 
          transition-all duration-500 flex justify-center items-center gap-2
           disabled:opacity-0 disabled:cursor-not-allowed shadow-md
           "
          disabled={isLoading}
        >
          Send <FaPaperPlane className='text-xl'/>
        </button>
      </div>
    </div>
  );
}

export default ChatBox;

