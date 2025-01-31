"use client";
import { useState, useEffect } from "react";

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState(0);
  const [unitType, setUnitType] = useState("kilometers");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputValue === "") {
      setOutputValue(0);
    }
    convertToUnit();
  }, [inputValue, unitType]);

  const convertToUnit = () => {
    if (inputValue === "") {
      setError("Please enter a value.");
      return;
    }

    if (isNaN(inputValue) || inputValue < 0) {
      setError("Please enter a valid positive number.");
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      let conversionRate = 0;
      const unitMap = {
        kilometers: 0.621371,
        meters: 1.09361,
        miles: 1.60934,
        yards: 0.9144,
      };

      setOutputValue(inputValue * unitMap[unitType]);
      setIsLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => setInputValue(e.target.value);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const clearInput = () => {
    setInputValue("");
    setOutputValue(0);
    setError("");
  };

  const getUnitLabels = () => {
    const labels = {
      kilometers: ["km", "mi"],
      miles: ["mi", "km"],
      meters: ["m", "yd"],
      yards: ["yd", "m"],
    };
    return labels[unitType];
  };

  return (
    <div className={`h-[520px] ${darkMode ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          {/* Header Section */}
          <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Unit Converter</h1>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} hover:opacity-90 transition-opacity`}
              >
                {darkMode ? "🌙" : "☀️"}
              </button>
            </div>
            <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Convert between different measurement units instantly
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Input Value
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter value"
                    className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-50 border-gray-300 text-gray-900"} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  <span className={`absolute right-3 top-3.5 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {getUnitLabels()[0]}
                  </span>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Conversion Type
                </label>
                <select
                  value={unitType}
                  onChange={(e) => setUnitType(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-50 border-gray-300 text-gray-900"} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="kilometers">Kilometers → Miles</option>
                  <option value="miles">Miles → Kilometers</option>
                  <option value="meters">Meters → Yards</option>
                  <option value="yards">Yards → Meters</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={convertToUnit}
                  className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Convert
                </button>
                <button
                  onClick={clearInput}
                  className={`p-3 rounded-lg ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} hover:opacity-90 transition-opacity`}
                >
                  Clear
                </button>
              </div>
            </div>

           {/* Output Section */}
<div
  className={`w-full max-w-4xl rounded-lg p-6 ${
    darkMode ? "bg-gray-700" : "bg-gray-100"
  } overflow-auto break-words`}
>
  <h3 className="text-sm font-medium mb-4 text-gray-500">Conversion Result</h3>

  {isLoading ? (
    <div className="flex justify-center items-center h-32">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : error ? (
    <div className="text-red-500 text-center py-4">{error}</div>
  ) : outputValue > 0 ? (
    <>
      <div className="text-4xl font-bold text-center mb-4">
        {outputValue.toFixed(2)}
        <span className="text-lg ml-2 text-gray-500">{getUnitLabels()[1]}</span>
      </div>
      <div
        className={`text-center text-sm ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {inputValue} {getUnitLabels()[0]} equals
      </div>
    </>
  ) : (
    <div className="text-center text-gray-500 py-4">Enter values to see conversion</div>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
