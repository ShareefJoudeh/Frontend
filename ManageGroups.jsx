import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Settings, Plus, Trash2 } from 'lucide-react';

function ManageGroups() {
  const [studyGroups, setStudyGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch groups from the backend
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/groups');
        if (!response.ok) throw new Error('Failed to fetch groups');
        const data = await response.json();
        setStudyGroups(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching groups:', err);
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manage Study Groups</h1>
            <p className="text-slate-500 mt-1">Oversee and organize all active study groups.</p>
          </div>
          <Link to="/groups/create" className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            <Plus className="w-5 h-5" />
            Create Group
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-500">Loading groups...</div>
        ) : (
          <div className="space-y-4">
            {studyGroups.length > 0 ? (
              studyGroups.map((group) => (
                <div key={group.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-indigo-700" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{group.name}</p>
                      <p className="text-xs text-slate-500">{group.course || group.topic} • {group.member_count} members</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-200 transition-colors">
                      <Settings className="w-5 h-5 text-slate-500" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-500">No groups found in the database.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageGroups;