"use client";
import { useState } from "react";
import { FaUndo } from "react-icons/fa";  // Import reset icon from react-icons

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState(15);
  const [people, setPeople] = useState(1);
  const [error, setError] = useState("");

  const validateInput = (value) => {
    return !isNaN(value) && value >= 0;
  };

  const handleBillChange = (e) => {
    const value = e.target.value;
    if (validateInput(value)) {
      setBill(value);
      setError("");
    } else {
      setError("Please enter a valid bill amount.");
    }
  };

  const handleTipPercentageChange = (e) => {
    const value = e.target.value;
    if (validateInput(value)) {
      setTipPercentage(value);
      setError("");
    } else {
      setError("Please enter a valid percentage.");
    }
  };

  const handlePeopleChange = (e) => {
    const value = e.target.value;
    if (validateInput(value)) {
      setPeople(value);
      setError("");
    } else {
      setError("Please enter a valid number of people.");
    }
  };

  const totalTip = (bill * tipPercentage) / 100;
  const totalAmount = parseFloat(bill) + totalTip;
  const perPerson = people > 0 ? totalAmount / people : 0;

  const resetFields = () => {
    setBill("");
    setTipPercentage(15);
    setPeople(1);
    setError("");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-[#232526] to-[#414345] text-white rounded-lg shadow-2xl max-w-md mx-auto relative">
      <h2 className="text-2xl font-semibold text-center mb-6">Tip Calculator</h2>
      
      {/* Error message display */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Bill Input */}
      <div className="mb-4">
        <label htmlFor="bill" className="block text-lg mb-2">Bill Amount ($)</label>
        <input
          type="number"
          id="bill"
          placeholder="Enter bill amount"
          value={bill}
          onChange={handleBillChange}
          className="w-full p-4 border-2 border-[#8E8D8A] rounded-lg bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Tip Percentage Slider */}
      <div className="mb-4">
        <label htmlFor="tipPercentage" className="block text-lg mb-2">Tip Percentage (%)</label>
        <input
          type="range"
          id="tipPercentage"
          min="0"
          max="50"
          value={tipPercentage}
          onChange={handleTipPercentageChange}
          className="w-full h-2 bg-gray-600 rounded-lg focus:outline-none transition-all"
        />
        <div className="text-center text-lg mt-2">{tipPercentage}%</div>
      </div>

      {/* People Input */}
      <div className="mb-4">
        <label htmlFor="people" className="block text-lg mb-2">People Splitting the Bill</label>
        <input
          type="number"
          id="people"
          value={people}
          onChange={handlePeopleChange}
          className="w-full p-4 border-2 border-[#8E8D8A] rounded-lg bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-lg">Total Tip: <span className="text-green-400">${totalTip.toFixed(2)}</span></p>
        <p className="text-lg">Total Bill (with Tip): <span className="text-blue-400">${totalAmount.toFixed(2)}</span></p>
        <p className="text-lg font-semibold text-yellow-300">Each Person Pays: <span className="text-yellow-400">${perPerson.toFixed(2)}</span></p>
      </div>

      {/* Reset Icon Button */}
      <button
        onClick={resetFields}
        className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110"
        aria-label="Reset"
      >
        <FaUndo className="text-xl" />
      </button>

      {/* Tooltip Section */}
      <div className="mt-4">
        <p className="text-sm text-center text-gray-200">
          <span className="font-semibold">Tip Percentage:</span> Adjust to see how the tip affects the total.
        </p>
        <p className="text-sm text-center text-gray-200">
          <span className="font-semibold">People:</span> Adjust to split the bill among more or fewer people.
        </p>
      </div>
    </div>
  );
}
