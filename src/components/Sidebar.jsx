import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Call Analytics</h2>
        <p className="text-sm text-slate-500">Real-time sentiment dashboard</p>
      </div>
      <nav>
        <ul className="space-y-2">
          <li className="px-3 py-2 rounded hover:bg-slate-50">
            <Link to="/" className="flex items-center gap-3">
              📊 Dashboard
            </Link>
          </li>
          <li className="px-3 py-2 rounded hover:bg-slate-50">
            <Link to="/alerts" className="flex items-center gap-3">
              ⚠️ Alerts
            </Link>
          </li>
          <li className="px-3 py-2 rounded hover:bg-slate-50">
            <Link to="/make-call" className="flex items-center gap-3">
              📞 Make Call
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
