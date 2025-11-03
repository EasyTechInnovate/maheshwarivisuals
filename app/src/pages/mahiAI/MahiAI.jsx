import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, User } from 'lucide-react';

const MahiAI = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      senderName: 'Mahi AI',
      text: "I'm unable to upload my new track. The upload keeps failing at 50%. I've tried multiple times with different browsers but the same issue persists. File size is about 120MB in WAV format.",
      timestamp: '3/15/2024, 10:00:00 AM'
    },
    {
      id: 2,
      sender: 'user',
      senderName: 'Aditya',
      text: "Thank you for contacting us. We're looking into this issue. The 100MB limit is currently in place for technical reasons. We're working on increasing this limit. In the meantime, you can compress your file or contact us for a manual upload.",
      timestamp: '3/15/2024, 10:30:00 AM'
    },
    {
      id: 3,
      sender: 'bot',
      senderName: 'Mahi AI',
      text: "When will the limit be increased? I have several tracks that are over 100MB and this is blocking my release schedule.",
      timestamp: '3/15/2024, 2:00:00 PM'
    }
  ]);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      senderName: 'You',
      text: message,
      timestamp: new Date().toLocaleString()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Mahi - Your Personal AI Assistant</h1>
          <p className="text-muted-foreground">Get instant help and support from our AI assistant</p>
        </div>

        {/* Chat Card */}
        <Card className="border-slate-700 h-[calc(100vh-220px)] flex flex-col">
          <CardHeader className="border-b border-slate-700">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-500" />
              Mahi AI
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800/50 text-white'
                  } rounded-lg p-4 space-y-2`}
                >
                  <div className="flex items-center gap-2">
                    {msg.sender === 'bot' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="font-semibold text-sm">{msg.senderName}</span>
                    <span className="text-xs opacity-70 ml-auto">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="border-t border-slate-700 p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="border-slate-700 min-h-[60px] max-h-[120px] resize-none"
                  rows={2}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                className="bg-purple-600 text-white hover:bg-purple-700 h-[60px] px-6"
                disabled={message.trim() === ''}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Reply
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MahiAI;
