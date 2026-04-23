"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE
  const createUser = async () => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setEmail("");
    setPassword("");
    fetchUsers();
  };

  // DELETE
  const deleteUser = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">👤 Users CRUD</h1>

      {/* CREATE FORM */}
      <div className="mb-4 space-y-2">
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2"
        />

        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mr-2"
        />

        <button
          onClick={createUser}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add User
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center border-t">
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 text-white px-3 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}