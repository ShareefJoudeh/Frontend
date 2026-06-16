import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, Edit2, Trash2, Plus } from 'lucide-react';

function ManageSkills() {
  const skills = [
    { id: 1, title: 'React.js Development', teacher: 'Ahmed Ali', category: 'Programming', credits: 25 },
    { id: 2, title: 'UI/UX Design', teacher: 'Sarah Ahmad', category: 'Design', credits: 20 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <main className="max-w-7xl mx-auto w-full px-6 py-8">
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Manage Skills</h1>
              <p className="text-slate-500 mt-1">Review and manage all skills listed in the marketplace.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              <Plus className="w-5 h-5" /> Add New Skill
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-4 font-bold text-slate-500">Skill Title</th>
                  <th className="pb-4 font-bold text-slate-500">Teacher</th>
                  <th className="pb-4 font-bold text-slate-500">Category</th>
                  <th className="pb-4 font-bold text-slate-500">Credits</th>
                  <th className="pb-4 font-bold text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td className="py-4 font-semibold text-slate-900 flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-indigo-600" /> {skill.title}
                    </td>
                    <td className="py-4 text-slate-600">{skill.teacher}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
                        {skill.category}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-900">{skill.credits}</td>
                    <td className="py-4 flex justify-end gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Edit2 className="w-5 h-5 text-slate-400" /></button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-5 h-5 text-red-500" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ManageSkills;