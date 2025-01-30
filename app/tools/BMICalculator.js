"use client";
import { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  // Function to calculate BMI
  const calculateBMI = () => {
    if (weight && height) {
      const bmiValue = weight / (height * height);
      setBmi(bmiValue.toFixed(2));
      categorizeBMI(bmiValue);
    }
  };

  // Function to categorize BMI value
  const categorizeBMI = (bmiValue) => {
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">BMI Calculator</h2>
      
      {/* BMI Calculation Form */}
      <div className="mb-4">
        <label htmlFor="weight" className="block text-lg text-gray-800 dark:text-white mb-2">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your weight"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="height" className="block text-lg text-gray-800 dark:text-white mb-2">Height (m):</label>
        <input
          type="number"
          step="0.01"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your height"
        />
      </div>

      <button
        onClick={calculateBMI}
        className="w-full p-3 bg-gradient-to-r from-[#F5A623] to-[#F7B924] text-white rounded-lg mt-4 hover:bg-gradient-to-r hover:from-[#F7B924] hover:to-[#F5A623]"
      >
        Calculate BMI
      </button>

      {/* BMI Result */}
      {bmi && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Your BMI: {bmi}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Category: {category}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
