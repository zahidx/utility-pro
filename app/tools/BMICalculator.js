"use client";
import { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bmiCalculated, setBmiCalculated] = useState(false);  // New state to track BMI calculation

  const convertWeightToKg = (value, unit) => {
    return unit === "lbs" ? value * 0.453592 : value;
  };

  const convertHeightToMeters = (value, unit) => {
    if (unit === "cm") return value / 100;
    if (unit === "feet" && feet && inches) return feet * 0.3048 + inches * 0.0254;
    if (unit === "inches") return value * 0.0254;
    return value;
  };

  const calculateBMI = () => {
    let weightInKg = convertWeightToKg(parseFloat(weight), weightUnit);
    let heightInMeters = convertHeightToMeters(parseFloat(height), heightUnit);

    if (weightInKg && heightInMeters) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      categorizeBMI(bmiValue);
      setBmiCalculated(true);  // Set BMI calculated flag to true
    }
  };

  const categorizeBMI = (bmiValue) => {
    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 24.9) setCategory("Normal weight");
    else if (bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getCategoryTextColor = () => {
    if (category === "Underweight") return "text-blue-500";
    if (category === "Normal weight") return "text-green-500";
    if (category === "Overweight") return "text-yellow-500";
    if (category === "Obese") return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">BMI Calculator</h2>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Weight:</label>
        <div className="flex">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter weight"
          />
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className="ml-2 p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-2">Height:</label>
        {heightUnit === "feet" ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Feet"
            />
            <input
              type="number"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Inches"
            />
          </div>
        ) : (
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter height"
          />
        )}
        <select
          value={heightUnit}
          onChange={(e) => setHeightUnit(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded-lg w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="cm">cm</option>
          <option value="feet">feet & inches</option>
          <option value="inches">inches</option>
        </select>
      </div>

      <button
        onClick={calculateBMI}
        className="w-full p-3 bg-gradient-to-r from-[#F5A623] to-[#F7B924] text-white rounded-lg mt-4 hover:from-[#F7B924] hover:to-[#F5A623]"
      >
        Calculate BMI
      </button>

      {bmi && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">Your BMI: {bmi}</h3>
          <p className={`text-lg mt-2 ${getCategoryTextColor()}`}>Category: {category}</p>
        </div>
      )}

      {/* Conditionally render BMI Chart button */}
      {!bmiCalculated && (
        <button
          onClick={toggleModal}
          className="w-full p-3 bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] text-white rounded-lg mt-4 hover:from-[#8BC34A] hover:to-[#4CAF50]"
        >
          Show BMI Chart
        </button>
      )}

      {/* Modal for BMI Chart */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
            <h3 className="text-xl text-gray-900 font-semibold text-center mb-4">BMI Chart</h3>
            <div className="text-left">
              <p className="text-blue-500"><strong>Underweight:</strong> {"<"}18.5</p>
              <p className="text-green-500"><strong>Healthy weight:</strong> 18.5–24.9</p>
              <p className="text-yellow-500"><strong>Overweight:</strong> 25–29.9</p>
              <p className="text-red-500"><strong>Class 1 obesity:</strong> 30–34.9</p>
            </div>
            <button
              onClick={toggleModal}
              className="w-full p-3 bg-red-500 text-white rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
