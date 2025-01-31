"use client";
import { useState } from "react";

const CalorieCalculator = () => {
  const [caloriesConsumed, setCaloriesConsumed] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [darkMode, setDarkMode] = useState(false);

  // Calculate BMR based on input
  const calculateBMR = () => {
    if (!weight || !height || !age) return 2000; // Default BMR
    return gender === "male"
      ? Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))
      : Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age));
  };

  const bmr = calculateBMR();
  const calorieBalance = (parseInt(caloriesConsumed) || 0) - (parseInt(caloriesBurned) || 0);
  const progress = Math.min((caloriesConsumed / bmr) * 100, 100);

  return (
    <div className={`max-w-md mx-auto p-6 rounded-lg shadow-lg mt-10 transition ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
      {/* Dark Mode Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg text-sm font-bold transition bg-blue-500 text-white"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h2 className="text-xl font-bold text-center mb-4">🔥 Calorie Calculator</h2>

      {/* Age, Weight, Height Inputs */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="w-full p-2 rounded-md text-black" />
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (kg)" className="w-full p-2 rounded-md text-black" />
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height (cm)" className="w-full p-2 rounded-md text-black" />
      </div>

      {/* Gender Selection */}
      <div className="mb-3">
        <label className="mr-3 text-sm">Gender:</label>
        <select onChange={(e) => setGender(e.target.value)} value={gender} className="p-2 rounded-md text-black">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Calories Input Fields */}
      <div className="mb-3">
        <label className="block text-sm mb-1">Calories Consumed:</label>
        <input type="number" value={caloriesConsumed} onChange={(e) => setCaloriesConsumed(e.target.value)} className="w-full p-2 rounded-md text-black" placeholder="Enter calories consumed" />
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1">Calories Burned:</label>
        <input type="number" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} className="w-full p-2 rounded-md text-black" placeholder="Enter calories burned" />
      </div>

      {/* Progress Bar for Calories Balance */}
      <div className="mt-4">
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: progress < 100 ? "green" : "red" }}
          ></div>
        </div>
      </div>

      {/* Calorie Balance Result */}
      <div className="mt-4 text-lg font-semibold text-center">
        {calorieBalance > 0 ? (
          <span className="text-red-500">Surplus: {calorieBalance} kcal 🚨</span>
        ) : calorieBalance < 0 ? (
          <span className="text-green-500">Deficit: {Math.abs(calorieBalance)} kcal ✅</span>
        ) : (
          <span className="text-blue-500">Balanced Diet! ⚖️</span>
        )}
      </div>

      {/* Recommended Daily Calories */}
      <div className="mt-4 text-sm text-gray-600">
        Recommended Daily Calories (BMR): <span className="font-bold">{bmr} kcal</span>
      </div>

    </div>
  );
};

export default CalorieCalculator;
