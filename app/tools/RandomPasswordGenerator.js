"use client";
import { useState } from "react";
import { Clipboard, ClipboardCheck, Eye, EyeOff } from "lucide-react";

const RandomPasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const symbols = "!@#$%^&*()_+{}[]|:;<>,.?/~";
    const chars = includeSymbols ? letters + symbols : letters;

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = () => {
    if (length < 8) return "Weak ❌";
    if (length < 12) return "Medium ⚠️";
    if (length < 16) return "Strong ✅";
    return "Very Strong 💪";
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center mt-10">
      <h2 className="text-xl font-bold mb-4">🔐 Random Password Generator</h2>

      {/* Password Display */}
      <div className="relative bg-gray-700 p-3 rounded-lg flex items-center justify-between">
        <span className="break-all">{showPassword ? password || "Click Generate" : "*".repeat(password.length)}</span>

        <div className="flex items-center space-x-2">
          {/* Show/Hide Password */}
          <button onClick={() => setShowPassword(!showPassword)} className="text-gray-300 hover:text-white transition">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          
          {/* Copy Button */}
          <button onClick={copyToClipboard} className="text-gray-300 hover:text-white transition" disabled={!password}>
            {copied ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
          </button>
        </div>
      </div>

      {/* Password Strength */}
      {password && (
        <p className="mt-2 text-sm text-green-400">{getPasswordStrength()}</p>
      )}

      {/* Password Length Control */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <label className="text-sm">Length:</label>
        <input
          type="number"
          min="6"
          max="30"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-16 text-black px-2 py-1 rounded-md"
        />
        <span className="text-sm text-gray-300">{length} characters</span>
      </div>

      {/* Toggle Symbols */}
      <div className="mt-3 flex items-center justify-center space-x-2">
        <input
          type="checkbox"
          checked={includeSymbols}
          onChange={() => setIncludeSymbols(!includeSymbols)}
          id="symbolsToggle"
          className="w-4 h-4"
        />
        <label htmlFor="symbolsToggle" className="text-sm">Include Symbols</label>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg font-bold"
      >
        Generate Password
      </button>
    </div>
  );
};

export default RandomPasswordGenerator;
