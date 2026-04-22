"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const login = async () => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.user) {
    router.push("/dashboard");
  } else {
    alert("Login failed");
  }
};

  const register = async () => {
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    alert("Registered!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          🔐 Login System
        </h1>

        <div className="space-y-4">
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <button
            onClick={register}
            disabled={loading}
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition disabled:opacity-50"
          >
            Register
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
          Next.js Fullstack Login Demo
        </p>
      </div>
    </div>
  );
}