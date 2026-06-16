import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";

function SkillRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated backend fetch
  useEffect(() => {
    // Replace with your actual API endpoint: fetch('http://localhost:5000/api/requests')
    const mockData = [
      { id: 1, student: "Ahmad Hassan", skill: "React.js Development", date: "18 Jun 2026", credits: 25, status: "Pending" },
      { id: 2, student: "Sara Ali", skill: "UI/UX Design", date: "20 Jun 2026", credits: 20, status: "Pending" },
      { id: 3, student: "Omar Khaled", skill: "Database Systems", date: "15 Jun 2026", credits: 30, status: "Accepted" },
    ];
    setRequests(mockData);
    setLoading(false);
  }, []);

  const updateStatus = (id, newStatus) => {
    setRequests(
      requests.map((req) => req.id === id ? { ...req, status: newStatus } : req)
    );
  };

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const acceptedCount = requests.filter((r) => r.status === "Accepted").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Skill Requests</h1>
          <p className="mt-2 text-slate-500">Review and manage requests from students who want to learn your skills.</p>
        </div>

        {/* Statistics Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500">Total Requests</p>
            <h2 className="mt-3 text-4xl font-bold text-teal-600">{requests.length}</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500">Pending Requests</p>
            <h2 className="mt-3 text-4xl font-bold text-yellow-500">{pendingCount}</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500">Accepted Requests</p>
            <h2 className="mt-3 text-4xl font-bold text-green-600">{acceptedCount}</h2>
          </div>
        </div>

        {/* Request List */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">Incoming Requests</h2>
          <div className="space-y-5">
            {requests.map((request) => (
              <div key={request.id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{request.skill}</h3>
                  <p className="mt-1 text-slate-500">Student: {request.student}</p>
                  <p className="text-slate-500">Requested Date: {request.date}</p>
                  <p className="mt-2 font-medium text-teal-600">{request.credits} Credits</p>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <span className={`rounded-full px-4 py-2 text-sm font-medium ${
                    request.status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
                    request.status === "Accepted" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {request.status}
                  </span>

                  {request.status === "Pending" && (
                    <div className="flex gap-3">
                      <button onClick={() => updateStatus(request.id, "Accepted")} className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition">Accept</button>
                      <button onClick={() => updateStatus(request.id, "Rejected")} className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition">Reject</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillRequests;