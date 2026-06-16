import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function GroupChat() {
  const [message, setMessage] = useState("");

  const messages = [
    { id: 1, sender: "Ahmed Ali", text: "Can someone explain Binary Trees?", time: "10:15 AM", isCurrentUser: false },
    { id: 2, sender: "You", text: "Sure, I'll share some notes.", time: "10:17 AM", isCurrentUser: true },
    { id: 3, sender: "Sarah Ahmad", text: "I uploaded a PDF in the resources section.", time: "10:20 AM", isCurrentUser: false },
    { id: 4, sender: "Omar Khaled", text: "Let's review DFS and BFS tomorrow.", time: "10:25 AM", isCurrentUser: false },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("Message:", message);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6 rounded-3xl bg-teal-600 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Data Structures Group Chat</h1>
          <p className="mt-2 text-white/90">42 Members • Online Discussion</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Members Sidebar */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Members Online</h2>
            <div className="space-y-4">
              {['Ahmed Ali', 'Sarah Ahmad', 'Omar Khaled'].map((name) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-slate-700">{name}</span>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-slate-400"></div>
                <span className="text-slate-500">Lina Hasan</span>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
              {/* Messages Container */}
              <div className="h-[600px] overflow-y-auto p-6 bg-slate-50/50 space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-md rounded-2xl p-4 shadow-sm ${msg.isCurrentUser ? "bg-teal-600 text-white" : "bg-white text-slate-800 border border-slate-200"}`}>
                      <p className="mb-1 text-sm font-bold opacity-90">{msg.sender}</p>
                      <p className="text-base">{msg.text}</p>
                      <p className={`mt-2 text-xs ${msg.isCurrentUser ? "text-teal-100" : "text-slate-400"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4 bg-white">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                  <Button type="submit">Send</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupChat;