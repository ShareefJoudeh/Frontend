import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddSkill() {
  const navigate = useNavigate();
  
  // Retrieve the logged-in user ID dynamically from storage
  const currentUserId = localStorage.getItem('userId') || 2; 

  const [formData, setFormData] = useState({
    title: '',
    category: 'Programming',
    level: 'Beginner',
    credit_cost: 10,
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const skillPayload = {
        ...formData,
        teacher_id: parseInt(currentUserId, 10),
        credit_cost: parseInt(formData.credit_cost, 10) 
      };

      const response = await fetch('http://localhost:5000/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillPayload),
      });

      if (!response.ok) throw new Error('Failed to add skill');
      
      setSuccess(true);
      setTimeout(() => navigate('/skillswap'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto w-full">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Offer a New Skill</h1>
          <p className="text-gray-500 mb-8 border-b border-gray-100 pb-6">
            Share your expertise with your university peers.
          </p>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm text-center">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm text-center">Skill successfully added!</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Skill Title</label>
              <input type="text" name="title" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" value={formData.title} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select name="category" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 outline-none" value={formData.category} onChange={handleChange}>
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
                <select name="level" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 outline-none" value={formData.level} onChange={handleChange}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Credit Cost</label>
              <input type="number" name="credit_cost" min="0" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 outline-none" value={formData.credit_cost} onChange={handleChange} />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea name="description" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 outline-none min-h-[120px]" value={formData.description} onChange={handleChange} />
            </div>

            <div className="mt-8 flex justify-end gap-4 border-t pt-6">
              <button type="button" className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50" onClick={() => navigate('/skillswap')}>Cancel</button>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700" disabled={loading}>{loading ? 'Publishing...' : 'Publish Skill'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSkill;