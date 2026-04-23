"use client";

import { useRouter } from "next/navigation";


export default function DashboardLayout({ children }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5 space-y-4">
        <h1 className="text-xl font-bold">Admin</h1>

        <button onClick={() => router.push("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => router.push("/dashboard/users")}>
          Users
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
}