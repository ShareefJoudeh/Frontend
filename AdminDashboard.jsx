import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, BookOpen, Settings, AlertTriangle, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: '0',
    activeSkills: '0',
    alerts: '0',
    health: '99.8%'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      setLoading(true);
      try {
        const [usersRes, skillsRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/stats/users'),
          fetch('http://localhost:5000/api/admin/stats/skills')
        ]);
        
        if (!usersRes.ok || !skillsRes.ok) throw new Error('Failed to fetch stats');

        const usersData = await usersRes.json();
        const skillsData = await skillsRes.json();

        setStats(prev => ({
          ...prev,
          totalUsers: usersData.count?.toLocaleString() || '0',
          activeSkills: skillsData.count?.toLocaleString() || '0'
        }));
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  const adminStats = [
    { label: 'Total Users', value: loading ? '...' : stats.totalUsers, icon: Users },
    { label: 'Active Skills', value: loading ? '...' : stats.activeSkills, icon: BookOpen },
    { label: 'System Alerts', value: stats.alerts, icon: AlertTriangle },
    { label: 'Platform Health', value: stats.health, icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-6 py-8">
        {/* Admin Header */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8 border-l-4 border-l-red-500">
          <h1 className="text-3xl font-bold text-slate-900">Admin Overview</h1>
          <p className="text-slate-500 mt-2">Manage users, monitor platform health, and configure system settings.</p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-sm font-bold text-slate-500 uppercase">{stat.label}</span>
                <stat.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Admin Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/admin/users" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-500 transition-all flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-xl"><Users className="text-indigo-600" /></div>
            <span className="font-bold">Manage Users</span>
          </Link>
          <Link to="/admin/skills" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-500 transition-all flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-xl"><BookOpen className="text-indigo-600" /></div>
            <span className="font-bold">Manage Skills</span>
          </Link>
          <Link to="/admin/settings" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-500 transition-all flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-xl"><Settings className="text-indigo-600" /></div>
            <span className="font-bold">System Settings</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}