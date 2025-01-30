"use client";
import { useState, useEffect } from "react";

const TimeZoneCalculator = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  const [currentTime, setCurrentTime] = useState("");

  const timeZones = [
    { name: "UTC", offset: 0 },
    { name: "New York (EST)", offset: -5 },
    { name: "London (GMT)", offset: 0 },
    { name: "Berlin (CET)", offset: 1 },
    { name: "Tokyo (JST)", offset: 9 },
    { name: "Sydney (AEST)", offset: 10 },
    { name: "Mumbai (IST)", offset: 5.5 },
    { name: "Dubai (GST)", offset: 4 },
    { name: "Beijing (CST)", offset: 8 },
    { name: "Los Angeles (PST)", offset: -8 },
    { name: "Moscow (MSK)", offset: 3 },
    { name: "Rio de Janeiro (BRT)", offset: -3 },
    { name: "Cape Town (SAST)", offset: 2 },
    { name: "Singapore (SGT)", offset: 8 },
  ];

  const getCurrentTime = (timeZone) => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const timeInZone = new Date(utc + timeZone.offset * 3600000);
    return timeInZone.toLocaleTimeString();
  };

  useEffect(() => {
    const updateLiveTime = () => {
      const timeZone = timeZones.find((tz) => tz.name === selectedTimeZone);
      setCurrentTime(getCurrentTime(timeZone));
    };

    updateLiveTime();
    const interval = setInterval(updateLiveTime, 1000);

    return () => clearInterval(interval);
  }, [selectedTimeZone]);

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Time Zone Calculator
      </h2>

      {/* Time Zone Dropdown */}
      <div className="mb-6">
        <label
          htmlFor="timeZone"
          className="block text-lg text-gray-800 dark:text-white mb-2"
        >
          Select Time Zone:
        </label>
        <select
          id="timeZone"
          value={selectedTimeZone}
          onChange={(e) => setSelectedTimeZone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white dark:text-white dark:bg-black"
        >
          {timeZones.map((zone, index) => (
            <option key={index} value={zone.name}>
              {zone.name}
            </option>
          ))}
        </select>
      </div>

      {/* Current Time Display */}
      <div className="mt-6 text-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Current Time in {selectedTimeZone}:
        </h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-yellow-400 mt-2">
          {currentTime}
        </p>
      </div>
    </div>
  );
};

export default TimeZoneCalculator;
