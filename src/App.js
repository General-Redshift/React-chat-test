import { React, useEffect, useState } from "react";
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import logo from './logo.svg';

const brain = require('brain.js')
const comAI = require('./companyAIv2.json');
const net = new brain.recurrent.LSTM();
net.fromJSON(comAI);
const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  nlp.addLanguage('en');
  // Adds the utterances and intents for the NLP
  nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
  nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
  nlp.addDocument('en', 'okay see you later', 'greetings.bye');
  nlp.addDocument('en', 'bye for now', 'greetings.bye');
  nlp.addDocument('en', 'i must go', 'greetings.bye');
  nlp.addDocument('en', 'hello', 'greetings.hello');
  nlp.addDocument('en', 'hi', 'greetings.hello');
  nlp.addDocument('en', 'howdy', 'greetings.hello');
  
  // Train also the NLG
  nlp.addAnswer('en', 'greetings.bye', 'Till next time');
  nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
  nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
  nlp.addAnswer('en', 'greetings.hello', 'Greetings!');  
  await nlp.train();
  const response = await nlp.process('en', 'I should go now');
  console.log(response);
})();

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
