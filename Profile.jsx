import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUserId = 2;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${currentUserId}`);
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600 font-bold">Loading profile...</div>;
  if (!profileData || !profileData.user) return <div className="mt-12 text-center text-slate-500">Profile data could not be loaded.</div>;

  const { user, offered_skills } = profileData;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold border-4 border-white shadow-lg">
            {user.name.charAt(0)}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-2 justify-center md:justify-start">
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {user.role}
              </span>
            </div>
            <p className="text-slate-500">{user.university} • {user.email}</p>
            
            <div className="grid grid-cols-3 gap-4 mt-6 border-t border-slate-100 pt-6">
              <div className="text-center md:text-left">
                <div className="text-xl font-bold text-indigo-600">{user.credits}</div>
                <div className="text-xs text-slate-400 font-bold uppercase">Credits</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xl font-bold text-slate-900">{offered_skills.length}</div>
                <div className="text-xs text-slate-400 font-bold uppercase">Skills</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xl font-bold text-emerald-600">100%</div>
                <div className="text-xs text-slate-400 font-bold uppercase">Ratings</div>
              </div>
            </div>
          </div>
          
          <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors">Edit Profile</button>
        </div>

        {/* Offered Skills */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">My Offered Skills</h2>
            <Link to="/skills/add" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors">
              + Add New Skill
            </Link>
          </div>

          {offered_skills.length === 0 ? (
            <p className="text-slate-500 bg-slate-50 p-6 rounded-2xl text-center">You are not offering any skills yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {offered_skills.map(skill => (
                <div key={skill.id} className="p-5 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-all space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase">{skill.category}</span>
                    <span className="font-bold text-indigo-600">{skill.credit_cost} Credits</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{skill.title}</h3>
                    <p className="text-sm text-slate-500">{skill.level}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-700">Edit</button>
                    <button className="flex-1 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;