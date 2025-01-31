"use client";
import { useState } from "react";

const DateDifferenceCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [difference, setDifference] = useState(0);
  const [weeks, setWeeks] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Calculate difference in days, weeks, months, and years
  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start) || isNaN(end)) {
      alert("Please enter valid dates.");
      return;
    }

    const diff = (end - start) / (1000 * 60 * 60 * 24);
    setDifference(diff);

    // Calculate weeks, months, years
    const diffInYears = diff / 365;
    const diffInMonths = diff / 30;
    const diffInWeeks = diff / 7;

    setWeeks(diffInWeeks);
    setMonths(diffInMonths);
    setYears(diffInYears);
  };

  return (
    <div className={`max-w-md mx-auto p-6 rounded-lg shadow-lg mt-10 transition ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg text-sm font-bold transition bg-blue-500 text-white"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h2 className="text-xl font-bold text-center mb-4">📅 Date Difference Calculator</h2>

      {/* Start and End Date Inputs */}
      <div className="mb-3">
        <label className="block text-sm mb-1">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 rounded-md text-black"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 rounded-md text-black"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateDifference}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg font-bold mb-4"
      >
        Calculate Difference
      </button>

      {/* Result */}
      <div className="mt-4 text-center">
        {difference >= 0 ? (
          <div>
            <p className="text-lg font-semibold">Days Difference: {difference} days</p>
            <p className="text-sm">Weeks Difference: {weeks.toFixed(2)} weeks</p>
            <p className="text-sm">Months Difference: {months.toFixed(2)} months</p>
            <p className="text-sm">Years Difference: {years.toFixed(2)} years</p>
          </div>
        ) : (
          <p className="text-red-500">End date must be after the start date!</p>
        )}
      </div>
    </div>
  );
};

export default DateDifferenceCalculator;
