import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

function SkillSwap() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [bookingStatus, setBookingStatus] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  // Dynamically fetch user ID from local storage
  const currentUserId = localStorage.getItem('userId') || 2;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/skills');
        if (!response.ok) throw new Error('Failed to fetch skills');
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleBookSession = async (skillId) => {
    setProcessingId(skillId);
    setBookingStatus(null);
    try {
      const response = await fetch('http://localhost:5000/api/sessions/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learner_id: parseInt(currentUserId), skill_id: skillId })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to book');
      
      setBookingStatus({ type: 'success', message: 'Session booked successfully!' });
      setTimeout(() => setBookingStatus(null), 4000);
    } catch (error) {
      setBookingStatus({ type: 'error', message: error.message });
      setTimeout(() => setBookingStatus(null), 4000);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          skill.teacher_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(skills.map(s => s.category))];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-teal-700 font-bold">Loading marketplace...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="container mx-auto px-6 py-8">
        
        {bookingStatus && (
          <div className={`fixed top-5 right-5 px-6 py-4 rounded-2xl shadow-lg z-50 font-bold ${bookingStatus.type === 'success' ? 'bg-teal-600 text-white' : 'bg-red-500 text-white'}`}>
            {bookingStatus.message}
          </div>
        )}

        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-8 md:p-12 mb-8 border border-teal-200/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-md">✨</div>
              <span className="px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-sm font-bold text-teal-800 border border-teal-200">
                {skills.length} Skills Available
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-3">SkillSwap Marketplace</h1>
            <p className="text-teal-700 text-lg max-w-xl">
              Discover amazing skills and book personalized 1-on-1 sessions with expert teachers
            </p>
          </div>
          <Link to="/skills/add" className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 whitespace-nowrap">
            + Add Your Skill
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Search skills, topics, or teachers..." 
            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${activeCategory === category ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <div key={skill.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-600">{skill.level}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{skill.category}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{skill.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6">{skill.description}</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">{skill.teacher_name.charAt(0)}</div>
                  <span className="font-semibold text-slate-700">{skill.teacher_name}</span>
                  <span className="ml-auto font-bold text-teal-600">{skill.credit_cost} Credits</span>
                </div>
                <button 
                  onClick={() => handleBookSession(skill.id)}
                  disabled={processingId === skill.id}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors disabled:bg-slate-400"
                >
                  {processingId === skill.id ? 'Processing...' : 'Book Session'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SkillSwap;