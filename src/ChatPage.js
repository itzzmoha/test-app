import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase'; // Import Firestore
import './ChatPage.css';

function ChatPage() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === '' || username.trim() === '') return;

    try {
      await addDoc(collection(firestore, 'messages'), {
        text: message,
        timestamp: Date.now(),
        sender: username // Use the entered username
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <div className="chat-page">
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === username ? 'sent' : 'received'}`}>
              <span className="sender">{msg.sender || 'Unknown'}</span>
              <span className="text">{msg.text}</span>
              <span className="timestamp">{formatDate(msg.timestamp)}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input"
            placeholder="Enter your name"
            required
          />
          <div className="input-group">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
              placeholder="Type a message"
              required
            />
            <button type="submit" className="send-button">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
