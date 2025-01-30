"use client";
import { useState } from "react";
import { FaCalculator, FaWeightHanging, FaDollarSign, FaRegClock } from "react-icons/fa";
import Modal from "./tools/Modal";
import dynamic from "next/dynamic";

// Dynamically import the tools to avoid potential issues with Next.js bundling
const AgeCalculator = dynamic(() => import("./tools/AgeCalculator"));
const BMICalculator = dynamic(() => import("./tools/BMICalculator"));
const CurrencyCalculator = dynamic(() => import("./tools/CurrencyCalculator"));
const TimeZoneCalculator = dynamic(() => import("./tools/TimeZoneCalculator"));

const tools = [
  { name: "Age Calculator", icon: <FaCalculator />, component: AgeCalculator },
  { name: "BMI Calculator", icon: <FaWeightHanging />, component: BMICalculator },
  { name: "Currency Calculator", icon: <FaDollarSign />, component: CurrencyCalculator },
  { name: "Time Zone Calculator", icon: <FaRegClock />, component: TimeZoneCalculator },
];

export default function Home() {
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-r dark:from-[#0E1628] dark:to-[#380643]">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-[#E69A10] to-[#E5970F] rounded-b-xl">
        <h1 className="text-5xl font-extrabold text-white mb-4">Welcome to UtilityPro</h1>
        <p className="text-xl text-white mb-6">Your All-in-One Solution for Quick Calculations & Conversions</p>
        <button
          onClick={() => document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" })} // Scrolls to the Tools section
          className="bg-[#E69A10] text-white px-6 py-3 rounded-lg text-xl hover:bg-[#F5A623] transition-colors"
        >
          Explore Our Tools
        </button>
      </section>

      {/* Tools Grid and Modal Section */}
      <section id="tools-section" className="flex">
        {/* Left Section for Tools */}
        <div className="w-1/3 p-6 bg-gradient-to-r from-[#F5A623] to-[#F7B924] dark:from-[#2C3E50] dark:to-[#34495E]">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Explore Our Tools</h2>
          <div className="grid grid-cols-1 gap-8">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#F5A623] to-[#F7B924] dark:from-[#2C3E50] dark:to-[#34495E] p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedTool(tool)} // Sets the clicked tool
              >
                <div className="flex justify-center items-center text-4xl text-gray-800 dark:text-white mb-4">
                  {tool.icon}
                </div>
                <h3 className="text-lg text-center text-gray-800 dark:text-white">{tool.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section for Modals */}
        <div className="w-2/3 p-6">
          {selectedTool && (
            <Modal onClose={() => setSelectedTool(null)}>
              <selectedTool.component /> {/* Dynamically loads the component based on the selected tool */}
            </Modal>
          )}
        </div>
      </section>
    </div>
  );
}
