"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [email, setEmail] = useState("");

  // GET USERS
  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // OPEN EDIT MODAL
  const openEdit = (user) => {
    setEditUser(user);
    setEmail(user.email);
  };

  // UPDATE USER
  const updateUser = async () => {
    await fetch(`/api/users/${editUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setEditUser(null);
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
              <td className="space-x-2">

                {/* EDIT BUTTON */}
                <Button onClick={() => openEdit(u)}>
                  Edit
                </Button>

                {/* DELETE BUTTON */}
                <Button
                  variant="destructive"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setEditUser(null)}>
              Cancel
            </Button>

            <Button onClick={updateUser}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}