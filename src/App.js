import { React, useEffect, useState } from "react";
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import logo from './logo.svg';

const brain = require('brain.js')
const comAI = require('./companyAIv2.json');
const net = new brain.recurrent.LSTM();
net.fromJSON(comAI);

function App() {
  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
    addResponseMessage('*With AI');
  }, []);
  
  const [chatWindowOpen, setChatWindowOpen] = useState(true);

  const handleToggle = (chatWindowOpen) => {
    setChatWindowOpen(!chatWindowOpen);
  };

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message received! ${newMessage}`);
    // Now send the message throught the backend API
    var reply = net.run(newMessage)
    addResponseMessage(reply);
    console.log(reply)
  };

    return (
      <div className="App">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          handleToggle={handleToggle}
          profileAvatar={logo}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      </div>
    );
}

export default App;
