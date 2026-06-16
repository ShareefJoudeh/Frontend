import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

function BookSession() {
  const [formData, setFormData] = useState({
    skill: "",
    teacher: "",
    date: "",
    time: "",
    duration: "1",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Session booked successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto max-w-4xl px-6 mt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Book a Session</h1>
          <p className="mt-2 text-slate-500">Schedule a learning session with a skill mentor.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skill */}
            <div>
              <label className="mb-2 block font-medium text-slate-700">Skill</label>
              <select
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option value="">Select a Skill</option>
                <option>React.js Development</option>
                <option>UI/UX Design</option>
                <option>Database Systems</option>
                <option>Python Programming</option>
              </select>
            </div>

            {/* Teacher */}
            <div>
              <label className="mb-2 block font-medium text-slate-700">Teacher</label>
              <select
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option value="">Select a Teacher</option>
                <option>Ahmed Ali</option>
                <option>Sarah Ahmad</option>
                <option>Omar Khaled</option>
              </select>
            </div>

            {/* Date + Time */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium text-slate-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-slate-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="mb-2 block font-medium text-slate-700">Duration (Hours)</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-2 block font-medium text-slate-700">Notes</label>
              <textarea
                rows="4"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any specific topics you want to learn..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* Session Summary */}
            <div className="rounded-2xl bg-slate-100 p-5 border border-slate-200">
              <h3 className="mb-3 text-lg font-semibold">Session Summary</h3>
              <p className="text-sm text-slate-600"><strong>Skill:</strong> {formData.skill || "Not Selected"}</p>
              <p className="text-sm text-slate-600"><strong>Teacher:</strong> {formData.teacher || "Not Selected"}</p>
              <p className="text-sm text-slate-600"><strong>Date:</strong> {formData.date || "Not Selected"}</p>
              <p className="text-sm text-slate-600"><strong>Time:</strong> {formData.time || "Not Selected"}</p>
              <p className="text-sm text-slate-600"><strong>Duration:</strong> {formData.duration} Hour(s)</p>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit">Confirm Booking</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default BookSession;