import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function GroupDetails() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);

  const currentUserId = 2; // Ensure this matches your login system

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchChatData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${id}/chat`);
      if (!response.ok) throw new Error('Group not found');
      const data = await response.json();
      setGroup(data.group);
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching chat:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatData();
  }, [id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id: currentUserId, content: newMessage })
      });
      const savedMessage = await response.json();
      setMessages((prev) => [...prev, savedMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-emerald-600 font-bold">Joining study circle...</div>;
  if (!group) return <div className="p-10 text-center text-slate-500">Group not found. <Link to="/studycircle" className="text-emerald-600 font-bold underline">Return to directory.</Link></div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        <Link to="/studycircle" className="text-slate-400 hover:text-emerald-600 transition-colors mb-4 inline-block">&larr; Back to Study Circles</Link>
        
        <div className="grid lg:grid-cols-4 gap-6 h-[75vh]">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-slate-200 bg-slate-100 text-slate-700 inline-block mb-3">{group.topic}</span>
            <h1 className="text-xl font-bold text-slate-900 mb-2">{group.name}</h1>
            <p className="text-sm text-slate-500 mb-6 pb-6 border-b border-slate-100">{group.description}</p>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Group Rules</h3>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li>Be respectful.</li>
              <li>Stay on topic.</li>
              <li>Share resources.</li>
            </ul>
          </div>

          {/* Chat Main */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">Live Discussion</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 bg-emerald-50 text-emerald-700 uppercase">{group.privacy}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 flex flex-col gap-4">
              {messages.map((msg) => {
                const isMine = msg.sender_id === currentUserId;
                return (
                  <div key={msg.id} className={`flex flex-col max-w-[70%] ${isMine ? 'items-end self-end' : 'items-start self-start'}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm md:text-base ${isMine ? 'bg-emerald-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'}`}>
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 font-bold">{isMine ? 'You' : msg.sender_name} • {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white flex gap-3">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={sending}
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold transition-colors" disabled={sending}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GroupDetails;