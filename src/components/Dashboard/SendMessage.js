import React from 'react';

const SendMessage = () => (
  <div className="sendMessage">
    <textarea className="sendMessage__textArea"/>
    <div>
      <button className="sendMessage__send">Send Message</button>
    </div>
  </div>
);

export default SendMessage;