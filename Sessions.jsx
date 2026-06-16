import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = 2; // Hardcoded user ID

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/sessions/${currentUserId}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold">Loading your schedule...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-5xl mx-auto w-full px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">My Sessions</h1>
        
        {sessions.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border text-center text-slate-500">
            No sessions booked yet.
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map(session => {
              const isTeacher = session.teacher_id === currentUserId;
              const partnerName = isTeacher ? session.learner_name : session.teacher_name;
              
              return (
                <div key={session.id} className="bg-white p-6 rounded-3xl border shadow-sm flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{session.skill_title}</h3>
                    <p className="text-sm text-slate-500">{isTeacher ? 'Student: ' : 'Teacher: '} {partnerName}</p>
                    <p className="text-xs font-bold text-teal-600 mt-2">{formatDate(session.scheduled_at)}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${session.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {session.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Sessions;