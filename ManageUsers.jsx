import React, { useState, useEffect } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuspend = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}/suspend`, { method: "PUT" });
      if (!response.ok) throw new Error("Failed to suspend");
      alert("User suspended successfully");
      fetchUsers(); // Refresh list
    } catch (err) {
      alert("Failed to suspend user");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      alert("User deleted successfully");
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingUser.name,
          email: editingUser.email,
          university: editingUser.university,
        }),
      });
      if (!response.ok) throw new Error("Failed to update");
      setUsers(prev => prev.map(u => (u.id === editingUser.id ? editingUser : u)));
      setEditingUser(null);
      alert("User updated successfully");
    } catch (err) {
      alert("Failed to update user");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600 font-bold">Loading users...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-slate-500">{user.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"}`}>
                  {user.role}
                </span>
              </div>
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between"><span>University:</span> <span className="font-semibold">{user.university}</span></div>
                <div className="flex justify-between"><span>Credits:</span> <span className="font-bold text-indigo-600">{user.credits}</span></div>
                {user.status === "suspended" && <div className="text-red-600 font-bold">Suspended</div>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingUser(user)} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold">Edit</button>
                <button onClick={() => handleSuspend(user.id)} className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold">Suspend</button>
                <button onClick={() => handleDelete(user.id)} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl w-[500px]">
              <h2 className="text-2xl font-bold mb-4">Edit User</h2>
              <input className="w-full border p-3 rounded-lg mb-3" value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} />
              <input className="w-full border p-3 rounded-lg mb-3" value={editingUser.email} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} />
              <input className="w-full border p-3 rounded-lg mb-5" value={editingUser.university} onChange={(e) => setEditingUser({...editingUser, university: e.target.value})} />
              <div className="flex justify-end gap-3">
                <button onClick={() => setEditingUser(null)} className="px-4 py-2 bg-slate-200 rounded-lg">Cancel</button>
                <button onClick={handleUpdateUser} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;