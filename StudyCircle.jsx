import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function StudyCircle() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/groups');
        if (!response.ok) throw new Error('Failed to fetch groups');
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    group.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-600 font-bold">
        Loading study circles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* Hero Section */}
        <div className="bg-emerald-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 shadow-lg">
          <div>
            <h1 className="text-4xl font-bold">Study Circles</h1>
            <p className="text-emerald-50 text-lg mt-2">Join focused communities, share resources, and study collaboratively.</p>
          </div>
          <Link to="/groups/create" className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors text-center">
            + Create New Circle
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input 
            type="text" 
            placeholder="Search groups by name or topic..." 
            className="w-full md:max-w-xl px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Groups Grid */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No study groups found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map(group => (
              <div key={group.id} className="bg-white p-6 rounded-3xl border-t-4 border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{group.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${group.privacy === 'public' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {group.privacy}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase tracking-wider">
                      {group.topic}
                    </span>
                  </div>
                  
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3">{group.description}</p>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-500">
                      <span>Admin:</span>
                      <span className="font-semibold text-slate-900">{group.admin_name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <span className="font-bold">{group.member_count}</span>
                      <span>Members</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/studycircle/${group.id}`} 
                    className="block w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors text-center"
                  >
                    View Group
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default StudyCircle;