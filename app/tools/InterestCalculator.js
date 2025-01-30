"use client";
import { useState } from "react";

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState(null);

  const calculateInterest = () => {
    const result = (principal * rate * time) / 100;
    setInterest(result);
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Interest Calculator</h2>
      <input
        type="number"
        placeholder="Principal Amount"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded mb-2 text-gray-900"
      />
      <input
        type="number"
        placeholder="Rate of Interest (%)"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded mb-2 text-gray-900"
      />
      <input
        type="number"
        placeholder="Time in Years"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded mb-4 text-gray-900"
      />
      <button
        onClick={calculateInterest}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Calculate Interest
      </button>
      {interest !== null && <p className="mt-4 text-lg font-bold text-green-400">Simple Interest: ${interest.toFixed(2)}</p>}
    </div>
  );
}
