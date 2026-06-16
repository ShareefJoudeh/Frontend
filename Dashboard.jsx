import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve logged-in user ID dynamically from storage
  const currentUserId = localStorage.getItem('userId') || 2; 

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch User Profile, Sessions, and Groups in parallel
        const [userRes, sessRes, groupRes] = await Promise.all([
          fetch(`http://localhost:5000/api/users/${currentUserId}`),
          fetch(`http://localhost:5000/api/sessions/${currentUserId}`),
          fetch(`http://localhost:5000/api/user/${currentUserId}/groups`)
        ]);

        const userData = await userRes.json();
        const sessData = await sessRes.json();
        const groupData = await groupRes.json();

        setProfile(userData);
        // Display only pending sessions
        setSessions(sessData.filter(s => s.status === 'pending'));
        setGroups(groupData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [currentUserId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-indigo-600">Loading workspace...</div>;
  if (!profile) return <div className="mt-12 text-center text-slate-500">Please sign in to view your dashboard.</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
        
        {/* Dynamic Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {profile.name}!</h1>
            <p className="text-indigo-100 font-medium text-lg">{profile.university} • {profile.role}</p>
          </div>
          <div className="bg-white/20 px-8 py-4 rounded-2xl backdrop-blur-md border border-white/20 text-center min-w-[150px]">
            <div className="text-4xl font-bold tracking-tight">{profile.credits}</div>
            <div className="text-sm text-indigo-100 font-medium uppercase tracking-wider mt-1">Credits</div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Upcoming Sessions</h2>
            {sessions.length === 0 ? (
              <p className="text-slate-500 bg-white p-6 rounded-2xl border border-dashed">No upcoming sessions found.</p>
            ) : (
              sessions.map(s => (
                <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{s.skill_title}</h3>
                    <p className="text-slate-500 text-sm mt-1">with {s.teacher_name} • {new Date(s.scheduled_at).toLocaleDateString()}</p>
                  </div>
                  <Link to={`/sessions/${s.id}`} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors">Join Link</Link>
                </div>
              ))
            )}
          </div>

          {/* My Study Circles Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">My Study Circles</h2>
            {groups.length === 0 ? (
              <p className="text-slate-500 bg-white p-6 rounded-2xl border border-dashed">You haven't joined any circles yet.</p>
            ) : (
              groups.map(g => (
                <div key={g.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-lg">{g.name}</h3>
                  <Link to={`/studycircle/${g.id}`} className="block w-full text-center py-2.5 rounded-xl border border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors">Open Chat</Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;