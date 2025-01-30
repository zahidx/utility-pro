import { useState } from "react";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [ageDetails, setAgeDetails] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to calculate age in years, months, weeks, and days
  const calculateAge = () => {
    if (!birthDate) {
      setError("Please enter a valid birth date.");
      return;
    }
    setError(""); // Clear previous errors
    setIsLoading(true); // Start loading spinner

    const today = new Date();
    const birthDateObj = new Date(birthDate);
    if (birthDateObj > today) {
      setError("Birthdate cannot be in the future.");
      setAgeDetails(null);
      setIsLoading(false); // Stop loading spinner
      return;
    }

    setTimeout(() => { // Simulate delay for loading state
      const ageInMilliseconds = today - birthDateObj;
      const ageDate = new Date(ageInMilliseconds);

      // Calculate years, months, weeks, and days
      const years = today.getFullYear() - birthDateObj.getFullYear();
      const months = today.getMonth() - birthDateObj.getMonth();
      const days = today.getDate() - birthDateObj.getDate();

      const monthsInTotal = years * 12 + months; // Convert years to months
      const weeksInTotal = Math.floor(ageInMilliseconds / (7 * 24 * 60 * 60 * 1000)); // Weeks calculation
      const daysInTotal = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000)); // Days calculation

      setAgeDetails({
        years,
        months: monthsInTotal % 12,
        weeks: weeksInTotal,
        days: daysInTotal,
      });

      setIsLoading(false); // Stop loading spinner
    }, 1000); // Simulate a 1-second delay
  };

  const clearInput = () => {
    setBirthDate("");
    setAgeDetails(null);
    setError("");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-[#0E1628] to-[#380643] rounded-lg shadow-xl max-w-sm mx-auto">
      <h2 className="text-3xl font-semibold text-white mb-6">Age Calculator</h2>
      
      {/* Input Field for Birthdate */}
      <div className="mb-6">
        <label className="block text-white text-lg mb-2" htmlFor="birthDate">
          Enter your Birthdate:
        </label>
        <input
          type="date"
          id="birthDate"
          aria-label="Birthdate input field"
          className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-400 mb-6">{error}</p>}

      {/* Calculate Button */}
      <button
        onClick={calculateAge}
        className="w-full bg-[#E5970F] hover:bg-[#E69A10] text-white font-bold py-3 rounded-lg transition duration-300 mb-4"
        disabled={isLoading} // Disable button during loading
      >
        {isLoading ? (
          <span className="flex justify-center items-center">
            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4"></circle>
              <path d="M4 12a8 8 0 1 1 8 8" fill="none" stroke="currentColor" strokeWidth="4"></path>
            </svg>
            Calculating...
          </span>
        ) : (
          "Calculate Age"
        )}
      </button>

      {/* Clear Button */}
      <button
        onClick={clearInput}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition duration-300"
      >
        Clear
      </button>

      {/* Age Display */}
      {ageDetails && !isLoading && (
        <div className="mt-6 text-xl text-white transition-all duration-500 ease-in-out transform scale-105">
          <p>Your age is:</p>
          <ul className="list-disc pl-6">
            <li><strong>{ageDetails.years}</strong> years</li>
            <li><strong>{ageDetails.months}</strong> months</li>
            <li><strong>{ageDetails.weeks}</strong> weeks</li>
            <li><strong>{ageDetails.days}</strong> days</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
