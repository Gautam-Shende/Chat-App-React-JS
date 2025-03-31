import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 
    text-white flex items-center justify-center
     flex-col ">
      <Navbar/>
      <ChatBox />
    </div>
  );
}

export default App;