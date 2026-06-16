import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Change '/api/resources' if your backend route is different
        const response = await fetch('http://localhost:5000/api/resources');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-teal-600 p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Group Resources</h1>
          <p className="mt-3 text-white/90">Access study materials shared by members.</p>
        </div>

        {/* Actions */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input type="text" placeholder="Search resources..." className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-500 md:max-w-md" />
          <button className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors">
            Upload Resource
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500">Total Resources</p>
            <h2 className="mt-3 text-4xl font-bold text-teal-600">{resources.length}</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500">Available Files</p>
            <h2 className="mt-3 text-4xl font-bold text-red-500">
              {resources.filter(r => r.type === 'PDF').length}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500">Last Added</p>
            <h2 className="mt-3 text-4xl font-bold text-green-600">Today</h2>
          </div>
        </div>

        {/* Resource List */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Available Resources</h2>
          
          {loading ? (
            <p className="text-center text-slate-500">Loading resources...</p>
          ) : (
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium">{resource.type}</span>
                      <h3 className="text-lg font-semibold">{resource.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">Uploaded by {resource.uploadedBy}</p>
                    <p className="text-sm text-slate-500">{resource.date} • {resource.size}</p>
                  </div>
                  <button className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors">
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resources;