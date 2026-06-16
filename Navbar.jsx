import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Brand */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        SkillCircle
      </Link>
      
      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">Dashboard</Link>
        <Link to="/skillswap" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">SkillSwap</Link>
        <Link to="/studycircle" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">StudyCircle</Link>
        <Link to="/sessions" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">Sessions</Link>
        <Link to="/admin" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">Admin</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center">
        <Link 
          to="/signin" 
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;