"use client";
import { useState } from "react";
import { FaUndo } from "react-icons/fa";  // Reset icon

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation function
  const validateInput = (value) => !isNaN(value) && value > 0;

  const handleCalculate = () => {
    if (!validateInput(principal) || !validateInput(rate) || !validateInput(time)) {
      setError("Please enter valid numbers greater than 0 for all fields.");
      return;
    }

    setLoading(true);
    const result = (principal * rate * time) / 100;
    setTimeout(() => {
      setInterest(result);
      setLoading(false);
      setError("");
    }, 1000); // Simulate loading time
  };

  const resetFields = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setInterest(null);
    setError("");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-[#232526] to-[#414345] text-white rounded-lg shadow-2xl max-w-md mx-auto relative">
      <h2 className="text-2xl font-semibold text-center mb-6">Interest Calculator</h2>

      {/* Error message display */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Principal Input */}
      <div className="mb-4">
        <label htmlFor="principal" className="block text-lg mb-2">Principal Amount ($)</label>
        <input
          type="number"
          id="principal"
          placeholder="Enter principal amount"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full p-4 border-2 border-[#8E8D8A] rounded-lg bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Rate of Interest Input */}
      <div className="mb-4">
        <label htmlFor="rate" className="block text-lg mb-2">Rate of Interest (%)</label>
        <input
          type="number"
          id="rate"
          placeholder="Enter interest rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full p-4 border-2 border-[#8E8D8A] rounded-lg bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Time Input */}
      <div className="mb-4">
        <label htmlFor="time" className="block text-lg mb-2">Time (Years)</label>
        <input
          type="number"
          id="time"
          placeholder="Enter time in years"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-4 border-2 border-[#8E8D8A] rounded-lg bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <span className="text-white">Calculating...</span>
        ) : (
          <span className="text-white">Calculate Interest</span>
        )}
      </button>

      {/* Display Result */}
      {interest !== null && !loading && (
        <p className="mt-4 text-lg font-bold text-green-400">
          Simple Interest: ${interest.toFixed(2)}
        </p>
      )}

      {/* Reset Icon Button */}
      <button
        onClick={resetFields}
        className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110"
        aria-label="Reset"
      >
        <FaUndo className="text-xl" />
      </button>

      {/* Tooltip Section */}
      <div className="mt-4 text-sm text-center text-gray-200">
        <p><span className="font-semibold">Principal:</span> The amount you are investing or borrowing.</p>
        <p><span className="font-semibold">Rate of Interest:</span> The percentage of interest charged per year.</p>
        <p><span className="font-semibold">Time:</span> The number of years for which the interest is calculated.</p>
      </div>
    </div>
  );
}
