"use client";
import { useState } from "react";

const TimeZoneCalculator = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  const [currentTime, setCurrentTime] = useState(null);

  const timeZones = [
    { name: "UTC", offset: 0 },
    { name: "New York (EST)", offset: -5 },
    { name: "London (GMT)", offset: 0 },
    { name: "Berlin (CET)", offset: 1 },
    { name: "Tokyo (JST)", offset: 9 },
    { name: "Sydney (AEST)", offset: 10 },
    { name: "Mumbai (IST)", offset: 5.5 },
  ];

  const getCurrentTime = (timeZone) => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const timeInZone = new Date(utc + timeZone.offset * 3600000);
    return timeInZone.toLocaleString();
  };

  const handleTimeZoneChange = (e) => {
    const selectedZone = e.target.value;
    setSelectedTimeZone(selectedZone);
    const timeZone = timeZones.find((tz) => tz.name === selectedZone);
    const time = getCurrentTime(timeZone);
    setCurrentTime(time);
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Time Zone Calculator</h2>

      {/* Time Zone Dropdown */}
      <div className="mb-4">
        <label htmlFor="timeZone" className="block text-lg text-gray-800 dark:text-white mb-2">Select Time Zone:</label>
        <select
          id="timeZone"
          value={selectedTimeZone}
          onChange={handleTimeZoneChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          {timeZones.map((zone, index) => (
            <option key={index} value={zone.name}>
              {zone.name}
            </option>
          ))}
        </select>
      </div>

      {/* Current Time Display */}
      {currentTime && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Current Time in {selectedTimeZone}: {currentTime}
          </h3>
        </div>
      )}
    </div>
  );
};

export default TimeZoneCalculator;
