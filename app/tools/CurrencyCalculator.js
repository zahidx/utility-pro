"use client";
import { useState, useEffect } from "react";

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch exchange rates from the API
  const fetchExchangeRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/3f788a9ea5213432b951a4ad/latest/${fromCurrency}`
      );
      const data = await response.json();
      if (data.result === "success") {
        setExchangeRates(data.conversion_rates);
      } else {
        setError("Failed to fetch exchange rates.");
      }
    } catch (err) {
      setError("Error fetching exchange rates.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency]);

  const convertCurrency = () => {
    if (amount && fromCurrency && toCurrency && exchangeRates[toCurrency]) {
      const rate = exchangeRates[toCurrency];
      const result = (amount * rate).toFixed(2);
      setConvertedAmount(result);
    }
  };

  // Function to swap currencies and reset loading
  const swapCurrencies = () => {
    setLoading(false);  // Reset the loading state when currencies are swapped
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mr-2">
          Currency Calculator
        </h2>
        {/* Loading Icon */}
        {loading && (
          <div className="animate-spin border-t-4 border-b-4 border-gray-800 w-6 h-6 rounded-full"></div>
        )}
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-lg text-gray-800 dark:text-white mb-2">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-white bg-black"
          placeholder="Enter amount"
        />
      </div>

      {/* Currency Select Inputs */}
      <div className="mb-4 flex justify-between items-center">
        <div className="w-48">
          <label htmlFor="fromCurrency" className="block text-lg text-gray-800 dark:text-white mb-2">
            From Currency:
          </label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
              setLoading(true);  // Set loading when the currency is changed
            }}
            className="w-full p-2 border border-gray-300 rounded-lg text-white bg-black"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="JPY">JPY</option>
            <option value="CHF">CHF</option>
            <option value="NZD">NZD</option>
            <option value="CNY">CNY</option>
            <option value="BDT">BDT</option> {/* Bangladesh Taka */}
            <option value="ZAR">ZAR</option> {/* South African Rand */}
            <option value="MXN">MXN</option> {/* Mexican Peso */}
            <option value="SGD">SGD</option> {/* Singapore Dollar */}
          </select>
        </div>

        {/* Currency Swap Button */}
        <button
          onClick={swapCurrencies}
          className="px-4 py-2 bg-gray-800 text-white rounded-full"
          style={{ marginTop: '37px' }} // Move icon slightly down
        >
          ↔️
        </button>

        <div className="w-48">
          <label htmlFor="toCurrency" className="block text-lg text-gray-800 dark:text-white mb-2">
            To Currency:
          </label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-white bg-black"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="JPY">JPY</option>
            <option value="CHF">CHF</option>
            <option value="NZD">NZD</option>
            <option value="CNY">CNY</option>
            <option value="BDT">BDT</option> {/* Bangladesh Taka */}
            <option value="ZAR">ZAR</option> {/* South African Rand */}
            <option value="MXN">MXN</option> {/* Mexican Peso */}
            <option value="SGD">SGD</option> {/* Singapore Dollar */}
          </select>
        </div>
      </div>

      {/* Convert Button */}
      <button
        onClick={convertCurrency}
        disabled={loading}
        className="w-full p-3 bg-gradient-to-r from-[#F5A623] to-[#F7B924] text-white rounded-lg mt-4 hover:bg-gradient-to-r hover:from-[#F7B924] hover:to-[#F5A623]"
      >
        {loading ? "Converting..." : "Convert Currency"}
      </button>

      {/* Error Handling */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Converted Amount */}
      {convertedAmount && !loading && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Converted Amount: {convertedAmount} {toCurrency}
          </h3>
        </div>
      )}
    </div>
  );
};

export default CurrencyCalculator;
