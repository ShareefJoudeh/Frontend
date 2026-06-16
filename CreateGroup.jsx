import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateGroup() {
  const navigate = useNavigate();
  const currentUserId = 2;

  const [formData, setFormData] = useState({
    name: '',
    topic: 'Computer Science',
    privacy: 'public',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrivacySelect = (privacyLevel) => {
    setFormData({ ...formData, privacy: privacyLevel });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, admin_id: currentUserId }),
      });

      if (!response.ok) throw new Error('Failed to create group');
      const newGroup = await response.json();
      setSuccess(true);
      setTimeout(() => navigate(`/groups/${newGroup.id}`), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Create a Study Circle</h1>
        <p className="text-slate-500 mb-8 border-b border-slate-100 pb-6">
          Build a dedicated space for your peers to collaborate and study together.
        </p>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-center text-sm">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl text-center text-sm">Circle created successfully!</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Circle Name</label>
              <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" placeholder="e.g., Data Structures Midterm" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Main Topic</label>
              <select name="topic" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none" value={formData.topic} onChange={handleChange}>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">Privacy Setting</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['public', 'private'].map((level) => (
                <div key={level} onClick={() => handlePrivacySelect(level)} className={`cursor-pointer rounded-xl border p-4 transition-all ${formData.privacy === level ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 bg-white hover:border-emerald-300'}`}>
                  <span className={`font-bold block mb-1 ${formData.privacy === level ? 'text-emerald-800' : 'text-slate-900'}`}>
                    {level === 'public' ? 'Public Circle' : 'Private Circle'}
                  </span>
                  <span className="text-sm text-slate-500">{level === 'public' ? 'Anyone can search and join.' : 'Invite link required for access.'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Circle Description</label>
            <textarea name="description" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none min-h-[120px]" placeholder="What will your group focus on?" value={formData.description} onChange={handleChange} />
          </div>

          <div className="flex justify-end gap-4 border-t border-slate-100 pt-6">
            <button type="button" className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50" onClick={() => navigate('/studycircle')}>Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors" disabled={loading}>{loading ? 'Creating...' : 'Create Circle'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroup;