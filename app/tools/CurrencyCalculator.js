"use client";
import { useState } from "react";

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Example exchange rates (static for demo purposes)
  const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.75, INR: 74.5 },
    EUR: { USD: 1.18, GBP: 0.88, INR: 87.5 },
    GBP: { USD: 1.33, EUR: 1.14, INR: 105.0 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.0095 },
  };

  // Function to handle the conversion
  const convertCurrency = () => {
    if (amount && fromCurrency && toCurrency) {
      const rate = exchangeRates[fromCurrency][toCurrency];
      const result = (amount * rate).toFixed(2);
      setConvertedAmount(result);
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Currency Calculator</h2>

      {/* Currency Input Form */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-lg text-gray-800 dark:text-white mb-2">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-4 flex justify-between">
        <div className="w-48">
          <label htmlFor="fromCurrency" className="block text-lg text-gray-800 dark:text-white mb-2">From Currency:</label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>

        <div className="w-48">
          <label htmlFor="toCurrency" className="block text-lg text-gray-800 dark:text-white mb-2">To Currency:</label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>

      <button
        onClick={convertCurrency}
        className="w-full p-3 bg-gradient-to-r from-[#F5A623] to-[#F7B924] text-white rounded-lg mt-4 hover:bg-gradient-to-r hover:from-[#F7B924] hover:to-[#F5A623]"
      >
        Convert Currency
      </button>

      {/* Converted Amount */}
      {convertedAmount && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Converted Amount: {convertedAmount} {toCurrency}</h3>
        </div>
      )}
    </div>
  );
};

export default CurrencyCalculator;
