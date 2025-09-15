import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Phone, PhoneOff } from "lucide-react";
import { API_BASE_URL, API_HEADERS } from "../config/constants";

export default function MakeCallPage() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [callerId, setCallerId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleCall = async () => {
    if (!phone) {
      setStatus("⚠️ Please enter a phone number");
      return;
    }

    setIsCalling(true);
    setStatus(`📞 Calling ${phone}...`);

    try {
      const res = await fetch(
        `${API_BASE_URL}/call/new?customerMobileNumber=${encodeURIComponent(
          phone
        )}`,
        {
          method: "POST",
          headers: {
            ...API_HEADERS,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.text(); // callerSId returned
      setCallerId(data);
      setStatus(`✅ Call initiated successfully! Caller ID: ${data}`);

      // Show popup after 30 seconds
      setTimeout(() => {
        setShowPopup(true);
      }, 15000);
    } catch (err) {
      console.error(err);
      setStatus(`❌ Failed to make call: ${err.message}`);
    } finally {
      setIsCalling(false);
    }
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setStatus("❌ Call ended.");
  };

  const handleFetchDetails = async () => {
    if (!callerId) return;
    try {
      const res = await fetch(`${API_BASE_URL}/call/fetch/${callerId}`, {
        method: "GET",
        headers: API_HEADERS,
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const msg = await res.text();
      setStatus(`📋 ${msg}`);
    } catch (err) {
      console.error(err);
      setStatus(`❌ Failed to fetch call details: ${err.message}`);
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Header />
        <main className="p-6 space-y-6 flex justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
            <h2 className="text-2xl font-bold text-center text-slate-800">
              Make a Call
            </h2>

            <label className="block">
              <span className="text-sm font-medium text-slate-600">
                Phone Number
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="mt-2 w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </label>

            <div className="flex gap-3">
              <button
                onClick={handleCall}
                disabled={isCalling}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white font-medium transition ${
                  isCalling
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <Phone size={18} />
                {isCalling ? "Calling..." : "Make Call"}
              </button>

              {isCalling && (
                <button
                  onClick={handleEndCall}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                >
                  <PhoneOff size={18} />
                  End Call
                </button>
              )}
            </div>

            {status && (
              <div
                className={`p-3 rounded-lg text-sm font-medium text-center ${
                  status.startsWith("✅")
                    ? "bg-green-100 text-green-700"
                    : status.startsWith("⚠️")
                    ? "bg-yellow-100 text-yellow-700"
                    : status.startsWith("❌")
                    ? "bg-red-100 text-red-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {status}
              </div>
            )}

            {/* Popup Modal */}
            {showPopup && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800">
                    Fetch Call Details?
                  </h3>
                  <p className="text-sm text-slate-600">
                    Do you want to fetch analysis for Caller ID:{" "}
                    <span className="font-mono">{callerId}</span>?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleFetchDetails}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                    >
                      Fetch
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
