import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Trash2, Settings, Plus } from 'lucide-react';

function ManageStudyGroups() {
  const [studyGroups, setStudyGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/groups');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setStudyGroups(data);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      <main className="max-w-7xl mx-auto w-full px-6 py-8">
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Manage Study Groups</h1>
              <p className="text-slate-500 mt-1">Monitor, edit, or remove study circles.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              <Plus className="w-5 h-5" /> Create Group
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading groups...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-4 font-bold text-slate-500">Group Name</th>
                    <th className="pb-4 font-bold text-slate-500">Course</th>
                    <th className="pb-4 font-bold text-slate-500">Members</th>
                    <th className="pb-4 font-bold text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studyGroups.length > 0 ? (
                    studyGroups.map((group) => (
                      <tr key={group.id}>
                        <td className="py-4 font-semibold text-slate-900 flex items-center gap-3">
                          <Users className="w-5 h-5 text-indigo-600" /> {group.name}
                        </td>
                        <td className="py-4 text-slate-600">{group.course}</td>
                        <td className="py-4 text-slate-900 font-medium">{group.members_count || 0}</td>
                        <td className="py-4 flex justify-end gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Settings className="w-5 h-5 text-slate-400" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-slate-500">No study groups found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ManageStudyGroups;