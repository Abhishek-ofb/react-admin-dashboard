import React from "react";

export default function Header(){
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Supervisor Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-600">Welcome, Supervisor</div>
        <div className="w-10 h-10 bg-slate-200 rounded-full" />
      </div>
    </header>
  );
}